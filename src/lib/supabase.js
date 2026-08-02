import { createClient } from '@supabase/supabase-js'

/**
 * The single connection to your database.
 * Everything in the app imports this one object.
 *
 * The keys come from .env.local, which is gitignored — they are never
 * hard-coded here. The publishable key is safe in browser code; it only
 * works alongside the Row Level Security rules in your database.
 */
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  throw new Error(
    'Missing Supabase credentials. Create a .env.local file in the project ' +
    'root with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY, then ' +
    'restart the dev server.'
  )
}

export const supabase = createClient(url, key)
