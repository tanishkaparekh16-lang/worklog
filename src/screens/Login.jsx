import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button, Input } from '../components/ui'

/**
 * Magic-link sign in. No password to create, forget, or leak — you type
 * your email, tap the link, and you're in on any device.
 */
export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  async function send() {
    setBusy(true); setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })
    setBusy(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="flex-1 flex flex-col justify-center px-8">
      <h1 className="display text-[30px] font-semibold tracking-[-0.03em]">Worklog</h1>
      <p className="text-muted text-[13px] mt-2 mb-8 leading-relaxed">
        Your work diary and earnings tracker.
      </p>

      {sent ? (
        <div className="border border-accent/35 bg-accent/8 rounded-[14px] p-4">
          <div className="display text-[14px] font-semibold text-accent">Check your email</div>
          <p className="text-[12.5px] text-muted mt-2 leading-relaxed">
            We sent a sign-in link to {email}. Open it on this device.
          </p>
          <button onClick={() => setSent(false)}
            className="text-[12px] text-muted underline mt-3">
            Use a different address
          </button>
        </div>
      ) : (
        <>
          <Input
            type="email" inputMode="email" autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && email.includes('@') && send()}
          />
          <div className="h-3" />
          <Button onClick={send} disabled={busy || !email.includes('@')}
            className="disabled:opacity-40">
            {busy ? 'Sending…' : 'Email me a sign-in link'}
          </Button>
          {error && <p className="text-[12px] text-red-400 mt-3">{error}</p>}
        </>
      )}
    </div>
  )
}
