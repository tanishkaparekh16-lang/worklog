import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, parseISO, isSameMonth, isToday,
} from 'date-fns'

/**
 * Date helpers. The whole app stores dates as plain "YYYY-MM-DD" strings
 * rather than timestamps — a completed project belongs to a calendar day,
 * not a moment, and this avoids every timezone bug going.
 */

// Monday = 1. Sunday would be 0.
export const WEEK_START = 1

/** Date object -> "2026-07-14" */
export const toKey = (date) => format(date, 'yyyy-MM-dd')

/** "2026-07-14" -> Date object (local midnight, no timezone shift) */
export const fromKey = (key) => parseISO(key)

/** Every cell for a month grid, including leading/trailing padding days. */
export function monthGrid(month, weekStart = WEEK_START) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: weekStart })
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: weekStart })
  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    key: toKey(date),
    inMonth: isSameMonth(date, month),
    today: isToday(date),
  }))
}

export function monthBounds(month) {
  return { from: toKey(startOfMonth(month)), to: toKey(endOfMonth(month)) }
}

export function weekBounds(date = new Date(), weekStart = WEEK_START) {
  return {
    from: toKey(startOfWeek(date, { weekStartsOn: weekStart })),
    to: toKey(endOfWeek(date, { weekStartsOn: weekStart })),
  }
}

export const weekdayLabels = (weekStart = WEEK_START) => {
  const base = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return [...base.slice(weekStart), ...base.slice(0, weekStart)]
}

export const prettyDay = (date) => format(date, 'EEEE, d MMMM')
export const prettyMonth = (date) => format(date, 'MMMM yyyy')
export const shortDate = (key) => format(parseISO(key), 'd MMM yyyy')
