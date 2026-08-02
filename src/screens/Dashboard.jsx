import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { dashboardStats, payoutPeriods } from '../lib/stats'
import { money } from '../lib/format'
import { Card, Eyebrow, Screen, StatCard } from '../components/ui'
import { prettyMonth } from '../lib/dates'

/**
 * Every number here is derived, never stored — so it cannot go stale.
 *
 * Payout periods are the important idea: your client pays monthly, so
 * unpaid work is grouped by month and cleared with one button rather
 * than thirty individual checkboxes.
 */
export default function Dashboard({ projects, settings, onMarkPaid }) {
  const cur = settings.currency
  const s = useMemo(() => dashboardStats(projects), [projects])
  const periods = useMemo(() => payoutPeriods(projects), [projects])
  const [confirming, setConfirming] = useState(null)

  const goal = Number(settings.monthly_goal) || 0
  const pct = goal ? Math.min(100, Math.round((s.monthEarnings / goal) * 100)) : 0

  return (
    <Screen title="Dashboard" subtitle={prettyMonth(new Date())}>
      <div className="p-[18px] rounded-[18px] border border-accent/35 mb-[14px]
        bg-gradient-to-br from-accent/12 to-transparent">
        <Eyebrow>Earned this month</Eyebrow>
        <div className="mono text-[38px] font-bold tracking-[-0.035em] text-accent mt-2 mb-[2px]">
          {money(s.monthEarnings, cur)}
        </div>
        <div className="text-[11.5px] text-muted">
          {s.monthProjects} project{s.monthProjects === 1 ? '' : 's'}
        </div>

        {goal > 0 && (
          <>
            <div className="mono flex justify-between text-[11px] text-muted mt-[14px]">
              <span>Goal {money(goal, cur)}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-[6px] rounded-[6px] bg-white/8 mt-[7px] overflow-hidden">
              <motion.div className="h-full rounded-[6px] bg-accent"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.8, 0.28, 1] }} />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-[9px]">
        <StatCard label="This week" value={money(s.weekEarnings, cur)}
          note={`${s.weekProjects} project${s.weekProjects === 1 ? '' : 's'}`} />
        <StatCard label="Avg / project" value={money(Math.round(s.avgPerProject), cur)}
          note="across all work" />
        <StatCard label="Total earned" value={money(s.totalEarnings, cur)} note="all time" />
        <StatCard label="Total projects" value={s.totalProjects} note="completed" />

        {s.highest && (
          <Card className="col-span-2">
            <Eyebrow className="!tracking-[0.1em] !text-[10px]">Highest paying project</Eyebrow>
            <div className="mono text-[20px] font-bold mt-[7px]">{money(s.highest.amount, cur)}</div>
            <div className="text-[11px] text-muted mt-[3px] truncate">{s.highest.name}</div>
          </Card>
        )}

        <StatCard label="Awaiting payment" value={money(s.unpaidTotal, cur)}
          note={`${s.unpaidCount} project${s.unpaidCount === 1 ? '' : 's'}`} tone="pend" />
        <StatCard label="Pending work" value={s.pendingCount}
          note="not marked complete" tone="pend" />
      </div>

      <h3 className="display text-[14px] font-semibold mt-[22px] mb-[10px]">Payout periods</h3>

      {periods.length === 0 ? (
        <Card><p className="text-[12.5px] text-muted">Everything's been paid. Nothing outstanding.</p></Card>
      ) : (
        periods.map((p) => (
          <div key={p.key} className="mb-2">
            <div className="flex items-center gap-3 p-[14px] bg-surface border border-line rounded-[14px]">
              <div className="flex-1">
                <div className="display text-[13.5px] font-semibold">{p.label}</div>
                <div className="mono text-[11px] text-muted mt-[3px]">
                  {p.count} project{p.count === 1 ? '' : 's'} unpaid
                </div>
              </div>
              <div className="mono text-[15px] font-bold text-pend">{money(p.total, cur)}</div>
            </div>

            {confirming === p.key ? (
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => { onMarkPaid(p.from, p.to); setConfirming(null) }}
                  className="flex-1 py-[11px] rounded-[10px] bg-accent text-onaccent text-[12.5px] font-semibold"
                >
                  Yes, mark {p.count} project{p.count === 1 ? '' : 's'} paid
                </button>
                <button onClick={() => setConfirming(null)}
                  className="px-4 rounded-[10px] border border-line text-muted text-[12.5px]">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirming(p.key)}
                className="w-full mt-1 py-[11px] rounded-[10px] border border-accent/35
                  bg-accent/12 text-accent text-[12.5px] font-semibold">
                Mark {p.label} as paid
              </button>
            )}
          </div>
        ))
      )}
    </Screen>
  )
}
