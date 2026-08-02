/**
 * Small shared building blocks. Nothing here knows about projects or
 * earnings — they're generic pieces the screens compose together.
 */

export function Screen({ title, subtitle, children }) {
  return (
    <div className="flex-1 overflow-y-auto noscroll px-[18px] pb-28">
      {title && (
        <header className="pt-6 pb-4">
          <h1 className="display text-[25px] font-semibold">{title}</h1>
          {subtitle && <p className="text-muted text-[12.5px] mt-[3px]">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`mono text-[10.5px] tracking-[0.14em] uppercase text-faint font-semibold ${className}`}>
      {children}
    </div>
  )
}

export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`bg-surface border border-line rounded-[14px] p-[14px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function StatCard({ label, value, note, tone = 'ink' }) {
  const colour = tone === 'accent' ? 'text-accent' : tone === 'pend' ? 'text-pend' : 'text-ink'
  return (
    <Card>
      <Eyebrow className="!tracking-[0.1em] !text-[10px]">{label}</Eyebrow>
      <div className={`mono text-[20px] font-bold mt-[7px] tracking-[-0.02em] ${colour}`}>
        {value}
      </div>
      {note && <div className="text-[11px] text-muted mt-[3px]">{note}</div>}
    </Card>
  )
}

export function Chip({ children, tone = 'neutral' }) {
  const tones = {
    paid: 'bg-accent/12 text-accent',
    unpaid: 'bg-surface2 text-pend',
    pending: 'bg-surface2 text-muted',
  }
  return (
    <span className={`mono inline-block px-[7px] py-[2px] rounded-[5px] text-[9.5px] font-semibold uppercase tracking-[0.05em] ${tones[tone] ?? tones.pending}`}>
      {children}
    </span>
  )
}

export function Button({ variant = 'primary', className = '', ...rest }) {
  const styles = {
    primary: 'bg-accent text-onaccent',
    quiet: 'bg-transparent border border-line text-muted hover:text-ink',
    danger: 'bg-transparent border border-line text-muted hover:text-red-400',
  }
  return (
    <button
      className={`display w-full py-[14px] rounded-[12px] text-[14px] font-semibold
        transition active:scale-[0.98] ${styles[variant]} ${className}`}
      {...rest}
    />
  )
}

export function Field({ label, hint, children }) {
  return (
    <div className="mb-[18px]">
      <label className="mono block text-[10.5px] tracking-[0.12em] uppercase text-faint font-semibold mb-[7px]">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-muted mt-[6px]">{hint}</p>}
    </div>
  )
}

export function Input({ mono = false, className = '', ...rest }) {
  return (
    <input
      className={`w-full px-[13px] py-[12px] rounded-[11px] bg-surface border border-line
        text-ink text-[14px] outline-none transition
        focus:border-accent/50 focus:bg-surface2
        ${mono ? 'mono font-semibold' : ''} ${className}`}
      {...rest}
    />
  )
}

export function Textarea({ className = '', ...rest }) {
  return (
    <textarea
      className={`w-full px-[13px] py-[12px] rounded-[11px] bg-surface border border-line
        text-ink text-[14px] outline-none transition min-h-[80px] resize-y
        focus:border-accent/50 focus:bg-surface2 ${className}`}
      {...rest}
    />
  )
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-[5px] bg-surface p-[4px] rounded-[11px] border border-line">
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex-1 py-[9px] rounded-[8px] text-[12.5px] font-semibold transition
              ${on ? 'bg-accent/12 text-accent' : 'text-muted hover:text-ink'}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function Empty({ title, children }) {
  return (
    <div className="text-center py-11 px-5">
      <div className="display text-[15px] text-ink">{title}</div>
      <p className="text-[12.5px] text-muted mt-2 leading-relaxed">{children}</p>
    </div>
  )
}

export function Spinner() {
  return (
    <div className="flex-1 grid place-items-center">
      <div className="w-6 h-6 rounded-full border-2 border-line border-t-accent animate-spin" />
    </div>
  )
}
