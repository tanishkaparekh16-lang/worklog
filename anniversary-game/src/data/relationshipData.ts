/* ============================================================
   RELATIONSHIP DATA — the single source of truth.

   Everything personal lives in this file. Edit here, and the
   game updates everywhere. Anything wrapped like this:

       "[PLACEHOLDER — description of what goes here]"

   is waiting for real content from Tanishka, and renders with
   a visible dashed marker in the game.
   ============================================================ */

export const PLACEHOLDER_PREFIX = '[PLACEHOLDER'

export const players = {
  p1: {
    name: 'ANAY',
    fullName: 'Anay',
    origin: 'Neemuch, Madhya Pradesh',
    location: 'Mumbai',
  },
  p2: {
    name: 'TANISHKA',
    fullName: 'Tanishka',
    origin: 'Vile Parle, Mumbai',
    location: 'Mumbai',
  },
}

export const meta = {
  title: 'ANAY & TANISHKA',
  subtitle: 'THE ADVENTURE SO FAR',
  tagline: 'A Completely Accurate Historical Record',
  college:
    "SVKM's Mithibai College of Arts, Chauhan Institute of Science and Amrutben Jivanlal College of Commerce and Economics",
  collegeShort: 'MITHIBAI COLLEGE',
  course: 'BMS',
  saveYear: 'YEAR 2',
  anniversaryDate: '19 AUGUST 2026',
  /* the last save-file line. Set bootJokeLine to '' to remove it. */
  bootJokeLine: 'COMMON SENSE',
  bootJokeValue: '[NO SIGNAL]',
}

/* ---------- STORY CHAPTERS ----------
   act 1 = THE FRIENDSHIP ARC · act 2 = THE RELATIONSHIP ARC
   Narration arrays render as sequential deadpan lines.        */

export type Chapter = {
  id: string
  act: 1 | 2
  num: string
  title: string
  place: string
  year: string
  classification: string
  intro: string[]
  complete: string[]
  completeNote: string
  sincere?: string[]
  levels?: { id: string; name: string; story: string; kind: 'hold' | 'block' | 'email' | 'pizza' }[]
  abilities?: string[]
  statsNote?: string
  confessionMessages?: string[]
  replyMessages?: string[]
  emailParagraphs?: string[]
  story?: string
  game?: 'order' | 'flowers' | 'letter' | 'hands' | 'torch' | 'montage' | 'friends' | 'days' | 'distance'
}

export const chapters: Chapter[] = [
  /* ================= ACT I — THE FRIENDSHIP ARC ================= */
  {
    id: 'ch1',
    act: 1,
    num: '01',
    title: 'THE CAFÉ INCIDENT',
    place: 'Vile Parle East (remotely)',
    year: '29 AUGUST 2023',
    classification: '“Café-related”',
    intro: [
      'On 29 August 2023, a first text arrived.',
      'At the time, it appeared to be a normal question.',
      'It was not.',
    ],
    complete: [
      'An extensive list was provided.',
      'The extent remains legendary.',
      'Consequences: currently unknown.',
    ],
    completeNote: 'Historians agree this is where the file begins.',
  },
  {
    id: 'ch2',
    act: 1,
    num: '02',
    title: 'ONLINE FRIENDSHIP, OFFLINE NPC',
    place: 'Instagram / a classroom',
    year: '2023',
    classification: '“Communication anomaly”',
    intro: [
      'They were perfectly capable of talking.',
      'Just apparently not in the same physical location.',
    ],
    complete: [
      'Anomaly documented.',
      'Neither party has offered an explanation.',
    ],
    completeNote: '',
  },
  {
    id: 'ch3',
    act: 1,
    num: '03',
    title: 'RASHI’S BIRTHDAY DINNER',
    place: 'A birthday dinner',
    year: '7 SEPTEMBER 2023',
    classification: '“Public declaration”',
    intro: [
      'A guy at the table asked: “Who do you think looks good from the entire class?”',
      'Anay had an answer ready.',
    ],
    complete: [
      'Critical hit.',
      'Tanishka has been flustered.',
      'No further action is required at this time.',
    ],
    sincere: [
      'It was the first time a guy openly called Tanishka beautiful.',
      'The narrator has nothing to add.',
    ],
    completeNote: '',
  },
  {
    id: 'ch4',
    act: 1,
    num: '04',
    title: 'THE FRIENDSHIP ARC',
    place: 'Everywhere, constantly',
    year: '2023 – 2024',
    classification: '“Escalation”',
    intro: [
      'What followed was, officially, a friendship.',
      'The record shows roasting, pranks, and a gradual loss of plausible deniability.',
    ],
    complete: ['Classification pending review.'],
    completeNote: '',
    levels: [
      {
        id: '4.1',
        name: 'THE ROASTING ERA',
        story:
          'They chatted constantly. They roasted the hell out of each other. Somewhere between the insults, they learned a hell of a lot about each other. This is a documented bonding strategy.',
        kind: 'hold',
      },
      {
        id: '4.2',
        name: 'THE PRANK ECONOMY',
        story:
          'Silly little pranks entered circulation. The exchange rate was never fair: he pranked, she endured. Mostly him. Always him.',
        kind: 'hold',
      },
      {
        id: '4.3',
        name: 'THE IGNORE INCIDENT',
        story:
          'As a joke, Anay ignored Tanishka for an entire week. Tanishka did not process this as a joke. Consequences were immediate.',
        kind: 'block',
      },
      {
        id: '4.4',
        name: 'THE APOLOGY EMAIL',
        story:
          'The terms of unblocking were clear: one (1) formal apology email. He delivered. It exceeded all expectations.',
        kind: 'email',
      },
      {
        id: '4.5',
        name: 'THE PIZZA INCIDENT',
        story:
          'In return for a very small favor, Anay sent Tanishka an entire pizza. She loved his guts. Over time, they got closer. Someone in this story was developing feelings.',
        kind: 'pizza',
      },
    ],
  },
  {
    id: 'ch5',
    act: 1,
    num: '05',
    title: 'FINANZA',
    place: 'Mithibai College',
    year: 'AUGUST 2024',
    classification: '“Character upgrade”',
    intro: [
      'Anay was selected as Head of Digital Media for Finanza.',
      'The numbers went up.',
      'People noticed.',
    ],
    complete: ['New class unlocked: DIGITAL MEDIA HEAD.'],
    completeNote: '',
    abilities: [
      'Content Strategy',
      'Editing',
      'Making Numbers Go Up',
      'Apparently Everyone Likes His Work',
    ],
    statsNote: '[PLACEHOLDER — real Finanza statistics can go here, e.g. view counts]',
  },
  {
    id: 'ch6',
    act: 1,
    num: '06',
    title: 'TANISHKA’S SECRET QUEST',
    place: 'Undisclosed',
    year: '2024',
    classification: '“Not discussed”',
    intro: [
      'While Anay was busy being impressive,',
      'a side quest had been active for some time.',
    ],
    complete: [
      'Quest status: NOT DISCLOSED.',
      'This quest cannot currently be discussed with Player 1.',
    ],
    completeNote: '',
  },
  {
    id: 'ch7',
    act: 1,
    num: '07',
    title: 'THE LOCAL TRAIN',
    place: 'Western Line, towards Malad',
    year: '2 AUGUST 2024',
    classification: '“Escort mission”',
    intro: [
      'Kasak’s birthday.',
      'One local train to Malad.',
      'Two people who were still, officially, just friends.',
    ],
    complete: [
      'Ability unlocked: PROTECTIVE ANAY.',
      'Passive ability. Has been detected.',
    ],
    sincere: [
      '[PLACEHOLDER — one honest sentence about how Tanishka felt on that journey]',
    ],
    /* the debrief after the party — rendered as a classified file */
    completeNote:
      'Shortly after: Anay told Rashi he likes Tanishka. A planning committee of two was formed. Rashi’s strategy: start with little hints.',
  },
  {
    id: 'ch8',
    act: 1,
    num: '08',
    title: 'STREE 2',
    place: 'A cinema',
    year: '15 AUGUST 2024',
    classification: '“Seating conspiracy”',
    intro: [
      'A group plan to watch Stree 2.',
      'Anay and Rashi arrived with a second, undisclosed plan.',
      'Objective: Anay sits next to Tanishka. By coincidence. Officially.',
    ],
    complete: [
      'Coincidence achieved.',
      'Tanishka loved the day.',
      'The hints were landing.',
    ],
    completeNote: '',
  },
  {
    id: 'ch9',
    act: 1,
    num: '09',
    title: '05:00 AM',
    place: 'A phone screen',
    year: '19 AUGUST 2024',
    classification: '“Irreversible”',
    intro: [
      'Anay has made a decision.',
      'This is generally considered a dangerous time to make decisions.',
    ],
    complete: ['Player 2 has joined your party.'],
    completeNote: '',
    /* THE CONFESSION — replace with the real texts / screenshots.
       Each string is one message bubble. DO NOT INVENT. */
    confessionMessages: [
      '[PLACEHOLDER — Anay’s actual 5 AM confession texts go here, word for word, from the screenshots]',
    ],
    replyMessages: [
      '[PLACEHOLDER — Tanishka’s actual reply goes here, word for word]',
    ],
  },
  {
    id: 'ch10',
    act: 1,
    num: '10',
    title: 'TWO FEST HEADS',
    place: 'Two different college fests',
    year: '2024',
    classification: '“Parallel processing”',
    intro: [
      'Two different college fests.',
      'Two different departments.',
      'Two people figuring out what they were doing.',
      'Somehow, this seemed like a reasonable basis for a relationship.',
    ],
    complete: ['THE FRIENDSHIP ARC is over.', 'A new campaign begins.'],
    completeNote: '',
  },

  /* ================= ACT II — THE RELATIONSHIP ARC ================= */
  {
    id: 'r1',
    act: 2,
    num: '11',
    title: 'CHOCOLATE HEAVEN',
    place: 'First date',
    year: 'YEAR ONE',
    classification: '“Suspiciously smooth”',
    intro: [
      'The first date. Chocolate Heaven.',
      'Two Ferrero Rocher milkshakes.',
      'Zero awkwardness. This is statistically unusual for first dates.',
    ],
    complete: [
      'Anay flirted smoothly. Subtly. Constantly.',
      'Tanishka noticed every single time.',
      'They talked about families. They vibed. Two friends, quietly becoming something more.',
    ],
    completeNote: '',
    story: '[PLACEHOLDER — any extra detail from the first date you want remembered]',
    game: 'order',
  },
  {
    id: 'r2',
    act: 2,
    num: '12',
    title: 'THE GENTLEMAN ERA',
    place: 'Second date, third date, and so on',
    year: 'YEAR ONE',
    classification: '“Sustained chivalry”',
    intro: [
      'Second date. Third. And whatnot.',
      'There were flowers. There were manners.',
      'The man was, by all documented accounts, a real gentleman.',
    ],
    complete: ['Gentleman status: verified across multiple independent dates.'],
    completeNote: '',
    story: '[PLACEHOLDER — a favourite moment from those early dates]',
    game: 'flowers',
  },
  {
    id: 'r3',
    act: 2,
    num: '13',
    title: 'BLABBER',
    place: 'Blabber',
    year: 'YEAR ONE',
    classification: '“Formalization”',
    intro: [
      'They went to Blabber.',
      'Tanishka handed Anay a letter.',
      'Inside: a poem. At the end of the poem: a question.',
    ],
    complete: ['He said yes.', 'Effective immediately.'],
    completeNote: '',
    /* the actual poem goes here, one string per line/stanza */
    story: '[PLACEHOLDER — the actual poem Tanishka wrote, if she wants it displayed]',
    game: 'letter',
  },
  {
    id: 'r4',
    act: 2,
    num: '14',
    title: 'THE HAND THING',
    place: 'Somewhere unremarkable, now historic',
    year: 'YEAR ONE',
    classification: '“Contact event”',
    intro: [
      'At some point, for the first time, they held hands.',
      'Nobody announced it. It simply became policy.',
    ],
    complete: ['Hands: held.', 'Policy: permanent.'],
    completeNote: '',
    story: '[PLACEHOLDER — where and when the first hand-hold happened, if you want it told]',
    game: 'hands',
  },
  {
    id: 'r5',
    act: 2,
    num: '15',
    title: 'VASANT KUNJ',
    place: 'An abandoned bungalow',
    year: 'YEAR ONE',
    classification: '“Exploration”',
    intro: [
      'An abandoned bungalow called Vasant Kunj.',
      'They went to explore it.',
      'They found something that was not on any map.',
    ],
    complete: ['First kiss.', 'Location: theirs now.'],
    completeNote: '',
    sincere: [
      'Some places stop being places and become part of the story.',
      'Vasant Kunj is one of them.',
    ],
    story: '[PLACEHOLDER — anything about that day you want remembered here]',
    game: 'torch',
  },
  {
    id: 'r6',
    act: 2,
    num: '16',
    title: 'PRACTICALLY INSEPARABLE',
    place: 'Everywhere',
    year: 'YEAR ONE – TWO',
    classification: '“Merged inventory”',
    intro: [
      'From here, the record gets blurry.',
      'Not because nothing happened. Because everything did.',
      'They became practically inseparable.',
    ],
    complete: ['Status: inseparable. Practically.'],
    completeNote: '',
    story: '[PLACEHOLDER — everyday memories from this era: three short ones work best]',
    game: 'montage',
  },
  {
    id: 'r7',
    act: 2,
    num: '17',
    title: 'PUNE',
    place: 'Pune',
    year: 'YEAR TWO',
    classification: '“Meet the party members”',
    intro: [
      'Anay took Tanishka to Pune to meet his friends.',
      'This is not a small side quest. This is a main quest disguised as a weekend.',
    ],
    complete: [
      'The friends approved.',
      'Tanishka understood what it meant that he wanted her there.',
    ],
    completeNote: '',
    story: '[PLACEHOLDER — a Pune memory: what you did, what made it fun]',
    game: 'friends',
  },
  {
    id: 'r8',
    act: 2,
    num: '18',
    title: 'GOA',
    place: 'Goa, with friends',
    year: 'YEAR TWO',
    classification: '“Extended expedition”',
    intro: [
      'Seven days in Goa with friends.',
      'Seven days of getting very, very close.',
      'The memory count from this trip remains uncounted. It is too high.',
    ],
    complete: ['Expedition complete.', 'They came back closer than they left.'],
    completeNote: '',
    story: '[PLACEHOLDER — Goa memories: one line per day works, or just the best ones]',
    game: 'days',
  },
  {
    id: 'r9',
    act: 2,
    num: '19',
    title: 'LONG DISTANCE',
    place: 'Two different cities',
    year: 'A FEW MONTHS IN THERE',
    classification: '“Endurance test”',
    intro: [
      'For a few months, geography got involved.',
      'Geography tried its best.',
    ],
    complete: [
      'Geography lost.',
      'They survived long distance the way they do everything: talking constantly.',
    ],
    completeNote: '',
    story: '[PLACEHOLDER — anything about the long-distance months you want remembered]',
    game: 'distance',
  },
]

/* ---------- THE CAFÉ TEXT (Chapter 1, verbatim) ---------- */
export const cafeText = 'sunn do you know any good cafes in VP east?'

/* ---------- THE DINNER ANSWER (Chapter 3, verbatim) ---------- */
export const dinnerQuestion = 'Who do you think looks good from the entire class?'
export const dinnerAnswer = 'i think tanishka bohot sundar hai'

/* ---------- THE APOLOGY EMAIL (Chapter 4, verbatim — do not fix the jokes) ---------- */
export const apologyEmail = {
  from: 'Anayfiverr',
  to: 'Tanewshka',
  subject: 'Sincerest Apologies',
  paragraphs: [
    'Dear Tanewshka,',
    'I hope this email finds you well. I am writing to offer my sincerest apologies for my recent absence and lack of communication. I understand that I have been unresponsive for the past week, and I deeply regret any hurt or concern that my actions may have caused to you or your family (dhruv).',
    'Upon reflection, I realize that my behavior was insensitive and inappropriate. It was never my intention to cause you distress or discomfort but to just pull a prank on you.',
    'Moving forward, I am fully committed to being more mindful of your feelings and respecting your boundaries. I understand if you need some time to process this situation, but I hope we can eventually discuss it further and work towards rebuilding our friendship.',
    'I thank you for your understanding and forgiveness. Please feel free to reach out to me if you would like to talk.',
    'Yours truly,',
    'Anayfiverr',
  ],
}

/* ---------- THE BLABBER QUESTION (Chapter 13, verbatim) ---------- */
export const blabberQuestion = 'would u like to be my boyfriend'

/* ---------- MEMORY ARCADE ----------
   Five games, five memories. Photos go in /public/assets/images/  */

export const arcadeMemories = [
  {
    id: 'mem1',
    game: 'MATCH',
    gameName: 'PAIRS',
    title: '[PLACEHOLDER — memory title]',
    date: '[PLACEHOLDER — date]',
    location: '[PLACEHOLDER — location]',
    photo: 'assets/images/memory-01-placeholder.svg',
    story: '[PLACEHOLDER — the story of this memory, in Tanishka’s words]',
    note: '',
  },
  {
    id: 'mem2',
    game: 'TIMELINE',
    gameName: 'THE RECORD',
    title: '[PLACEHOLDER — memory title]',
    date: '[PLACEHOLDER — date]',
    location: '[PLACEHOLDER — location]',
    photo: 'assets/images/memory-02-placeholder.svg',
    story: '[PLACEHOLDER — the story of this memory]',
    note: '',
  },
  {
    id: 'mem3',
    game: 'MAZE',
    gameName: 'CORRIDORS',
    title: '[PLACEHOLDER — memory title]',
    date: '[PLACEHOLDER — date]',
    location: '[PLACEHOLDER — location]',
    photo: 'assets/images/memory-03-placeholder.svg',
    story: '[PLACEHOLDER — the story of this memory]',
    note: '',
  },
  {
    id: 'mem4',
    game: 'REACTION',
    gameName: 'NOTIFICATIONS',
    title: '[PLACEHOLDER — memory title]',
    date: '[PLACEHOLDER — date]',
    location: '[PLACEHOLDER — location]',
    photo: 'assets/images/memory-04-placeholder.svg',
    story: '[PLACEHOLDER — the story of this memory]',
    note: '',
  },
  {
    id: 'mem5',
    game: 'PUZZLE',
    gameName: 'THE PICTURE',
    title: '[PLACEHOLDER — memory title]',
    date: '[PLACEHOLDER — date]',
    location: '[PLACEHOLDER — location]',
    photo: 'assets/images/memory-05-placeholder.svg',
    story: '[PLACEHOLDER — the story of this memory]',
    note: '',
  },
]

/* ---------- TIMELINE GAME EVENTS (all canon) ---------- */
export const timelineEvents = [
  { id: 't1', label: 'The café text', date: '29 AUG 2023', order: 1 },
  { id: 't2', label: 'Rashi’s birthday dinner', date: '7 SEP 2023', order: 2 },
  { id: 't3', label: 'The train to Malad', date: '2 AUG 2024', order: 3 },
  { id: 't4', label: 'Stree 2', date: '15 AUG 2024', order: 4 },
  { id: 't5', label: 'The 5 AM confession', date: '19 AUG 2024', order: 5 },
  { id: 't6', label: 'Two years together', date: '19 AUG 2026', order: 6 },
]

/* ---------- SOUNDTRACK ---------- */
export const soundtrack = [
  {
    id: 's1',
    title: '[PLACEHOLDER — song title]',
    artist: '[PLACEHOLDER — artist]',
    why: '[PLACEHOLDER — why this song matters to you two]',
    memory: '',
    audio: '',
  },
  {
    id: 's2',
    title: '[PLACEHOLDER — song title]',
    artist: '[PLACEHOLDER — artist]',
    why: '[PLACEHOLDER — why it matters]',
    memory: '',
    audio: '',
  },
  {
    id: 's3',
    title: '[PLACEHOLDER — song title]',
    artist: '[PLACEHOLDER — artist]',
    why: '[PLACEHOLDER — why it matters]',
    memory: '',
    audio: '',
  },
]

/* ---------- CHARACTER STATS ---------- */
export const stats = {
  anay: [
    { label: 'DIGITAL MEDIA', value: 95 },
    { label: 'PROTECTIVENESS', value: 88 },
    { label: 'PRANK OUTPUT', value: 93 },
    { label: 'APOLOGY EMAIL COMPOSITION', value: 100 },
    { label: 'ABILITY TO CONFESS AT NORMAL HOURS', value: 8 },
  ],
  tanishka: [
    { label: 'SOCIAL MEDIA', value: 82 },
    { label: 'FEELINGS', value: 97 },
    { label: 'CAFÉ RECOMMENDATION SKILL', value: 100 },
    { label: 'BLOCK BUTTON RESPONSE TIME', value: 96 },
    { label: 'ABILITY TO TALK TO ANAY OFFLINE IN 2023', value: 11 },
  ],
}

/* ---------- ACHIEVEMENTS ---------- */
export const achievements = [
  { id: 'first-message', title: 'FIRST TEXT', desc: '“sunn do you know any good cafes in VP east?”' },
  { id: 'public-confession', title: 'BOHOT SUNDAR', desc: 'Anay said it in front of everyone.' },
  { id: 'apology-email', title: 'FORMALLY FORGIVEN', desc: 'One (1) apology email, delivered as required.' },
  { id: 'pizza-diplomacy', title: 'PIZZA DIPLOMACY', desc: 'A very small favor. An entire pizza.' },
  { id: 'local-train', title: 'LOCAL TRAIN ARC', desc: 'Protective mode detected en route to Malad.' },
  { id: 'strategic-seating', title: 'STRATEGIC SEATING', desc: 'Stree 2, and a coincidence that wasn’t.' },
  { id: 'five-am', title: '05:00 AM', desc: 'Questionable timing. Excellent outcome.' },
  { id: 'player-2', title: 'PLAYER 2 JOINED', desc: 'The party has been expanded.' },
  { id: 'boyfriend-official', title: 'OFFICIAL', desc: 'She asked. In writing. In verse. He said yes.' },
  { id: 'first-kiss', title: 'VASANT KUNJ', desc: 'Not on any map. On theirs.' },
  { id: 'met-the-friends', title: 'PUNE APPROVED', desc: 'Introduced to the original party members.' },
  { id: 'goa-week', title: 'SEVEN DAYS OF GOA', desc: 'Memory count: too high to record.' },
  { id: 'long-distance', title: 'GEOGRAPHY LOST', desc: 'It tried its best.' },
  { id: 'year-one', title: 'YEAR ONE COMPLETE', desc: 'Somehow still functioning.' },
  { id: 'year-two', title: 'YEAR TWO COMPLETE', desc: 'This appears to be becoming a pattern.' },
  { id: 'favourite-person', title: 'FAVOURITE PERSON', desc: 'Achievement unlocked.' },
  { id: 'no-final-boss', title: 'NO FINAL BOSS', desc: 'There was never going to be one.' },
  /* secret — unlocked by easter eggs */
  { id: 'egg-dramatic', title: 'DRAMATIC RECOMMENDATION', desc: 'You found the unnecessarily dramatic café recommendation.', secret: true },
  { id: 'egg-vinyl', title: 'B-SIDE', desc: 'You looked under the record.', secret: true },
]

/* ---------- THE LETTER ---------- */
export const letter = {
  date: '19 August 2026',
  greeting: 'Anay,',
  paragraphs: [
    '[PLACEHOLDER — Tanishka’s real letter goes here.]',
    '[PLACEHOLDER — It can be as long as it needs to be. Each paragraph is a new block.]',
  ],
  signoff: 'Yours,',
  signature: 'Tanishka',
}

/* ---------- FINAL LEVEL ---------- */
export const finalLevel = {
  bossName: 'THE WEBSITE ENDING',
  bossHp: '∞',
  bossWeakness: 'apparently none',
  bossStrategy: 'continue',
  reveal: 'There isn’t really an ending.',
  journey: ['3 YEARS OF FRIENDSHIP', '2 YEARS TOGETHER', 'COUNTLESS MEMORIES'],
  newSave: 'YEAR 3',
  message: [
    '[PLACEHOLDER — Tanishka’s final message to Anay goes here.]',
  ],
}

/* ---------- RELATIONSHIP MAP ---------- */
export const mapNodes = [
  { id: 'map-mithibai', label: 'MITHIBAI', sub: 'Where it starts', chapter: 'ch1' },
  { id: 'map-cafe', label: 'THE CAFÉ TEXT', sub: '29 August 2023', chapter: 'ch1' },
  { id: 'map-dinner', label: 'RASHI’S DINNER', sub: 'Bohot sundar', chapter: 'ch3' },
  { id: 'map-friendship', label: 'FRIENDSHIP ARC', sub: 'Roasts, pranks, one email', chapter: 'ch4' },
  { id: 'map-finanza', label: 'FINANZA', sub: 'Numbers go up', chapter: 'ch5' },
  { id: 'map-train', label: 'THE LOCAL TRAIN', sub: 'Towards Malad', chapter: 'ch7' },
  { id: 'map-stree', label: 'STREE 2', sub: 'Strategic seating', chapter: 'ch8' },
  { id: 'map-5am', label: '05:00 AM', sub: 'A decision', chapter: 'ch9' },
  { id: 'map-choc', label: 'CHOCOLATE HEAVEN', sub: 'First date', chapter: 'r1' },
  { id: 'map-blabber', label: 'BLABBER', sub: 'A poem, a question', chapter: 'r3' },
  { id: 'map-vk', label: 'VASANT KUNJ', sub: 'Off the map', chapter: 'r5' },
  { id: 'map-pune', label: 'PUNE', sub: 'The friends', chapter: 'r7' },
  { id: 'map-goa', label: 'GOA', sub: 'Seven days', chapter: 'r8' },
  { id: 'map-today', label: 'TODAY', sub: '19 August 2026', chapter: 'final' },
  { id: 'map-year3', label: 'YEAR THREE?', sub: '???', chapter: 'locked' },
]
