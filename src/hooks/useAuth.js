import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Tracks who is signed in.
 *
 * Supabase keeps the session in the browser automatically, so you stay
 * logged in between visits. This hook just listens for changes to it.
 */
export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  return { session, user: session?.user ?? null, loading }
}
