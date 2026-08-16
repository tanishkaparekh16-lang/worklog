import React, { useRef, useState } from 'react'
import { meta, players } from '../data/relationshipData'
import { CityBg } from '../components/ui'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'

export default function Boot() {
  const { go } = useGame()
  const [on, setOn] = useState(false)
  const [shown, setShown] = useState(0)
  const [ready, setReady] = useState(false)
  const started = useRef(false)

  const lines: React.ReactNode[] = [
    <>LOADING SAVE FILE…</>,
    <>
      <span className="dim">PLAYER 1 —</span> {players.p1.name}
    </>,
    <>
      <span className="dim">PLAYER 2 —</span> {players.p2.name}
    </>,
    <>
      <span className="dim">LOCATION —</span> {players.p1.location.toUpperCase()}{' '}
      <span className="dim">· CLASS —</span> {meta.course}
    </>,
    <>
      <span className="dim">CURRENT SAVE —</span> {meta.saveYear}
    </>,
    <>
      <span className="dim">FRIENDSHIP XP</span>
      <span className="xbar">
        <i style={{ width: shown > 5 ? '100%' : 0 }} />
      </span>
    </>,
    <>
      <span className="dim">RELATIONSHIP XP</span>
      <span className="xbar">
        <i style={{ width: shown > 6 ? '100%' : 0 }} />
      </span>
    </>,
    ...(meta.bootJokeLine
      ? [
          <>
            <span className="dim">{meta.bootJokeLine} —</span>{' '}
            <span className="warn">{meta.bootJokeValue}</span>
          </>,
        ]
      : []),
    <>SAVE FILE FOUND.</>,
  ]

  const boot = () => {
    if (started.current) return
    started.current = true
    sfx.play('on')
    setOn(true)
    lines.forEach((_, i) => {
      setTimeout(() => {
        setShown(i + 1)
        if (i === lines.length - 1) setTimeout(() => setReady(true), 500)
      }, 420 * i + 700)
    })
  }

  return (
    <div className="scene scene--boot">
      <CityBg />
      <div className="col">
        <div
          className={'crt' + (on ? ' flick' : '')}
          role="button"
          tabIndex={0}
          aria-label="Turn on the television"
          onClick={boot}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              boot()
            }
          }}
        >
          <div className="glass">
            <div className="osdtop" style={{ opacity: on ? 1 : 0, transition: 'opacity .4s' }}>
              <span>AV-1</span>
              <span>CH 02</span>
            </div>
            <div className="osd">
              {lines.map((l, i) => (
                <span key={i} className={'ln' + (i < shown ? ' show' : '')}>
                  {l}
                </span>
              ))}
            </div>
            <button
              className={'pressstart' + (ready ? ' on' : '')}
              onClick={(e) => {
                e.stopPropagation()
                go('menu')
              }}
            >
              ▶ PRESS START
            </button>
          </div>
        </div>
        <div className="boothint" style={{ opacity: on ? 0 : 1 }}>
          TAP THE TELEVISION.
        </div>
      </div>
    </div>
  )
}
