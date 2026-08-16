import React, { useEffect, useState } from 'react'
import { blabberQuestion, chapters } from '../data/relationshipData'
import { Figure, HoldButton, P, SNav, XP } from '../components/ui'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'
import { Head, Narration, NextBtn } from './chapters'

/* Act II — nine milestone chapters, one component.
   Each `game` type gets its own small interaction; narration and
   stories come from relationshipData.ts.                          */

const SCENE_FOR: Record<string, string> = {
  order: 'scene--ost',
  flowers: 'scene--dinner',
  letter: 'scene--letter',
  hands: 'scene--duo',
  torch: 'scene--vk',
  montage: 'scene--paper',
  friends: 'scene--finanza',
  days: 'scene--goa',
  distance: 'scene--split',
}
const ACH_FOR: Record<string, string> = {
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
  const onPaper = c.game === 'montage'
  const dark = !onPaper

  const finish = () => {
    sfx.play('complete')
    const ach = ACH_FOR[c.game!]
    if (ach) setTimeout(() => unlock(ach), 700)
    completeChapter(c.id)
    setStage('done')
  }

  return (
    <div className={'scene ' + SCENE_FOR[c.game!]}>
      {c.game === 'order' && <div className="beams" aria-hidden="true" />}
      {c.game === 'flowers' && <div className="lights" aria-hidden="true" />}
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where={`CH. ${c.num}`} />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id={c.id} dark={dark} />
          <Narration lines={c.intro} dark={dark} />
          <button className={'btn' + (onPaper ? ' btn--ink' : '')} style={{ marginTop: 'auto' }} onClick={() => setStage('play')}>
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
          <div style={{ marginTop: 'auto' }} />
          <NextBtn current={c.id} />
        </div>
      </div>
    </div>
  )
}

const INTRO_BTN: Record<string, string> = {
  order: 'SIT DOWN. ACT NORMAL.',
  flowers: 'ARRIVE AT THE DATE',
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
      return <OrderGame onDone={onDone} />
    case 'flowers':
      return <FlowersGame onDone={onDone} />
    case 'letter':
      return <LetterGame onDone={onDone} />
    case 'hands':
      return <HandsGame onDone={onDone} />
    case 'torch':
      return <TorchGame onDone={onDone} />
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

/* r1 — order the milkshakes */
function OrderGame({ onDone }: { onDone: () => void }) {
  const [ordered, setOrdered] = useState(false)
  return (
    <>
      <div className="menuboard">
        <div className="mb-hd">CHOCOLATE HEAVEN</div>
        <div className="mb-item">
          <span>FERRERO ROCHER MILKSHAKE</span>
          <span>× 2</span>
        </div>
      </div>
      {ordered && (
        <div className="shakes" aria-hidden="true">
          <div className="shake-glass" />
          <div className="shake-glass" />
        </div>
      )}
      {ordered && <XP label="AWKWARDNESS LEVEL" value={2} />}
      {ordered && (
        <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 10 }}>
          MEASUREMENT COMPLETE. STATISTICALLY IMPOSSIBLE FOR A FIRST DATE.
        </p>
      )}
      {!ordered ? (
        <button
          className="btn"
          style={{ marginTop: 20 }}
          onClick={() => {
            sfx.play('notify')
            setOrdered(true)
          }}
        >
          ORDER THE USUAL. THERE IS NO USUAL YET.
        </button>
      ) : (
        <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
          LET THE FLIRTING COMMENCE
        </button>
      )}
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
          <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
            CONFIRM GENTLEMAN STATUS
          </button>
        </>
      )}
    </>
  )
}

/* r3 — the Blabber letter */
function LetterGame({ onDone }: { onDone: () => void }) {
  const [fb, setFb] = useState('')
  return (
    <>
      <div className="paper" style={{ marginTop: 10 }}>
        <p style={{ fontFamily: 'var(--hand)', fontSize: 21, lineHeight: 1.6 }}>
          <P text="[PLACEHOLDER — the actual poem Tanishka wrote goes here, line by line]" />
        </p>
        <p style={{ fontFamily: 'var(--hand)', fontSize: 24, marginTop: 18, fontWeight: 600 }}>
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
        <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
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
        <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
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
        <button className="btn btn--ink" style={{ marginTop: 'auto' }} onClick={onDone}>
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
          <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
            SHE UNDERSTOOD WHAT THIS MEANT
          </button>
        </>
      )}
    </>
  )
}

/* r8 — seven days of Goa */
function DaysGame({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0)
  return (
    <>
      <p className="meta" style={{ color: 'var(--cream-hi)', marginTop: 14 }}>
        SEVEN DAYS. TAP THROUGH THEM.
      </p>
      <div className="daychips">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i}
            className={'daychip' + (i < done ? ' spent' : '')}
            onClick={() => {
              if (i === done) {
                sfx.play('click')
                setDone(done + 1)
              }
            }}
          >
            {i < done ? '✓' : `DAY ${i + 1}`}
          </button>
        ))}
      </div>
      {done >= 7 && (
        <>
          <p className="meta" style={{ color: 'var(--cream-hi)', marginTop: 18 }}>
            MEMORY COUNT: UNRECORDABLE. CLOSENESS: RECORD HIGH.
          </p>
          <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
            COME BACK CLOSER
          </button>
        </>
      )}
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
      <button className="btn btn--red" style={{ marginTop: 'auto' }} onClick={onDone}>
        OUTLAST GEOGRAPHY
      </button>
    </>
  )
}
