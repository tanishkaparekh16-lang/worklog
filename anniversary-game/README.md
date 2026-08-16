# ANAY & TANISHKA — The Adventure So Far

A two-player anniversary game. One player. The other one built it.

Design language: **Analog Nights** — CRTs, vintage poster ads, cassettes,
Mumbai local trains, golden-hour light.

## Run it

```bash
cd anniversary-game
npm install
npm run dev      # local development
npm run build    # production build → dist/
```

The build uses relative paths (`base: './'`), so the `dist/` folder deploys
anywhere: Vercel, Netlify, GitHub Pages, or any static host. On Vercel or
Netlify set the project root to `anniversary-game/`.

## Where everything lives

| What | Where |
| --- | --- |
| **All personal content** | `src/data/relationshipData.ts` |
| Photos | `public/assets/images/` (replace `memory-0X-placeholder.svg`) |
| Songs (optional files) | `public/assets/audio/` |
| Videos (optional) | `public/assets/video/` |
| Design tokens / styling | `src/styles/global.css` |
| Progress + save state | `src/state/progress.tsx` (localStorage) |
| Game sounds | `src/audio/sfx.ts` (synthesized, no files) |
| Chapters 1–9 | `src/scenes/chapters.tsx` |
| Arcade mini-games | `src/scenes/Arcade.tsx` |
| Soundtrack, achievements, stats, map, final level, letter | `src/scenes/collection.tsx` |

## Filling in the real content

Open `src/data/relationshipData.ts`. Every string that starts with
`[PLACEHOLDER` renders **with a dashed red marker** in the game so it
cannot be missed. Replace the text, keep the quotes. Placeholders exist for:

- Chapter 4's five friendship memories
- The Chapter 7 train-journey feeling (one honest sentence)
- **The Chapter 8 confession + reply (use the real texts, word for word)**
- The five arcade memories (title, date, location, story, photo)
- The three soundtrack entries (title, artist, why it matters)
- The letter (`letter.paragraphs`)
- The final message (`finalLevel.message`)
- Real Finanza stats if desired (`statsNote`)

Nothing else needs touching. The stats, achievements, and all narration are
already written and editable in the same file.

## Reviewing without replaying

EXTRAS · SETTINGS → **ARCHIVIST MODE** unlocks every chapter, the arcade,
the final level and the letter at once. RESET PROGRESS (tap twice) returns
the game to a fresh save — use it before gifting.

## Rules the build follows

- Progression is strictly sequential; the letter unlocks only after the
  final level.
- Sound is off by default and synthesized in-browser — nothing autoplays.
- No real photos or names beyond the two players; characters are faceless
  figures until real photos arrive.
- Mobile-first, works on desktop, honors `prefers-reduced-motion`.
