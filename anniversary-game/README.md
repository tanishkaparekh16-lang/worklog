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

## Photos — exact filenames

Drop these files into `public/assets/images/` (JPG, any reasonable size —
they'll be cropped to fit). Each one has a slot waiting in the game that
lights up automatically:

| Filename | Where it appears |
| --- | --- |
| `first-text.jpg` | Ch 01 — the café-text screenshot |
| `chocolate-heaven.jpg` | Ch 11 — Anay at the first date |
| `chandelier.jpg` | Ch 11 — the café ceiling |
| `flowers.jpg` | Ch 12 — the bouquet |
| `kk-rain-park.jpg` | Ch 13 — the emptied park |
| `kk-rain-selfie.jpg` | Ch 13 — the soaked selfie |
| `kk-chai.jpg` | Ch 13 — chai after the rain |
| `hand-hold.jpg` | Ch 15 — the first hand-hold |
| `selfie-early.jpg` | Ch 17 — early close-up selfie |
| `sunglasses-t.jpg` | Ch 17 — Tanishka, lilac sunglasses |
| `sunglasses-a.jpg` | Ch 17 — Anay, giant black sunglasses |
| `plane.jpg` | Ch 20 — long distance |

Also `memory-01…05` for the arcade (replace the placeholder SVGs).

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
