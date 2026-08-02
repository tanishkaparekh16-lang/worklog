import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const FALLBACK = {
  currency: 'USD',
  default_rate: 45,
  monthly_goal: 0,
  week_start: 1,
}

/**
 * Your rate, currency, goal and week-start.
 *
 * There is exactly one settings row per user. If it doesn't exist yet
 * (first ever launch) we create it, so you never see a broken empty state.
 */
export function useSettings(userId) {
  const [settings, setSettings] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    let alive = true

    ;(async () => {
      const { data } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (!alive) return

      if (data) {
        setSettings(data)
      } else {
        const { data: created } = await supabase
          .from('settings')
          .insert({ user_id: userId, ...FALLBACK })
          .select()
          .single()
        if (alive && created) setSettings(created)
      }
      setLoading(false)
    })()

    return () => { alive = false }
  }, [userId])

  const save = useCallback(async (patch) => {
    setSettings((s) => ({ ...s, ...patch }))       // update screen instantly
    await supabase
      .from('settings')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
  }, [userId])

  return { settings, saveSettings: save, loadingSettings: loading }
}
