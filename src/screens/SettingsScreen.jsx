import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toCSV } from '../lib/stats'
import { money, symbolFor } from '../lib/format'
import { Eyebrow, Screen } from '../components/ui'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD']

export default function SettingsScreen({ user, settings, saveSettings, projects }) {
  const [editing, setEditing] = useState(null)

  function download() {
    const blob = new Blob([toCSV(projects)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `worklog-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Screen title="Settings" subtitle={user?.email}>
      <Eyebrow className="mb-1">Work</Eyebrow>

      <NumberRow
        label="Default rate" hint="Fills in automatically on quick add"
        value={money(settings.default_rate, settings.currency)}
        editing={editing === 'rate'}
        onOpen={() => setEditing('rate')}
        onSave={(v) => { saveSettings({ default_rate: Number(v) || 0 }); setEditing(null) }}
        onCancel={() => setEditing(null)}
        initial={settings.default_rate}
      />

      <Row label="Currency" hint="Used everywhere">
        <select
          value={settings.currency}
          onChange={(e) => saveSettings({ currency: e.target.value })}
          className="mono bg-transparent text-accent text-[13.5px] font-semibold text-right outline-none"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c} className="bg-surface2">{c} {symbolFor(c)}</option>
          ))}
        </select>
      </Row>

      <NumberRow
        label="Monthly goal" hint="Shows as a progress bar on the dashboard"
        value={settings.monthly_goal ? money(settings.monthly_goal, settings.currency) : 'Off'}
        editing={editing === 'goal'}
        onOpen={() => setEditing('goal')}
        onSave={(v) => { saveSettings({ monthly_goal: Number(v) || 0 }); setEditing(null) }}
        onCancel={() => setEditing(null)}
        initial={settings.monthly_goal}
      />

      <Row label="Week starts on" hint="Affects the calendar and weekly reports">
        <select
          value={settings.week_start}
          onChange={(e) => saveSettings({ week_start: Number(e.target.value) })}
          className="mono bg-transparent text-accent text-[13.5px] font-semibold text-right outline-none"
        >
          <option value={1} className="bg-surface2">Monday</option>
          <option value={0} className="bg-surface2">Sunday</option>
        </select>
      </Row>

      <Eyebrow className="mt-5 mb-1">Data</Eyebrow>

      <Row label="Sync" hint="Your work is saved to the cloud automatically">
        <span className="mono text-[13.5px] text-accent font-semibold">On</span>
      </Row>

      <button onClick={download} className="w-full text-left">
        <Row label="Export CSV" hint={`${projects.length} projects, for spreadsheets or taxes`}>
          <span className="mono text-[13.5px] text-accent font-semibold">Download</span>
        </Row>
      </button>

      <button onClick={() => supabase.auth.signOut()} className="w-full text-left">
        <Row label="Sign out" hint="Your data stays safe in the cloud">
          <span className="mono text-[13.5px] text-muted">›</span>
        </Row>
      </button>

      <Eyebrow className="mt-5 mb-1 opacity-50">Coming later</Eyebrow>
      <div className="opacity-40 pointer-events-none">
        <Row label="Clients" hint="Track more than one"><Dash /></Row>
        <Row label="Hourly work" hint="Beyond flat-rate projects"><Dash /></Row>
        <Row label="Expenses & tax" hint="Profit after costs"><Dash /></Row>
      </div>

      <p className="text-[11px] text-faint text-center mt-8 leading-relaxed">
        Worklog · installable from your browser's Share menu
      </p>
    </Screen>
  )
}

const Dash = () => <span className="mono text-[13.5px] text-muted">—</span>

function Row({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-3 py-[15px] border-b border-line">
      <div>
        <div className="text-[13.5px]">{label}</div>
        {hint && <div className="text-[11px] text-muted mt-[3px]">{hint}</div>}
      </div>
      {children}
    </div>
  )
}

function NumberRow({ label, hint, value, editing, onOpen, onSave, onCancel, initial }) {
  const [draft, setDraft] = useState(String(initial ?? ''))

  if (!editing) {
    return (
      <button onClick={() => { setDraft(String(initial ?? '')); onOpen() }} className="w-full text-left">
        <Row label={label} hint={hint}>
          <span className="mono text-[13.5px] text-accent font-semibold">{value}</span>
        </Row>
      </button>
    )
  }

  return (
    <div className="py-[15px] border-b border-line">
      <div className="text-[13.5px] mb-2">{label}</div>
      <div className="flex gap-2">
        <input
          autoFocus type="number" inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave(draft)}
          className="mono flex-1 px-3 py-2 rounded-[10px] bg-surface border border-accent/40
            text-ink text-[14px] font-semibold outline-none"
        />
        <button onClick={() => onSave(draft)}
          className="px-4 rounded-[10px] bg-accent text-onaccent text-[12.5px] font-semibold">
          Save
        </button>
        <button onClick={onCancel}
          className="px-3 rounded-[10px] border border-line text-muted text-[12.5px]">
          Cancel
        </button>
      </div>
    </div>
  )
}
