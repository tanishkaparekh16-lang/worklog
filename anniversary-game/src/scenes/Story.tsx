import React from 'react'
import { chapters } from '../data/relationshipData'
import { SNav, SpaceBg } from '../components/ui'
import { useGame } from '../state/progress'

export default function Story() {
  const { p, go, isChapterOpen, info, storyComplete } = useGame()
  return (
    <div className="scene scene--story">
      <SpaceBg planet={false} />
      <div className="col">
        <SNav where="THE STORY" />
        <div className="bigttl" style={{ textAlign: 'left', marginTop: 8 }}>
          CHAPTERS
        </div>
        <div className="bigsub" style={{ textAlign: 'left', marginTop: 6 }}>
          PLAY IN ORDER. THE ORDER IS THE POINT.
        </div>
        <div style={{ position: 'relative', marginTop: 18 }}>
          <div className="mapline" aria-hidden="true" />
          {chapters.map((c) => {
            const open = isChapterOpen(c.id)
            const done = p.chaptersDone.includes(c.id)
            return (
              <button
                key={c.id}
                className={'chnode' + (done ? ' done' : '') + (open ? '' : ' locked')}
                onClick={() => (open ? go(c.id) : info('LOCKED · COMPLETE THE PREVIOUS CHAPTER'))}
              >
                <span className="dot" />
                <span style={{ flex: 1 }}>
                  <span className="k">CHAPTER {c.num}</span>
                  <h3>{open ? c.title : '???'}</h3>
                  <span className="s">{open ? c.place.toUpperCase() : 'LOCKED'}</span>
                </span>
                {done && <span className="badge-done">CLEARED ✓</span>}
              </button>
            )
          })}
          <button
            className={'chnode' + (p.finalDone ? ' done' : '') + (storyComplete ? '' : ' locked')}
            onClick={() => (storyComplete ? go('final') : info('LOCKED · THE STORY COMES FIRST'))}
          >
            <span className="dot" />
            <span style={{ flex: 1 }}>
              <span className="k">FINAL LEVEL</span>
              <h3>{storyComplete ? 'THE END?' : '???'}</h3>
              <span className="s">{storyComplete ? 'NO SPOILERS' : 'LOCKED'}</span>
            </span>
            {p.finalDone && <span className="badge-done">CLEARED ✓</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
