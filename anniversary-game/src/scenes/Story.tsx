import React from 'react'
import { chapters } from '../data/relationshipData'
import { SNav, SpaceBg } from '../components/ui'
import { useGame } from '../state/progress'

function Node({ id }: { id: string }) {
  const { p, go, isChapterOpen, info } = useGame()
  const c = chapters.find((x) => x.id === id)!
  const open = isChapterOpen(c.id)
  const done = p.chaptersDone.includes(c.id)
  return (
    <button
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
}

export default function Story() {
  const { p, go, info, storyComplete, relationshipArc } = useGame()
  const act1 = chapters.filter((c) => c.act === 1)
  const act2 = chapters.filter((c) => c.act === 2)

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

        <div className="actlbl">ACT I · THE FRIENDSHIP ARC</div>
        <div style={{ position: 'relative' }}>
          <div className="mapline" aria-hidden="true" />
          {act1.map((c) => (
            <Node key={c.id} id={c.id} />
          ))}
        </div>

        <div className={'actlbl actlbl--rose' + (relationshipArc ? '' : ' locked')}>
          ACT II · THE RELATIONSHIP ARC {relationshipArc ? '' : '· LOCKED'}
        </div>
        <div style={{ position: 'relative' }}>
          <div className="mapline mapline--rose" aria-hidden="true" />
          {act2.map((c) => (
            <Node key={c.id} id={c.id} />
          ))}
        </div>

        <div style={{ position: 'relative', marginTop: 4 }}>
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
