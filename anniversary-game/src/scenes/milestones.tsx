import React, { useEffect, useRef, useState } from 'react'
import { blabberQuestion, chapters } from '../data/relationshipData'
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

/* r2 — accept the flowers */
function FlowersGame({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  const full = n >= 3
  return (
    <>
      <div className="bouquet" aria-hidden="true">
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} className="bloom" style={{ transform: `rotate(${(i - 1) * 22}deg)` }} />
        ))}
        {n === 0 && <span className="meta" style={{ color: 'var(--cream-dim)' }}>NO FLOWERS YET</span>}
      </div>
      <XP label="GENTLEMAN RATING" value={Math.min(100, n * 34)} animate={false} />
      {!full ? (
        <button
          className="btn"
          style={{ marginTop: 20 }}
          onClick={() => {
            sfx.play('unlock')
            setN((x) => x + 1)
          }}
        >
          ACCEPT FLOWERS · DATE {n + 2}
        </button>
      ) : (
        <>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
            FLOWERS, MANNERS, CONSISTENCY. THE FULL PACKAGE.
          </p>
          <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
            CONFIRM GENTLEMAN STATUS
          </button>
        </>
      )}
    </>
  )
}

/* kk — the rain, and the first I love you */
function RainGame({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'talk' | 'rain' | 'stay' | 'said'>('talk')
  const [fb, setFb] = useState('')
  const dark = { borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' } as const

  return (
    <>
      {(phase === 'rain' || phase === 'stay' || phase === 'said') && <div className="rain" aria-hidden="true" />}

      {phase === 'talk' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 30 }}>
            <Figure who="p1" h={110} />
            <Figure who="p2" h={110} flip />
          </div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
            KK PARK. A BENCH. A CONVERSATION WITH NO INTENTION OF ENDING.
          </p>
          <button className="btn" style={{ marginTop: 16 }} onClick={() => { sfx.play('notify'); setPhase('rain') }}>
            THEN THE SKY OPENED
          </button>
        </>
      )}

      {phase === 'rain' && (
        <>
          <p className="meta" style={{ color: 'var(--cream-hi)', marginTop: 26 }}>
            IT STARTED RAINING.
            <br />
            EVERYONE IS LEAVING THE PARK.
          </p>
          <div className="choices">
            <button
              className="choice"
              style={dark}
              onClick={(e) => {
                sfx.play('wrong')
                const el = e.currentTarget
                el.classList.remove('shake')
                void el.offsetWidth
                el.classList.add('shake')
                setFb('HISTORICALLY IMPOSSIBLE.')
              }}
            >
              Leave. Obviously. It’s raining.
            </button>
            <button className="choice" style={dark} onClick={() => { sfx.play('unlock'); setFb(''); setPhase('stay') }}>
              Stay.
            </button>
          </div>
          <div className="feedback">{fb}</div>
        </>
      )}

      {phase === 'stay' && (
        <>
          <p className="narr" style={{ color: 'var(--cream-hi)', marginTop: 30 }}>
            The park emptied.
          </p>
          <p className="narr" style={{ color: 'var(--cream-hi)', marginTop: 8 }}>
            Two people did not notice.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 26 }}>
            <Figure who="p1" h={110} />
            <Figure who="p2" h={110} flip />
          </div>
          <button className="btn" style={{ marginTop: 16 }} onClick={() => { sfx.play('complete'); setPhase('said') }}>
            AND THEN HE SAID IT
          </button>
        </>
      )}

      {phase === 'said' && (
        <>
          <div className="goldpanel" style={{ marginTop: 30 }}>
            <div className="glow" aria-hidden="true" />
            <p className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', fontSize: 20 }}>
              “I love you.”
            </p>
            <p className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 12 }}>
              She hugged him in the rain and said it back.
            </p>
            <p className="narr" style={{ color: '#c8a97c', fontStyle: 'normal', marginTop: 12, fontSize: 14 }}>
              They danced. They played songs into the rain.
              <br />
              The weather never stood a chance.
            </p>
          </div>
          <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
            CHAI &amp; SAMOSAS ▸
          </button>
        </>
      )}
    </>
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
        <button
          className="choice"
          style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
          onClick={() => {
            sfx.play('complete')
            onDone()
          }}
        >
          Yes.
        </button>
        <button
          className="choice"
          style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
          onClick={() => {
            sfx.play('complete')
            onDone()
          }}
        >
          Obviously yes.
        </button>
        <button
          className="choice"
          style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
          onClick={() => {
            sfx.play('complete')
            onDone()
          }}
        >
          (There was only ever one answer.)
        </button>
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
  const slots = [
    '[PLACEHOLDER — everyday memory #1]',
    '[PLACEHOLDER — everyday memory #2]',
    '[PLACEHOLDER — everyday memory #3]',
  ]
  return (
    <>
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
          {i < open ? <P text={s} /> : 'TAP TO DEVELOP'}
        </button>
      ))}
      {open >= slots.length && (
        <button className="btn btn--ink" style={{ marginTop: 16 }} onClick={onDone}>
          THE ALBUM NEVER REALLY ENDS
        </button>
      )}
    </>
  )
}

/* r7 — meet the friends in Pune */
function FriendsGame({ onDone }: { onDone: () => void }) {
  const [met, setMet] = useState(0)
  const FRIENDS = ['FRIEND 01', 'FRIEND 02', 'FRIEND 03', 'FRIEND 04']
  return (
    <>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
        THE ORIGINAL PARTY MEMBERS. APPROVAL REQUIRED. ALLEGEDLY.
      </p>
      <div style={{ marginTop: 10 }}>
        {FRIENDS.map((f, i) => (
          <button
            key={f}
            className="exrow"
            onClick={() => {
              if (i === met) {
                sfx.play('unlock')
                setMet(met + 1)
              }
            }}
          >
            <span>{f}</span>
            <span className="v">{i < met ? 'APPROVED ✓' : i === met ? 'SAY HI' : '···'}</span>
          </button>
        ))}
      </div>
      {met >= FRIENDS.length && (
        <>
          <p className="meta" style={{ color: 'var(--amber)', marginTop: 18 }}>
            UNANIMOUS. IT WAS NEVER REALLY IN DOUBT.
          </p>
          <button className="btn btn--red" style={{ marginTop: 16 }} onClick={onDone}>
            SHE UNDERSTOOD WHAT THIS MEANT
          </button>
        </>
      )}
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
