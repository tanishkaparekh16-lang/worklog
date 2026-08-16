import React, { useEffect, useState } from 'react'
import {
  apologyEmail,
  cafeText,
  chapters,
  dinnerAnswer,
  dinnerQuestion,
  players,
} from '../data/relationshipData'
import { Figure, HoldButton, P, SNav, TrainScenery, XP } from '../components/ui'
import { useGame } from '../state/progress'
import { sfx } from '../audio/sfx'

const ch = (id: string) => chapters.find((c) => c.id === id)!

export function Head({ id, dark = false }: { id: string; dark?: boolean }) {
  const c = ch(id)
  return (
    <>
      <div className="redband">
        CHAPTER {c.num} · {c.year}
      </div>
      <div className="chhead" style={dark ? { color: 'var(--cream-hi)' } : undefined}>
        <div className="num">EVENT CLASSIFICATION: {c.classification.toUpperCase()}</div>
        <h2>{c.title}</h2>
        <div className="place">{c.place}</div>
      </div>
    </>
  )
}

export function Narration({ lines, dark = false }: { lines: readonly string[]; dark?: boolean }) {
  return (
    <div style={{ marginTop: 18 }}>
      {lines.map((l, i) => (
        <p key={i} className="narr" style={{ marginTop: i ? 8 : 0, color: dark ? 'var(--cream-hi)' : undefined }}>
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
    <div className="scene scene--paper">
      <div className="halft" aria-hidden="true" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 01" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch1" />
          <div className="cup" aria-hidden="true" />
          <Narration lines={c.intro} />
          <div className="qbox" style={{ marginTop: 'auto' }}>
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
          <p className="meta" style={{ marginTop: 20, color: 'var(--ink-dim)' }}>
            {c.completeNote.toUpperCase()}
          </p>
          <div style={{ marginTop: 'auto' }} />
          <NextBtn current="ch1" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 02 — ONLINE FRIENDSHIP, OFFLINE NPC ============ */
export function Ch2() {
  const { completeChapter } = useGame()
  const [stage, setStage] = useState<'intro' | 'play' | 'done'>('intro')
  const [sent, setSent] = useState(0)
  const [rlTries, setRlTries] = useState(0)
  const c = ch('ch2')

  const rlFails = [
    'ATTEMPT LOGGED. NO WORDS WERE PRODUCED.',
    'A NOD OCCURRED. HISTORIANS REMAIN DIVIDED ON WHETHER IT COUNTED.',
    'CONVERSATION POSTPONED. AGAIN.',
  ]

  const online = Math.min(100, sent * 25 + 25)
  const offline = Math.min(18, rlTries * 6)
  const canFinish = sent >= 3 && rlTries >= 1

  return (
    <div className="scene scene--split">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 02" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch2" dark />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 26 }}>
            <Figure who="p1" h={110} />
            <Figure who="p2" h={110} flip />
          </div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 10 }}>
            SAME CLASSROOM. EVERY DAY.
          </p>
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 'auto' }} onClick={() => setStage('play')}>
            RUN THE EXPERIMENT
          </button>
        </div>

        <div className={'stage' + (stage === 'play' ? ' on' : '')}>
          <div className="split">
            <div className="pane pane--online">
              <div className="hd">ONLINE MODE</div>
              <div className="bd">
                {Array.from({ length: sent }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="bubble bubble--a">████ ███ ████ ██</div>
                    <div className="bubble bubble--t">███ ████ ██ ████ ███</div>
                  </React.Fragment>
                ))}
                {sent > 1 && <div className="bubble bubble--sys">ROASTING DETECTED. MUTUAL. AFFECTIONATE.</div>}
              </div>
            </div>
            <div className="pane pane--offline">
              <div className="hd">REAL LIFE MODE</div>
              <div className="bd">
                {Array.from({ length: rlTries }).map((_, i) => (
                  <div key={i} className="bubble bubble--sys">
                    {rlFails[Math.min(i, rlFails.length - 1)]}
                  </div>
                ))}
                {rlTries === 0 && <div className="bubble bubble--sys">NO ACTIVITY RECORDED</div>}
              </div>
            </div>
          </div>

          <div className="convmeter">
            <XP label={`ONLINE CONVERSATION — ${online}%`} value={online} animate={false} />
            <XP label={`OFFLINE CONVERSATION — SURPRISINGLY LOW`} value={offline} animate={false} rose />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
            <button
              className="btn"
              onClick={() => {
                sfx.play('notify')
                setSent((s) => Math.min(4, s + 1))
              }}
            >
              SEND SOMETHING
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => {
                sfx.play('wrong')
                setRlTries((s) => Math.min(3, s + 1))
              }}
            >
              SAY SOMETHING
              <br />
              IN PERSON
            </button>
          </div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
            ONE OF THESE BUTTONS WORKS.
          </p>
          <button
            className="btn btn--red"
            style={{ marginTop: 'auto' }}
            disabled={!canFinish}
            onClick={() => {
              sfx.play('complete')
              completeChapter('ch2')
              setStage('done')
            }}
          >
            {canFinish ? 'DOCUMENT THE ANOMALY' : 'KEEP TRYING BOTH MODES'}
          </button>
        </div>

        <div className={'stage' + (stage === 'done' ? ' on' : '')}>
          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <span className="stamp stamp--big">DOCUMENTED</span>
          </div>
          <Narration lines={c.complete} dark />
          <div style={{ marginTop: 'auto' }} />
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
    <div className="scene scene--dinner">
      <div className="lights" aria-hidden="true" />
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 03" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch3" dark />
          <div className="dinnertable">
            <div className="tabletop" aria-hidden="true" />
            <Figure who="p1" h={104} />
            <Figure who="p2" h={104} flip />
          </div>
          <Narration lines={[c.intro[0]]} dark />
          <button className="btn" style={{ marginTop: 'auto' }} onClick={() => setStage('q')}>
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
          <button className="btn" style={{ marginTop: 'auto' }} onClick={() => setStage('sincere')}>
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
          <div style={{ marginTop: 'auto' }} />
          <button className="btn btn--red" style={{ marginTop: 18 }} onClick={() => completeChapter('ch3')}>
            KEEP THIS ONE
          </button>
          <NextBtn current="ch3" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 04 — THE FRIENDSHIP ARC ============ */
export function Ch4() {
  const { completeChapter, unlock } = useGame()
  const [cleared, setCleared] = useState(0)
  const [emailOpen, setEmailOpen] = useState(false)
  const c = ch('ch4')
  const levels = c.levels!
  const done = cleared >= levels.length

  const advance = (i: number) => {
    sfx.play(i === levels.length - 1 ? 'complete' : 'unlock')
    setCleared((x) => x + 1)
    if (i === levels.length - 1) completeChapter('ch4')
  }

  return (
    <div className="scene scene--lines">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 04" />
        <Head id="ch4" />
        <Narration lines={c.intro} />

        {levels.map((lv, i) => {
          const open = i <= cleared
          const isNext = i === cleared
          return (
            <div key={lv.id} className={'lvlcard' + (open ? '' : ' locked')}>
              <div className="k">LEVEL {lv.id}</div>
              <h3>{open ? lv.name : '???'}</h3>
              {open && (
                <p className="story">
                  <P text={lv.story} />
                </p>
              )}

              {isNext && !done && lv.kind === 'hold' && (
                <HoldButton label="HOLD TO PROCESS" className="btn btn--ink holdbtn" onDone={() => advance(i)} />
              )}

              {isNext && !done && lv.kind === 'block' && (
                <button
                  className="btn btn--red"
                  style={{ marginTop: 14 }}
                  onClick={() => {
                    sfx.play('wrong')
                    advance(i)
                  }}
                >
                  PLAY AS TANISHKA: BLOCK HIM
                </button>
              )}
              {i === 2 && cleared > 2 && (
                <p className="meta" style={{ marginTop: 12, color: 'var(--red)', textAlign: 'left' }}>
                  BLOCKED. TERMS OF UNBLOCKING: ONE (1) FORMAL APOLOGY EMAIL.
                </p>
              )}

              {isNext && !done && lv.kind === 'email' && !emailOpen && (
                <button className="btn btn--ink" style={{ marginTop: 14 }} onClick={() => { sfx.play('notify'); setEmailOpen(true) }}>
                  OPEN THE EMAIL
                </button>
              )}
              {isNext && !done && lv.kind === 'email' && emailOpen && (
                <>
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
                      {apologyEmail.paragraphs.map((p, pi) => (
                        <p key={pi}>{p}</p>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn--red"
                    style={{ marginTop: 14 }}
                    onClick={() => {
                      unlock('apology-email')
                      advance(i)
                    }}
                  >
                    ACCEPT APOLOGY · RELUCTANTLY
                  </button>
                </>
              )}

              {isNext && !done && lv.kind === 'pizza' && (
                <button
                  className="btn btn--red"
                  style={{ marginTop: 14 }}
                  onClick={() => {
                    unlock('pizza-diplomacy')
                    advance(i)
                  }}
                >
                  ACCEPT THE PIZZA
                </button>
              )}
            </div>
          )
        })}

        {done && (
          <>
            <div style={{ textAlign: 'center', marginTop: 26 }}>
              <span className="stamp stamp--big">QUESTIONABLE</span>
            </div>
            <Narration lines={c.complete} />
            <NextBtn current="ch4" />
          </>
        )}
      </div>
    </div>
  )
}

/* ============ CHAPTER 05 — FINANZA ============ */
export function Ch5() {
  const { completeChapter } = useGame()
  const [accepted, setAccepted] = useState(false)
  const [shown, setShown] = useState(0)
  const [views, setViews] = useState(0)
  const c = ch('ch5')
  const abilities = c.abilities!

  const accept = () => {
    if (accepted) return
    sfx.play('complete')
    setAccepted(true)
    abilities.forEach((_, i) => setTimeout(() => setShown(i + 1), 450 * i + 400))
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 2200)
      setViews(Math.floor(p * p * 184673))
      if (p < 1) requestAnimationFrame(tick)
      else completeChapter('ch5')
    }
    requestAnimationFrame(tick)
  }

  return (
    <div className="scene scene--finanza">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 05" />
        <Head id="ch5" dark />
        <div className="crest">DM</div>
        <Narration lines={c.intro} dark />

        {!accepted && (
          <button className="btn btn--red" style={{ marginTop: 26 }} onClick={accept}>
            ACCEPT THE ROLE
          </button>
        )}

        <div className="abilities">
          {abilities.map((a, i) => (
            <div key={a} className={'ability' + (i < shown ? ' show' : '')}>
              <span className="st">◆</span>
              <span>{a.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {accepted && (
          <>
            <div className="viewcount">
              {views.toLocaleString('en-IN')}
              <span className="lbl">VIEWS · ILLUSTRATIVE — REAL NUMBERS PENDING</span>
            </div>
            <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 10 }}>
              <P text={c.statsNote!} />
            </p>
          </>
        )}

        {shown >= abilities.length && (
          <>
            <div style={{ marginTop: 'auto' }} />
            <NextBtn current="ch5" />
          </>
        )}
      </div>
    </div>
  )
}

/* ============ CHAPTER 06 — TANISHKA'S SECRET QUEST ============ */
export function Ch6() {
  const { completeChapter } = useGame()
  const [revealed, setRevealed] = useState(false)
  const c = ch('ch6')

  return (
    <div className="scene scene--secret">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 06" />
        <Head id="ch6" dark />
        <Narration lines={c.intro} dark />

        <div className={'secretfile' + (revealed ? ' revealed' : '')}>
          <div className="hd">SIDE QUEST DETECTED</div>
          <p className="narr" style={{ textAlign: 'left', marginTop: 14, color: 'var(--cream-hi)' }}>
            “<span className="redacted">TANISHKA’S FEELINGS</span>”
          </p>
          <p className="meta" style={{ textAlign: 'left', marginTop: 12, color: 'var(--cream-dim)' }}>
            STATUS: <span className="redacted">NOT DISCLOSED</span>
          </p>
          <XP label="PROGRESS" value={revealed ? 82 : 0} rose />
          <p className="meta" style={{ textAlign: 'left', marginTop: 12, color: 'var(--rose)' }}>
            THIS QUEST CANNOT CURRENTLY BE DISCUSSED WITH PLAYER 1.
          </p>
        </div>

        {!revealed ? (
          <HoldButton
            label="DECLASSIFY · QUIETLY"
            ms={2200}
            className="btn holdbtn"
            onDone={() => {
              sfx.play('unlock')
              setRevealed(true)
              completeChapter('ch6')
            }}
          />
        ) : (
          <>
            <Narration lines={c.complete} dark />
            <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
              SHE HAD KNOWN FOR A WHILE. SHE TOLD NO ONE. LEAST OF ALL HIM.
            </p>
            <div style={{ marginTop: 'auto' }} />
            <NextBtn current="ch6" />
          </>
        )}
      </div>
    </div>
  )
}

/* ============ CHAPTER 07 — THE LOCAL TRAIN ============ */
export function Ch7() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'ride' | 'arrived' | 'debrief'>('intro')
  const [wave, setWave] = useState(0)
  const [side, setSide] = useState<'l' | 'r'>('l')
  const [blocked, setBlocked] = useState(false)
  const c = ch('ch7')
  const WAVES = 4

  useEffect(() => {
    if (stage !== 'ride') return
    setSide(Math.random() > 0.5 ? 'l' : 'r')
    setBlocked(false)
  }, [wave, stage])

  const stepIn = () => {
    if (blocked) return
    sfx.play('click')
    setBlocked(true)
    setTimeout(() => {
      if (wave + 1 >= WAVES) {
        sfx.play('complete')
        setStage('arrived')
        setTimeout(() => unlock('local-train'), 800)
      } else {
        setWave((w) => w + 1)
      }
    }, 650)
  }

  return (
    <div className="scene scene--train">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 07" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch7" dark />
          <div className="stationboard">
            <div className="en">VILE PARLE → MALAD</div>
            <div className="dv">विले पारले → मालाड</div>
          </div>
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 'auto' }} onClick={() => setStage('ride')}>
            BOARD THE TRAIN
          </button>
        </div>

        <div className={'stage' + (stage === 'ride' ? ' on' : '')}>
          <div className="trainwin">
            <div className="scroller">
              <div className="cityrow">
                <TrainScenery />
              </div>
              <div className="cityrow">
                <TrainScenery />
              </div>
            </div>
          </div>
          <div className="trainbar">
            <span>WESTERN LINE · TOWARDS MALAD</span>
            <span>
              {wave + 1}/{WAVES}
            </span>
          </div>

          <div className="traincar">
            <div className="pole" style={{ left: '18%' }} />
            <div className="pole" style={{ left: '78%' }} />
            <div
              className="crowd"
              style={{
                left: side === 'l' ? 10 : undefined,
                right: side === 'r' ? 10 : undefined,
                transform: blocked ? 'translateX(0)' : side === 'l' ? 'translateX(26px)' : 'translateX(-26px)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 6,
                flexDirection: side === 'l' ? 'row' : 'row-reverse',
                transition: 'all .4s',
              }}
            >
              {blocked && <Figure who="p1" h={96} flip={side === 'r'} />}
              <Figure who="p2" h={92} />
              {!blocked && <span style={{ width: 43 }} />}
            </div>
          </div>

          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
            THE CROWD LEANS {side === 'l' ? 'LEFT' : 'RIGHT'}.
          </p>
          <button className="btn btn--red" style={{ marginTop: 12 }} onClick={stepIn} disabled={blocked}>
            {blocked ? 'POSITION HELD' : 'ANAY: STEP IN'}
          </button>
        </div>

        <div className={'stage' + (stage === 'arrived' ? ' on' : '')}>
          <div className="stationboard" style={{ marginTop: 22 }}>
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
              <p key={i} className="narr" style={{ color: '#f5e7c8', fontStyle: 'normal', marginTop: 14 }}>
                <P text={l} />
              </p>
            ))}
          </div>
          <div style={{ marginTop: 'auto' }} />
          <button className="btn" style={{ marginTop: 18 }} onClick={() => setStage('debrief')}>
            SHORTLY AFTERWARDS —
          </button>
        </div>

        <div className={'stage' + (stage === 'debrief' ? ' on' : '')}>
          <div className="secretfile revealed" style={{ marginTop: 30, borderColor: 'rgba(232,163,61,.4)' }}>
            <div className="hd" style={{ color: 'var(--amber)' }}>
              DEBRIEF · CLASSIFIED
            </div>
            <p className="narr" style={{ textAlign: 'left', marginTop: 14, color: 'var(--cream-hi)' }}>
              Anay told Rashi that he likes Tanishka.
            </p>
            <p className="narr" style={{ textAlign: 'left', marginTop: 10, color: 'var(--cream-hi)' }}>
              A planning committee of two was formed on the spot.
            </p>
            <p className="meta" style={{ textAlign: 'left', marginTop: 14, color: 'var(--cream-dim)' }}>
              RASHI’S STRATEGY: START WITH LITTLE HINTS.
              <br />
              STATUS: ADOPTED.
            </p>
          </div>
          <div style={{ marginTop: 'auto' }} />
          <button className="btn btn--red" style={{ marginTop: 18 }} onClick={() => completeChapter('ch7')}>
            REMEMBER THIS ONE
          </button>
          <NextBtn current="ch7" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 08 — STREE 2 ============ */
const SEAT_START = ['ANAY', 'RASHI', 'FRIEND', 'TANISHKA', 'FRIEND']
export function Ch8() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'intro' | 'seats' | 'done'>('intro')
  const [seats, setSeats] = useState<string[]>(SEAT_START)
  const [sel, setSel] = useState<number | null>(null)
  const c = ch('ch8')

  const win = (arr: string[]) => {
    const a = arr.indexOf('ANAY')
    const t = arr.indexOf('TANISHKA')
    return Math.abs(a - t) === 1
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
    setSeats(next)
    setSel(null)
    if (win(next)) {
      sfx.play('complete')
      setTimeout(() => {
        setStage('done')
        unlock('strategic-seating')
        completeChapter('ch8')
      }, 600)
    }
  }

  return (
    <div className="scene scene--cinema">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 08" />

        <div className={'stage' + (stage === 'intro' ? ' on' : '')}>
          <Head id="ch8" dark />
          <div className="cinescreen">STREE 2</div>
          <Narration lines={c.intro} dark />
          <button className="btn" style={{ marginTop: 'auto' }} onClick={() => setStage('seats')}>
            PLAY AS RASHI: ARRANGE THE SEATS
          </button>
        </div>

        <div className={'stage' + (stage === 'seats' ? ' on' : '')}>
          <div className="cinescreen">STREE 2</div>
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 20 }}>
            TAP TWO SEATS TO SWAP THEM.
            <br />
            THE COINCIDENCE MUST LOOK NATURAL.
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
          <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 16 }}>
            OBJECTIVE: ANAY NEXT TO TANISHKA.
          </p>
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
          <div style={{ marginTop: 'auto' }} />
          <NextBtn current="ch8" />
        </div>
      </div>
    </div>
  )
}

/* ============ CHAPTER 09 — 05:00 AM ============ */
export function Ch9() {
  const { completeChapter, unlock } = useGame()
  const [stage, setStage] = useState<'lock' | 'msg' | 'later' | 'joined'>('lock')
  const c = ch('ch9')

  return (
    <div className="scene scene--phone">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 09" />

        {stage === 'lock' && (
          <div className="phone">
            <div className="ptime">05:00</div>
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
                <br />1 new message
              </div>
            </button>
            <p className="skipnote">TAP TO OPEN</p>
          </div>
        )}

        {stage === 'msg' && (
          <div className="phone">
            <p className="skipnote" style={{ marginTop: 4 }}>
              ANAY · 05:00
            </p>
            <div className="msgs">
              {c.confessionMessages!.map((m, i) => (
                <div key={i} className="bubble bubble--a" style={{ fontSize: 12, animationDelay: `${i * 0.5}s` }}>
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
                setStage('joined')
                setTimeout(() => unlock('five-am'), 600)
                setTimeout(() => unlock('player-2'), 1700)
              }}
            >
              SEND
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
            <div style={{ marginTop: 'auto' }} />
            <button className="btn btn--red" onClick={() => completeChapter('ch9')}>
              BEGIN THE CAMPAIGN
            </button>
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
  const [a, setA] = useState(0)
  const [t, setT] = useState(0)
  const [crossed, setCrossed] = useState(false)
  const c = ch('ch10')
  const both = a >= 90 && t >= 34

  useEffect(() => {
    if (both && !crossed) {
      const timer = setTimeout(() => {
        sfx.play('complete')
        setCrossed(true)
        completeChapter('ch10')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [both, crossed])

  return (
    <div className="scene scene--duo">
      <div className="col">
        <SNav back="story" label="← CHAPTERS" where="CH. 10" />
        <Head id="ch10" dark />
        <p className="meta" style={{ color: 'var(--cream-dim)', marginTop: 14 }}>
          TAP EACH CREST TO POWER THEM UP.
        </p>

        <div className="duo">
          <div className={'duocard' + (a > 0 ? ' active' : '')}>
            <button
              className="crest"
              style={{ width: 76, height: 76, fontSize: 20, margin: '0 auto' }}
              onClick={() => {
                sfx.play('click')
                setA((x) => Math.min(90, x + 30))
              }}
            >
              DM
            </button>
            <div className="nm" style={{ marginTop: 12 }}>
              {players.p1.name}
            </div>
            <div className="rl">HEAD OF DIGITAL MEDIA · FINANZA</div>
            <div className="xbar">
              <i style={{ width: `${a}%` }} />
            </div>
            <div className="rl" style={{ marginTop: 8 }}>
              {a >= 90 ? 'EXPERIENCED. ANNOYINGLY.' : 'EXPERIENCE'}
            </div>
          </div>
          <div className={'duocard' + (t > 0 ? ' active' : '')}>
            <button
              className="crest"
              style={{ width: 76, height: 76, fontSize: 20, margin: '0 auto', borderColor: 'var(--rose)', color: 'var(--rose)' }}
              onClick={() => {
                sfx.play('click')
                setT((x) => Math.min(34, x + 17))
              }}
            >
              SM
            </button>
            <div className="nm" style={{ marginTop: 12 }}>
              {players.p2.name}
            </div>
            <div className="rl">HEAD OF SOCIAL MEDIA · ANOTHER FEST</div>
            <div className="xbar xbar--rose">
              <i style={{ width: `${t}%` }} />
            </div>
            <div className="rl" style={{ marginTop: 8 }}>
              {t >= 34 ? 'NEW TO EDITING. THE BAR IS HONEST.' : 'EXPERIENCE'}
            </div>
          </div>
        </div>

        <div className={'crosspath' + (crossed ? ' go' : '')} aria-hidden="true">
          <svg viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M20 10 C 150 10, 250 70, 380 70" stroke="#E8A33D" />
            <path d="M20 70 C 150 70, 250 10, 380 10" stroke="#C98A93" />
          </svg>
        </div>

        {crossed && (
          <>
            <Narration lines={c.intro} dark />
            <Narration lines={c.complete} dark />
            <div style={{ marginTop: 'auto' }} />
            <button className="btn btn--red" style={{ marginTop: 18 }} onClick={() => go('r1')}>
              ACT II: THE RELATIONSHIP ARC ▸
            </button>
          </>
        )}
      </div>
    </div>
  )
}
