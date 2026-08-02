import {
  startOfMonth, endOfMonth, subMonths, subWeeks,
  startOfWeek, endOfWeek, format, parseISO, differenceInCalendarDays,
} from 'date-fns'
import { toKey, WEEK_START } from './dates'

/**
 * Every number on the Dashboard and Reports screens is calculated here,
 * from the in-memory project list. No queries, no stored totals — so the
 * figures can never drift out of sync with the underlying data.
 */

const sum = (list) => list.reduce((t, p) => t + Number(p.amount || 0), 0)
const inRange = (list, from, to) =>
  list.filter((p) => p.completed_on >= from && p.completed_on <= to)

export function dashboardStats(projects, now = new Date()) {
  const done = projects.filter((p) => p.status === 'completed')

  const mFrom = toKey(startOfMonth(now))
  const mTo = toKey(endOfMonth(now))
  const wFrom = toKey(startOfWeek(now, { weekStartsOn: WEEK_START }))
  const wTo = toKey(endOfWeek(now, { weekStartsOn: WEEK_START }))

  const thisMonth = inRange(done, mFrom, mTo)
  const thisWeek = inRange(done, wFrom, wTo)
  const unpaid = done.filter((p) => !p.paid)
  const pendingStatus = projects.filter((p) => p.status === 'pending')

  const highest = done.reduce(
    (best, p) => (Number(p.amount) > Number(best?.amount ?? -1) ? p : best),
    null
  )

  return {
    totalProjects: done.length,
    totalEarnings: sum(done),
    monthEarnings: sum(thisMonth),
    monthProjects: thisMonth.length,
    weekEarnings: sum(thisWeek),
    weekProjects: thisWeek.length,
    avgPerProject: done.length ? sum(done) / done.length : 0,
    highest,
    unpaidCount: unpaid.length,
    unpaidTotal: sum(unpaid),
    pendingCount: pendingStatus.length,
    streak: currentStreak(done, now),
  }
}

/**
 * Consecutive days worked, counting back from today.
 * Yesterday still counts as alive — you shouldn't lose a streak at
 * midnight before you've had a chance to work.
 */
export function currentStreak(projects, now = new Date()) {
  const days = new Set(projects.map((p) => p.completed_on))
  if (!days.size) return 0

  let cursor = new Date(now)
  if (!days.has(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(toKey(cursor))) return 0
  }

  let streak = 0
  while (days.has(toKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Unpaid work grouped into the monthly periods your client pays on. */
export function payoutPeriods(projects) {
  const unpaid = projects.filter((p) => p.status === 'completed' && !p.paid)
  const groups = new Map()

  for (const p of unpaid) {
    const label = p.completed_on.slice(0, 7)          // "2026-07"
    if (!groups.has(label)) groups.set(label, [])
    groups.get(label).push(p)
  }

  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([label, list]) => {
      const anchor = parseISO(label + '-01')
      return {
        key: label,
        label: format(anchor, 'MMMM yyyy'),
        from: toKey(startOfMonth(anchor)),
        to: toKey(endOfMonth(anchor)),
        count: list.length,
        total: sum(list),
      }
    })
}

/** Last N months, oldest first — for the Reports bar charts. */
export function monthlySeries(projects, months = 8, now = new Date()) {
  const done = projects.filter((p) => p.status === 'completed')
  const out = []
  for (let i = months - 1; i >= 0; i--) {
    const anchor = subMonths(now, i)
    const list = inRange(done, toKey(startOfMonth(anchor)), toKey(endOfMonth(anchor)))
    out.push({
      label: format(anchor, 'MMM'),
      earnings: sum(list),
      projects: list.length,
    })
  }
  return out
}

/** Last N weeks, oldest first. */
export function weeklySeries(projects, weeks = 8, now = new Date()) {
  const done = projects.filter((p) => p.status === 'completed')
  const out = []
  for (let i = weeks - 1; i >= 0; i--) {
    const anchor = subWeeks(now, i)
    const from = toKey(startOfWeek(anchor, { weekStartsOn: WEEK_START }))
    const to = toKey(endOfWeek(anchor, { weekStartsOn: WEEK_START }))
    const list = inRange(done, from, to)
    out.push({
      label: format(parseISO(from), 'd MMM'),
      earnings: sum(list),
      projects: list.length,
    })
  }
  return out
}

/** Best single day, for the Reports summary cards. */
export function bestDay(projects) {
  const totals = new Map()
  for (const p of projects) {
    if (p.status !== 'completed') continue
    totals.set(p.completed_on, (totals.get(p.completed_on) ?? 0) + Number(p.amount || 0))
  }
  let best = null
  for (const [date, total] of totals) {
    if (!best || total > best.total) best = { date, total }
  }
  return best
}

export function toCSV(projects) {
  const head = [
    'Date', 'Project', 'Amount', 'Minutes', 'Status',
    'Paid', 'Paid on', 'Notes',
  ]
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = [...projects]
    .sort((a, b) => a.completed_on.localeCompare(b.completed_on))
    .map((p) => [
      p.completed_on, p.name, p.amount, p.minutes ?? '',
      p.status, p.paid ? 'Yes' : 'No', p.paid_on ?? '', p.notes ?? '',
    ].map(esc).join(','))
  return [head.map(esc).join(','), ...rows].join('\n')
}

export { differenceInCalendarDays }
