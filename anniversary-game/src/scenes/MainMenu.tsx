import React, { useRef } from 'react'
import { chapters, meta } from '../data/relationshipData'
import { SpaceBg } from '../components/ui'
import { useGame } from '../state/progress'

export default function MainMenu() {
  const { p, go, info, relationshipArc, foundEgg, unlock } = useGame()
  const taps = useRef(0)

  /* easter egg: tap the title seven times */
  const titleTap = () => {
    taps.current += 1
    if (taps.current === 7) {
      foundEgg('dramatic')
      unlock('egg-dramatic')
      go('egg-cafe')
    }
  }

  const locked = (what: string) => info(`${what} · FINISH THE STORY FIRST`)
  const arcadeOpen = p.chaptersDone.includes('ch3')

  return (
    <div className={'scene scene--menu' + (relationshipArc ? ' arc2' : '')}>
      <SpaceBg />
      <div className="col">
        <div className="snav">
          <span className="where">MAIN MENU</span>
          <button onClick={() => go('boot')}>REWIND ⏮</button>
        </div>
        <div className="poster">
          <div className="check" />
          <div className="postin">
            <div className="since">✦ SINCE 2023 ✦</div>
            <div
              className="ptitle"
              onClick={titleTap}
              role="presentation"
              dangerouslySetInnerHTML={undefined}
            >
              {meta.title.split('&')[0].trim()} &<br />
              {meta.title.split('&')[1].trim()}
            </div>
            <div className="pscript">the adventure so far</div>
            <div className="pfine">{meta.tagline.toUpperCase()}</div>
            <div className="mlist">
              <button className="mi" onClick={() => go('story')}>
                <span>STORY</span>
                <span className="no">
                  {p.chaptersDone.length}/{chapters.length}
                </span>
              </button>
              <button
                className={'mi' + (arcadeOpen ? '' : ' locked')}
                onClick={() => (arcadeOpen ? go('arcade') : info('LOCKED · REACH CHAPTER 04'))}
              >
                <span>MEMORY ARCADE</span>
                <span className="no">{arcadeOpen ? `${p.arcadeDone.length}/5` : '···'}</span>
              </button>
              <button className="mi" onClick={() => go('ost')}>
                <span>SOUNDTRACK</span>
                <span className="no">SIDE A</span>
              </button>
              <button className="mi" onClick={() => go('tapes')}>
                <span>ACHIEVEMENTS</span>
                <span className="no">{p.achievements.length}</span>
              </button>
              <button className="mi" onClick={() => go('stats')}>
                <span>CHARACTER STATS</span>
                <span className="no">P1·P2</span>
              </button>
              <button className="mi" onClick={() => go('map')}>
                <span>THE MAP</span>
                <span className="no">◆</span>
              </button>
              <button
                className={'mi' + (p.finalDone ? '' : ' locked')}
                onClick={() => (p.finalDone ? go('letter') : locked('SEALED'))}
              >
                <span>A LETTER</span>
                <span className="no">{p.finalDone ? '✉' : '···'}</span>
              </button>
              <button className="mi" onClick={() => go('extras')}>
                <span>EXTRAS · SETTINGS</span>
                <span className="no">SYS</span>
              </button>
            </div>
          </div>
          <div className="pbadge">
            <span className="in">
              2 YRS
              <br />
              &amp; CTG.
            </span>
          </div>
          <div className="pfoot">MUMBAI · EST. {meta.collegeShort}</div>
          <div className="check" />
        </div>
      </div>
    </div>
  )
}
