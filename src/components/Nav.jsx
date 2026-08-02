const TABS = [
  { id: 'calendar',  label: 'CAL',     icon: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></> },
  { id: 'dashboard', label: 'STATS',   icon: <path d="M4 19V9M10 19V5M16 19v-6M22 19H2"/> },
  { id: 'reports',   label: 'REPORTS', icon: <><path d="M3 17l5-6 4 4 5-8 4 5"/><path d="M3 21h18"/></> },
  { id: 'find',      label: 'FIND',    icon: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></> },
  { id: 'settings',  label: 'MORE',    icon: <><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1v.3a2 2 0 11-4 0v-.2a1.6 1.6 0 00-2.8-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 003.7 15a2 2 0 01-1.7-2 2 2 0 012-2 1.6 1.6 0 001.1-2.7l-.1-.1a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 0011 4.6a2 2 0 014 0 1.6 1.6 0 002.7 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 001.1 2.7 2 2 0 010 4z"/></> },
]

export default function Nav({ tab, setTab }) {
  return (
    <nav
      className="flex border-t border-line bg-bg/90 backdrop-blur-xl pt-[9px]"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
    >
      {TABS.map((t) => {
        const on = tab === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-1 transition
              ${on ? 'text-accent' : 'text-faint'}`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
              stroke="currentColor" strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round">
              {t.icon}
            </svg>
            <span className="mono text-[9.5px] font-semibold tracking-[0.03em]">{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
