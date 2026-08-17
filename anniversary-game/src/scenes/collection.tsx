import React, { useEffect, useRef, useState } from 'react'
import {
  achievements,
  arcadeMemories,
  chapters,
  finalLevel,
  letter,
  mapNodes,
  soundtrack,
  stats,
} from '../data/relationshipData'
import { HoldButton, P, PhotoRow, SNav, SpaceBg, XP } from '../components/ui'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'

/* ================= SOUNDTRACK ================= */
export function Soundtrack() {
  const { foundEgg, unlock } = useGame()
  const holdT = useRef<number | null>(null)

  /* easter egg: press and hold the record label */
  const holdStart = () => {
    holdT.current = window.setTimeout(() => {
      foundEgg('vinyl')
      unlock('egg-vinyl')
    }, 2500)
  }
  const holdEnd = () => {
    if (holdT.current) clearTimeout(holdT.current)
  }

  return (
    <div className="scene scene--ost">
      <div className="beams" aria-hidden="true" />
      <div className="col">
        <SNav where="SIDE A" />
        <div className="vinylwrap">
          <div
            className="vinyl"
            onPointerDown={holdStart}
            onPointerUp={holdEnd}
            onPointerLeave={holdEnd}
            role="presentation"
          >
            <div className="label" />
          </div>
        </div>
        <div className="bigttl">OUR SOUNDTRACK</div>
        <div className="bigsub">EVERY TRACK GETS ATTACHED TO A MEMORY</div>
        <div className="tracks">
          {soundtrack.map((t, i) => (
            <div key={t.id} className="track">
              <div className="r1">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span style={{ flex: 1, textAlign: 'left', marginLeft: 12 }}>
                  <P text={t.title} />
                </span>
                <span>
                  <P text={t.artist} />
                </span>
              </div>
              <p className="why">
                <P text={t.why} />
              </p>
              {t.audio && (
                <audio controls preload="none" src={t.audio} style={{ width: '100%', marginTop: 10 }} />
              )}
            </div>
          ))}
        </div>
        <p className="meta" style={{ color: 'rgba(245,231,200,.4)', marginTop: 18 }}>
          NOTHING PLAYS UNLESS YOU PRESS PLAY. PROMISE.
        </p>
      </div>
    </div>
  )
}

/* ================= ACHIEVEMENTS ================= */
export function Tapes() {
  const { p } = useGame()
  return (
    <div className="scene scene--tapes">
      <SpaceBg planet={false} />
      <div className="col">
        <SNav where="TAPES" />
        <div className="bigttl" style={{ textAlign: 'left', marginTop: 8 }}>
          ACHIEVEMENTS
        </div>
        <div className="bigsub" style={{ textAlign: 'left', marginTop: 6 }}>
          COLLECTED ON CASSETTE · {p.achievements.length}/{achievements.length}
        </div>
        {achievements.map((a, i) => {
          const got = p.achievements.includes(a.id)
          if (a.secret && !got) {
            return (
              <div key={a.id} className="tape locked">
                <div className="lab">
                  <div className="stripe" />
                  <div className="t1">SECRET</div>
                  <div className="t2">???</div>
                  <div className="t3">Hidden somewhere on this website.</div>
                  <div className="spools">
                    <span className="spool" />
                    <span className="spool" />
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div key={a.id} className={'tape' + (got ? '' : ' locked')}>
              <div className="lab">
                <div className="stripe" />
                <div className="t1">
                  SIDE {i < 5 ? 'A' : 'B'} · {String(i + 1).padStart(2, '0')}
                </div>
                <div className="t2">{got ? a.title : '???'}</div>
                <div className="t3">{got ? a.desc : 'Keep playing.'}</div>
                <div className="spools">
                  <span className="spool" />
                  <span className="spool" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ================= CHARACTER STATS ================= */
export function Stats() {
  return (
    <div className="scene scene--stats">
      <SpaceBg planet={false} />
      <div className="col">
        <SNav where="PARTY" />
        <div className="bigttl" style={{ textAlign: 'left', marginTop: 8 }}>
          CHARACTER STATS
        </div>
        <div className="bigsub" style={{ textAlign: 'left', marginTop: 6 }}>
          MEASURED SCIENTIFICALLY. NO SOURCES AVAILABLE.
        </div>
        <div className="statgrid">
        <div className="statcard">
          <h3>ANAY</h3>
          <div className="org">PLAYER 1 · NEEMUCH → MUMBAI</div>
          {stats.anay.map((s) => (
            <XP key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <div className="statcard">
          <h3>TANISHKA</h3>
          <div className="org">PLAYER 2 · VILE PARLE, MUMBAI</div>
          {stats.tanishka.map((s) => (
            <XP key={s.label} label={s.label} value={s.value} rose />
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

/* ================= RELATIONSHIP MAP ================= */
export function WorldMap() {
  const { p, storyComplete } = useGame()
  return (
    <div className="scene scene--story">
      <SpaceBg />
      <div className="col">
        <SNav where="THE MAP" />
        <div className="bigttl" style={{ textAlign: 'left', marginTop: 8 }}>
          THE MAP
        </div>
        <div className="bigsub" style={{ textAlign: 'left', marginTop: 6 }}>
          NOT TO SCALE. EMOTIONALLY ACCURATE.
        </div>
        <div style={{ position: 'relative', marginTop: 18 }}>
          <div className="mapline" aria-hidden="true" />
          {mapNodes.map((n) => {
            const unlocked =
              n.chapter === 'locked'
                ? false
                : n.chapter === 'final'
                  ? p.finalDone || storyComplete
                  : p.chaptersDone.includes(n.chapter)
            return (
              <div key={n.id} className={'chnode' + (unlocked ? ' done' : ' locked')} style={{ cursor: 'default' }}>
                <span className="dot" />
                <span style={{ flex: 1 }}>
                  <h3 style={{ marginTop: 0 }}>{unlocked ? n.label : n.id === 'map-year3' ? 'YEAR THREE?' : '???'}</h3>
                  <span className="s">{unlocked ? n.sub.toUpperCase() : 'UNCHARTED'}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================= FINAL LEVEL ================= */
export function Final() {
  const { p, go, setFinalDone, unlock } = useGame()
  const [stage, setStage] = useState<'boss' | 'reveal' | 'save'>('boss')
  const [tries, setTries] = useState(0)
  const [shownLines, setShownLines] = useState(0)

  const attack = () => {
    sfx.play('wrong')
    setTries((t) => t + 1)
    if (tries >= 1) {
      sfx.play('complete')
      setStage('reveal')
      finalLevel.journey.forEach((_, i) => setTimeout(() => setShownLines(i + 1), 700 * i + 600))
      setTimeout(() => {
        setFinalDone()
        unlock('year-one')
        setTimeout(() => unlock('year-two'), 1100)
        setTimeout(() => unlock('no-final-boss'), 2200)
        setTimeout(() => unlock('favourite-person'), 3300)
      }, 700 * finalLevel.journey.length + 800)
    }
  }

  return (
    <div className="scene scene--final">
      <SpaceBg planet={false} />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="FINAL LEVEL" />

        {stage === 'boss' && (
          <div className="stage on">
            <p className="meta" style={{ color: 'var(--amber)', marginTop: 26, letterSpacing: '.32em' }}>
              FINAL LEVEL UNLOCKED
            </p>
            <div className="bosscard">
              <p className="meta" style={{ color: 'var(--cream-dim)' }}>
                FINAL BOSS
              </p>
              <h2>{finalLevel.bossName}</h2>
              <div className="bosshp">
                <XP label={`HP: ${finalLevel.bossHp}`} value={100} animate={false} />
              </div>
              <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 12 }}>
                WEAKNESS: {finalLevel.bossWeakness.toUpperCase()}
                <br />
                RECOMMENDED STRATEGY: {finalLevel.bossStrategy.toUpperCase()}
              </p>
            </div>
                        <button className="btn btn--red" onClick={attack}>
              {tries === 0 ? 'ATTACK' : 'FINE. CONTINUE.'}
            </button>
            {tries > 0 && (
              <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 12 }}>
                NO EFFECT. THE HP BAR APPEARS TO BE DECORATIVE.
              </p>
            )}
          </div>
        )}

        {stage === 'reveal' && (
          <div className="stage on">
            <p className="narr" style={{ color: 'var(--cream-hi)', marginTop: 46, fontSize: 21 }}>
              {finalLevel.reveal}
            </p>
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              {finalLevel.journey.map((j, i) => (
                <div key={j} className={'journeyline' + (i < shownLines ? ' show' : '')}>
                  {j}
                </div>
              ))}
            </div>
            {shownLines >= finalLevel.journey.length && (
              <>
                                <button className="btn btn--red" onClick={() => setStage('save')}>
                  NEW SAVE FILE
                </button>
              </>
            )}
          </div>
        )}

        {stage === 'save' && (
          <div className="stage on">
            <div className="goldpanel" style={{ marginTop: 40 }}>
              <div className="glow" aria-hidden="true" />
              <p className="newsave">NEW SAVE FILE CREATED</p>
              <h2
                style={{
                  fontFamily: 'var(--anton)',
                  fontSize: 56,
                  letterSpacing: '.08em',
                  color: 'var(--cream-hi)',
                  marginTop: 12,
                }}
              >
                {finalLevel.newSave}
              </h2>
              {finalLevel.message.map((m, i) => (
                <p key={i} className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 18 }}>
                  <P text={m} />
                </p>
              ))}
            </div>
            <PhotoRow photos={(finalLevel as { photos?: { src: string; caption: string }[] }).photos} />
            <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 20 }}>
              A LETTER HAS APPEARED IN THE MAIN MENU.
            </p>
                        <button className="btn" onClick={() => go('letter')}>
              READ IT ▸
            </button>
            <button className="btn btn--ghost" style={{ marginTop: 12 }} onClick={() => go('menu')}>
              MAIN MENU
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= THE LETTER ================= */
export function Letter() {
  const { p, setLetterOpened } = useGame()
  const [open, setOpen] = useState(p.letterOpened)

  return (
    <div className="scene scene--letter">
      <div className="beams" aria-hidden="true" />
      <div className="col">
        <SNav where="A LETTER" />
        {!open ? (
          <>
            <p className="narr" style={{ color: '#f5e7c8', marginTop: 60 }}>
              One envelope. Sealed.
            </p>
            <p className="meta" style={{ color: 'rgba(245,231,200,.5)', marginTop: 10 }}>
              HOLD THE SEAL TO BREAK IT.
            </p>
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <HoldButton
                label="T ✕ A"
                ms={2000}
                className="seal"
                onDone={() => {
                  sfx.play('unlock')
                  setOpen(true)
                  setLetterOpened()
                }}
              />
            </div>
          </>
        ) : (
          <div className="letterreveal">
            <div className="paper">
              <div className="pdate" style={{ animationDelay: '0.1s' }}>
                {letter.date}
              </div>
              <div className="greet" style={{ animationDelay: '0.5s' }}>
                {letter.greeting}
              </div>
              {letter.paragraphs.map((par, i) => (
                <p key={i} style={{ animationDelay: `${1 + i * 0.7}s` }}>
                  <P text={par} />
                </p>
              ))}
              <p style={{ animationDelay: `${1 + letter.paragraphs.length * 0.7}s`, marginTop: 24 }}>
                {letter.signoff}
              </p>
              <div className="sig" style={{ animationDelay: `${1.4 + letter.paragraphs.length * 0.7}s` }}>
                {letter.signature}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= EXTRAS / SETTINGS ================= */
export function Extras() {
  const { p, toggleSound, resetProgress, unlockEverything, info, go } = useGame()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="scene scene--tapes">
      <SpaceBg planet={false} />
      <div className="col">
        <SNav where="SYS" />
        <div className="bigttl" style={{ textAlign: 'left', marginTop: 8 }}>
          EXTRAS · SETTINGS
        </div>
        <div style={{ marginTop: 18 }}>
          <button className="exrow" onClick={toggleSound}>
            <span>SOUND</span>
            <span className="v">{p.sound ? 'ON' : 'OFF'}</span>
          </button>
          <button
            className="exrow"
            onClick={() => {
              unlockEverything()
              info('EVERYTHING UNLOCKED · ARCHIVIST MODE')
            }}
          >
            <span>ARCHIVIST MODE · UNLOCK ALL</span>
            <span className="v">FOR REVIEW</span>
          </button>
          <button
            className="exrow danger"
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true)
                info('TAP AGAIN TO CONFIRM')
              } else {
                resetProgress()
              }
            }}
          >
            <span>RESET PROGRESS</span>
            <span className="v">{confirmReset ? 'ARE YOU SURE?' : '···'}</span>
          </button>
        </div>

        <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 30, textAlign: 'left' }}>
          EASTER EGGS FOUND: {p.eggs.length}/2
          <br />
          THEY ARE NOT LISTED HERE. THAT WOULD DEFEAT THE PURPOSE.
        </p>
                <p className="meta" style={{ color: 'rgba(237,224,196,.35)' }}>
          BUILT FOR TWO PLAYERS ONLY.
        </p>
      </div>
    </div>
  )
}

/* ============ EASTER EGG: THE DRAMATIC CAFÉ RECOMMENDATION ============ */
export function EggCafe() {
  const { go } = useGame()
  return (
    <div className="scene scene--dinner">
      <div className="lights" aria-hidden="true" />
      <div className="col">
        <div className="snav">
          <span className="where">CLASSIFIED</span>
        </div>
        <p className="meta" style={{ color: 'var(--amber)', letterSpacing: '.32em', marginTop: 40 }}>
          YOU FOUND SOMETHING
        </p>
        <div className="bosscard" style={{ borderColor: 'var(--amber)' }}>
          <p className="meta" style={{ color: 'var(--cream-dim)' }}>
            AN UNNECESSARILY DRAMATIC CAFÉ RECOMMENDATION
          </p>
          <p className="narr" style={{ color: 'var(--cream-hi)', marginTop: 16 }}>
            “There is a café in Vile Parle East.
            <br />
            <br />
            The coffee is fine. The seating is adequate.
            <br />
            <br />
            But understand this: a single question about cafés once altered the course of two entire lives.
            <br />
            <br />
            Order accordingly.”
          </p>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
            — THE NARRATOR, WHO WAS THERE
          </p>
        </div>
                <button className="btn" onClick={() => go('menu')}>
          PRETEND THIS DIDN’T HAPPEN
        </button>
      </div>
    </div>
  )
}
