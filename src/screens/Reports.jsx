import { useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis,
} from 'recharts'
import { bestDay, monthlySeries, weeklySeries } from '../lib/stats'
import { money } from '../lib/format'
import { shortDate } from '../lib/dates'
import { Card, Screen, Segmented, StatCard } from '../components/ui'

export default function Reports({ projects, settings }) {
  const cur = settings.currency
  const [range, setRange] = useState('month')

  const data = useMemo(
    () => (range === 'month' ? monthlySeries(projects) : weeklySeries(projects)),
    [projects, range]
  )

  const best = useMemo(() => bestDay(projects), [projects])
  const bestPeriod = useMemo(
    () => data.reduce((b, d) => (d.earnings > (b?.earnings ?? -1) ? d : b), null),
    [data]
  )

  return (
    <Screen title="Reports" subtitle="Where the work went">
      <Segmented
        value={range}
        onChange={setRange}
        options={[{ value: 'month', label: 'Monthly' }, { value: 'week', label: 'Weekly' }]}
      />
      <div className="h-4" />

      <Chart title="Earnings" subtitle={range === 'month' ? 'Last 8 months' : 'Last 8 weeks'}
        data={data} dataKey="earnings" formatter={(v) => money(v, cur)} />

      <Chart title="Projects completed" subtitle={range === 'month' ? 'Last 8 months' : 'Last 8 weeks'}
        data={data} dataKey="projects" formatter={(v) => `${v} project${v === 1 ? '' : 's'}`} />

      <div className="grid grid-cols-2 gap-[9px]">
        <StatCard
          label={range === 'month' ? 'Best month' : 'Best week'}
          value={money(bestPeriod?.earnings ?? 0, cur)}
          note={bestPeriod?.label ?? '—'}
        />
        <StatCard
          label="Best day"
          value={money(best?.total ?? 0, cur)}
          note={best ? shortDate(best.date) : '—'}
        />
      </div>
    </Screen>
  )
}

function Chart({ title, subtitle, data, dataKey, formatter }) {
  return (
    <Card className="!p-4 mb-3">
      <h4 className="display text-[13px] font-semibold">{title}</h4>
      <p className="text-[11px] text-muted mb-4">{subtitle}</p>
      <div className="h-[140px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <CartesianGrid stroke="#232D3C" vertical={false} />
            <XAxis
              dataKey="label" tickLine={false} axisLine={false}
              tick={{ fill: '#475366', fontSize: 9, fontFamily: 'JetBrains Mono' }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(99,199,236,0.08)' }}
              contentStyle={{
                background: '#1A2230', border: '1px solid #232D3C',
                borderRadius: 10, fontSize: 12, fontFamily: 'JetBrains Mono',
              }}
              labelStyle={{ color: '#78859A' }}
              formatter={(v) => [formatter(v), '']}
            />
            <Bar dataKey={dataKey} fill="#63C7EC" radius={[4, 4, 2, 2]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
