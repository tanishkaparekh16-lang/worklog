import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Every project you've ever logged, held in memory.
 *
 * Why load everything at once? Because a solo freelancer generates a few
 * hundred rows a year, which is tiny. Keeping them all client-side means
 * the calendar, dashboard, reports and search all read from one array
 * with zero extra network calls — instant screen switches, and it works
 * offline once the app is installed.
 *
 * If you ever pass ~20,000 projects, this is the file to paginate.
 */
export function useProjects(userId) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!userId) return
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('completed_on', { ascending: false })

    if (error) setError(error.message)
    else setProjects(data ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  /** Group by date once, so the calendar can look up a day instantly. */
  const byDate = useMemo(() => {
    const map = new Map()
    for (const p of projects) {
      if (!map.has(p.completed_on)) map.set(p.completed_on, [])
      map.get(p.completed_on).push(p)
    }
    return map
  }, [projects])

  const addProject = useCallback(async (fields) => {
    const { data, error } = await supabase
      .from('projects')
      .insert({ ...fields, user_id: userId })
      .select()
      .single()
    if (error) { setError(error.message); return null }
    setProjects((list) => [data, ...list])
    return data
  }, [userId])

  const updateProject = useCallback(async (id, patch) => {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) { setError(error.message); return null }
    setProjects((list) => list.map((p) => (p.id === id ? data : p)))
    return data
  }, [])

  const deleteProject = useCallback(async (id) => {
    const before = projects
    setProjects((list) => list.filter((p) => p.id !== id))  // optimistic
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) { setProjects(before); setError(error.message) }  // roll back
  }, [projects])

  /** Marks a whole month's work as paid in one query. */
  const markPeriodPaid = useCallback(async (from, to) => {
    const today = new Date().toISOString().slice(0, 10)
    const { error } = await supabase
      .from('projects')
      .update({ paid: true, paid_on: today })
      .eq('user_id', userId)
      .eq('paid', false)
      .gte('completed_on', from)
      .lte('completed_on', to)
    if (error) { setError(error.message); return }
    setProjects((list) =>
      list.map((p) =>
        !p.paid && p.completed_on >= from && p.completed_on <= to
          ? { ...p, paid: true, paid_on: today }
          : p
      )
    )
  }, [userId])

  return {
    projects, byDate, loading, error,
    addProject, updateProject, deleteProject, markPeriodPaid, reload: load,
  }
}
