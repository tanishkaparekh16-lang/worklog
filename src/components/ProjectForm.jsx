import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { parseDuration, duration } from '../lib/format'
import { Button, Field, Input, Segmented, Textarea } from './ui'

/**
 * The full add/edit form. Slides in from the right.
 *
 * The same component handles both creating and editing — the only
 * difference is whether it was handed an existing project. That keeps
 * the two flows from drifting apart as the app grows.
 */
export default function ProjectForm({
  open, project, defaultDate, settings, onSave, onDelete, onClose,
}) {
  const editing = Boolean(project?.id)
  const [form, setForm] = useState(blank(defaultDate, settings))
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm(
      project
        ? {
            name: project.name ?? '',
            amount: String(project.amount ?? ''),
            completed_on: project.completed_on,
            time: duration(project.minutes) ?? '',
            notes: project.notes ?? '',
            status: project.status ?? 'completed',
            paid: project.paid ? 'yes' : 'no',
          }
        : blank(defaultDate, settings)
    )
  }, [open, project, defaultDate, settings])

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSave() {
    if (!form.name.trim()) return
    setSaving(true)
    await onSave({
      name: form.name.trim(),
      amount: Number(form.amount) || 0,
      completed_on: form.completed_on,
      minutes: parseDuration(form.time),
      notes: form.notes.trim() || null,
      status: form.status,
      paid: form.paid === 'yes',
      paid_on: form.paid === 'yes'
        ? (project?.paid_on ?? new Date().toISOString().slice(0, 10))
        : null,
    })
    setSaving(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-60 bg-bg flex flex-col"
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 340 }}
        >
          <div className="px-[18px] pt-5 pb-[14px] flex justify-between items-center border-b border-line">
            <h2 className="display text-[17px] font-semibold">
              {editing ? 'Edit project' : 'New project'}
            </h2>
            <button onClick={onClose} className="text-muted text-[22px] leading-none px-1">×</button>
          </div>

          <div className="flex-1 overflow-y-auto noscroll p-[18px]">
            <Field label="Project name">
              <Input
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder="Podcast ep. 112 — rough cut"
                autoFocus={!editing}
              />
            </Field>

            <Field label="Payment amount">
              <Input
                mono inputMode="decimal"
                value={form.amount}
                onChange={(e) => set('amount')(e.target.value)}
              />
            </Field>

            <Field label="Date completed">
              <Input
                mono type="date"
                value={form.completed_on}
                onChange={(e) => set('completed_on')(e.target.value)}
              />
            </Field>

            <Field label="Time taken · optional" hint="Type 90, 1h 30m, or 1:30">
              <Input
                mono
                value={form.time}
                onChange={(e) => set('time')(e.target.value)}
                placeholder="1h 20m"
              />
            </Field>

            <Field label="Status">
              <Segmented
                value={form.status}
                onChange={set('status')}
                options={[
                  { value: 'completed', label: 'Completed' },
                  { value: 'pending', label: 'Pending' },
                ]}
              />
            </Field>

            <Field label="Payment received">
              <Segmented
                value={form.paid}
                onChange={set('paid')}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'Not yet' },
                ]}
              />
            </Field>

            <Field label="Notes · optional">
              <Textarea
                value={form.notes}
                onChange={(e) => set('notes')(e.target.value)}
                placeholder="Feedback, revision requests, anything to remember"
              />
            </Field>
          </div>

          <div className="p-[18px] pt-[14px] border-t border-line flex gap-[10px]">
            {editing && (
              <button
                onClick={() => { onDelete(project.id); onClose() }}
                className="w-[52px] shrink-0 rounded-[12px] border border-line
                  text-muted hover:text-red-400 transition"
                aria-label="Delete project"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] mx-auto" fill="none"
                  stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
                </svg>
              </button>
            )}
            <Button onClick={handleSave} disabled={saving || !form.name.trim()}
              className="disabled:opacity-40">
              {saving ? 'Saving…' : 'Save project'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function blank(date, settings) {
  return {
    name: '',
    amount: String(settings?.default_rate ?? 0),
    completed_on: date ?? new Date().toISOString().slice(0, 10),
    time: '',
    notes: '',
    status: 'completed',
    paid: 'no',
  }
}
