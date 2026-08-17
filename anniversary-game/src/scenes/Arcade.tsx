import React, { useEffect, useMemo, useRef, useState } from 'react'
import { arcadeGames, timelineEvents } from '../data/relationshipData'
import { P, SNav } from '../components/ui'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'

type GameId = 'hub' | 'mem1' | 'mem2' | 'mem3' | 'mem5'

export default function Arcade() {
  const [view, setView] = useState<GameId>('hub')

  return (
    <div className="scene scene--arcade">
      <div className="col">
        <SNav where="ARCADE" />
        {view === 'hub' ? (
          <Hub onPick={(id) => setView(id)} />
        ) : (
          <GameHost id={view} onWin={() => setView('hub')} onQuit={() => setView('hub')} />
        )}
      </div>
    </div>
  )
}

function Hub({ onPick }: { onPick: (id: GameId) => void }) {
  const { p } = useGame()
  return (
    <>
      <div className="bigttl" style={{ marginTop: 6 }}>
        THE ARCADE
      </div>
      <div className="bigsub">FOUR CABINETS. NO PRIZES. PLAY ANYWAY.</div>
      <div className="cabgrid">
        {arcadeGames.map((m) => {
          const done = p.arcadeDone.includes(m.id)
          return (
            <button key={m.id} className={'cab' + (done ? ' done' : '')} onClick={() => onPick(m.id as GameId)}>
              <div className="marquee">{m.gameName}</div>
              <div className="scr">{m.game}</div>
              <div className="st">{done ? 'CLEARED ✓' : 'INSERT CURIOSITY'}</div>
            </button>
          )
        })}
      </div>
    </>
  )
}

function GameHost({ id, onWin, onQuit }: { id: GameId; onWin: () => void; onQuit: () => void }) {
  const { completeArcade } = useGame()
  const win = () => {
    sfx.play('complete')
    completeArcade(id)
    onWin()
  }
  return (
    <div className="stage on">
      {id === 'mem1' && <Pairs onWin={win} />}
      {id === 'mem2' && <Timeline onWin={win} />}
      {id === 'mem3' && <Maze onWin={win} />}
      {id === 'mem5' && <Slide onWin={win} />}
      <button className="btn btn--ghost" style={{ marginTop: 16 }} onClick={onQuit}>
        WALK AWAY
      </button>
    </div>
  )
}

/* ---------------- game 1: pairs ---------------- */
const PAIR_WORDS = ['CAFÉ', 'TRAIN', '05:00', 'LIST', 'FEST', 'MUMBAI']
function Pairs({ onWin }: { onWin: () => void }) {
  const deck = useMemo(() => shuffle([...PAIR_WORDS, ...PAIR_WORDS].map((w, i) => ({ w, i }))), [])
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const lock = useRef(false)

  const flip = (idx: number) => {
    if (lock.current || open.includes(idx) || matched.includes(deck[idx].w)) return
    sfx.play('click')
    const next = [...open, idx]
    setOpen(next)
    if (next.length === 2) {
      lock.current = true
      const [a, b] = next
      if (deck[a].w === deck[b].w) {
        setTimeout(() => {
          sfx.play('unlock')
          setMatched((m) => {
            const nm = [...m, deck[a].w]
            if (nm.length === PAIR_WORDS.length) setTimeout(onWin, 700)
            return nm
          })
          setOpen([])
          lock.current = false
        }, 350)
      } else {
        setTimeout(() => {
          setOpen([])
          lock.current = false
        }, 750)
      }
    }
  }

  return (
    <>
      <div className="bigttl">PAIRS</div>
      <div className="bigsub">EVERYTHING HERE COMES IN TWOS. FITTING.</div>
      <div className="pairgrid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {deck.map((c, i) => {
          const up = open.includes(i) || matched.includes(c.w)
          return (
            <button
              key={i}
              className={'pcard' + (up ? '' : ' hidden-face') + (matched.includes(c.w) ? ' matched' : '')}
              onClick={() => flip(i)}
              aria-label={up ? c.w : 'Hidden card'}
            >
              {c.w}
            </button>
          )
        })}
      </div>
    </>
  )
}

/* ---------------- game 2: timeline ---------------- */
function Timeline({ onWin }: { onWin: () => void }) {
  const pool = useMemo(() => shuffle([...timelineEvents]), [])
  const [placedCount, setPlaced] = useState(0)
  const [wrongId, setWrongId] = useState<string | null>(null)

  const tap = (ev: (typeof timelineEvents)[number]) => {
    if (ev.order === placedCount + 1) {
      sfx.play('unlock')
      const n = placedCount + 1
      setPlaced(n)
      if (n === timelineEvents.length) setTimeout(onWin, 700)
    } else {
      sfx.play('wrong')
      setWrongId(ev.id)
      setTimeout(() => setWrongId(null), 400)
    }
  }

  return (
    <>
      <div className="bigttl">THE RECORD</div>
      <div className="bigsub">TAP THE EVENTS IN THE ORDER THEY HAPPENED.</div>
      <div className="tl-pool">
        {pool.map((ev) => {
          const placed = ev.order <= placedCount
          return (
            <button
              key={ev.id}
              className={'tl-item' + (placed ? ' placed' : '') + (wrongId === ev.id ? ' wrong' : '')}
              disabled={placed}
              onClick={() => tap(ev)}
            >
              {placed ? `${ev.order}. ` : ''}
              {ev.label}
              {placed ? ` — ${ev.date}` : ''}
            </button>
          )
        })}
      </div>
    </>
  )
}

/* ---------------- game 3: maze ---------------- */
const MAZE = [
  '###########',
  '#S#.....#.#',
  '#.#.###.#.#',
  '#...#.#...#',
  '###.#.###.#',
  '#...#...#.#',
  '#.#####.#.#',
  '#.#...#.#.#',
  '#.#.#.#.#.#',
  '#...#...#G#',
  '###########',
]
function Maze({ onWin }: { onWin: () => void }) {
  const start = { x: 1, y: 1 }
  const [pos, setPos] = useState(start)
  const won = useRef(false)

  const move = (dx: number, dy: number) => {
    if (won.current) return
    setPos((p) => {
      const nx = p.x + dx
      const ny = p.y + dy
      const cell = MAZE[ny]?.[nx]
      if (!cell || cell === '#') {
        sfx.play('wrong')
        return p
      }
      sfx.play('click')
      if (cell === 'G') {
        won.current = true
        setTimeout(onWin, 500)
      }
      return { x: nx, y: ny }
    })
  }

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move(0, -1)
      if (e.key === 'ArrowDown') move(0, 1)
      if (e.key === 'ArrowLeft') move(-1, 0)
      if (e.key === 'ArrowRight') move(1, 0)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  return (
    <>
      <div className="bigttl">CORRIDORS</div>
      <div className="bigsub">FIND THE WAY TO THE CLASSROOM. ARROWS OR BUTTONS.</div>
      <div className="mazewrap">
        <div className="maze" style={{ gridTemplateColumns: `repeat(${MAZE[0].length}, 1fr)` }}>
          {MAZE.flatMap((row, y) =>
            row.split('').map((cell, x) => {
              const me = pos.x === x && pos.y === y
              return (
                <div
                  key={`${x}-${y}`}
                  className={'mz ' + (me ? 'me' : cell === '#' ? 'wall' : cell === 'G' ? 'goal' : 'floor')}
                />
              )
            }),
          )}
        </div>
      </div>
      <div className="dpad">
        <span />
        <button onClick={() => move(0, -1)} aria-label="Up">▲</button>
        <span />
        <button onClick={() => move(-1, 0)} aria-label="Left">◀</button>
        <button onClick={() => move(0, 1)} aria-label="Down">▼</button>
        <button onClick={() => move(1, 0)} aria-label="Right">▶</button>
      </div>
    </>
  )
}

/* ---------------- game 4: slide puzzle ---------------- */
function Slide({ onWin }: { onWin: () => void }) {
  const [tiles, setTiles] = useState<number[]>(() => scrambled())
  const [moves, setMoves] = useState(0)
  const won = useRef(false)

  const tap = (i: number) => {
    if (won.current) return
    const e = tiles.indexOf(0)
    const [xi, yi] = [i % 3, Math.floor(i / 3)]
    const [xe, ye] = [e % 3, Math.floor(e / 3)]
    if (Math.abs(xi - xe) + Math.abs(yi - ye) !== 1) return
    sfx.play('click')
    const next = [...tiles]
    next[e] = next[i]
    next[i] = 0
    setTiles(next)
    setMoves((m) => m + 1)
    if (next.every((v, idx) => v === (idx + 1) % 9)) {
      won.current = true
      setTimeout(onWin, 500)
    }
  }

  return (
    <>
      <div className="bigttl">THE PICTURE</div>
      <div className="bigsub">
        SLIDE THE TILES INTO ORDER · {moves} MOVES · ALWAYS SOLVABLE
      </div>
      <div className="slidegrid">
        {tiles.map((v, i) => (
          <button key={i} className={'sl' + (v === 0 ? ' empty' : '')} onClick={() => tap(i)} aria-label={v === 0 ? 'Empty space' : `Tile ${v}`}>
            {v || ''}
          </button>
        ))}
      </div>
      <button
        className="btn btn--ghost"
        style={{ marginTop: 14 }}
        onClick={() => {
          sfx.play('click')
          setTiles(scrambled())
          setMoves(0)
        }}
      >
        RESHUFFLE
      </button>
    </>
  )
}

/* helpers */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
/* scramble by valid random moves so the puzzle is always solvable */
function scrambled(): number[] {
  const t = [1, 2, 3, 4, 5, 6, 7, 8, 0]
  let e = 8
  for (let n = 0; n < 80; n++) {
    const [xe, ye] = [e % 3, Math.floor(e / 3)]
    const opts = [
      [xe - 1, ye],
      [xe + 1, ye],
      [xe, ye - 1],
      [xe, ye + 1],
    ].filter(([x, y]) => x >= 0 && x < 3 && y >= 0 && y < 3)
    const [x, y] = opts[Math.floor(Math.random() * opts.length)]
    const i = y * 3 + x
    t[e] = t[i]
    t[i] = 0
    e = i
  }
  return t
}
