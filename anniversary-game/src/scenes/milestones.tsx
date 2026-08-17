import React, { useEffect, useRef, useState } from 'react'
import { blabberQuestion, chapters, everydayMemories } from '../data/relationshipData'
import { Figure, HoldButton, P, PhotoRow, SNav, TEST, XP } from '../components/ui'
import { Person, SceneArt, SceneKind } from '../components/art'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'
import { Head, Narration, NextBtn } from './chapters'
import { ClueHunt, Platformer, Quiz, Runner } from './games'

/* Act II — nine milestone chapters, one component.
   Each `game` type gets its own small interaction; narration and
   stories come from relationshipData.ts.                          */

const ART_FOR: Record<string, SceneKind> = {
  order: 'parlour',
  flowers: 'street',
  rain: 'park',
  letter: 'parlour',
  hands: 'street',
  torch: 'bungalow',
  montage: 'wall',
  friends: 'lake',
  days: 'beach',
  distance: 'distance',
}
/* chapters whose art is light-toned need the pale scrim + dark text */
const LIGHT = new Set(['order', 'letter', 'montage', 'friends', 'days'])
/* who stands on stage */
const CAST_FOR: Record<string, ('p1' | 'p2')[]> = {
  order: ['p1', 'p2'],
  flowers: ['p1', 'p2'],
  rain: ['p1', 'p2'],
  letter: ['p1', 'p2'],
  hands: ['p1', 'p2'],
  torch: ['p1', 'p2'],
  montage: [],
  friends: ['p1', 'p2'],
  days: ['p1', 'p2'],
  distance: [],
}
const ACH_FOR: Record<string, string> = {
  rain: 'first-ily',
  letter: 'boyfriend-official',
  torch: 'first-kiss',
  friends: 'met-the-friends',
  days: 'goa-week',
  distance: 'long-distance',
}

export function Milestone({ id }: { id: string }) {
  const c = chapters.find((x) => x.id === id)!
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'play' | 'done'>('intro')
  const light = LIGHT.has(c.game!)
  const dark = !light
  const cast = CAST_FOR[c.game!] ?? []

  const finish = () => {
    sfx.play('complete')
    const ach = ACH_FOR[c.game!]
    if (ach) setTimeout(() => unlock(ach), 700)
    completeChapter(c.id)
    setStage('done')
  }

  return (
    <div className={'scene scene--vn' + (light ? ' scene--light' : '')}>
      <SceneArt kind={ART_FOR[c.game!]} />
      {cast.length > 0 && (
        <div className={'cast' + (cast.length > 1 ? ' cast--wide' : '')}>
          {cast.map((w, i) => (
            <Person key={w} who={w} h={w === 'p1' ? 152 : 146} flip={i > 0} />
          ))}
        </div>
      )}
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where={`CH. ${c.num}`} />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id={c.id} />
          <Narration lines={c.intro} dark={dark} />
          <button className={'btn' + (light ? ' btn--ink' : '')} style={{ marginTop: 16 }} onClick={() => setStage('play')}>
            {INTRO_BTN[c.game!]}
          </button>
        </div>

        <div className={'stage' + (stage === 'play' ? ' on' : '')}>
          {stage === 'play' && <Game kind={c.game!} onDone={finish} />}
        </div>

        <div className={'stage' + (stage === 'done' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <span className="stamp stamp--big" style={{ fontSize: 20 }}>
              {DONE_STAMP[c.game!]}
            </span>
          </div>
          <Narration lines={c.complete} dark={dark} />
          {c.sincere && (
            <div className="goldpanel">
              <div className="glow" aria-hidden="true" />
              {c.sincere.map((l, i) => (
                <p key={i} className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: i ? 8 : 0 }}>
                  <P text={l} />
                </p>
              ))}
            </div>
          )}
          {c.story && (
            <p className="narr" style={{ marginTop: 18, color: dark ? 'var(--cream-dim)' : 'var(--ink-dim)', fontSize: 14 }}>
              <P text={c.story} />
            </p>
          )}
          <PhotoRow photos={c.photos} />
          <NextBtn current={c.id} />
        </div>
      </div>
    </div>
  )
}

const INTRO_BTN: Record<string, string> = {
  order: 'SIT DOWN. ACT NORMAL.',
  flowers: 'ARRIVE AT THE DATE',
  rain: 'GO TO KK PARK',
  letter: 'HAND OVER THE LETTER',
  hands: 'WALK SIDE BY SIDE',
  torch: 'STEP INSIDE',
  montage: 'OPEN THE ALBUM',
  friends: 'ARRIVE IN PUNE',
  days: 'START THE TRIP',
  distance: 'OPEN THE MAP',
}
const DONE_STAMP: Record<string, string> = {
  order: 'ZERO AWKWARDNESS',
  flowers: 'GENTLEMAN: VERIFIED',
  rain: 'NOBODY MOVED',
  letter: 'OFFICIAL',
  hands: 'POLICY ADOPTED',
  torch: 'OFF THE MAP',
  montage: 'INSEPARABLE',
  friends: 'PARTY APPROVED',
  days: 'EXPEDITION COMPLETE',
  distance: 'GEOGRAPHY LOST',
}

function Game({ kind, onDone }: { kind: string; onDone: () => void }) {
  switch (kind) {
    case 'order':
      return <Quiz onDone={onDone} />
    case 'flowers':
      return <FlowersGame onDone={onDone} />
    case 'rain':
      return <RainGame onDone={onDone} />
    case 'letter':
      return <LetterGame onDone={onDone} />
    case 'hands':
      return <HandsGame onDone={onDone} />
    case 'torch':
      return <Platformer onDone={onDone} />
    case 'montage':
      return <MontageGame onDone={onDone} />
    case 'friends':
      return <FriendsGame onDone={onDone} />
    case 'days':
      return <DaysGame onDone={onDone} />
    default:
      return <DistanceGame onDone={onDone} />
  }
}

/* r1 — order the milkshakes, then KEEP THE VIBE.
   The needle drifts toward AWKWARD on its own (it's a first date).
   Tap FLIRT to push it back toward SMOOTH — but overdo it and you
   overshoot into TRYING TOO HARD. Hold the green zone to fill the
   vibe meter.                                                      */
function OrderGame({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'order' | 'vibe'>('order')
  const needle = useRef(50)
  const zoneTime = useRef(0)
  const [fb, setFb] = useState('')
  const [, force] = useState(0)
  const raf = useRef<number | null>(null)
  const won = useRef(false)
  const NEED = TEST ? 0.4 : 6 // seconds inside the zone

  useEffect(() => {
    if (phase !== 'vibe') return
    let last = performance.now()
    const tick = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      /* awkwardness creeps in, with nervous wobble */
      needle.current += dt * (9 + Math.random() * 8)
      needle.current = Math.max(0, Math.min(100, needle.current))
      const inZone = TEST || (needle.current >= 18 && needle.current <= 55)
      if (inZone) zoneTime.current += dt
      if (needle.current >= 97) {
        sfx.play('wrong')
        setFb('THE SILENCE GOT LOUD. RECOVER.')
        zoneTime.current = Math.max(0, zoneTime.current - 1.5)
        needle.current = 70
      }
      if (zoneTime.current >= NEED && !won.current) {
        won.current = true
        sfx.play('complete')
        setTimeout(onDone, 400)
        return
      }
      force((x) => x + 1)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [phase])

  const flirt = () => {
    if (won.current) return
    sfx.play('click')
    needle.current -= 16
    if (needle.current < 8) {
      sfx.play('wrong')
      setFb('TRYING TOO HARD. SHE NOTICED. SHE ALWAYS NOTICES.')
      zoneTime.current = Math.max(0, zoneTime.current - 1)
    } else {
      setFb('')
    }
  }

  if (phase === 'order') {
    return (
      <>
        <div className="menuboard">
          <div className="mb-hd">CHOCOLATE HEAVEN</div>
          <div className="mb-item">
            <span>FERRERO ROCHER MILKSHAKE</span>
            <span>× 2</span>
          </div>
        </div>
        <div className="shakes" aria-hidden="true">
          <div className="shake-glass" />
          <div className="shake-glass" />
        </div>
        <button className="btn btn--red" style={{ marginTop: 16 }} onClick={() => { sfx.play('notify'); setPhase('vibe') }}>
          NOW — KEEP THE VIBE
        </button>
      </>
    )
  }

  return (
    <>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
        FIRST DATES DRIFT AWKWARD ON THEIR OWN.
        <br />
        TAP FLIRT TO HOLD THE GREEN. DON’T OVERDO IT.
      </p>
      <div className="vibebar">
        <span className="vlbl">SMOOTH</span>
        <div className="track">
          <div className="green" />
          <div className="needle" style={{ left: `${needle.current}%` }} />
        </div>
        <span className="vlbl">AWKWARD</span>
      </div>
      <XP label="VIBE SECURED" value={Math.min(100, (zoneTime.current / NEED) * 100)} animate={false} />
      <button className="btn" style={{ marginTop: 16 }} onClick={flirt}>
        FLIRT · SMOOTHLY
      </button>
      <div className="feedback" style={{ color: 'var(--rose)' }}>
        {fb}
      </div>
    </>
  )
}

/* r2 — the gentleman era needs no game; the photographs make the case */
function FlowersGame({ onDone }: { onDone: () => void }) {
  return (
    <>
      <p className="narr" style={{ marginTop: 6 }}>
        Second date, third date, and whatnot. There were flowers more than once,
        which is a detail worth recording because it kept happening after the
        point where anybody would have been impressed by it.
      </p>
      <button className="btn" style={{ marginTop: 16 }} onClick={onDone}>
        CONFIRM GENTLEMAN STATUS
      </button>
    </>
  )
}

/* kk — told as a short story, one scene at a time */
function RainGame({ onDone }: { onDone: () => void }) {
  const c = chapters.find((x) => x.id === 'kk')!
  const scenes = c.scenes ?? []
  const [i, setI] = useState(0)
  const sc = scenes[i]
  const last = i >= scenes.length - 1

  const advance = () => {
    if (last) {
      sfx.play('complete')
      onDone()
      return
    }
    sfx.play('click')
    setI(i + 1)
  }

  return (
    <div className="storywrap">
      <div className="storyart" key={sc.art + i}>
        <ParkScene beat={sc.art} />
      </div>

      <div className="storytext" key={i}>
        {sc.line.map((l, k) => (
          <p key={k} style={{ animationDelay: `${0.15 + k * 0.35}s` }}>
            {l}
          </p>
        ))}
        {sc.say && (
          <div
            className={'saybubble ' + (sc.say.who === 'a' ? 'say--a' : 'say--t')}
            style={{ animationDelay: `${0.2 + sc.line.length * 0.35}s` }}
          >
            <span className="who">{sc.say.who === 'a' ? 'ANAY' : 'TANISHKA'}</span>
            “{sc.say.text}”
          </div>
        )}
      </div>

      <div className="storynav">
        <span className="dots">
          {scenes.map((_, k) => (
            <i key={k} className={k <= i ? 'on' : ''} />
          ))}
        </span>
        <button className="btn btn--red" onClick={advance}>
          {last ? 'STAY A LITTLE LONGER ▸' : 'GO ON ▸'}
        </button>
      </div>
    </div>
  )
}

/* real rain, on canvas: layered drops with depth, wind and splashes */
function RainCanvas({ intensity }: { intensity: number }) {
  const cv = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const c = cv.current
    if (!c) return
    const ctx = c.getContext('2d')!
    let raf = 0
    let W = 0
    let H = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const r = c.getBoundingClientRect()
      W = r.width
      H = r.height
      c.width = W * dpr
      c.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)

    type Drop = { x: number; y: number; len: number; sp: number; a: number; w: number }
    const N = Math.round(150 * intensity)
    const drops: Drop[] = Array.from({ length: N }, () => {
      const depth = Math.random()
      return {
        x: Math.random() * (W + 120) - 60,
        y: Math.random() * H,
        len: 8 + depth * 26,
        sp: 5 + depth * 13,
        a: 0.12 + depth * 0.4,
        w: 0.6 + depth * 1.1,
      }
    })
    const splashes: { x: number; y: number; r: number; a: number }[] = []
    const WIND = 0.28

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.lineCap = 'round'
      for (const d of drops) {
        ctx.strokeStyle = `rgba(198,222,255,${d.a})`
        ctx.lineWidth = d.w
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.len * WIND, d.y + d.len)
        ctx.stroke()
        d.y += d.sp
        d.x -= d.sp * WIND
        if (d.y > H) {
          if (splashes.length < 40 && Math.random() < 0.35) {
            splashes.push({ x: d.x, y: H - 2 - Math.random() * 6, r: 0.5, a: 0.35 * intensity })
          }
          d.y = -d.len
          d.x = Math.random() * (W + 120) - 30
        }
      }
      for (let k = splashes.length - 1; k >= 0; k--) {
        const sp = splashes[k]
        ctx.strokeStyle = `rgba(210,232,255,${sp.a})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(sp.x, sp.y, sp.r * 3.4, sp.r, 0, 0, Math.PI * 2)
        ctx.stroke()
        sp.r += 0.5
        sp.a -= 0.028
        if (sp.a <= 0) splashes.splice(k, 1)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [intensity])

  return <canvas ref={cv} className="raincv" aria-hidden="true" />
}

/* the park, drawn per story beat — layered depth, warm lamp, wet ground */
function ParkScene({ beat }: { beat: string }) {
  const wet = beat === 'firstdrop' || beat === 'rain' || beat === 'hug' || beat === 'dance'
  const dusk = beat === 'bench' || beat === 'talking'
  const intensity = beat === 'firstdrop' ? 0.35 : beat === 'chai' ? 0 : wet ? 1 : 0

  return (
    <div className={'parkscene' + (wet ? ' wet' : '')}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pkSky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={dusk ? '#7E6A8C' : '#2C3A44'} />
            <stop offset=".45" stopColor={dusk ? '#C98A5E' : '#3B4A52'} />
            <stop offset="1" stopColor={dusk ? '#E0A96B' : '#4A5A5E'} />
          </linearGradient>
          <linearGradient id="pkGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={dusk ? '#3E4A32' : '#26332B'} />
            <stop offset="1" stopColor={dusk ? '#2A3324' : '#18211B'} />
          </linearGradient>
          <radialGradient id="lampGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#FFE6A8" stopOpacity=".55" />
            <stop offset="1" stopColor="#FFE6A8" stopOpacity="0" />
          </radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="2.2" /></filter>
        </defs>

        <rect width="400" height="240" fill="url(#pkSky2)" />

        {/* far treeline, soft */}
        <g filter="url(#soft)" opacity={dusk ? 0.85 : 0.7}>
          <ellipse cx="40" cy="96" rx="90" ry="44" fill={dusk ? '#3A4A34' : '#1E2C24'} />
          <ellipse cx="150" cy="84" rx="80" ry="40" fill={dusk ? '#35452F' : '#1B2921'} />
          <ellipse cx="270" cy="90" rx="86" ry="42" fill={dusk ? '#3A4A34' : '#1E2C24'} />
          <ellipse cx="378" cy="86" rx="76" ry="40" fill={dusk ? '#35452F' : '#1B2921'} />
        </g>

        {/* mid canopy */}
        <g fill={dusk ? '#2C3B26' : '#16221B'}>
          <ellipse cx="24" cy="52" rx="96" ry="52" />
          <ellipse cx="196" cy="30" rx="112" ry="46" />
          <ellipse cx="372" cy="50" rx="94" ry="52" />
        </g>
        {/* leaf detail */}
        <g fill={dusk ? '#3D5133' : '#1E2E24'} opacity=".9">
          <ellipse cx="86" cy="66" rx="46" ry="24" />
          <ellipse cx="300" cy="70" rx="50" ry="26" />
        </g>

        {/* trunks with taper */}
        <path d="M62 76 q5 60 -2 116 h14 q-6 -58 -1 -116 z" fill="#2A1E14" />
        <path d="M330 82 q-5 56 1 110 h13 q-6 -54 -1 -110 z" fill="#2A1E14" />

        {/* path */}
        <path d="M0 214 q120 -26 200 -24 t200 20 v30 H0 z" fill={dusk ? '#6B5B44' : '#3A3730'} />

        {/* lamp with warm pool of light */}
        <circle cx="200" cy="96" r="54" fill="url(#lampGlow)" />
        <rect x="197" y="96" width="5" height="98" fill="#22301F" />
        <path d="M188 96 h24 l-6 -13 h-12 z" fill="#2E3C2A" />
        <circle cx="200" cy="100" r="6.5" fill="#FFE9B0" />
        <circle cx="200" cy="100" r="13" fill="#FFE9B0" opacity=".28" filter="url(#soft)" />

        {/* the bench, with a missing slat */}
        <g>
          <rect x="120" y="168" width="160" height="7" rx="3" fill="#4A3A28" />
          <rect x="120" y="180" width="160" height="7" rx="3" fill="#4A3A28" />
          <rect x="120" y="156" width="72" height="7" rx="3" fill="#4A3A28" />
          <rect x="222" y="156" width="58" height="7" rx="3" fill="#4A3A28" />
          <rect x="128" y="187" width="8" height="22" fill="#2E2418" />
          <rect x="264" y="187" width="8" height="22" fill="#2E2418" />
        </g>

        <rect y="196" width="400" height="44" fill="url(#pkGround)" />

        {/* wet sheen + lamp reflection once it rains */}
        {wet && (
          <>
            <ellipse cx="200" cy="222" rx="120" ry="14" fill="#FFE9B0" opacity=".12" filter="url(#soft)" />
            <ellipse cx="200" cy="232" rx="170" ry="10" fill="#C6DEFF" opacity=".07" />
          </>
        )}
        {/* vignette */}
        <rect width="400" height="240" fill="url(#pkVig)" />
        <defs>
          <radialGradient id="pkVig" cx=".5" cy=".5" r=".75">
            <stop offset=".55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".45" />
          </radialGradient>
        </defs>
      </svg>

      <div className={'parkcast beat-' + beat}>
        <Person who="p1" h={104} />
        <Person who="p2" h={100} flip />
      </div>

      {intensity > 0 && <RainCanvas intensity={intensity} />}
    </div>
  )
}

/* r3 — the Blabber letter, with the real poem */
function LetterGame({ onDone }: { onDone: () => void }) {
  const [fb, setFb] = useState('')
  const poem = chapters.find((c) => c.id === 'r3')!.poem ?? []
  return (
    <>
      <div className="paper" style={{ marginTop: 10 }}>
        {poem.map((stanza, i) => (
          <p
            key={i}
            style={{ fontFamily: 'var(--hand)', fontSize: 20, lineHeight: 1.55, whiteSpace: 'pre-line', marginTop: i ? 16 : 0 }}
          >
            <P text={stanza} />
          </p>
        ))}
        <p style={{ fontFamily: 'var(--hand)', fontSize: 24, marginTop: 22, fontWeight: 600 }}>
          {blabberQuestion}?
        </p>
      </div>
      <p className="meta" style={{ color: 'rgba(245,231,200,.6)', marginTop: 18 }}>
        PLAY AS ANAY. CHOOSE CAREFULLY.
      </p>
      <div className="choices">
        {['Yes.', 'Obviously yes.', '(There was only ever one answer.)'].map((label) => (
          <button
            key={label}
            className="choice"
            onClick={() => {
              sfx.play('complete')
              onDone()
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="feedback">{fb}</div>
    </>
  )
}

/* r4 — hold hands */
function HandsGame({ onDone }: { onDone: () => void }) {
  const [held, setHeld] = useState(false)
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: held ? 2 : 30, marginTop: 30, transition: 'gap .6s' }}>
        <Figure who="p1" h={120} />
        <Figure who="p2" h={120} flip />
      </div>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
        {held ? 'HANDS: HELD. NOBODY IS LETTING GO.' : 'PROXIMITY: CLOSE. HANDS: UNDECIDED.'}
      </p>
      {!held ? (
        <HoldButton
          label="HOLD"
          ms={1800}
          className="btn holdbtn"
          onDone={() => {
            sfx.play('unlock')
            setHeld(true)
          }}
        />
      ) : (
        <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
          MAKE IT PERMANENT
        </button>
      )}
    </>
  )
}

/* r5 — explore Vasant Kunj with a torch */
function TorchGame({ onDone }: { onDone: () => void }) {
  const [found, setFound] = useState<number[]>([])
  const spots = [
    { x: 18, y: 24, label: 'AN OLD STAIRCASE' },
    { x: 66, y: 46, label: 'A ROOM WITH NO ROOF' },
    { x: 38, y: 74, label: 'A QUIET CORNER' },
  ]
  const all = found.length === spots.length
  return (
    <>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
        VASANT KUNJ · ABANDONED, ALLEGEDLY EMPTY
        <br />
        TAP THE DARK TO EXPLORE.
      </p>
      <div className="vkhouse">
        {spots.map((s, i) => (
          <button
            key={i}
            className={'vkspot' + (found.includes(i) ? ' lit' : '')}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onClick={() => {
              if (found.includes(i)) return
              sfx.play('notify')
              setFound((f) => [...f, i])
            }}
            aria-label={found.includes(i) ? s.label : 'Unexplored spot'}
          >
            {found.includes(i) ? s.label : '·'}
          </button>
        ))}
      </div>
      {all && (
        <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
          AND IN THE QUIET CORNER —
        </button>
      )}
    </>
  )
}

/* r6 — inseparable montage */
function MontageGame({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(0)
  const slots = everydayMemories
  return (
    <>
      <div className="devrow">
        {slots.map((s, i) => (
          <button
            key={i}
            className={'polaroid' + (i < open ? ' open' : '')}
            onClick={() => {
              if (i === open) {
                sfx.play('click')
                setOpen(open + 1)
              }
            }}
            disabled={i > open}
          >
            <span className="dev">
              <img src={s.src} alt="" loading="lazy" />
            </span>
            <span className="cap">{i < open ? <P text={s.text} /> : 'TAP TO DEVELOP'}</span>
          </button>
        ))}
      </div>
      {open >= slots.length && (
        <button className="btn btn--ink" style={{ marginTop: 16 }} onClick={onDone}>
          THE ALBUM NEVER REALLY ENDS
        </button>
      )}
    </>
  )
}

/* r7 — Pune: no roll call, just the fact of it */
function FriendsGame({ onDone }: { onDone: () => void }) {
  return (
    <>
      <p className="narr" style={{ marginTop: 6 }}>
        He took her to Pune to meet his friends — Saurvi, Anuj, Khush and
        Pranjal. The originals, the ones who knew him before any of this. That
        is not a small thing. You do not bring someone to those people unless
        you have already decided something.
      </p>
      <p className="meta" style={{ marginTop: 14, textAlign: 'left' }}>
        THEY APPROVED. IT WAS NEVER REALLY IN DOUBT.
      </p>
      <button className="btn btn--ink" style={{ marginTop: 16 }} onClick={onDone}>
        SHE UNDERSTOOD WHAT THIS MEANT
      </button>
    </>
  )
}

/* r8 — Goa needs no minigame. Seven days speak for themselves. */
function DaysGame({ onDone }: { onDone: () => void }) {
  return (
    <>
      <p className="narr" style={{ marginTop: 10 }}>
        Seven days. One rented stretch of coast. A group of friends who will
        never quite tell this story the same way twice.
      </p>
      <p className="meta" style={{ color: 'var(--ink-dim)', marginTop: 14, textAlign: 'left' }}>
        MEMORY COUNT: UNRECORDABLE. CLOSENESS: RECORD HIGH.
      </p>
      <button className="btn btn--ink" style={{ marginTop: 16 }} onClick={onDone}>
        COME BACK CLOSER
      </button>
    </>
  )
}

/* r9 — long distance */
function DistanceGame({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 400)
    return () => clearTimeout(t)
  }, [])
  return (
    <>
      <div style={{ marginTop: 20 }}>
        <XP label="DISTANCE" value={shown ? 100 : 0} />
        <XP label="CONNECTION" value={shown ? 100 : 0} rose />
      </div>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
        BOTH BARS FULL. ONLY ONE OF THEM MATTERED.
      </p>
      <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
        OUTLAST GEOGRAPHY
      </button>
    </>
  )
}
