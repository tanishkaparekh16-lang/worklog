import React, { useEffect, useRef, useState } from 'react'
import { sfx } from '../audio/sfx'
import { TEST } from '../components/ui'

/* ============================================================
   THE FOUR REAL GAMES
   None of these punish you. You cannot lose progress, only take
   longer. Every one of them ends in the story continuing.
   ============================================================ */

/* ------------------------------------------------------------
   1 · PLATFORMER — "VASANT KUNJ"
   A proper side-on platformer with gravity, jumping and a
   camera. Explore the ruin, collect three things, reach the
   quiet corner at the top. Falling costs nothing but a respawn.
   ------------------------------------------------------------ */

type Plat = { x: number; y: number; w: number; h: number; k?: 'floor' | 'brick' | 'ledge' }

const LEVEL: Plat[] = [
  // ground — one long safe floor
  { x: 0, y: 560, w: 900, h: 60, k: 'floor' },
  // first climb: short, wide steps
  { x: 110, y: 492, w: 130, h: 16, k: 'brick' },
  { x: 285, y: 430, w: 130, h: 16, k: 'brick' },
  { x: 460, y: 492, w: 150, h: 16, k: 'brick' },
  { x: 650, y: 430, w: 150, h: 16, k: 'brick' },
  // mid floor — broad landings
  { x: 30, y: 366, w: 200, h: 18, k: 'ledge' },
  { x: 275, y: 312, w: 190, h: 18, k: 'ledge' },
  { x: 510, y: 366, w: 200, h: 18, k: 'ledge' },
  { x: 740, y: 312, w: 160, h: 18, k: 'ledge' },
  // upper floor
  { x: 120, y: 250, w: 210, h: 18, k: 'ledge' },
  { x: 372, y: 224, w: 200, h: 18, k: 'ledge' },
  { x: 610, y: 250, w: 200, h: 18, k: 'ledge' },
  // the top — a wide, unmissable landing
  { x: 250, y: 162, w: 380, h: 20, k: 'ledge' },
]

const PICKUPS = [
  { x: 130, y: 330, label: 'A STAIRCASE' },
  { x: 360, y: 276, label: 'A ROOM WITH NO ROOF' },
  { x: 216, y: 214, label: 'AN OPEN WINDOW' },
]

export function Platformer({ onDone }: { onDone: () => void }) {
  const cv = useRef<HTMLCanvasElement | null>(null)
  const [got, setGot] = useState<number[]>([])
  const [note, setNote] = useState('')
  const gotRef = useRef<number[]>([])
  const doneRef = useRef(false)
  const keys = useRef<Record<string, boolean>>({})
  const coyote = useRef(0)
  const buffer = useRef(0)
  const p = useRef({ x: 40, y: 500, vx: 0, vy: 0, onGround: false, face: 1 })

  useEffect(() => {
    gotRef.current = got
  }, [got])

  useEffect(() => {
    const c = cv.current
    if (!c) return
    const ctx = c.getContext('2d')!
    const W = 360
    const H = 330
    c.width = W * 2
    c.height = H * 2
    ctx.scale(2, 2)
    let raf = 0

    const kd = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'd', 'w'].includes(e.key)) e.preventDefault()
      keys.current[e.key] = true
    }
    const ku = (e: KeyboardEvent) => {
      keys.current[e.key] = false
    }
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)

    const loop = () => {
      const me = p.current
      const left = keys.current['ArrowLeft'] || keys.current['a'] || keys.current['__L']
      const right = keys.current['ArrowRight'] || keys.current['d'] || keys.current['__R']
      const jump = keys.current['ArrowUp'] || keys.current[' '] || keys.current['w'] || keys.current['__J']

      /* horizontal */
      const accel = 0.6
      const maxV = 3.2
      if (left) {
        me.vx = Math.max(-maxV, me.vx - accel)
        me.face = -1
      } else if (right) {
        me.vx = Math.min(maxV, me.vx + accel)
        me.face = 1
      } else {
        me.vx *= 0.78
        if (Math.abs(me.vx) < 0.05) me.vx = 0
      }
      /* coyote time + jump buffering: forgiving, like the good ones */
      if (jump) buffer.current = 8
      else buffer.current = Math.max(0, buffer.current - 1)
      if (buffer.current > 0 && coyote.current > 0) {
        me.vy = -10.6
        me.onGround = false
        coyote.current = 0
        buffer.current = 0
        sfx.play('click')
      }

      /* gravity, a touch floatier so jumps are easy to judge */
      me.vy = Math.min(13, me.vy + 0.46)

      /* move + collide, axis at a time */
      const PW = 16
      const PH = 26
      me.x += me.vx
      for (const pl of LEVEL) {
        if (me.x < pl.x + pl.w && me.x + PW > pl.x && me.y < pl.y + pl.h && me.y + PH > pl.y) {
          if (me.vx > 0) me.x = pl.x - PW
          else if (me.vx < 0) me.x = pl.x + pl.w
          me.vx = 0
        }
      }
      me.y += me.vy
      me.onGround = false
      for (const pl of LEVEL) {
        if (me.x < pl.x + pl.w && me.x + PW > pl.x && me.y < pl.y + pl.h && me.y + PH > pl.y) {
          if (me.vy > 0) {
            me.y = pl.y - PH
            me.onGround = true
          } else if (me.vy < 0) {
            me.y = pl.y + pl.h
          }
          me.vy = 0
        }
      }
      coyote.current = me.onGround ? 8 : Math.max(0, coyote.current - 1)
      if (me.x < 0) me.x = 0
      if (me.x > 900 - PW) me.x = 900 - PW
      /* fell off the world — put them back, no penalty */
      if (me.y > 720) {
        me.x = 40
        me.y = 500
        me.vx = 0
        me.vy = 0
      }

      /* pickups */
      PICKUPS.forEach((pk, i) => {
        if (gotRef.current.includes(i)) return
        if (Math.abs(me.x + PW / 2 - pk.x) < 40 && Math.abs(me.y + PH / 2 - pk.y) < 44) {
          sfx.play('unlock')
          setNote(pk.label)
          setGot((g) => (g.includes(i) ? g : [...g, i]))
        }
      })

      /* the goal */
      const allGot = gotRef.current.length >= PICKUPS.length
      if (allGot && !doneRef.current && me.x > 240 && me.x < 640 && me.y < 175) {
        doneRef.current = true
        sfx.play('complete')
        setTimeout(onDone, 500)
      }

      /* ---------- draw ---------- */
      const camX = Math.max(0, Math.min(900 - W, me.x - W / 2))
      const camY = Math.max(0, Math.min(650 - H, me.y - H / 2 + 30))
      ctx.clearRect(0, 0, W, H)

      /* backdrop */
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#1A1620')
      g.addColorStop(1, '#0C0A10')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
      /* distant greenery, well behind the action */
      ctx.globalAlpha = 0.5
      ctx.fillStyle = '#131D16'
      for (let i = 0; i < 9; i++) {
        const bx = ((i * 130 - camX * 0.3) % 1200) - 120
        ctx.beginPath()
        ctx.ellipse(bx, 300 - camY * 0.22, 70, 44, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      /* ruined wall behind, gives the ruin depth */
      ctx.fillStyle = 'rgba(38,32,26,.55)'
      ctx.fillRect(120 - camX * 0.7, 150 - camY * 0.7, 660, 420)

      /* platforms */
      for (const pl of LEVEL) {
        const x = pl.x - camX
        const y = pl.y - camY
        if (x > W || x + pl.w < 0) continue
        if (pl.k === 'floor') {
          ctx.fillStyle = '#241E1A'
          ctx.fillRect(x, y, pl.w, pl.h)
          ctx.fillStyle = '#2E2620'
          ctx.fillRect(x, y, pl.w, 5)
        } else if (pl.k === 'brick') {
          ctx.fillStyle = '#6B4034'
          ctx.fillRect(x, y, pl.w, pl.h)
          ctx.fillStyle = '#8A5442'
          ctx.fillRect(x, y, pl.w, 4)
          ctx.strokeStyle = 'rgba(0,0,0,.25)'
          for (let bx = x; bx < x + pl.w; bx += 14) ctx.strokeRect(bx, y, 14, pl.h)
        } else {
          ctx.fillStyle = '#3A342A'
          ctx.fillRect(x, y, pl.w, pl.h)
          ctx.fillStyle = '#4A4234'
          ctx.fillRect(x, y, pl.w, 4)
          ctx.fillStyle = '#2A251E'
          ctx.fillRect(x, y + pl.h, pl.w, 3)
        }
      }

      /* pickups */
      PICKUPS.forEach((pk, i) => {
        if (gotRef.current.includes(i)) return
        const x = pk.x - camX
        const y = pk.y - camY + Math.sin(Date.now() / 300 + i) * 3
        ctx.fillStyle = 'rgba(245,201,123,.18)'
        ctx.beginPath()
        ctx.arc(x, y, 15, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#F5C97B'
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      })

      /* goal marker */
      if (allGot) {
        const gx = 430 - camX
        const gy = 162 - camY
        ctx.fillStyle = 'rgba(201,138,147,.25)'
        ctx.fillRect(gx - 26, gy - 54, 52, 54)
        ctx.fillStyle = '#C98A93'
        ctx.font = '9px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('THE QUIET CORNER', gx, gy - 62)
      }

      /* player */
      const px = me.x - camX
      const py = me.y - camY
      ctx.fillStyle = '#1C1410'
      ctx.fillRect(px + 3, py + 26, 10, 3)
      ctx.fillStyle = '#2A3A5E'
      ctx.fillRect(px + 2, py + 10, 12, 12)
      ctx.fillStyle = '#1A2236'
      ctx.fillRect(px + 3, py + 21, 4, 6)
      ctx.fillRect(px + 9, py + 21, 4, 6)
      ctx.fillStyle = '#D9AE86'
      ctx.beginPath()
      ctx.arc(px + 8, py + 6, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#1C1410'
      ctx.beginPath()
      ctx.arc(px + 8, py + 4, 6, Math.PI, 0)
      ctx.fill()

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
    }
  }, [])

  const hold = (k: string, on: boolean) => {
    keys.current[k] = on
  }

  return (
    <div className="gamewrap">
      <div className="gamehud">
        <span>
          FOUND {got.length}/{PICKUPS.length}
        </span>
        <span className="hudnote">{got.length >= PICKUPS.length ? 'NOW REACH THE TOP' : note}</span>
      </div>
      <canvas ref={cv} className="gamecv" style={{ width: '100%', aspectRatio: '360 / 330' }} />
      <div className="pad">
        <button
          className="padbtn"
          onPointerDown={() => hold('__L', true)}
          onPointerUp={() => hold('__L', false)}
          onPointerLeave={() => hold('__L', false)}
          aria-label="Move left"
        >
          ◀
        </button>
        <button
          className="padbtn"
          onPointerDown={() => hold('__R', true)}
          onPointerUp={() => hold('__R', false)}
          onPointerLeave={() => hold('__R', false)}
          aria-label="Move right"
        >
          ▶
        </button>
        <button
          className="padbtn padbtn--jump"
          onPointerDown={() => hold('__J', true)}
          onPointerUp={() => hold('__J', false)}
          onPointerLeave={() => hold('__J', false)}
          aria-label="Jump"
        >
          JUMP
        </button>
      </div>
      {TEST && (
        <button
          className="btn btn--ghost"
          style={{ marginTop: 10 }}
          onClick={() => {
            setGot([0, 1, 2])
            doneRef.current = true
            onDone()
          }}
        >
          SKIP (TEST)
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------
   2 · QUIZ — "HOW WELL DO YOU KNOW THIS"
   Every question is real canon. Wrong answers don't punish you;
   they just tell you the truth and move on.
   ------------------------------------------------------------ */

type Q = { q: string; a: string[]; correct: number; after: string }

const QUESTIONS: Q[] = [
  {
    q: 'What was the very first text?',
    a: ['“hey stranger”', '“sunn do you know any good cafes in VP east?”', '“are you free tomorrow?”'],
    correct: 1,
    after: '29 August 2023. The file opens here.',
  },
  {
    q: 'At Rashi’s birthday dinner, what did Anay actually say?',
    a: ['“i think tanishka bohot sundar hai”', '“pass”', '“nobody really”'],
    correct: 0,
    after: 'Said out loud. In front of everyone. Unprompted.',
  },
  {
    q: 'What were the terms for getting unblocked?',
    a: ['A phone call', 'One formal apology email', 'Flowers'],
    correct: 1,
    after: 'Delivered. Signed “Yours truly, Anayfiverr”.',
  },
  {
    q: 'What did he send in return for one very small favour?',
    a: ['A thank-you note', 'An entire pizza', 'Nothing'],
    correct: 1,
    after: 'She loved his guts.',
  },
  {
    q: 'What time did the confession actually arrive?',
    a: ['05:00 am', '05:38 am', 'Midnight'],
    correct: 1,
    after: 'The record says 5 am. History rounds down.',
  },
  {
    q: 'What did they order on the first date?',
    a: ['Two cold coffees', 'Two Ferrero Rocher milkshakes', 'Chai'],
    correct: 1,
    after: 'Chocolate Heaven. Zero awkwardness.',
  },
]

export function Quiz({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const q = QUESTIONS[i]

  const pick = (k: number) => {
    if (picked !== null) return
    setPicked(k)
    if (k === q.correct) {
      sfx.play('unlock')
      setScore((s) => s + 1)
    } else {
      sfx.play('click')
    }
  }

  const next = () => {
    if (i + 1 >= QUESTIONS.length) {
      sfx.play('complete')
      setFinished(true)
    } else {
      setI(i + 1)
      setPicked(null)
    }
  }

  if (finished) {
    const verdict =
      score >= 6
        ? 'FLAWLESS. SUSPICIOUSLY GOOD MEMORY.'
        : score >= 4
          ? 'SOLID. THE IMPORTANT ONES LANDED.'
          : 'THE RECORD HAS BEEN REFRESHED FOR YOU.'
    return (
      <div className="gamewrap">
        <div className="quizscore">
          {score}/{QUESTIONS.length}
        </div>
        <p className="meta" style={{ textAlign: 'center', color: 'var(--amber)' }}>
          {verdict}
        </p>
        <button className="btn btn--red" style={{ marginTop: 18 }} onClick={onDone}>
          CONTINUE ▸
        </button>
      </div>
    )
  }

  return (
    <div className="gamewrap">
      <div className="gamehud">
        <span>
          QUESTION {i + 1}/{QUESTIONS.length}
        </span>
        <span className="hudnote">SCORE {score}</span>
      </div>
      <p className="quizq">{q.q}</p>
      <div className="choices" style={{ marginTop: 14 }}>
        {q.a.map((opt, k) => {
          const state =
            picked === null ? '' : k === q.correct ? ' qright' : k === picked ? ' qwrong' : ' qdim'
          return (
            <button key={k} className={'choice qopt' + state} onClick={() => pick(k)}>
              {opt}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="meta" style={{ marginTop: 14, color: 'var(--cream-dim)', textAlign: 'left' }}>
            {q.after}
          </p>
          <button className="btn" style={{ marginTop: 12 }} onClick={next}>
            {i + 1 >= QUESTIONS.length ? 'SEE THE RESULT' : 'NEXT ▸'}
          </button>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------
   3 · CLUE HUNT — "THE EVIDENCE"
   A room to search. Five hidden clues, no timer, no failure.
   Tapping empty space just tells you you're close or not.
   ------------------------------------------------------------ */

const CLUES = [
  { x: 22, y: 30, r: 15, title: 'THE PHONE', text: 'Screen face-down. Checked every four minutes anyway.' },
  { x: 72, y: 24, r: 15, title: 'THE CALENDAR', text: 'August. One date circled twice, for no stated reason.' },
  { x: 47, y: 55, r: 15, title: 'THE NOTEBOOK', text: 'A page started, then torn out. Then started again.' },
  { x: 16, y: 72, r: 15, title: 'THE PLAYLIST', text: 'Renamed three times. Never shared with anyone.' },
  { x: 82, y: 66, r: 15, title: 'THE MIRROR', text: 'Checked before college. On days with a specific timetable.' },
]

export function ClueHunt({ onDone }: { onDone: () => void }) {
  const [found, setFound] = useState<number[]>([])
  const [msg, setMsg] = useState('TAP AROUND THE ROOM. FIVE THINGS GIVE HER AWAY.')
  const [last, setLast] = useState<{ title: string; text: string } | null>(null)
  const done = found.length >= CLUES.length

  const tap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (done) return
    const box = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - box.left) / box.width) * 100
    const py = ((e.clientY - box.top) / box.height) * 100
    let hit = -1
    let nearest = 999
    CLUES.forEach((c, i) => {
      const d = Math.hypot(c.x - px, c.y - py)
      nearest = Math.min(nearest, d)
      if (d < c.r && !found.includes(i)) hit = i
    })
    if (hit >= 0) {
      sfx.play('unlock')
      const nf = [...found, hit]
      setFound(nf)
      setLast(CLUES[hit])
      setMsg(nf.length >= CLUES.length ? 'ALL FIVE. THE CASE MAKES ITSELF.' : `FOUND ${nf.length} OF ${CLUES.length}.`)
      if (nf.length >= CLUES.length) sfx.play('complete')
    } else {
      setMsg(nearest < 22 ? 'SOMETHING IS NEARBY.' : 'NOTHING THERE.')
    }
  }

  return (
    <div className="gamewrap">
      <div className="gamehud">
        <span>
          EVIDENCE {found.length}/{CLUES.length}
        </span>
        <span className="hudnote">{msg}</span>
      </div>
      <div className="cluefield" onClick={tap} role="presentation">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="clueart">
          <rect width="100" height="100" fill="#1B1020" />
          <rect x="6" y="10" width="34" height="26" rx="2" fill="#241528" />
          <rect x="58" y="8" width="34" height="24" rx="2" fill="#241528" />
          <rect x="0" y="62" width="100" height="38" fill="#160C1A" />
          <rect x="30" y="44" width="40" height="20" rx="2" fill="#2A1830" />
          <rect x="4" y="60" width="26" height="16" rx="2" fill="#22142A" />
          <rect x="70" y="56" width="26" height="22" rx="2" fill="#22142A" />
        </svg>
        {CLUES.map((c, i) => (
          <span
            key={i}
            className={'cluedot' + (found.includes(i) ? ' on' : '')}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          />
        ))}
      </div>
      {last && (
        <div className="cluecard">
          <div className="t1">{last.title}</div>
          <p>{last.text}</p>
        </div>
      )}
      {done && (
        <button className="btn btn--red" style={{ marginTop: 14 }} onClick={onDone}>
          CLOSE THE FILE ▸
        </button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------
   4 · RUNNER — "CATCH THE TRAIN"
   A side-scrolling dash down the platform. Jump the obstacles.
   Hitting one only slows you; the train always waits long
   enough. Stakes without spite.
   ------------------------------------------------------------ */

export function Runner({ onDone }: { onDone: () => void }) {
  const cv = useRef<HTMLCanvasElement | null>(null)
  const [pct, setPct] = useState(0)
  const [bumps, setBumps] = useState(0)
  const jumpRef = useRef(false)
  const doneRef = useRef(false)

  useEffect(() => {
    const c = cv.current
    if (!c) return
    const ctx = c.getContext('2d')!
    const W = 360
    const H = 190
    c.width = W * 2
    c.height = H * 2
    ctx.scale(2, 2)

    const GOAL = TEST ? 400 : 2600
    let dist = 0
    let speed = 2.9
    let py = 0
    let vy = 0
    let onGround = true
    let obstacles: { x: number; w: number; h: number; kind: number }[] = []
    let next = 300
    let raf = 0
    let hitCool = 0

    const kd = (e: KeyboardEvent) => {
      if ([' ', 'ArrowUp', 'w'].includes(e.key)) {
        e.preventDefault()
        jumpRef.current = true
      }
    }
    window.addEventListener('keydown', kd)

    const loop = () => {
      /* input */
      if (jumpRef.current && onGround) {
        vy = -8.6
        onGround = false
        sfx.play('click')
      }
      jumpRef.current = false

      /* physics */
      vy += 0.52
      py += vy
      if (py > 0) {
        py = 0
        vy = 0
        onGround = true
      }

      speed = Math.min(4.4, speed + 0.0016)
      dist += speed
      if (hitCool > 0) hitCool--

      /* spawn */
      if (dist > next) {
        next = dist + 180 + Math.random() * 190
        const kind = Math.floor(Math.random() * 3)
        obstacles.push({ x: W + 20, w: kind === 2 ? 26 : 18, h: kind === 0 ? 18 : kind === 1 ? 26 : 22, kind })
      }
      obstacles.forEach((o) => (o.x -= speed))
      obstacles = obstacles.filter((o) => o.x > -50)

      /* collisions — a bump, not a death */
      const px = 60
      const pw = 16
      const ph = 26
      for (const o of obstacles) {
        if (hitCool <= 0 && px < o.x + o.w && px + pw > o.x && py + ph > -o.h) {
          hitCool = 60
          speed = 2.2
          setBumps((b) => b + 1)
          sfx.play('wrong')
        }
      }

      if (dist >= GOAL && !doneRef.current) {
        doneRef.current = true
        sfx.play('complete')
        setTimeout(onDone, 600)
      }
      setPct(Math.min(100, (dist / GOAL) * 100))

      /* ---------- draw ---------- */
      ctx.clearRect(0, 0, W, H)
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#241537')
      g.addColorStop(0.6, '#4A2440')
      g.addColorStop(1, '#8A4030')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      /* station roof */
      ctx.fillStyle = '#191324'
      ctx.fillRect(0, 0, W, 26)
      for (let i = 0; i < 8; i++) {
        const x = ((i * 90 - dist * 0.4) % (W + 120)) - 60
        ctx.fillRect(x, 26, 8, 30)
      }

      /* the train, always slightly ahead */
      const trainX = W - 40 + Math.min(0, (dist - GOAL) * 0.06)
      ctx.fillStyle = '#6F63B8'
      ctx.fillRect(trainX, 60, 120, 68)
      ctx.fillStyle = '#FFE9B0'
      for (let i = 0; i < 4; i++) ctx.fillRect(trainX + 10 + i * 28, 72, 18, 20)
      ctx.fillStyle = '#FFB13D'
      ctx.fillRect(trainX, 112, 120, 6)

      /* platform */
      ctx.fillStyle = '#2A2333'
      ctx.fillRect(0, 128, W, H - 128)
      ctx.fillStyle = '#3A3348'
      ctx.fillRect(0, 128, W, 5)
      /* yellow safety line */
      ctx.fillStyle = 'rgba(233,193,62,.65)'
      for (let i = 0; i < 20; i++) {
        const x = ((i * 40 - dist) % (W + 60)) - 30
        ctx.fillRect(x, 140, 22, 3)
      }

      /* obstacles */
      obstacles.forEach((o) => {
        const y = 128 - o.h
        if (o.kind === 0) {
          ctx.fillStyle = '#4A3A28'
          ctx.fillRect(o.x, y, o.w, o.h)
          ctx.fillStyle = '#5C4A34'
          ctx.fillRect(o.x, y, o.w, 4)
        } else if (o.kind === 1) {
          ctx.fillStyle = '#7E2B35'
          ctx.fillRect(o.x, y, o.w, o.h)
          ctx.fillStyle = '#A03A46'
          ctx.fillRect(o.x + 3, y + 4, o.w - 6, 6)
        } else {
          ctx.fillStyle = '#243B4A'
          ctx.fillRect(o.x, y, o.w, o.h)
          ctx.fillStyle = '#31506B'
          ctx.fillRect(o.x, y + 4, o.w, 5)
        }
      })

      /* runner */
      const rx = 60
      const ry = 128 - 26 + py
      const blink = hitCool > 0 && Math.floor(hitCool / 6) % 2 === 0
      if (!blink) {
        ctx.fillStyle = '#1C1410'
        ctx.fillRect(rx + 3, ry + 26, 10, 3)
        ctx.fillStyle = '#2A3A5E'
        ctx.fillRect(rx + 2, ry + 10, 12, 12)
        ctx.fillStyle = '#E8A33D'
        ctx.fillRect(rx + 2, ry + 13, 12, 3)
        const run = Math.floor(dist / 8) % 2 === 0
        ctx.fillStyle = '#1A2236'
        ctx.fillRect(rx + 3, ry + 21, 4, onGround && run ? 6 : 4)
        ctx.fillRect(rx + 9, ry + 21, 4, onGround && run ? 4 : 6)
        ctx.fillStyle = '#D9AE86'
        ctx.beginPath()
        ctx.arc(rx + 8, ry + 6, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#1C1410'
        ctx.beginPath()
        ctx.arc(rx + 8, ry + 4, 6, Math.PI, 0)
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', kd)
    }
  }, [])

  return (
    <div className="gamewrap">
      <div className="gamehud">
        <span>PLATFORM DASH</span>
        <span className="hudnote">{bumps > 0 ? `${bumps} COLLISION${bumps > 1 ? 'S' : ''}` : 'CLEAN RUN'}</span>
      </div>
      <canvas ref={cv} className="gamecv" style={{ width: '100%', aspectRatio: '360 / 190' }} />
      <div className="runbar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <button
        className="btn btn--red"
        style={{ marginTop: 12 }}
        onPointerDown={() => {
          jumpRef.current = true
        }}
      >
        JUMP
      </button>
      <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 8, textAlign: 'left' }}>
        TAP JUMP OR PRESS SPACE. BUMPS ONLY SLOW YOU DOWN.
      </p>
    </div>
  )
}
