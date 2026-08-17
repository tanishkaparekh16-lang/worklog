import React, { useEffect, useRef, useState } from 'react'
import {
  apologyEmail,
  cafeText,
  chapters,
  dinnerAnswer,
  dinnerQuestion,
  players,
} from '../data/relationshipData'
import { Figure, HoldButton, P, PhotoRow, SNav, TEST, TrainScenery, XP } from '../components/ui'
import { Person, SceneArt } from '../components/art'
import { ClueHunt, Runner } from './games'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'

const ch = (id: string) => chapters.find((c) => c.id === id)!

export function Head({ id }: { id: string; dark?: boolean }) {
  const c = ch(id)
  return (
    <>
      <div className="chcard">
        <span className="n">CH {c.num}</span>
        <span className="yr">{c.year}</span>
      </div>
      <h2 className="chttl">{c.title}</h2>
      <div className="chplace">{c.place}</div>
      <div className="chrule" />
    </>
  )
}

/* colour comes from the panel (.scene--light vs dark), never inline —
   inline colours were the cause of cream-on-cream text. */
export function Narration({ lines }: { lines: readonly string[]; dark?: boolean }) {
  return (
    <div style={{ marginTop: 18 }}>
      {lines.map((l, i) => (
        <p key={i} className="narr" style={{ marginTop: i ? 8 : 0 }}>
          <P text={l} />
        </p>
      ))}
    </div>
  )
}

export function NextBtn({ current }: { current: string }) {
  const { go } = useGame()
  const i = chapters.findIndex((c) => c.id === current)
  const cur = chapters[i]
  const next = chapters[i + 1]
  const label = !next
    ? 'FINAL LEVEL ▸'
    : next.act === 2 && cur.act === 1
      ? 'ACT II: THE RELATIONSHIP ARC ▸'
      : `CHAPTER ${next.num} ▸`
  return (
    <button className="btn btn--red" style={{ marginTop: 18 }} onClick={() => go(next ? next.id : 'final')}>
      {label}
    </button>
  )
}

export function Prose({ lines }: { lines?: string[] }) {
  if (!lines || !lines.length) return null
  return (
    <div className="prose">
      {lines.map((l, i) => (
        <p key={i} style={{ animationDelay: `${0.12 * i}s` }}>
          <P text={l} />
        </p>
      ))}
    </div>
  )
}

export function shakeWrong(e: React.MouseEvent<HTMLButtonElement>) {
  sfx.play('wrong')
  const el = e.currentTarget
  el.classList.remove('shake')
  void el.offsetWidth
  el.classList.add('shake')
}

/* ================= CHAPTER 01 — THE CAFÉ INCIDENT ================= */
export function Ch1() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'q' | 'done'>('intro')
  const [fb, setFb] = useState('')
  const c = ch('ch1')

  return (
    <div className="scene scene--vn scene--light">
      <SceneArt kind="cafe" />
      <div className="cast">
        <Person who="p1" h={168} />
      </div>
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 01" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch1" />
          <Narration lines={c.intro} />
          <div className="qbox" style={{ marginTop: 16 }}>
            <div className="who">OBJECTIVE</div>
            <p className="line" style={{ fontFamily: 'var(--type)', fontSize: 13 }}>
              Send the first text in recorded history.
              <br />
              DIFFICULTY: Deceptively low.
            </p>
          </div>
          <button className="btn btn--red" style={{ marginTop: 16 }} onClick={() => setStage('q')}>
            ✦ BEGIN QUEST ✦
          </button>
        </div>

        <div className={'stage' + (stage === 'q' ? ' on' : '')}>
          <div className="qbox">
            <div className="who">29 AUGUST 2023 · A PHONE</div>
            <p className="line">Anay is typing. Select the historically documented first text.</p>
          </div>
          <div className="choices">
            <button
              className="choice"
              onClick={(e) => {
                shakeWrong(e)
                setFb('HISTORICALLY INACCURATE.')
              }}
            >
              “hi”
            </button>
            <button
              className="choice"
              onClick={() => {
                sfx.play('complete')
                setFb('')
                setStage('done')
                completeChapter('ch1')
                setTimeout(() => unlock('first-message'), 600)
              }}
            >
              “{cafeText}”
            </button>
            <button
              className="choice"
              onClick={(e) => {
                shakeWrong(e)
                setFb('BOLD. FICTIONAL, BUT BOLD.')
              }}
            >
              “good morning, I have compiled some thoughts about you”
            </button>
          </div>
          <div className="feedback">{fb}</div>
        </div>

        <div className={'stage' + (stage === 'done' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <span className="stamp stamp--big">QUEST COMPLETE</span>
          </div>
          <Narration lines={c.complete} />
          <PhotoRow photos={c.photos} />
          <p className="meta" style={{ marginTop: 16 }}>
            {c.completeNote.toUpperCase()}
          </p>
                    <NextBtn current="ch1" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 02 — ONLINE FRIENDSHIP, OFFLINE NPC ============
   No fail state. You run the same conversation in both modes and
   watch one of them work.                                        */
export function Ch2() {
  const { completeChapter } = useGame()
  const [stage, setStage] = useState<'intro' | 'play' | 'done'>('intro')
  const [sent, setSent] = useState(0)
  const [rl, setRl] = useState(0)
  const c = ch('ch2')

  const online = [
    ['a', 'so about those cafes'],
    ['t', 'i have a list. it is long.'],
    ['a', 'how long is long'],
    ['t', 'you will be busy till december'],
    ['a', 'perfect'],
    ['t', 'you havent been to a single one'],
    ['a', 'i am building anticipation'],
    ['t', 'unbelievable'],
  ]
  const offline = [
    'ATTEMPT LOGGED. NO WORDS WERE PRODUCED.',
    'A NOD OCCURRED. HISTORIANS REMAIN DIVIDED.',
    'EYE CONTACT MADE, THEN IMMEDIATELY WITHDRAWN.',
    'CONVERSATION POSTPONED. AGAIN.',
  ]
  const ready = sent >= 2 && rl >= 1

  return (
    <div className="scene scene--vn scene--light">
      <SceneArt kind="classroom" />
      {stage === 'intro' && (
        <div className="cast cast--wide">
          <Person who="p1" h={150} />
          <Person who="p2" h={144} flip />
        </div>
      )}
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 02" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch2" />
          <p className="meta">SAME CLASSROOM. EVERY DAY.</p>
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setStage('play')}>
            RUN THE EXPERIMENT
          </button>
        </div>

        <div className={'stage' + (stage === 'play' ? ' on' : '')}>
          <div className="split">
            <div className="pane pane--online">
              <div className="hd">ONLINE</div>
              <div className="bd">
                {online.slice(0, sent).map(([who, txt], i) => (
                  <div key={i} className={'bubble ' + (who === 'a' ? 'bubble--a' : 'bubble--t')}>
                    {txt}
                  </div>
                ))}
                {sent === 0 && <div className="bubble bubble--sys">TAP BELOW</div>}
              </div>
            </div>
            <div className="pane pane--offline">
              <div className="hd">IN PERSON</div>
              <div className="bd">
                {Array.from({ length: rl }).map((_, i) => (
                  <div key={i} className="bubble bubble--sys">
                    {offline[Math.min(i, offline.length - 1)]}
                  </div>
                ))}
                {rl === 0 && <div className="bubble bubble--sys">NO ACTIVITY RECORDED</div>}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            <button
              className="btn"
              onClick={() => {
                sfx.play('notify')
                setSent((x) => Math.min(online.length, x + 2))
              }}
            >
              TEXT HER
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => {
                sfx.play('click')
                setRl((x) => Math.min(offline.length, x + 1))
              }}
            >
              SAY IT
              <br />
              OUT LOUD
            </button>
          </div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 12 }}>
            ONE OF THESE BUTTONS WORKS.
          </p>
          <button
            className="btn btn--red"
            style={{ marginTop: 12 }}
            disabled={!ready}
            onClick={() => {
              sfx.play('complete')
              completeChapter('ch2')
              setStage('done')
            }}
          >
            {ready ? 'DOCUMENT THE ANOMALY' : 'TRY BOTH'}
          </button>
        </div>

        <div className={'stage' + (stage === 'done' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 22 }}>
            <span className="stamp stamp--big">DOCUMENTED</span>
          </div>
          <Narration lines={c.complete} dark />
          <PhotoRow photos={c.photos} />
          <NextBtn current="ch2" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 03 — RASHI'S BIRTHDAY DINNER ============ */
export function Ch3() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'q' | 'crit' | 'sincere'>('intro')
  const [fb, setFb] = useState('')
  const c = ch('ch3')

  return (
    <div className="scene scene--vn">
      <SceneArt kind="restaurant" />
      <div className="cast cast--wide">
        <Person who="p1" h={150} />
        <Person who="p2" h={144} flip />
      </div>
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 03" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch3" />
          <Narration lines={[c.intro[0]]} dark />
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setStage('q')}>
            HEAR THE QUESTION
          </button>
        </div>

        <div className={'stage' + (stage === 'q' ? ' on' : '')}>
          <div className="qbox" style={{ borderColor: 'var(--rose)' }}>
            <div className="who" style={{ color: 'var(--rose)' }}>
              A GUY AT THE TABLE
            </div>
            <p className="line" style={{ color: 'var(--cream-hi)' }}>
              “{dinnerQuestion}”
            </p>
          </div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 18 }}>
            PLAY AS ANAY. ONE ANSWER IS CANON.
          </p>
          <div className="choices">
            <button
              className="choice"
              style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
              onClick={(e) => {
                shakeWrong(e)
                setFb('INCORRECT. HISTORY DISAGREES.')
              }}
            >
              “nobody really”
            </button>
            <button
              className="choice"
              style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
              onClick={(e) => {
                shakeWrong(e)
                setFb('HE DID NOT DODGE. NEITHER SHOULD YOU.')
              }}
            >
              “pass”
            </button>
            <button
              className="choice"
              style={{ borderColor: 'rgba(237,224,196,.5)', color: 'var(--cream-hi)' }}
              onClick={() => {
                sfx.play('complete')
                setFb('')
                setStage('crit')
                setTimeout(() => unlock('public-confession'), 700)
              }}
            >
              “{dinnerAnswer}”
            </button>
          </div>
          <div className="feedback" style={{ color: 'var(--rose)' }}>
            {fb}
          </div>
        </div>

        <div className={'stage' + (stage === 'crit' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <span className="stamp stamp--big" style={{ color: 'var(--rose)', borderColor: 'var(--rose)' }}>
              CRITICAL HIT
            </span>
          </div>
          <Narration lines={c.complete} dark />
          <div className="flustermeter">
            <XP label="TANISHKA — FLUSTER LEVEL" value={100} rose />
          </div>
          <button
            className="btn"
            style={{ marginTop: 16 }}
            onClick={() => {
              completeChapter('ch3')
              setStage('sincere')
            }}
          >
            AND THEN, QUIETLY —
          </button>
        </div>

        <div className={'stage' + (stage === 'sincere' ? ' on' : '')}>
          <div className="goldpanel" style={{ marginTop: 40 }}>
            <div className="glow" aria-hidden="true" />
            <p className="meta" style={{ color: '#c79b5b', letterSpacing: '.3em' }}>
              7 SEPTEMBER 2023
            </p>
            {c.sincere!.map((l, i) => (
              <p key={i} className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 14 }}>
                <P text={l} />
              </p>
            ))}
          </div>
          <NextBtn current="ch3" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 04 — THE FRIENDSHIP ARC ============
   One paragraph of story; the apology email sits behind a
   single button, because it deserves to be read in full.     */
export function Ch4() {
  const { completeChapter, unlock } = useGame()
  const [open, setOpen] = useState(false)
  const c = ch('ch4')

  useEffect(() => {
    completeChapter('ch4')
  }, [])

  return (
    <div className="scene scene--vn scene--light">
      <SceneArt kind="corridor" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 04" />
        <div className="stage on">
          <Head id="ch4" />
          <Prose lines={c.paragraphs} />

          {!open ? (
            <button
              className="btn btn--red"
              style={{ marginTop: 18 }}
              onClick={() => {
                sfx.play('notify')
                setOpen(true)
                unlock('apology-email')
                unlock('pizza-diplomacy')
              }}
            >
              ✉ READ THE APOLOGY EMAIL
            </button>
          ) : (
            <div className="emailcard">
              <div className="eh">
                <span>FROM:</span> {apologyEmail.from}
              </div>
              <div className="eh">
                <span>TO:</span> {apologyEmail.to}
              </div>
              <div className="eh">
                <span>SUBJECT:</span> {apologyEmail.subject}
              </div>
              <div className="ebody">
                {apologyEmail.paragraphs.map((par, pi) => (
                  <p key={pi} style={{ animationDelay: `${0.1 * pi}s` }}>
                    {par}
                  </p>
                ))}
              </div>
            </div>
          )}

          <NextBtn current="ch4" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 05 — FINANZA ============ */
export function Ch5() {
  const { completeChapter } = useGame()
  const c = ch('ch5')
  useEffect(() => {
    completeChapter('ch5')
  }, [])

  return (
    <div className="scene scene--vn">
      <SceneArt kind="stage" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 05" />
        <div className="stage on">
          <Head id="ch5" />
          <Prose lines={c.paragraphs} />
          <div className="abilities">
            {c.abilities!.map((a, i) => (
              <div key={a} className="ability show" style={{ transitionDelay: `${0.1 * i}s` }}>
                <span className="st">◆</span>
                <span>{a.toUpperCase()}</span>
              </div>
            ))}
          </div>
          {c.statsNote && (
            <p className="meta" style={{ marginTop: 12 }}>
              <P text={c.statsNote} />
            </p>
          )}
          <PhotoRow photos={c.photos} />
          <NextBtn current="ch5" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 06 — THE PART SHE DIDN'T SAY ============ */
export function Ch6() {
  const { completeChapter } = useGame()
  const c = ch('ch6')
  useEffect(() => {
    completeChapter('ch6')
  }, [])

  return (
    <div className="scene scene--vn">
      <SceneArt kind="darkroom" />
      <div className="cast">
        <Person who="p2" h={156} />
      </div>
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 06" />
        <div className="stage on">
          <Head id="ch6" />
          <Prose lines={c.paragraphs} />
          <p className="meta" style={{ marginTop: 14, color: 'var(--rose)' }}>
            THIS QUEST COULD NOT, AT THE TIME, BE DISCUSSED WITH PLAYER 1.
          </p>
          <NextBtn current="ch6" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 07 — THE LOCAL TRAIN ============
   Game: PLATFORM DASH. A side-scrolling run to catch the train.
   Collisions slow you; they never end the run.                  */
export function Ch7() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'run' | 'arrived' | 'debrief'>('intro')
  const c = ch('ch7')

  return (
    <div className="scene scene--vn">
      <SceneArt kind="train" />
      {stage === 'intro' && (
        <div className="cast cast--wide">
          <Person who="p1" h={150} />
          <Person who="p2" h={144} flip />
        </div>
      )}
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 07" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch7" />
          <div className="stationboard">
            <div className="en">VILE PARLE → MALAD</div>
            <div className="dv">विले पारले → मालाड</div>
          </div>
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setStage('run')}>
            RUN FOR IT
          </button>
        </div>

        <div className={'stage' + (stage === 'run' ? ' on' : '')}>
          {stage === 'run' && (
            <Runner
              onDone={() => {
                setStage('arrived')
                setTimeout(() => unlock('local-train'), 700)
              }}
            />
          )}
        </div>

        <div className={'stage' + (stage === 'arrived' ? ' on' : '')}>
          <div className="stationboard" style={{ marginTop: 4 }}>
            <div className="en">MALAD</div>
            <div className="dv">मालाड · destination reached</div>
          </div>
          <Narration lines={c.complete} dark />
          <div className="goldpanel">
            <div className="glow" aria-hidden="true" />
            <p className="meta" style={{ color: '#c79b5b', letterSpacing: '.3em' }}>
              2 AUGUST 2024 · KASAK’S BIRTHDAY
            </p>
            {c.sincere!.map((l, i) => (
              <p key={i} className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 14, textAlign: 'center' }}>
                <P text={l} />
              </p>
            ))}
          </div>
          <button
            className="btn"
            style={{ marginTop: 16 }}
            onClick={() => {
              completeChapter('ch7')
              setStage('debrief')
            }}
          >
            SHORTLY AFTERWARDS —
          </button>
        </div>

        <div className={'stage' + (stage === 'debrief' ? ' on' : '')}>
          <div className="secretfile revealed" style={{ marginTop: 4, borderColor: 'rgba(232,163,61,.4)' }}>
            <div className="hd" style={{ color: 'var(--amber)' }}>
              DEBRIEF · CLASSIFIED
            </div>
            <p className="narr" style={{ marginTop: 12, color: 'var(--cream-hi)' }}>
              Anay told Rashi that he likes Tanishka.
            </p>
            <p className="narr" style={{ marginTop: 8, color: 'var(--cream-hi)' }}>
              A planning committee of two was formed on the spot.
            </p>
            <p className="meta" style={{ marginTop: 12, color: 'var(--cream-dim)' }}>
              RASHI’S STRATEGY: START WITH LITTLE HINTS.
              <br />
              STATUS: ADOPTED.
            </p>
          </div>
          <NextBtn current="ch7" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 08 — STREE 2 ============
   Puzzle: exactly ONE swap. Anay must land beside Tanishka, and not
   on an aisle seat — aisle seats look planned. Wrong swap: Rashi
   reshuffles and you try again.                                     */
const SEAT_START = ['TANISHKA', 'FRIEND', 'RASHI', 'FRIEND', 'ANAY']
export function Ch8() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'seats' | 'done'>('intro')
  const [seats, setSeats] = useState<string[]>(SEAT_START)
  const [sel, setSel] = useState<number | null>(null)
  const [fails, setFails] = useState(0)
  const [fb, setFb] = useState('')
  const c = ch('ch8')

  const win = (arr: string[]) => {
    const a = arr.indexOf('ANAY')
    const t = arr.indexOf('TANISHKA')
    return Math.abs(a - t) === 1 && a !== 0 && a !== arr.length - 1
  }

  const tap = (i: number) => {
    sfx.play('click')
    if (sel === null) {
      setSel(i)
      return
    }
    if (sel === i) {
      setSel(null)
      return
    }
    const next = [...seats]
    ;[next[sel], next[i]] = [next[i], next[sel]]
    setSel(null)
    if (win(next)) {
      setSeats(next)
      sfx.play('complete')
      setFb('')
      setTimeout(() => {
        setStage('done')
        unlock('strategic-seating')
        completeChapter('ch8')
      }, 600)
    } else {
      sfx.play('wrong')
      setFails((f) => f + 1)
      setFb(
        next.indexOf('ANAY') === 0 || next.indexOf('ANAY') === 4
          ? 'AISLE SEAT. LOOKS PLANNED. RASHI RESHUFFLES.'
          : 'COINCIDENCE REJECTED. RASHI RESHUFFLES.',
      )
      setSeats(SEAT_START)
    }
  }

  return (
    <div className="scene scene--vn">
      <SceneArt kind="cinema" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 08" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch8" />
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setStage('seats')}>
            PLAY AS RASHI: ARRANGE THE SEATS
          </button>
        </div>

        <div className={'stage' + (stage === 'seats' ? ' on' : '')}>
          <div className="cinescreen">STREE 2</div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 20 }}>
            ONE SWAP. TAP TWO SEATS.
            <br />
            ANAY BESIDE TANISHKA — BUT AISLE SEATS LOOK PLANNED.
          </p>
          <div className="seats">
            {seats.map((s, i) => (
              <button
                key={i}
                className={
                  'seat' +
                  (sel === i ? ' sel' : '') +
                  (s === 'ANAY' || s === 'TANISHKA' ? ' vip' : '')
                }
                onClick={() => tap(i)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="feedback" style={{ color: 'var(--rose)' }}>
            {fb}
          </div>
          {fails >= 3 && (
            <p className="meta" style={{ color: 'var(--cream-dim)' }}>
              HINT: WHO IS SITTING NEXT TO TANISHKA RIGHT NOW?
            </p>
          )}
        </div>

        <div className={'stage' + (stage === 'done' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <span className="stamp stamp--big">“COINCIDENCE”</span>
          </div>
          <Narration lines={c.complete} dark />
          <div className="goldpanel">
            <div className="glow" aria-hidden="true" />
            <p className="meta" style={{ color: '#c79b5b', letterSpacing: '.3em' }}>
              15 AUGUST 2024
            </p>
            <p className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 14 }}>
              Tanishka loved that day.
            </p>
            <p className="narr" style={{ color: '#c8a97c', fontStyle: 'normal', marginTop: 8, fontSize: 14 }}>
              She didn’t know the seating was planned. Now she does. So do you.
            </p>
          </div>
                    <NextBtn current="ch8" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 09 — 05:00 AM ============ */
export function Ch9() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'lock' | 'msg' | 'later' | 'follow' | 'joined'>('lock')
  const c = ch('ch9')

  return (
    <div className="scene scene--vn scene--phonevn">
      <SceneArt kind="bedroom" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 09" />

        {stage === 'lock' && (
          <div className="phone">
            <div className="ptime">05:38</div>
            <div className="pdate">19 AUGUST 2024 · MONDAY</div>
            <button
              className="notif"
              onClick={() => {
                sfx.play('notify')
                setStage('msg')
              }}
            >
              <div className="app">MESSAGES · NOW</div>
              <div className="tt">
                <b>Anay</b>
                <br />7 new messages
              </div>
            </button>
            <p className="skipnote">
              THE REPORT SAYS 5 AM.
              <br />
              THE EVIDENCE SAYS 5:38. HISTORY ROUNDS DOWN.
            </p>
            <p className="skipnote">TAP TO OPEN</p>
          </div>
        )}

        {stage === 'msg' && (
          <div className="phone">
            <p className="skipnote" style={{ marginTop: 4 }}>
              ANAY · 05:38
            </p>
            <div className="msgs">
              {c.confessionMessages!.map((m, i) => (
                <div
                  key={i}
                  className="bubble bubble--a"
                  style={{ fontSize: 12, whiteSpace: 'pre-line', animationDelay: `${Math.min(i * 0.4, 2)}s` }}
                >
                  <P text={m} />
                </div>
              ))}
            </div>
            <p className="skipnote">HE HAD BEEN AWAKE FOR A WHILE.</p>
            <button className="btn btn--ghost" style={{ marginTop: 10 }} onClick={() => setStage('later')}>
              LATER THAT DAY ▸
            </button>
          </div>
        )}

        {stage === 'later' && (
          <div className="phone">
            <p className="skipnote" style={{ marginTop: 4 }}>
              TANISHKA · LATER THAT DAY
            </p>
            <div className="msgs">
              {c.replyMessages!.map((m, i) => (
                <div key={i} className="bubble bubble--t" style={{ fontSize: 12 }}>
                  <P text={m} />
                </div>
              ))}
            </div>
            <button
              className="btn btn--red"
              style={{ marginTop: 14 }}
              onClick={() => {
                sfx.play('complete')
                setStage('follow')
              }}
            >
              SEND
            </button>
          </div>
        )}

        {stage === 'follow' && (
          <div className="phone">
            <p className="skipnote" style={{ marginTop: 4 }}>
              THE FOLLOW-UP INTERROGATION
            </p>
            <div className="msgs">
              {c.followUp!.map((m, i) => (
                <div
                  key={i}
                  className={'bubble ' + (m.who === 'a' ? 'bubble--a' : 'bubble--t')}
                  style={{ fontSize: 12, whiteSpace: 'pre-line' }}
                >
                  <P text={m.text} />
                </div>
              ))}
            </div>
            <button
              className="btn btn--red"
              style={{ marginTop: 14 }}
              onClick={() => {
                sfx.play('complete')
                setStage('joined')
                completeChapter('ch9')
                setTimeout(() => unlock('five-am'), 600)
                setTimeout(() => unlock('player-2'), 1700)
              }}
            >
              AND JUST LIKE THAT —
            </button>
          </div>
        )}

        {stage === 'joined' && (
          <>
            <div style={{ textAlign: 'center', marginTop: 60 }}>
              <p className="meta" style={{ color: 'var(--amber)', letterSpacing: '.32em' }}>
                NEW QUEST UNLOCKED
              </p>
              <h2
                style={{
                  fontFamily: 'var(--anton)',
                  fontSize: 44,
                  letterSpacing: '.08em',
                  color: 'var(--cream-hi)',
                  marginTop: 14,
                }}
              >
                RELATIONSHIP
              </h2>
              <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 26 }}>
                PLAYER 2 HAS JOINED YOUR PARTY.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 30 }}>
                <Figure who="p1" h={110} />
                <Figure who="p2" h={110} flip />
              </div>
            </div>
            <NextBtn current="ch9" />
          </>
        )}
      </div>
    </div>
  )
}

/* ============ CHAPTER 10 — TWO FEST HEADS ============ */
export function Ch10() {
  const { completeChapter, go } = useGame()
  const c = ch('ch10')
  useEffect(() => {
    completeChapter('ch10')
  }, [])

  return (
    <div className="scene scene--vn">
      <SceneArt kind="fest" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 10" />
        <div className="stage on">
          <Head id="ch10" />
          <Prose lines={c.paragraphs} />
          <PhotoRow photos={c.photos} />
          <Narration lines={c.complete} dark />
          <button className="btn btn--red" style={{ marginTop: 18 }} onClick={() => go('r1')}>
            ACT II: THE RELATIONSHIP ARC ▸
          </button>
        </div>
      </div>
    </div>
  )
}
