/* ============================================================
   RELATIONSHIP DATA — the single source of truth.

   Everything personal lives in this file. Edit here, and the
   game updates everywhere. Anything wrapped like this:

       "[PLACEHOLDER — description of what goes here]"

   is waiting for real content from Tanishka. The components
   render placeholders with a visible dashed marker so they are
   impossible to miss while reviewing.
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
  /* the last save-file line. Set to '' to remove it. */
  bootJokeLine: 'COMMON SENSE',
  bootJokeValue: '[NO SIGNAL]',
}

/* ---------- STORY CHAPTERS ----------
   Narration arrays render as sequential deadpan lines.        */

export type Chapter = {
  id: string
  num: string
  title: string
  place: string
  year: string
  classification: string
  intro: string[]
  complete: string[]
  completeNote: string
  sincere?: string[]
  levels?: { id: string; name: string; story: string }[]
  abilities?: string[]
  statsNote?: string
  confessionMessages?: string[]
  replyMessages?: string[]
}

export const chapters: Chapter[] = [
  {
    id: 'ch1',
    num: '01',
    title: 'THE CAFÉ INCIDENT',
    place: 'Vile Parle East',
    year: '2023',
    classification: '“Café-related”',
    intro: [
      'At the time, this appeared to be a normal question.',
      'It was not.',
    ],
    complete: [
      'Café recommendations successfully delivered.',
      'Consequences: currently unknown.',
    ],
    completeNote: 'Tanishka provided a list. It was, by all accounts, extensive.',
  },
  {
    id: 'ch2',
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
    num: '03',
    title: 'THE BIRTHDAY DINNER',
    place: 'A mutual friend’s birthday dinner',
    year: '7 SEPTEMBER 2023',
    classification: '“Public declaration”',
    intro: [
      'Someone asked the table: “Who does everyone like from the class?”',
      'Anay had an answer ready.',
    ],
    complete: [
      'Critical hit.',
      'Tanishka has been flustered.',
      'No further action is required at this time.',
    ],
    /* the sincere beat after the joke — keep this honest, no punchline */
    sincere: [
      'It was the first time a guy openly called Tanishka beautiful.',
      'The narrator has nothing to add.',
    ],
    completeNote: '',
  },
  {
    id: 'ch4',
    num: '04',
    title: 'THE FRIENDSHIP ARC',
    place: 'Mithibai College and surroundings',
    year: '2023 – 2024',
    classification: '“Escalation”',
    intro: [
      'What followed was, officially, a friendship.',
      'The record shows a gradual loss of plausible deniability.',
    ],
    complete: ['Classification pending review.'],
    completeNote: '',
    /* five sub-levels. Each `story` is a placeholder for a real memory. */
    levels: [
      {
        id: '4.1',
        name: 'CLASSMATES',
        story: '[PLACEHOLDER — a real early-days memory goes here]',
      },
      {
        id: '4.2',
        name: 'FRIENDS',
        story: '[PLACEHOLDER — a memory from when you actually became friends]',
      },
      {
        id: '4.3',
        name: 'FRIENDS WHO TALK A LOT',
        story: '[PLACEHOLDER — a memory about the endless conversations]',
      },
      {
        id: '4.4',
        name: 'THIS IS PROBABLY STILL NORMAL',
        story: '[PLACEHOLDER — a memory that was definitely still normal]',
      },
      {
        id: '4.5',
        name: 'QUESTIONABLE',
        story: '[PLACEHOLDER — the memory where it stopped being normal]',
      },
    ],
  },
  {
    id: 'ch5',
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
    num: '07',
    title: 'THE LOCAL TRAIN',
    place: 'Western Line, Mumbai',
    year: '2 AUGUST 2024',
    classification: '“Escort mission”',
    intro: [
      'A mutual friend’s birthday party.',
      'One local train.',
      'Two people who were still, officially, just friends.',
    ],
    complete: [
      'Ability unlocked: PROTECTIVE ANAY.',
      'Passive ability. Has been detected.',
    ],
    /* sincere beat — how the journey actually felt. */
    sincere: [
      '[PLACEHOLDER — one honest sentence about how Tanishka felt on that journey]',
    ],
    completeNote: '',
  },
  {
    id: 'ch8',
    num: '08',
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
    /* THE CONFESSION — replace with Anay's actual words when provided.
       Each string is one message bubble. DO NOT INVENT. */
    confessionMessages: [
      '[PLACEHOLDER — Anay’s actual 5 AM confession text goes here, word for word]',
    ],
    /* Tanishka's reply later that day. Same rule. */
    replyMessages: [
      '[PLACEHOLDER — Tanishka’s actual reply goes here, word for word]',
    ],
  },
  {
    id: 'ch9',
    num: '09',
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
]

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

/* ---------- TIMELINE GAME EVENTS (all canon, safe to keep) ---------- */
export const timelineEvents = [
  { id: 't1', label: 'The café question', date: '2023', order: 1 },
  { id: 't2', label: 'The birthday dinner', date: '7 SEP 2023', order: 2 },
  { id: 't3', label: 'The local train', date: '2 AUG 2024', order: 3 },
  { id: 't4', label: 'The 5 AM confession', date: '19 AUG 2024', order: 4 },
  { id: 't5', label: 'Two years together', date: '19 AUG 2026', order: 5 },
]

/* ---------- SOUNDTRACK ----------
   Add real songs; drop optional audio files in /public/assets/audio/  */

export const soundtrack = [
  {
    id: 's1',
    title: '[PLACEHOLDER — song title]',
    artist: '[PLACEHOLDER — artist]',
    why: '[PLACEHOLDER — why this song matters to you two]',
    memory: '',
    audio: '', // e.g. 'assets/audio/track-01.mp3'
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
    { label: 'CAFÉ KNOWLEDGE', value: 24 },
    { label: 'ABILITY TO CONFESS AT NORMAL HOURS', value: 8 },
  ],
  tanishka: [
    { label: 'SOCIAL MEDIA', value: 82 },
    { label: 'FEELINGS', value: 97 },
    { label: 'ABILITY TO TALK TO ANAY OFFLINE IN 2023', value: 11 },
    { label: 'CAFÉ RECOMMENDATION SKILL', value: 100 },
  ],
}

/* ---------- ACHIEVEMENTS ---------- */
export const achievements = [
  { id: 'first-message', title: 'FIRST MESSAGE', desc: 'Café recommendations successfully delivered.' },
  { id: 'public-confession', title: 'PUBLIC CONFESSION', desc: 'Anay selected Tanishka.' },
  { id: 'local-train', title: 'LOCAL TRAIN ARC', desc: 'Protective mode detected.' },
  { id: 'five-am', title: '05:00 AM', desc: 'Questionable timing. Excellent outcome.' },
  { id: 'player-2', title: 'PLAYER 2 JOINED', desc: 'The party has been expanded.' },
  { id: 'year-one', title: 'YEAR ONE COMPLETE', desc: 'Somehow still functioning.' },
  { id: 'year-two', title: 'YEAR TWO COMPLETE', desc: 'This appears to be becoming a pattern.' },
  { id: 'favourite-person', title: 'FAVOURITE PERSON', desc: 'Achievement unlocked.' },
  { id: 'no-final-boss', title: 'NO FINAL BOSS', desc: 'There was never going to be one.' },
  /* secret — unlocked by easter eggs */
  { id: 'egg-dramatic', title: 'DRAMATIC RECOMMENDATION', desc: 'You found the unnecessarily dramatic café recommendation.', secret: true },
  { id: 'egg-vinyl', title: 'B-SIDE', desc: 'You looked under the record.', secret: true },
]

/* ---------- THE LETTER ----------
   Rendered on paper, in handwriting. Placeholder until the real
   letter arrives. Each string = one paragraph.                  */

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
  /* the final personal message, after the new save file */
  message: [
    '[PLACEHOLDER — Tanishka’s final message to Anay goes here.]',
  ],
}

/* ---------- RELATIONSHIP MAP ---------- */
export const mapNodes = [
  { id: 'map-mithibai', label: 'MITHIBAI', sub: 'Where it starts', chapter: 'ch1' },
  { id: 'map-vileparle', label: 'VILE PARLE', sub: 'Café territory', chapter: 'ch1' },
  { id: 'map-friendship', label: 'FRIENDSHIP ARC', sub: 'Officially', chapter: 'ch4' },
  { id: 'map-finanza', label: 'FINANZA', sub: 'Numbers go up', chapter: 'ch5' },
  { id: 'map-train', label: 'THE LOCAL TRAIN', sub: 'Western Line', chapter: 'ch7' },
  { id: 'map-5am', label: '05:00 AM', sub: 'A decision', chapter: 'ch8' },
  { id: 'map-relationship', label: 'RELATIONSHIP', sub: 'New campaign', chapter: 'ch9' },
  { id: 'map-year1', label: 'YEAR ONE', sub: 'Somehow functioning', chapter: 'final' },
  { id: 'map-year2', label: 'YEAR TWO', sub: 'A pattern', chapter: 'final' },
  { id: 'map-today', label: 'TODAY', sub: '19 August 2026', chapter: 'final' },
  { id: 'map-year3', label: 'YEAR THREE?', sub: '???', chapter: 'locked' },
]
