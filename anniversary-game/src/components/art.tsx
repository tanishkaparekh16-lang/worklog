import React, { useMemo } from 'react'

/* ============================================================
   SCENE ART — full-bleed illustrated environments.
   Each scene is drawn on a 390 × 844 portrait stage and cropped
   with preserveAspectRatio="xMidYMid slice". The lower third is
   kept visually calm: the dialogue panel sits there.
   ============================================================ */

type Props = { kind: SceneKind }

export type SceneKind =
  | 'cafe'
  | 'classroom'
  | 'restaurant'
  | 'corridor'
  | 'stage'
  | 'darkroom'
  | 'train'
  | 'cinema'
  | 'bedroom'
  | 'fest'
  | 'parlour'
  | 'street'
  | 'park'
  | 'bungalow'
  | 'wall'
  | 'lake'
  | 'beach'
  | 'distance'

export function SceneArt({ kind }: Props) {
  const Art = ART[kind] ?? Cafe
  return (
    <div className="vnart" aria-hidden="true">
      <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
        <Art />
      </svg>
      <div className="vnart-fade" />
    </div>
  )
}

/* ---------- shared bits ---------- */

const Bulb = ({ x, y, r = 5, c = '#F5C97B' }: { x: number; y: number; r?: number; c?: string }) => (
  <g>
    <circle cx={x} cy={y} r={r * 5} fill={c} opacity=".10" />
    <circle cx={x} cy={y} r={r * 2.2} fill={c} opacity=".18" />
    <circle cx={x} cy={y} r={r} fill={c} />
  </g>
)

const Floor = ({ y, top, bottom }: { y: number; top: string; bottom: string }) => (
  <>
    <defs>
      <linearGradient id={`fl${y}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
    </defs>
    <rect x="0" y={y} width="390" height={844 - y} fill={`url(#fl${y})`} />
  </>
)

/* ---------- 01 · café interior, mid-morning ---------- */
function Cafe() {
  return (
    <>
      <defs>
        <linearGradient id="cafeWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0E4CC" />
          <stop offset="1" stopColor="#D8C4A2" />
        </linearGradient>
        <linearGradient id="cafeWin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF8E6" />
          <stop offset="1" stopColor="#F2D9A8" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#cafeWall)" />
      {/* big sunlit window */}
      <rect x="26" y="104" width="168" height="216" rx="4" fill="url(#cafeWin)" />
      <rect x="26" y="104" width="168" height="216" rx="4" fill="none" stroke="#A8875C" strokeWidth="6" />
      <line x1="110" y1="104" x2="110" y2="320" stroke="#A8875C" strokeWidth="6" />
      <line x1="26" y1="212" x2="194" y2="212" stroke="#A8875C" strokeWidth="6" />
      {/* light spilling onto the floor */}
      <path d="M26 320 L194 320 L250 560 L60 560 Z" fill="#FFF3D4" opacity=".45" />
      {/* shelf + jars */}
      <rect x="232" y="206" width="140" height="8" fill="#B08F63" />
      <rect x="244" y="176" width="22" height="30" rx="3" fill="#C9A97A" />
      <rect x="276" y="166" width="18" height="40" rx="3" fill="#D8BC90" />
      <rect x="304" y="180" width="24" height="26" rx="3" fill="#BE9C6E" />
      <rect x="340" y="172" width="20" height="34" rx="3" fill="#C9A97A" />
      {/* hanging lamps */}
      <line x1="126" y1="0" x2="126" y2="72" stroke="#A8875C" strokeWidth="2" />
      <line x1="252" y1="0" x2="252" y2="52" stroke="#A8875C" strokeWidth="2" />
      <line x1="330" y1="0" x2="330" y2="88" stroke="#A8875C" strokeWidth="2" />
      <path d="M110 72 h32 l-8 -14 h-16 z" fill="#8A6A42" />
      <path d="M238 52 h28 l-7 -12 h-14 z" fill="#8A6A42" />
      <path d="M314 88 h32 l-8 -14 h-16 z" fill="#8A6A42" />
      <Bulb x={126} y={78} r={5} c="#FFE9B0" />
      <Bulb x={252} y={56} r={4} c="#FFE9B0" />
      <Bulb x={330} y={94} r={5} c="#FFE9B0" />
      {/* counter */}
      <rect x="0" y="392" width="390" height="28" fill="#9C7C52" />
      <rect x="0" y="420" width="390" height="130" fill="#8A6A44" />
      <g fill="#FFFBF0">
        <rect x="52" y="368" width="28" height="22" rx="3" />
        <rect x="150" y="372" width="24" height="18" rx="3" />
        <rect x="286" y="366" width="30" height="24" rx="3" />
      </g>
      <Floor y={550} top="#C4A87E" bottom="#A98A60" />
    </>
  )
}

/* ---------- 02 · classroom, daylight ---------- */
function Classroom() {
  return (
    <>
      <defs>
        <linearGradient id="clWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8E6DC" />
          <stop offset="1" stopColor="#CFCEC2" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#clWall)" />
      {/* whiteboard */}
      <rect x="40" y="112" width="230" height="140" rx="3" fill="#FBFAF4" />
      <rect x="40" y="112" width="230" height="140" rx="3" fill="none" stroke="#9AA0A6" strokeWidth="5" />
      <g stroke="#7C93B8" strokeWidth="3.5" opacity=".8" strokeLinecap="round">
        <line x1="62" y1="146" x2="186" y2="146" />
        <line x1="62" y1="170" x2="228" y2="170" />
        <line x1="62" y1="194" x2="152" y2="194" />
      </g>
      {/* windows with daylight */}
      <rect x="298" y="120" width="76" height="170" rx="3" fill="#CFE4F5" />
      <rect x="298" y="120" width="76" height="170" rx="3" fill="none" stroke="#9AA0A6" strokeWidth="6" />
      <line x1="298" y1="205" x2="374" y2="205" stroke="#9AA0A6" strokeWidth="6" />
      <path d="M298 290 L374 290 L340 560 L250 560 Z" fill="#EAF4FF" opacity=".55" />
      {/* tube lights */}
      <rect x="70" y="30" width="100" height="10" rx="5" fill="#FFFFFF" opacity=".9" />
      <rect x="226" y="30" width="100" height="10" rx="5" fill="#FFFFFF" opacity=".75" />
      {/* desks */}
      <g>
        <rect x="-10" y="470" width="410" height="18" rx="3" fill="#B08F63" />
        <rect x="10" y="488" width="62" height="62" fill="#9AA6B4" />
        <rect x="162" y="488" width="62" height="62" fill="#9AA6B4" />
        <rect x="312" y="488" width="62" height="62" fill="#9AA6B4" />
        <rect x="-10" y="580" width="410" height="20" rx="3" fill="#9C7C52" />
        <rect x="30" y="600" width="72" height="72" fill="#8D99A8" />
        <rect x="204" y="600" width="72" height="72" fill="#8D99A8" />
      </g>
      <Floor y={672} top="#C7C2B4" bottom="#AAA598" />
    </>
  )
}

/* ---------- 03 · restaurant dinner ---------- */
function Restaurant() {
  return (
    <>
      <defs>
        <linearGradient id="rsWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A1218" />
          <stop offset=".6" stopColor="#3A1A20" />
          <stop offset="1" stopColor="#240F14" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="#2E1419" />
      <rect width="390" height="500" fill="url(#rsWall)" opacity=".9" />
      {/* string lights */}
      <path d="M-10 60 Q 100 108 200 66 T 400 84" fill="none" stroke="#5C3A2E" strokeWidth="2" />
      <Bulb x={40} y={86} r={5} />
      <Bulb x={100} y={104} r={5} />
      <Bulb x={162} y={88} r={5} />
      <Bulb x={222} y={70} r={5} />
      <Bulb x={286} y={78} r={5} />
      <Bulb x={344} y={90} r={5} />
      {/* back booth */}
      <rect x="20" y="200" width="350" height="150" rx="16" fill="#48202A" />
      <rect x="20" y="200" width="350" height="20" rx="10" fill="#5C2A34" />
      {/* table, foreground */}
      <Floor y={470} top="#2A1218" bottom="#180B10" />
      <ellipse cx="195" cy="606" rx="250" ry="56" fill="#4A2A1A" />
      <ellipse cx="195" cy="590" rx="250" ry="56" fill="#6B3E26" />
      <g>
        <ellipse cx="86" cy="586" rx="38" ry="14" fill="#E8DCC0" opacity=".9" />
        <ellipse cx="304" cy="586" rx="38" ry="14" fill="#E8DCC0" opacity=".9" />
        <ellipse cx="195" cy="602" rx="30" ry="11" fill="#D8C49A" opacity=".75" />
        <rect x="142" y="546" width="14" height="38" rx="2" fill="#F5C97B" opacity=".55" />
        <rect x="236" y="548" width="14" height="36" rx="2" fill="#F5C97B" opacity=".5" />
      </g>
    </>
  )
}

/* ---------- 04 · college corridor ---------- */
function Corridor() {
  return (
    <>
      <rect width="390" height="844" fill="#EDE4D0" />
      <rect y="0" width="390" height="440" fill="#E2D6BC" />
      {/* arches receding */}
      {[
        { x: -30, w: 150, y: 120, h: 330, o: 0.16 },
        { x: 140, w: 120, y: 160, h: 290, o: 0.13 },
        { x: 276, w: 100, y: 190, h: 260, o: 0.1 },
      ].map((a, i) => (
        <g key={i}>
          <rect x={a.x} y={a.y} width={a.w} height={a.h} rx={a.w / 2} fill="#8A7550" opacity={a.o} />
          <rect x={a.x + 14} y={a.y + 26} width={a.w - 28} height={a.h} rx={(a.w - 28) / 2} fill="#F6EFDF" opacity=".55" />
        </g>
      ))}
      {/* pillars */}
      <rect x="112" y="120" width="26" height="330" fill="#D3C3A0" />
      <rect x="252" y="150" width="22" height="300" fill="#D3C3A0" />
      {/* floor tiles */}
      <rect y="450" width="390" height="394" fill="#D9CCAE" />
      <g stroke="#C0AF8C" strokeWidth="2" opacity=".8">
        {[480, 520, 570, 630, 700, 780].map((y) => (
          <line key={y} x1="0" y1={y} x2="390" y2={y} />
        ))}
        <line x1="195" y1="450" x2="60" y2="844" />
        <line x1="195" y1="450" x2="330" y2="844" />
      </g>
      <rect y="450" width="390" height="394" fill="#EDE4D0" opacity=".35" />
    </>
  )
}

/* ---------- 05 · fest stage ---------- */
function StageArt() {
  return (
    <>
      <rect width="390" height="844" fill="#0E1020" />
      {/* spotlight cones */}
      <path d="M60 0 L10 520 L150 520 Z" fill="#E8A33D" opacity=".10" />
      <path d="M195 0 L120 540 L280 540 Z" fill="#E8A33D" opacity=".13" />
      <path d="M330 0 L250 520 L390 520 Z" fill="#E8A33D" opacity=".10" />
      <Bulb x={60} y={16} r={7} />
      <Bulb x={195} y={12} r={8} />
      <Bulb x={330} y={16} r={7} />
      {/* truss */}
      <rect x="0" y="52" width="390" height="10" fill="#232B44" />
      {/* back screen */}
      <rect x="52" y="150" width="286" height="180" rx="4" fill="#182140" />
      <rect x="52" y="150" width="286" height="180" rx="4" fill="none" stroke="#2E3956" strokeWidth="4" />
      <rect x="72" y="190" width="120" height="18" rx="3" fill="#E8A33D" opacity=".55" />
      <rect x="72" y="222" width="200" height="12" rx="3" fill="#8FB4D4" opacity=".35" />
      {/* stage platform */}
      <rect x="0" y="520" width="390" height="30" fill="#2A2038" />
      <rect x="0" y="550" width="390" height="294" fill="#161A2E" />
      {/* crowd silhouettes */}
      <g fill="#0B0E1C">
        {[20, 70, 118, 170, 224, 276, 330, 372].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={620 + (i % 3) * 10} r={17} />
            <rect x={x - 22} y={636 + (i % 3) * 10} width="44" height="90" rx="16" />
          </g>
        ))}
      </g>
    </>
  )
}

/* ---------- 06 · dark room, one lamp ---------- */
function DarkRoom() {
  return (
    <>
      <rect width="390" height="844" fill="#140A16" />
      <radialGradient id="drGlow" cx=".5" cy=".38" r=".55">
        <stop offset="0" stopColor="#C98A93" stopOpacity=".35" />
        <stop offset="1" stopColor="#C98A93" stopOpacity="0" />
      </radialGradient>
      <rect width="390" height="844" fill="url(#drGlow)" />
      {/* window with night outside */}
      <rect x="230" y="120" width="120" height="180" rx="3" fill="#241226" />
      <rect x="230" y="120" width="120" height="180" rx="3" fill="none" stroke="#3A2030" strokeWidth="5" />
      <line x1="290" y1="120" x2="290" y2="300" stroke="#3A2030" strokeWidth="5" />
      <g fill="#F0E2C4" opacity=".5">
        <circle cx="256" cy="160" r="1.5" />
        <circle cx="320" cy="190" r="1.2" />
        <circle cx="270" cy="240" r="1.4" />
        <circle cx="332" cy="255" r="1" />
      </g>
      {/* desk + lamp */}
      <rect x="0" y="500" width="250" height="14" fill="#2E1A2A" />
      <rect x="40" y="514" width="14" height="90" fill="#241322" />
      <path d="M96 500 L96 430 L74 430" stroke="#3A2030" strokeWidth="6" fill="none" />
      <path d="M50 430 h48 l-12 -26 h-24 z" fill="#5C3448" />
      <Bulb x={74} y={438} r={6} c="#F0B9A8" />
      {/* papers */}
      <rect x="140" y="486" width="52" height="14" rx="2" fill="#EDE0C4" opacity=".3" transform="rotate(-4 166 493)" />
      <Floor y={604} top="#180C1A" bottom="#0C0510" />
    </>
  )
}

/* ---------- 07 · train interior ---------- */
function TrainArt() {
  return (
    <>
      <rect width="390" height="844" fill="#161226" />
      {/* windows with dusk city */}
      <defs>
        <linearGradient id="trDusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241537" />
          <stop offset=".55" stopColor="#7A3A34" />
          <stop offset="1" stopColor="#C07038" />
        </linearGradient>
      </defs>
      {[34, 148, 262].map((x) => (
        <g key={x}>
          <rect x={x} y="130" width="94" height="146" rx="8" fill="url(#trDusk)" />
          <g fill="#160D20">
            <rect x={x + 6} y="200" width="20" height="76" />
            <rect x={x + 32} y="186" width="16" height="90" />
            <rect x={x + 54} y="208" width="24" height="68" />
          </g>
          <g fill="#F2B45C" opacity=".7">
            <rect x={x + 12} y="216" width="4" height="5" />
            <rect x={x + 37} y="200" width="4" height="5" />
            <rect x={x + 62} y="224" width="4" height="5" />
          </g>
          <rect x={x} y="130" width="94" height="146" rx="8" fill="none" stroke="#2A2333" strokeWidth="7" />
        </g>
      ))}
      {/* ceiling + handrail */}
      <rect x="0" y="60" width="390" height="12" fill="#241E30" />
      <g stroke="#3A3348" strokeWidth="5">
        {[46, 108, 170, 232, 294, 356].map((x) => (
          <line key={x} x1={x} y1="72" x2={x} y2="120" />
        ))}
      </g>
      {/* poles */}
      <rect x="86" y="270" width="7" height="360" rx="3" fill="#3A3348" />
      <rect x="296" y="270" width="7" height="360" rx="3" fill="#3A3348" />
      {/* seated commuters against the far wall */}
      <g fill="#1E1930">
        {[46, 118, 196, 272, 344].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={392 + (i % 2) * 8} r="19" />
            <path d={`M${x - 26} ${480 + (i % 2) * 8} q0 -60 26 -60 t26 60 z`} />
          </g>
        ))}
      </g>
      {/* benches */}
      <rect x="0" y="486" width="390" height="22" fill="#332B48" />
      <rect x="0" y="508" width="390" height="90" fill="#241E32" />
      <Floor y={598} top="#1A1526" bottom="#0C0913" />
    </>
  )
}

/* ---------- 08 · cinema ---------- */
function CinemaArt() {
  return (
    <>
      <rect width="390" height="844" fill="#0A0810" />
      <defs>
        <radialGradient id="cnGlow" cx=".5" cy=".28" r=".7">
          <stop offset="0" stopColor="#9A86C4" stopOpacity=".5" />
          <stop offset="1" stopColor="#9A86C4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* screen */}
      <rect x="26" y="90" width="338" height="210" rx="4" fill="#2E2540" />
      <rect x="34" y="98" width="322" height="194" rx="2" fill="#4A3E68" />
      <rect width="390" height="600" fill="url(#cnGlow)" />
      {/* light beam */}
      <path d="M195 300 L-30 700 L420 700 Z" fill="#9A86C4" opacity=".07" />
      {/* seat rows */}
      {[
        { y: 470, h: 90, c: '#1C1628', n: 4 },
        { y: 560, h: 105, c: '#171222', n: 3 },
        { y: 665, h: 120, c: '#120E1B', n: 3 },
      ].map((r, i) => (
        <g key={i} fill={r.c}>
          {Array.from({ length: r.n }).map((_, k) => {
            const w = 390 / r.n
            return <rect key={k} x={k * w + 6} y={r.y} width={w - 12} height={r.h} rx={22} />
          })}
        </g>
      ))}
    </>
  )
}

/* ---------- 09 · bedroom at 5am ---------- */
function Bedroom() {
  return (
    <>
      <rect width="390" height="844" fill="#08070C" />
      <defs>
        <radialGradient id="bdGlow" cx=".5" cy=".62" r=".42">
          <stop offset="0" stopColor="#8FA8D8" stopOpacity=".38" />
          <stop offset="1" stopColor="#8FA8D8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* window, first light */}
      <rect x="40" y="110" width="150" height="210" rx="4" fill="#141B33" />
      <rect x="40" y="110" width="150" height="210" rx="4" fill="none" stroke="#1E2540" strokeWidth="6" />
      <line x1="115" y1="110" x2="115" y2="320" stroke="#1E2540" strokeWidth="6" />
      <rect x="46" y="250" width="138" height="66" fill="#3A3A5C" opacity=".55" />
      {/* bed */}
      <rect x="0" y="560" width="390" height="40" rx="10" fill="#191527" />
      <rect x="0" y="600" width="390" height="244" fill="#121020" />
      <ellipse cx="120" cy="558" rx="86" ry="26" fill="#221D36" />
      <rect width="390" height="844" fill="url(#bdGlow)" />
    </>
  )
}

/* ---------- 10 · two fests ---------- */
function Fest() {
  return (
    <>
      <rect width="390" height="844" fill="#0E1020" />
      <path d="M0 0 H195 V844 H0 Z" fill="#141C33" />
      <path d="M195 0 H390 V844 H195 Z" fill="#2A1622" />
      {/* banners */}
      <rect x="24" y="120" width="140" height="190" rx="4" fill="#1E2A4A" />
      <rect x="24" y="120" width="140" height="190" rx="4" fill="none" stroke="#E8A33D" strokeWidth="3" opacity=".7" />
      <rect x="226" y="150" width="140" height="190" rx="4" fill="#3A1E2E" />
      <rect x="226" y="150" width="140" height="190" rx="4" fill="none" stroke="#C98A93" strokeWidth="3" opacity=".7" />
      <g opacity=".55">
        <rect x="44" y="158" width="80" height="12" rx="3" fill="#E8A33D" />
        <rect x="44" y="182" width="100" height="8" rx="3" fill="#8FB4D4" />
        <rect x="246" y="188" width="80" height="12" rx="3" fill="#C98A93" />
        <rect x="246" y="212" width="100" height="8" rx="3" fill="#E8C4C8" />
      </g>
      <Bulb x={90} y={70} r={6} />
      <Bulb x={300} y={92} r={6} c="#E8B9C0" />
      <Floor y={560} top="#151A2C" bottom="#0A0C18" />
    </>
  )
}

/* ---------- 11 · fancy café parlour (chocolate heaven / blabber) ---------- */
function Parlour() {
  return (
    <>
      <rect width="390" height="844" fill="#F2ECE0" />
      {/* panelled wall */}
      <rect width="390" height="470" fill="#E6E7E4" />
      <g fill="none" stroke="#C9CBC6" strokeWidth="3">
        <rect x="20" y="70" width="100" height="300" rx="4" />
        <rect x="146" y="70" width="100" height="300" rx="4" />
        <rect x="272" y="70" width="100" height="300" rx="4" />
      </g>
      {/* toile pattern hint */}
      <g fill="#9BB0C9" opacity=".5">
        {[
          [58, 130],
          [96, 200],
          [58, 280],
          [184, 140],
          [222, 214],
          [184, 300],
          [310, 130],
          [348, 210],
          [310, 296],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" />
            <circle cx={x - 12} cy={y + 10} r="5" />
            <circle cx={x + 12} cy={y + 12} r="4" />
          </g>
        ))}
      </g>
      {/* chandelier */}
      <line x1="195" y1="0" x2="195" y2="56" stroke="#C2A25A" strokeWidth="3" />
      <path d="M150 92 h90 l-14 -34 h-62 z" fill="#D9BE72" opacity=".8" />
      <Bulb x={166} y={102} r={5} />
      <Bulb x={195} y={110} r={6} />
      <Bulb x={224} y={102} r={5} />
      {/* booth seat */}
      <rect x="-10" y="470" width="410" height="150" rx="26" fill="#D9A2A6" />
      <g stroke="#C68E93" strokeWidth="3">
        {[40, 110, 180, 250, 320].map((x) => (
          <line key={x} x1={x} y1="480" x2={x} y2="610" />
        ))}
      </g>
      {/* marble table */}
      <rect x="0" y="620" width="390" height="224" fill="#F4F2EE" />
      <g stroke="#D5D3CE" strokeWidth="2" fill="none" opacity=".9">
        <path d="M-10 690 q 90 -26 180 6 t 230 -12" />
        <path d="M-10 760 q 120 22 210 -10 t 200 18" />
      </g>
    </>
  )
}

/* ---------- 12 · night street ---------- */
function Street() {
  return (
    <>
      <defs>
        <linearGradient id="stSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#131A2E" />
          <stop offset="1" stopColor="#2A2036" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#stSky)" />
      {/* buildings */}
      <g fill="#0F1424">
        <rect x="-10" y="180" width="90" height="380" />
        <rect x="90" y="240" width="70" height="320" />
        <rect x="176" y="140" width="80" height="420" />
        <rect x="268" y="220" width="60" height="340" />
        <rect x="336" y="176" width="70" height="384" />
      </g>
      <g fill="#F2B45C" opacity=".55">
        {[
          [16, 220],
          [50, 268],
          [106, 288],
          [196, 190],
          [230, 250],
          [286, 262],
          [352, 226],
          [376, 300],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="9" height="12" rx="1.5" />
        ))}
      </g>
      {/* street lamps */}
      <g>
        <rect x="66" y="330" width="6" height="230" fill="#1C2236" />
        <path d="M52 330 h34 l-8 -14 h-18 z" fill="#2A3247" />
        <Bulb x={69} y={336} r={7} />
        <rect x="312" y="368" width="5" height="192" fill="#1C2236" />
        <path d="M300 368 h30 l-7 -12 h-16 z" fill="#2A3247" />
        <Bulb x={314} y={374} r={6} />
      </g>
      {/* road */}
      <rect y="560" width="390" height="284" fill="#171B29" />
      <g stroke="#3A4256" strokeWidth="5" strokeDasharray="26 24" opacity=".7">
        <line x1="195" y1="600" x2="195" y2="844" />
      </g>
      <ellipse cx="69" cy="600" rx="90" ry="30" fill="#F5C97B" opacity=".07" />
      <ellipse cx="314" cy="626" rx="72" ry="24" fill="#F5C97B" opacity=".06" />
    </>
  )
}

/* ---------- 13 · park (rain scene) ---------- */
function Park() {
  return (
    <>
      <defs>
        <linearGradient id="pkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24402F" />
          <stop offset="1" stopColor="#132119" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#pkSky)" />
      {/* tree canopies */}
      <g fill="#132A1E">
        <ellipse cx="60" cy="150" rx="120" ry="90" fill="#1E3A28" />
        <ellipse cx="200" cy="96" rx="130" ry="80" fill="#22412D" />
        <ellipse cx="340" cy="160" rx="120" ry="92" fill="#1E3A28" />
      </g>
      <g fill="#0D2016">
        <ellipse cx="110" cy="212" rx="90" ry="60" />
        <ellipse cx="300" cy="222" rx="96" ry="62" />
      </g>
      {/* trunks */}
      <rect x="72" y="240" width="16" height="230" fill="#1A130E" />
      <rect x="292" y="252" width="14" height="220" fill="#1A130E" />
      {/* lamp */}
      <rect x="196" y="300" width="5" height="200" fill="#1C2620" />
      <path d="M184 300 h30 l-7 -14 h-16 z" fill="#26332B" />
      <Bulb x={198} y={306} r={7} c="#EBD9A0" />
      {/* bench */}
      <g fill="#1E2A22">
        <rect x="34" y="470" width="140" height="10" rx="3" />
        <rect x="34" y="486" width="140" height="10" rx="3" />
        <rect x="44" y="496" width="8" height="40" />
        <rect x="156" y="496" width="8" height="40" />
      </g>
      {/* wet ground with lamp reflection */}
      <Floor y={540} top="#1B2F22" bottom="#101C15" />
      <ellipse cx="198" cy="640" rx="86" ry="26" fill="#EBD9A0" opacity=".06" />
      <ellipse cx="198" cy="700" rx="140" ry="30" fill="#EBD9A0" opacity=".04" />
    </>
  )
}

/* ---------- 14 · abandoned bungalow ---------- */
function Bungalow() {
  return (
    <>
      <defs>
        <linearGradient id="bgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A1620" />
          <stop offset="1" stopColor="#0C0A10" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#bgSky)" />
      {/* overgrowth behind */}
      <g fill="#16231A" opacity=".9">
        <ellipse cx="40" cy="200" rx="90" ry="120" />
        <ellipse cx="350" cy="230" rx="90" ry="130" />
      </g>
      {/* house block */}
      <rect x="70" y="150" width="250" height="420" fill="#2A2620" />
      <polygon points="55,150 335,150 320,110 70,110" fill="#221E1A" />
      {/* windows, empty */}
      {[
        [104, 200],
        [176, 200],
        [248, 200],
        [104, 330],
        [248, 330],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="56" height="80" fill="#0B0A0E" />
          <rect x={x} y={y} width="56" height="80" fill="none" stroke="#3A342A" strokeWidth="4" />
        </g>
      ))}
      {/* doorway */}
      <path d="M162 570 v-110 a34 34 0 0 1 68 0 v110 z" fill="#08070A" />
      {/* nameplate */}
      <rect x="150" y="428" width="92" height="26" rx="3" fill="#E9C13E" opacity=".85" />
      {/* creepers */}
      <g stroke="#1E3524" strokeWidth="5" fill="none" opacity=".85">
        <path d="M70 150 q 20 90 -6 180 t 10 160" />
        <path d="M320 150 q -24 100 2 190 t -6 140" />
      </g>
      <Floor y={570} top="#141118" bottom="#08070C" />
    </>
  )
}

/* ---------- 15 · wall of frames (montage) ---------- */
function WallArt() {
  return (
    <>
      <rect width="390" height="844" fill="#EDE4D0" />
      <rect width="390" height="844" fill="#E4D8BE" />
      <g>
        {[
          [30, 90, 96, 120, -3],
          [150, 60, 110, 140, 2],
          [286, 104, 84, 108, -2],
          [42, 250, 120, 92, 1.5],
          [190, 236, 96, 124, -2.5],
          [304, 244, 70, 96, 3],
        ].map(([x, y, w, h, r], i) => (
          <g key={i} transform={`rotate(${r} ${(x as number) + (w as number) / 2} ${(y as number) + (h as number) / 2})`}>
            <rect x={x} y={y} width={w} height={h} fill="#FDF8EC" stroke="#C6B693" strokeWidth="3" />
            <rect x={(x as number) + 8} y={(y as number) + 8} width={(w as number) - 16} height={(h as number) - 26} fill="#C2B69A" opacity=".55" />
          </g>
        ))}
      </g>
      <rect y="430" width="390" height="414" fill="#DCCFB0" opacity=".7" />
    </>
  )
}

/* ---------- 16 · lakeside (pune) ---------- */
function Lake() {
  return (
    <>
      <defs>
        <linearGradient id="lkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FB6C9" />
          <stop offset=".6" stopColor="#D6D2C0" />
          <stop offset="1" stopColor="#E8DCC0" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#lkSky)" />
      {/* hills */}
      <path d="M0 330 q 90 -50 180 -6 t 210 -20 V420 H0 Z" fill="#8FA192" opacity=".7" />
      <path d="M0 366 q 120 -30 210 4 t 180 -14 V440 H0 Z" fill="#75886F" opacity=".6" />
      {/* water */}
      <rect y="400" width="390" height="230" fill="#B9C6C4" />
      <g stroke="#CBD6D2" strokeWidth="3" opacity=".8">
        {[430, 470, 510, 560, 600].map((y) => (
          <line key={y} x1="0" y1={y} x2="390" y2={y} />
        ))}
      </g>
      {/* tree canopy overhead */}
      <g fill="#4A5C42" opacity=".9">
        <ellipse cx="40" cy="40" rx="140" ry="70" />
        <ellipse cx="330" cy="20" rx="130" ry="64" />
      </g>
      <g stroke="#3E3227" strokeWidth="7" fill="none">
        <path d="M20 60 q 40 70 30 150" />
      </g>
      {/* shore */}
      <path d="M0 630 q 100 -18 200 4 t 190 -8 V844 H0 Z" fill="#B39B78" />
      <path d="M0 690 q 120 -14 210 6 t 180 -6 V844 H0 Z" fill="#9C8462" />
    </>
  )
}

/* ---------- 17 · beach (goa) ---------- */
function Beach() {
  return (
    <>
      <defs>
        <linearGradient id="bcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E4A6A" />
          <stop offset=".45" stopColor="#C97A46" />
          <stop offset=".72" stopColor="#E8A257" />
          <stop offset="1" stopColor="#F3C98A" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#bcSky)" />
      <circle cx="286" cy="392" r="46" fill="#FCE3B0" opacity=".85" />
      {/* clouds */}
      <g fill="#F3D3AE" opacity=".45">
        <ellipse cx="90" cy="160" rx="80" ry="20" />
        <ellipse cx="300" cy="220" rx="70" ry="16" />
      </g>
      {/* sea */}
      <rect y="440" width="390" height="180" fill="#4A6B84" />
      <rect y="440" width="390" height="180" fill="#C98A5A" opacity=".25" />
      <g stroke="#F3C98A" strokeWidth="3" opacity=".55">
        {[470, 505, 545, 590].map((y) => (
          <line key={y} x1="0" y1={y} x2="390" y2={y} />
        ))}
      </g>
      <ellipse cx="286" cy="530" rx="30" ry="90" fill="#FCE3B0" opacity=".22" />
      {/* wet sand + dry sand */}
      <path d="M0 620 q 110 -20 200 2 t 190 -6 V844 H0 Z" fill="#C4A47A" />
      <path d="M0 690 q 130 -16 220 8 t 170 -4 V844 H0 Z" fill="#B08F66" />
      {/* palm silhouette */}
      <g fill="#2A1F16">
        <path d="M28 620 q -6 -120 10 -190 l 12 4 q -14 74 -8 186 z" />
        <path d="M46 430 q -50 -30 -74 -8 q 34 -6 70 22 z" />
        <path d="M46 430 q 46 -36 76 -14 q -38 -2 -66 26 z" />
        <path d="M46 430 q -20 -50 -58 -56 q 32 18 46 62 z" />
      </g>
    </>
  )
}

/* ---------- 18 · long distance ---------- */
function Distance() {
  return (
    <>
      <defs>
        <linearGradient id="dsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101A2E" />
          <stop offset=".55" stopColor="#2A3350" />
          <stop offset="1" stopColor="#4A4260" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="url(#dsSky)" />
      <g fill="#EDE3C8">
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={(i * 79) % 390} cy={(i * 53) % 300} r={i % 4 === 0 ? 1.6 : 1} opacity={0.25 + (i % 5) * 0.12} />
        ))}
      </g>
      {/* dashed arc between two cities */}
      <path d="M50 620 Q 195 380 340 620" fill="none" stroke="#E8A33D" strokeWidth="3" strokeDasharray="10 12" opacity=".7" />
      <g fill="#E8A33D">
        <path d="M188 452 l22 8 l-22 8 l6 -8 z" />
      </g>
      {/* two skylines */}
      <g fill="#0C1120">
        <rect x="-6" y="620" width="34" height="224" />
        <rect x="30" y="656" width="26" height="188" />
        <rect x="58" y="600" width="30" height="244" />
        <rect x="90" y="668" width="22" height="176" />
        <rect x="286" y="660" width="24" height="184" />
        <rect x="312" y="612" width="30" height="232" />
        <rect x="344" y="648" width="26" height="196" />
        <rect x="372" y="628" width="24" height="216" />
      </g>
      <g fill="#F2B45C" opacity=".6">
        {[
          [8, 660],
          [66, 640],
          [96, 700],
          [292, 692],
          [320, 650],
          [352, 680],
          [378, 664],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="7" height="9" rx="1" />
        ))}
      </g>
      <rect y="800" width="390" height="44" fill="#080B14" />
    </>
  )
}

const ART: Record<SceneKind, () => JSX.Element> = {
  cafe: Cafe,
  classroom: Classroom,
  restaurant: Restaurant,
  corridor: Corridor,
  stage: StageArt,
  darkroom: DarkRoom,
  train: TrainArt,
  cinema: CinemaArt,
  bedroom: Bedroom,
  fest: Fest,
  parlour: Parlour,
  street: Street,
  park: Park,
  bungalow: Bungalow,
  wall: WallArt,
  lake: Lake,
  beach: Beach,
  distance: Distance,
}

/* ============================================================
   CHARACTERS — faceless, but properly drawn: layered hair,
   clothing with folds, soft shading. Still no facial features.
   ============================================================ */

export function Person({
  who,
  h = 150,
  flip = false,
  className = '',
  style,
}: {
  who: 'p1' | 'p2'
  h?: number
  flip?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  const p1 = who === 'p1'
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), [])
  const skin = p1 ? '#D8A87E' : '#D9AC84'
  const skinShade = p1 ? '#B98A62' : '#BC8E68'
  const hair = '#171009'
  const hairHi = '#2C1F14'
  const top = p1 ? '#22304E' : '#7E2B35'
  const topShade = p1 ? '#182338' : '#5F1F27'
  const accent = p1 ? '#E8A33D' : '#E2A8AE'
  const legs = p1 ? '#161D2E' : '#31203A'

  return (
    <svg
      className={'person person--' + who + ' ' + className}
      width={h * 0.44}
      height={h}
      viewBox="0 0 88 200"
      style={{ ...style, transform: `${flip ? 'scaleX(-1)' : ''} ${style?.transform ?? ''}` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={top} />
          <stop offset=".6" stopColor={top} />
          <stop offset="1" stopColor={topShade} />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={skin} />
          <stop offset=".68" stopColor={skin} />
          <stop offset="1" stopColor={skinShade} />
        </linearGradient>
      </defs>

      {/* legs */}
      <path d="M26 118 h14 v66 q0 6 -6 6 h-4 q-6 0 -6 -6 z" fill={legs} />
      <path d="M48 118 h14 v66 q0 6 -6 6 h-4 q-6 0 -6 -6 z" fill={legs} opacity=".86" />
      <path d="M22 186 h20 q4 0 4 5 h-26 q0 -5 2 -5 z" fill="#120D08" />
      <path d="M46 186 h20 q4 0 4 5 h-26 q0 -5 2 -5 z" fill="#120D08" />

      {/* the breathing part — torso, arms, head all drift together */}
      <g className="idle">
        {p1 ? (
          /* Anay: open shirt over a tee */
          <>
            <path d="M28 52 q16 -6 32 0 l6 14 q4 30 -2 58 h-40 q-6 -28 -2 -58 z" fill="#2E2B33" />
            <path d="M36 50 h16 l3 12 q2 30 -1 62 h-20 q-3 -32 -1 -62 z" fill={`url(#t${id})`} />
            <path d="M28 52 q6 -3 9 -2 l-2 74 h-9 q-6 -28 -2 -58 z" fill={topShade} />
            <path d="M60 52 q-6 -3 -9 -2 l2 74 h9 q6 -28 2 -58 z" fill={topShade} opacity=".85" />
          </>
        ) : (
          <>
            <path d="M28 52 q16 -6 32 0 l6 14 q4 30 -2 58 h-40 q-6 -28 -2 -58 z" fill={`url(#t${id})`} />
            <path d="M25 62 q19 10 38 0 l2 10 q-21 11 -42 0 z" fill={accent} opacity=".92" />
          </>
        )}
        {/* arms */}
        <path d="M28 56 q-10 4 -11 14 l-2 34 q-1 7 5 8 q6 1 7 -6 l3 -30 z" fill={p1 ? '#2E2B33' : `url(#t${id})`} />
        <path d="M60 56 q10 4 11 14 l2 34 q1 7 -5 8 q-6 1 -7 -6 l-3 -30 z" fill={topShade} />
        <circle cx="20" cy="112" r="5.5" fill={`url(#s${id})`} />
        <circle cx="68" cy="112" r="5.5" fill={skinShade} />

        {/* neck + head */}
        <rect x="39" y="42" width="10" height="12" rx="4" fill={skinShade} />
        <ellipse cx="44" cy="28" rx="16" ry="18" fill={`url(#s${id})`} />
        <circle cx="28" cy="30" r="3.4" fill={skinShade} />
        <circle cx="60" cy="30" r="3.4" fill={skinShade} />

        {p1 ? (
          <>
            {/* thick side-parted hair */}
            <path d="M27 27 q-1 -19 17 -19 t17 19 q-2 -10 -12 -11 q-9 -1 -14 4 q-5 4 -8 7 z" fill={hair} />
            <path d="M29 20 q7 -9 16 -8 q10 1 13 8 q-9 -5 -17 -2 q-7 2 -12 2 z" fill={hairHi} />
            {/* his glasses — the single most recognisable thing about him */}
            <g fill="none" stroke="#15100B" strokeWidth="2.2">
              <rect x="30" y="24" width="13" height="10" rx="3.5" />
              <rect x="45" y="24" width="13" height="10" rx="3.5" />
              <line x1="43" y1="28" x2="45" y2="28" />
              <line x1="30" y1="27" x2="26" y2="29" />
              <line x1="58" y1="27" x2="62" y2="29" />
            </g>
            <g fill="#CFE4F0" opacity=".22">
              <rect x="31" y="25" width="11" height="8" rx="3" />
              <rect x="46" y="25" width="11" height="8" rx="3" />
            </g>
          </>
        ) : (
          <>
            {/* long wavy hair, past the shoulders */}
            <path d="M26 28 q-1 -21 18 -21 t18 21 q0 -12 -18 -12 t-18 12 z" fill={hair} />
            <path d="M26 26 q-6 26 -3 50 q1 8 6 9 q5 1 4 -8 q-3 -14 -2 -28 q1 -12 2 -18 z" fill={hair} />
            <path d="M62 26 q6 26 3 50 q-1 8 -6 9 q-5 1 -4 -8 q3 -14 2 -28 q-1 -12 -2 -18 z" fill={hair} />
            {/* a couple of waves so it isn't a slab */}
            <path d="M27 44 q6 5 4 12 q-2 6 1 12" fill="none" stroke={hairHi} strokeWidth="1.6" opacity=".7" />
            <path d="M61 44 q-6 5 -4 12 q2 6 -1 12" fill="none" stroke={hairHi} strokeWidth="1.6" opacity=".7" />
            <path d="M30 22 q6 -10 14 -10 q10 0 14 9 q-11 -5 -19 -2 q-6 2 -9 3 z" fill={hairHi} />
          </>
        )}
      </g>
    </svg>
  )
}
