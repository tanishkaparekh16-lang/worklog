import { useMemo, useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns'
import { money } from '../lib/format'
import { shortDate, toKey } from '../lib/dates'
import ProjectRow from '../components/ProjectRow'
import { Empty, Screen } from '../components/ui'

const FILTERS = [
  { id: 'all',      label: 'All time' },
  { id: 'month',    label: 'This month' },
  { id: 'unpaid',   label: 'Unpaid' },
  { id: 'paid',     label: 'Paid' },
  { id: 'pending',  label: 'Pending' },
  { id: 'notes',    label: 'Has notes' },
]

/**
 * Search and filters. Everything runs against the in-memory list, so
 * results update as you type with no loading state.
 */
export default function Find({ projects, settings, onEdit }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const results = useMemo(() => {
    const now = new Date()
    const mFrom = toKey(startOfMonth(now))
    const mTo = toKey(endOfMonth(now))
    const q = query.trim().toLowerCase()

    let list = projects.filter((p) => {
      if (q && !(`${p.name} ${p.notes ?? ''}`.toLowerCase().includes(q))) return false
      if (filter === 'month' && (p.completed_on < mFrom || p.completed_on > mTo)) return false
      if (filter === 'unpaid' && (p.paid || p.status !== 'completed')) return false
      if (filter === 'paid' && !p.paid) return false
      if (filter === 'pending' && p.status !== 'pending') return false
      if (filter === 'notes' && !p.notes) return false
      return true
    })

    list = [...list].sort((a, b) =>
      sort === 'newest' ? b.completed_on.localeCompare(a.completed_on)
      : sort === 'oldest' ? a.completed_on.localeCompare(b.completed_on)
      : Number(b.amount) - Number(a.amount)
    )
    return list
  }, [projects, query, filter, sort])

  const total = results.reduce((t, p) => t + Number(p.amount || 0), 0)

  return (
    <Screen title="Find" subtitle={`${projects.length} projects on record`}>
      <div className="flex gap-[9px] items-center px-[13px] py-[11px] bg-surface
        border border-line rounded-[12px] mb-3 text-muted">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" className="shrink-0">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search names and notes"
          className="flex-1 bg-transparent border-0 outline-none text-ink text-[13.5px]"
        />
        {query && <button onClick={() => setQuery('')} className="text-[18px] leading-none">×</button>}
      </div>

      <div className="flex gap-[7px] overflow-x-auto noscroll pb-1">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`shrink-0 px-3 py-[7px] rounded-full border text-[11.5px] font-medium transition
              ${filter === f.id
                ? 'bg-accent/12 border-accent/35 text-accent'
                : 'bg-surface border-line text-muted'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-[7px] mt-2">
        {[['newest', 'Newest'], ['oldest', 'Oldest'], ['amount', 'Highest paid']].map(([id, label]) => (
          <button key={id} onClick={() => setSort(id)}
            className={`px-3 py-[7px] rounded-full border text-[11.5px] transition
              ${sort === id ? 'border-line2 text-ink' : 'border-line text-muted'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mono text-[11px] text-faint mt-3">
        {results.length} result{results.length === 1 ? '' : 's'} · {money(total, settings.currency)}
      </div>

      {results.length === 0 ? (
        <Empty title="Nothing matches">
          Try a different search, or clear the filters above.
        </Empty>
      ) : (
        results.map((p) => (
          <ProjectRow key={p.id} project={p} currency={settings.currency}
            showDate={shortDate(p.completed_on)} onClick={() => onEdit(p)} />
        ))
      )}
    </Screen>
  )
}
