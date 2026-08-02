import { AnimatePresence, motion } from 'framer-motion'
import { prettyDay, fromKey } from '../lib/dates'
import { money } from '../lib/format'
import ProjectRow from './ProjectRow'
import { Empty } from './ui'

/**
 * The panel that slides up when you tap a date.
 *
 * The big button logs a project with your default rate and this date in
 * one tap — that's the action you'll take hundreds of times. The detailed
 * form is deliberately the smaller, secondary option.
 */
export default function DaySheet({
  dateKey, projects, settings, onClose, onQuickAdd, onOpenForm, onEdit,
}) {
  const open = Boolean(dateKey)
  const list = projects ?? []
  const total = list.reduce((t, p) => t + Number(p.amount || 0), 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40 bg-black/65 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-50 max-h-[82%] flex flex-col
              bg-surface border-t border-line rounded-t-[22px]"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <div className="w-[34px] h-1 rounded bg-line mx-auto mt-[9px] shrink-0" />

            <div className="px-[18px] pt-[14px] pb-3 flex justify-between items-start shrink-0">
              <div>
                <h2 className="display text-[18px] font-semibold">
                  {prettyDay(fromKey(dateKey))}
                </h2>
                <p className="mono text-[12.5px] text-muted mt-[3px]">
                  {list.length
                    ? `${list.length} project${list.length > 1 ? 's' : ''} · ${money(total, settings.currency)}`
                    : 'Nothing logged yet'}
                </p>
              </div>
              <button onClick={onClose} className="text-muted text-[22px] leading-none px-1">×</button>
            </div>

            <div className="overflow-y-auto noscroll px-[18px] pb-6">
              <button
                onClick={onQuickAdd}
                className="display w-full p-[15px] rounded-[12px] border border-dashed
                  border-accent/40 bg-accent/12 text-accent text-[14px] font-semibold
                  mb-2 transition active:scale-[0.98]"
              >
                + Add one project
                <small className="block font-normal text-[11px] text-muted mt-[3px]"
                  style={{ fontFamily: 'var(--font-sans)' }}>
                  Uses your {money(settings.default_rate, settings.currency)} rate
                </small>
              </button>

              <button
                onClick={onOpenForm}
                className="w-full p-[11px] rounded-[12px] border border-line
                  text-muted text-[12.5px] mb-[18px] hover:text-ink transition"
              >
                Add with details instead
              </button>

              {list.length === 0 ? (
                <Empty title="No work logged">
                  Tap the button above to log a finished Descript.
                </Empty>
              ) : (
                list.map((p) => (
                  <ProjectRow
                    key={p.id}
                    project={p}
                    currency={settings.currency}
                    onClick={() => onEdit(p)}
                  />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
