import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { achievements, chapters } from '../data/relationshipData'
import { sfx } from '../audio/sfx'

const KEY = 'at-adventure-save-v1'

export type Progress = {
  booted: boolean
  chaptersDone: string[]
  arcadeDone: string[]
  achievements: string[]
  eggs: string[]
  finalDone: boolean
  letterOpened: boolean
  sound: boolean
}

const empty: Progress = {
  booted: false,
  chaptersDone: [],
  arcadeDone: [],
  achievements: [],
  eggs: [],
  finalDone: false,
  letterOpened: false,
  sound: false,
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...empty, ...JSON.parse(raw) }
  } catch {}
  return empty
}

type Toast = { title: string; kind: 'achievement' | 'info' } | null

type Ctx = {
  p: Progress
  route: string
  go: (r: string) => void
  completeChapter: (id: string) => void
  completeArcade: (id: string) => void
  unlock: (achId: string) => void
  foundEgg: (id: string) => void
  setFinalDone: () => void
  setLetterOpened: () => void
  toggleSound: () => void
  resetProgress: () => void
  unlockEverything: () => void
  isChapterOpen: (id: string) => boolean
  storyComplete: boolean
  relationshipArc: boolean
  toast: Toast
  info: (msg: string) => void
}

const C = createContext<Ctx>(null as unknown as Ctx)
export const useGame = () => useContext(C)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [p, setP] = useState<Progress>(load)
  const [route, setRoute] = useState<string>('boot')
  const [toast, setToast] = useState<Toast>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p))
    } catch {}
  }, [p])

  useEffect(() => {
    sfx.enabled = p.sound
  }, [p.sound])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const api = useMemo<Ctx>(() => {
    const unlock = (achId: string) => {
      setP((prev) => {
        if (prev.achievements.includes(achId)) return prev
        const a = achievements.find((x) => x.id === achId)
        if (a) {
          sfx.play('unlock')
          setToast({ title: a.title, kind: 'achievement' })
        }
        return { ...prev, achievements: [...prev.achievements, achId] }
      })
    }

    return {
      p,
      route,
      go: (r: string) => {
        sfx.play('click')
        setRoute(r)
        window.scrollTo(0, 0)
      },
      completeChapter: (id: string) =>
        setP((prev) =>
          prev.chaptersDone.includes(id)
            ? prev
            : { ...prev, chaptersDone: [...prev.chaptersDone, id], booted: true },
        ),
      completeArcade: (id: string) =>
        setP((prev) =>
          prev.arcadeDone.includes(id)
            ? prev
            : { ...prev, arcadeDone: [...prev.arcadeDone, id] },
        ),
      unlock,
      foundEgg: (id: string) =>
        setP((prev) =>
          prev.eggs.includes(id) ? prev : { ...prev, eggs: [...prev.eggs, id] },
        ),
      setFinalDone: () => setP((prev) => ({ ...prev, finalDone: true })),
      setLetterOpened: () => setP((prev) => ({ ...prev, letterOpened: true })),
      toggleSound: () => setP((prev) => ({ ...prev, sound: !prev.sound })),
      resetProgress: () => {
        setP(empty)
        setRoute('boot')
      },
      unlockEverything: () =>
        setP((prev) => ({
          ...prev,
          chaptersDone: chapters.map((c) => c.id),
          arcadeDone: ['mem1', 'mem2', 'mem3', 'mem4', 'mem5'],
          finalDone: true,
        })),
      isChapterOpen: (id: string) => {
        const i = chapters.findIndex((c) => c.id === id)
        if (i <= 0) return true
        return p.chaptersDone.includes(chapters[i - 1].id)
      },
      storyComplete: chapters.every((c) => p.chaptersDone.includes(c.id)),
      relationshipArc: p.chaptersDone.includes('ch10'),
      toast,
      info: (msg: string) => setToast({ title: msg, kind: 'info' }),
    }
  }, [p, route, toast])

  return <C.Provider value={api}>{children}</C.Provider>
}
