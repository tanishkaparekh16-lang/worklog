/**
 * Money and number formatting.
 * Kept in one place so changing currency touches a single file.
 */

const SYMBOLS = { USD: '$', EUR: '€', GBP: '£', INR: '₹', CAD: '$', AUD: '$' }

export function symbolFor(currency = 'USD') {
  return SYMBOLS[currency] ?? '$'
}

/** 1845 -> "$1,845"  |  45.5 -> "$45.50" */
export function money(amount, currency = 'USD') {
  const n = Number(amount) || 0
  const whole = n % 1 === 0
  return (
    symbolFor(currency) +
    n.toLocaleString('en-US', {
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: 2,
    })
  )
}

/** 95 -> "1h 35m"  |  40 -> "40m"  |  null -> null */
export function duration(minutes) {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m}m`
  return m ? `${h}h ${m}m` : `${h}h`
}

/** Accepts "90", "1h30", "1h 30m", "1:30" and returns minutes. */
export function parseDuration(input) {
  if (!input) return null
  const s = String(input).trim().toLowerCase()
  if (/^\d+$/.test(s)) return parseInt(s, 10)

  const colon = s.match(/^(\d+):(\d+)$/)
  if (colon) return parseInt(colon[1], 10) * 60 + parseInt(colon[2], 10)

  let total = 0
  const h = s.match(/(\d+)\s*h/)
  const m = s.match(/(\d+)\s*m/)
  if (h) total += parseInt(h[1], 10) * 60
  if (m) total += parseInt(m[1], 10)
  return total || null
}
