import { money, duration } from '../lib/format'
import { Chip } from './ui'

/** One project in a list. Used on the day sheet and the Find screen. */
export default function ProjectRow({ project, currency, onClick, showDate }) {
  const time = duration(project.minutes)
  const tone = project.status === 'pending' ? 'pending' : project.paid ? 'paid' : 'unpaid'
  const label = project.status === 'pending' ? 'pending' : project.paid ? 'paid' : 'unpaid'

  return (
    <button
      onClick={onClick}
      className="w-full flex gap-3 items-center py-[13px] border-b border-line last:border-0 text-left"
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium truncate">{project.name}</div>
        <div className="mono text-[11px] text-muted mt-[3px] flex items-center gap-[6px] flex-wrap">
          <span>
            {showDate ? showDate : money(project.amount, currency)}
            {time && ` · ${time}`}
          </span>
          <Chip tone={tone}>{label}</Chip>
        </div>
      </div>
      <div className="mono text-[14px] font-bold">{money(project.amount, currency)}</div>
    </button>
  )
}
