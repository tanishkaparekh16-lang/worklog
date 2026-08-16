import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PLACEHOLDER_PREFIX } from '../data/relationshipData'
import { useGame } from '../state/progress'

/* text that renders with a dashed marker while still a placeholder */
export function P({ text }: { text: string }) {
  if (text.startsWith(PLACEHOLDER_PREFIX)) {
    return <span className="placeholder">{text}</span>
  }
  return <>{text}</>
}

/* photo that shows a labeled slot until the real file is added */
export function ImgSlot({ src, caption }: { src: string; caption: string }) {
  const [ok, setOk] = useState(true)
  return (
    <figure className="photoslot">
      {ok ? (
        <img src={src} alt={caption} loading="lazy" onError={() => setOk(false)} />
      ) : (
        <div className="missing">
          ADD PHOTO
          <br />
          {src.split('/').pop()}
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export function PhotoRow({ photos }: { photos?: { src: string; caption: string }[] }) {
  if (!photos || photos.length === 0) return null
  return (
    <div className="photorow">
      {photos.map((p) => (
        <ImgSlot key={p.src} src={p.src} caption={p.caption} />
      ))}
    </div>
  )
}

export function Grain() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vig" aria-hidden="true" />
    </>
  )
}

export function SNav({ back = 'menu', label, where }: { back?: string; label?: string; where: string }) {
  const { go } = useGame()
  return (
    <div className="snav">
      <button onClick={() => go(back)}>{label ?? '← MENU'}</button>
      <span className="where">{where}</span>
    </div>
  )
}

export function Toast() {
  const { toast } = useGame()
  return (
    <div className={'toast' + (toast ? ' on' : '')} role="status" aria-live="polite">
      <div className="lab">
        <div className="t1">{toast?.kind === 'achievement' ? 'ACHIEVEMENT UNLOCKED' : 'NOTICE'}</div>
        <div className="t2">{toast?.title ?? ''}</div>
      </div>
    </div>
  )
}

export function XP({
  label,
  value,
  ink,
  rose,
  animate = true,
}: {
  label: string
  value: number
  ink?: boolean
  rose?: boolean
  animate?: boolean
}) {
  const [w, setW] = useState(animate ? 0 : value)
  useEffect(() => {
    const t = setTimeout(() => setW(value), 250)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="statrow">
      <div className="lbl">{label}</div>
      <div className={'xbar' + (ink ? ' xbar--ink' : '') + (rose ? ' xbar--rose' : '')}>
        <i style={{ width: `${w}%` }} />
      </div>
    </div>
  )
}

/* ---------- faceless character figures ----------
   Deliberately simple: no faces, no invented likeness.
   P1 (Anay)   — navy jacket, amber scarf line, slightly taller.
   P2 (Tanishka) — burgundy/rose outfit.
   Swap details easily here once real photos arrive.            */
export function Figure({
  who,
  h = 120,
  flip = false,
}: {
  who: 'p1' | 'p2'
  h?: number
  flip?: boolean
}) {
  const p1 = who === 'p1'
  const skin = '#D9B48A'
  const a = p1 ? '#22304E' : '#7E2B35' // body
  const b = p1 ? '#E8A33D' : '#C98A93' // accent
  const hair = '#241B14'
  const ratio = p1 ? 1 : 0.94
  const H = h * ratio
  return (
    <svg
      className="figure"
      width={H * 0.45}
      height={H}
      viewBox="0 0 45 100"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      {/* hair + head, no face */}
      <circle cx="22.5" cy="14" r="10" fill={skin} />
      {p1 ? (
        <path d="M12.5 12 a10 10 0 0 1 20 0 l0 -3 a10 8 0 0 0 -20 0 z" fill={hair} />
      ) : (
        <path d="M12.5 13 a10 10 0 0 1 20 0 l1.5 14 a3 3 0 0 1 -5 1 l-1 -8 l-11 0 l-1 8 a3 3 0 0 1 -5 -1 z" fill={hair} />
      )}
      {/* body */}
      <rect x="10" y="26" width="25" height="38" rx="9" fill={a} />
      {/* accent: scarf / dupatta line */}
      <rect x="10" y="30" width="25" height="4.5" rx="2" fill={b} opacity="0.9" />
      {/* arms */}
      <rect x="5" y="29" width="7" height="28" rx="3.5" fill={a} />
      <rect x="33" y="29" width="7" height="28" rx="3.5" fill={a} />
      {/* legs */}
      <rect x="13" y="62" width="8" height="30" rx="4" fill={p1 ? '#1A2236' : '#3A2430'} />
      <rect x="24" y="62" width="8" height="30" rx="4" fill={p1 ? '#1A2236' : '#3A2430'} />
      {/* shoes */}
      <rect x="11.5" y="90" width="11" height="6" rx="3" fill={hair} />
      <rect x="22.5" y="90" width="11" height="6" rx="3" fill={hair} />
    </svg>
  )
}

/* ---------- full-bleed scene backgrounds ---------- */

export function CityBg() {
  return (
    <div className="bgfix" aria-hidden="true">
      <svg viewBox="0 0 430 760" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#100C22" />
            <stop offset=".4" stopColor="#33204A" />
            <stop offset=".66" stopColor="#7E3A34" />
            <stop offset=".84" stopColor="#C86A32" />
            <stop offset="1" stopColor="#E8933C" />
          </linearGradient>
          <pattern id="win" width="11" height="15" patternUnits="userSpaceOnUse">
            <rect width="11" height="15" fill="#0C0913" />
            <rect x="3" y="4" width="4.5" height="5.5" fill="#F2B45C" opacity=".8" />
          </pattern>
          <pattern id="win2" width="13" height="17" patternUnits="userSpaceOnUse">
            <rect width="13" height="17" fill="#0C0913" />
            <rect x="3.5" y="4.5" width="5" height="6" fill="#E8A33D" opacity=".4" />
          </pattern>
        </defs>
        <rect width="430" height="760" fill="url(#sky)" />
        <circle cx="325" cy="600" r="80" fill="#F5C97B" opacity=".22" />
        <rect x="-10" y="470" width="72" height="290" fill="url(#win2)" />
        <rect x="72" y="415" width="56" height="345" fill="#0C0913" />
        <rect x="138" y="505" width="62" height="255" fill="url(#win2)" />
        <rect x="150" y="360" width="4" height="145" fill="#0C0913" />
        <rect x="210" y="385" width="50" height="375" fill="#0C0913" />
        <rect x="268" y="478" width="68" height="282" fill="url(#win2)" />
        <rect x="344" y="438" width="56" height="322" fill="#0C0913" />
        <rect x="402" y="498" width="45" height="262" fill="url(#win2)" />
        <rect x="20" y="560" width="82" height="200" fill="url(#win)" />
        <rect x="122" y="598" width="68" height="162" fill="url(#win)" />
        <rect x="235" y="578" width="78" height="182" fill="url(#win)" />
        <rect x="335" y="618" width="72" height="142" fill="url(#win)" />
      </svg>
      <div className="cityfade" />
    </div>
  )
}

export function SpaceBg({ planet = true }: { planet?: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, () => ({
        x: Math.random() * 430,
        y: Math.random() * 700,
        r: Math.random() * 0.9 + 0.5,
        o: Math.random() * 0.55 + 0.2,
      })),
    [],
  )
  return (
    <div className="bgfix" aria-hidden="true">
      <svg viewBox="0 0 430 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="pg" cx=".38" cy=".32" r="1">
            <stop offset="0" stopColor="#EFD9AC" />
            <stop offset=".55" stopColor="#D0A868" />
            <stop offset="1" stopColor="#8F6A38" />
          </radialGradient>
        </defs>
        <rect width="430" height="760" fill="#0E1020" />
        <g fill="#EDE3C8">
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
          ))}
        </g>
        {planet && (
          <g transform="rotate(-16 330 130)">
            <ellipse cx="330" cy="130" rx="150" ry="38" fill="none" stroke="#D8C49A" strokeWidth="9" opacity=".28" />
            <circle cx="330" cy="130" r="82" fill="url(#pg)" opacity=".9" />
            <ellipse cx="330" cy="130" rx="128" ry="30" fill="none" stroke="#D8C49A" strokeWidth="5" opacity=".55" />
            <ellipse cx="330" cy="130" rx="108" ry="24" fill="none" stroke="#B89A6C" strokeWidth="2.5" opacity=".5" />
          </g>
        )}
      </svg>
    </div>
  )
}

/* passing scenery inside the train window */
export function TrainScenery() {
  return (
    <svg viewBox="0 0 430 150" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <rect x="10" y="70" width="40" height="80" fill="#160D20" />
      <rect x="60" y="50" width="30" height="100" fill="#1E1128" />
      <rect x="105" y="85" width="46" height="65" fill="#160D20" />
      <rect x="165" y="60" width="34" height="90" fill="#1E1128" />
      <rect x="212" y="78" width="42" height="72" fill="#160D20" />
      <rect x="270" y="52" width="30" height="98" fill="#1E1128" />
      <rect x="312" y="88" width="48" height="62" fill="#160D20" />
      <rect x="372" y="66" width="36" height="84" fill="#1E1128" />
      <g fill="#F2B45C" opacity=".65">
        <rect x="66" y="60" width="5" height="6" />
        <rect x="78" y="74" width="5" height="6" />
        <rect x="172" y="70" width="5" height="6" />
        <rect x="184" y="92" width="5" height="6" />
        <rect x="276" y="62" width="5" height="6" />
        <rect x="222" y="90" width="5" height="6" />
        <rect x="320" y="98" width="5" height="6" />
        <rect x="380" y="78" width="5" height="6" />
      </g>
      <rect x="0" y="146" width="430" height="4" fill="#0C0913" />
    </svg>
  )
}

/* press & hold button that fills, then fires */
export function HoldButton({
  label,
  ms = 1600,
  onDone,
  className = 'btn btn--red holdbtn',
}: {
  label: string
  ms?: number
  onDone: () => void
  className?: string
}) {
  const [fill, setFill] = useState(0)
  const raf = useRef<number | null>(null)
  const start = useRef(0)
  const done = useRef(false)

  const stop = () => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = null
    if (!done.current) setFill(0)
  }
  const tick = (t: number) => {
    const p = Math.min(1, (t - start.current) / ms)
    setFill(p * 100)
    if (p >= 1) {
      if (!done.current) {
        done.current = true
        onDone()
      }
      return
    }
    raf.current = requestAnimationFrame(tick)
  }
  const begin = () => {
    if (done.current) return
    start.current = performance.now()
    raf.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => stop(), [])

  return (
    <button
      className={className}
      onPointerDown={begin}
      onPointerUp={stop}
      onPointerLeave={stop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (!done.current) {
            done.current = true
            onDone()
          }
        }
      }}
    >
      <span className="fill" style={{ width: `${fill}%` }} aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
