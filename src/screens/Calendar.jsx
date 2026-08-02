import { useMemo, useState } from 'react'
import { addMonths, subMonths } from 'date-fns'
import { motion } from 'framer-motion'
import { monthGrid, prettyMonth, weekdayLabels, monthBounds } from '../lib/dates'
import { money } from '../lib/format'
import { currentStreak } from '../lib/stats'
import { Eyebrow, Screen } from '../components/ui'

/**
 * The home screen.
 *
 * Each cell carries three pieces of information: the date, how many
 * projects you finished, and — as the bar along the bottom — how much you
 * earned relative to your best day that month. Scanning down the grid
 * gives you the shape of the month before you read a single number.
 */
export default function Calendar({ byDate, projects, settings, onSelectDate }) {
  const [month, setMonth] = useState(new Date())

  const cells = useMemo(() => monthGrid(month, settings.week_start), [month, settings.week_start])
  const { from, to } = monthBounds(month)

  const stats = useMemo(() => {
    let earned = 0, count = 0, days = 0, peak = 0
    for (const [date, list] of byDate) {
      if (date < from || date > to) continue
      const dayTotal = list.reduce((t, p) => t + Number(p.amount || 0), 0)
      earned += dayTotal
      count += list.length
      days += 1
      peak = Math.max(peak, dayTotal)
    }
    return { earned, count, days, peak }
  }, [byDate, from, to])

  const streak = useMemo(() => currentStreak(projects), [projects])

  return (
    <Screen title="Worklog" subtitle="Every Descript you've shipped">
      <div className="flex items-center justify-between mb-4">
        <Arrow onClick={() => setMonth(subMonths(month, 1))}>‹</Arrow>
        <div className="display text-[16px] font-semibold">{prettyMonth(month)}</div>
        <Arrow onClick={() => setMonth(addMonths(month, 1))}>›</Arrow>
      </div>

      <div className="flex gap-5 px-4 py-[14px] bg-surface border border-line rounded-[14px] mb-4">
        <Total label="Earned" value={money(stats.earned, settings.currency)} accent />
        <Total label="Projects" value={stats.count} />
        <Total label="Days worked" value={stats.days} />
      </div>

      <div className="grid grid-cols-7 gap-[5px] mb-[6px]">
        {weekdayLabels(settings.week_start).map((d, i) => (
          <span key={i} className="mono text-center text-[10px] text-faint font-semibold">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[5px]">
        {cells.map((cell) => {
          const list = byDate.get(cell.key) ?? []
          const total = list.reduce((t, p) => t + Number(p.amount || 0), 0)
          const worked = list.length > 0
          const height = stats.peak && worked
            ? 4 + Math.round((total / stats.peak) * 30)
            : 0

          return (
            <button
              key={cell.key}
              onClick={() => onSelectDate(cell.key)}
              className={`relative aspect-[1/1.08] rounded-[10px] overflow-hidden pt-[5px] pl-[6px]
                text-left border transition active:scale-[0.93]
                ${worked ? 'bg-accent/12 border-accent/15' : 'bg-surface border-transparent'}
                ${cell.today ? '!border-accent/55' : ''}
                ${cell.inMonth ? '' : 'opacity-35'}`}
            >
              <span className={`mono text-[11px] font-medium ${worked ? 'text-ink' : 'text-faint'}`}>
                {cell.date.getDate()}
              </span>

              {worked && (
                <>
                  <span className="mono absolute inset-x-0 top-1/2 -translate-y-[52%]
                    text-center text-[15px] font-bold text-accent">
                    {list.length}
                  </span>
                  <motion.span
                    className="absolute inset-x-0 bottom-0 bg-accent"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 0.8, 0.28, 1] }}
                  />
                </>
              )}
            </button>
          )
        })}
      </div>

      <div className="mono flex items-center gap-2 mt-[14px] text-faint text-[10.5px]">
        <i className="block w-4 h-2 rounded-[2px] bg-gradient-to-r from-accent/25 to-accent" />
        bar height = earnings that day
      </div>

      {streak > 1 && (
        <div className="flex items-center gap-[10px] mt-4 p-[14px] border border-line rounded-[14px] bg-surface">
          <span className="text-[17px]">🔥</span>
          <div>
            <b className="display text-[13.5px] font-semibold">{streak} day streak</b>
            <span className="block text-muted text-[11.5px] mt-[1px]">
              Keep it going — log something today.
            </span>
          </div>
        </div>
      )}
    </Screen>
  )
}

const Arrow = ({ children, onClick }) => (
  <button onClick={onClick}
    className="w-[34px] h-[34px] rounded-[10px] border border-line bg-surface
      text-muted grid place-items-center transition
      hover:text-ink hover:border-line2 active:scale-90">
    {children}
  </button>
)

const Total = ({ label, value, accent }) => (
  <div className="flex-1">
    <Eyebrow>{label}</Eyebrow>
    <div className={`mono text-[19px] font-bold mt-[5px] tracking-[-0.02em] ${accent ? 'text-accent' : ''}`}>
      {value}
    </div>
  </div>
)
