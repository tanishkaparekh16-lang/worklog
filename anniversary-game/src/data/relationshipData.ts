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
  levels?: { id: string; name: string; story: string; kind: 'rally' | 'whack' | 'block' | 'email' | 'pizza' }[]
  abilities?: string[]
  statsNote?: string
  confessionMessages?: string[]
  replyMessages?: string[]
  followUp?: { who: 'a' | 't'; text: string }[]
  emailParagraphs?: string[]
  story?: string
  poem?: string[]
  game?: 'order' | 'flowers' | 'rain' | 'letter' | 'hands' | 'torch' | 'montage' | 'friends' | 'days' | 'distance'
  photos?: { src: string; caption: string }[]
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
    photos: [
      { src: 'assets/images/first-text.jpg', caption: 'The actual text. Preserved for the record.' },
    ],
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
        kind: 'rally',
      },
      {
        id: '4.2',
        name: 'THE PRANK ECONOMY',
        story:
          'Silly little pranks entered circulation. The exchange rate was never fair: he pranked, she endured. Mostly him. Always him.',
        kind: 'whack',
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
    photos: [
      { src: 'assets/images/finanza-stage.jpg', caption: 'The numbers were, in fact, up.' },
      { src: 'assets/images/finanza-desk.jpg', caption: 'The head of digital media, at work. Allegedly.' },
    ],
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
      'I felt safe.',
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
    /* THE CONFESSION — transcribed verbatim from the screenshots.
       Each string is one message bubble. */
    confessionMessages: [
      'okay this might just be because of the late night feels, but here goes nothing. I know I\'m risking a lot here but fuck it? also apologies for the long ass formal paragraph(s) that im about to drop but i have a lot to say:\n\ntanishka parekh, I like you; not just as a friend, but more. I am also aware that you perceive me just as a friend, probably a very close friend but I cannot keep bottling up my feelings for you. I don\'t think it was a very good idea to do this to you this early in the morning, that too over text, but this might just give you enough time to process everything.\n\navoid the next paragraph if you don\'t like me back (gross):',
      'aha so you do like me back, that\'s a good start or maybe you just want my perspective and a ego boost for yourself. either way, its the way i smile like an idiot to your texts, the way i check my phone everytime i hear a *ting* to see if its a text from you AND get disappointed if its not. the way I want to talk to you all the time. the way you reciprocate my humour no matter how rock bottom it goes, the way I like it when you poke my sides, when you roast me, when you make fun of me, and the validation I feel only when you appreciate me.',
      'see if you have read it till the end, and you hate me for doing this, I\'m really sorry, and I have fucked up big time. but maybe just consider this as an ego booster no brainer activity conducted by an idiot? OR start considering me as the superior being that I\'m that you would absolutely allow to like you. its mostly the first one but hey, on a serious note, please let me know if this made you uncomfortable in any way, I\'ll try my best to make it up to you or avoid interacting with you, if you would want that.',
      'fuck fuck fuck im crazy',
      'you\'re soon going to wake up to this madness',
      'good morning toh aaj shayad nahi hone waala tera😭',
      'about to throw my phone through the balcony🙏🏻',
    ],
    replyMessages: [
      'ill text u in some time',
      'firstly, thank you for telling me how you feel, i appreciate it a lot. i loved how you put it into words, I\'ve read it like 10 times now and it brings me a smile each time.\ni saw it coming but obviously nothing prepared me for that moment\nAugust ke start se i think i also have started feeling like i like you and as i said idk how strong my feelings are as they are very recent\nI have never experienced this feeling before toh im sorry if make you awkward in any way agar aisa ho toh mujhe bata dena',
      'this is the same for me too\ni get a lil upset when you\'re offline for hours or when you dont come to college\ni wait for your texts and lovee talking to you btw its always so much fun and easy to talk to you about anything and everything',
      'and you\'re a really good guy, you are kind, sweet and helpful\nbut other than that, you are smart too and i would like to say you\'re emotionally intelligent too which is a very big thing for me',
      'anyways',
      'tldr:',
      'i like you too, anay khimesara <3',
    ],
    /* the follow-up exchange, later that day — verbatim */
    followUp: [
      { who: 't', text: 'why do u like me' },
      {
        who: 'a',
        text: 'okay now that you wanna know, the actual reason is that you\'ve an awesome sexy smart brother whom I love so much that due to collateral somehow you\'ve been targeted too. okay but seriously, I love that you\'re very simple and self-content; you don\'t seek attention by being extra unlike most other girls. you\'re also very shy, which I like for some reason. you and I have sooo much in common, you and I love tea, we love to sleep, we both have similar experiences, similar cultures, similar humour (broken) and just so much more.',
      },
      {
        who: 'a',
        text: 'its okayyy, ho rha tha nervous toh aaj kaafi lekin im glad ki you took your time and made a decision after that',
      },
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
    photos: [
      { src: 'assets/images/classroom.jpg', caption: 'Two department heads, freshly appointed. Note the advisors on their heads.' },
    ],
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
    photos: [
      { src: 'assets/images/flowers.jpg', caption: 'Exhibit A.' },
      { src: 'assets/images/flowers-2.jpg', caption: 'Exhibit B. A pattern emerges.' },
      { src: 'assets/images/date-cafe.jpg', caption: 'Documented mid-date.' },
      { src: 'assets/images/date-plants.jpg', caption: 'Candid. Allegedly.' },
    ],
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
    story: '',
    /* the actual poem, verbatim, as handed over at Blabber */
    poem: [
      'everytime i look at you, there are oceans of words i want to spill,\nbut everytime i look at you, my mind and body go completely still.\nand im too scared to write about you\nbecause it would make everything i feel real and true.\nand how can i admit it?\nwhen im too scared to even feel it.\nhow do i tell you?\nthat you\'re the best boy I\'ve ever spoken to.',
      'isnt it absolutely deranged of me\nto be thinking of you constantly,\nto be feeling the happiness of a child getting a toy\neverytime i make you laugh with liberal joy',
      'now your presence is starting to feel like heaven\nhate how im starting to need you 24×7\nis my mind playing trick after trick?\ncause i see the way i yearn for your texts like a goddamn lunatic',
      'one glance at your face is enough to make me smile\nand when you\'re not there, all my efforts go futile\nlike why did i even put on my new earrings or my new jeans or my new lipstick,\nwhen you\'re not the one seeing all of it?',
      'and I\'ve always been ever so curious\nbut ive reached new heights now, borderline delirious\ncause i wanna know your likes and dislikes\ni wanna know your daily, weekly, monthly highlights\nand be a part of them too\ni wanna know, do you like me like i like you?\ni wanna know the feel of your touch\nand im sorry if this is too soon or too much\ni wanna be called silly nicknames by you\nno matter if you\'re winning or losing, i want a share too\ni wanna know the exact colour of your eyes\ni wanna hear every thought, no matter how stupid or wise',
      'ive given you my firsts\nand ive told everyone about us\ni know i cannot express it enough\nmainly because im new to this stuff\nbut ive finally written about you\nand now all of this is real and true.',
      '<3',
    ],
    game: 'letter',
    photos: [
      { src: 'assets/images/blabber-letter-1.jpg', caption: 'The letter, delivered. Subject stalling.' },
      { src: 'assets/images/blabber-letter-2.jpg', caption: 'Reading. No comments were offered at this time.' },
      { src: 'assets/images/chocolate-heaven.jpg', caption: 'Moments around the question.' },
      { src: 'assets/images/chandelier.jpg', caption: 'The venue looked on.' },
    ],
  },
  {
    id: 'kk',
    act: 2,
    num: '14',
    title: 'KK PARK',
    place: 'KK Park, in the rain',
    year: 'YEAR ONE',
    classification: '“Meteorological event”',
    intro: [
      'One of those dates was at KK Park.',
      'The conversation was good.',
      'The weather decided to test it.',
    ],
    complete: [
      'They danced in the rain. They listened to songs.',
      'Later: chai and samosas.',
      'A movie could not have written it better. It didn’t need to.',
    ],
    completeNote: '',
    sincere: [
      'It started raining. The park emptied. They didn’t move.',
      'He said “I love you” first.',
      'She hugged him in the rain and said it back.',
    ],
    story: '',
    game: 'rain',
    photos: [
      { src: 'assets/images/kk-rain-park.jpg', caption: 'The park, freshly emptied.' },
      { src: 'assets/images/kk-rain-selfie.jpg', caption: 'Soaked. Undefeated.' },
      { src: 'assets/images/kk-chai.jpg', caption: 'The chai after. Essential.' },
    ],
  },
  {
    id: 'r4',
    act: 2,
    num: '15',
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
    photos: [
      { src: 'assets/images/hand-hold.jpg', caption: 'The first one. Policy since.' },
      { src: 'assets/images/hand-hold-2.jpg', caption: 'Policy enforcement, ongoing.' },
    ],
  },
  {
    id: 'r5',
    act: 2,
    num: '16',
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
    photos: [
      { src: 'assets/images/vk-exterior.jpg', caption: 'VASANT KUNJ · वसंत कुंज. The nameplate survived.' },
      { src: 'assets/images/vk-room.jpg', caption: 'A room, mid-return to the trees.' },
      { src: 'assets/images/vk-window.jpg', caption: 'A window with nothing left to hold.' },
      { src: 'assets/images/vk-kitchen.jpg', caption: 'Somebody’s kitchen, once.' },
      { src: 'assets/images/vk-stairs.jpg', caption: 'A balcony the garden is slowly reclaiming.' },
    ],
  },
  {
    id: 'r6',
    act: 2,
    num: '17',
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
    photos: [
      { src: 'assets/images/selfie-early.jpg', caption: 'Standard proximity.' },
      { src: 'assets/images/sunglasses-t.jpg', caption: 'Quality control, part one.' },
      { src: 'assets/images/sunglasses-a.jpg', caption: 'Quality control, part two.' },
      { src: 'assets/images/sea-selfie.jpg', caption: 'Sea, sun, them.' },
      { src: 'assets/images/window-city.jpg', caption: 'Watching the city mind its business.' },
      { src: 'assets/images/garba.jpg', caption: 'Festival protocol observed.' },
      { src: 'assets/images/birthday.jpg', caption: 'A birthday, celebrated properly.' },
      { src: 'assets/images/cozy.jpg', caption: 'Standard proximity, again.' },
    ],
  },
  {
    id: 'r7',
    act: 2,
    num: '18',
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
    photos: [
      { src: 'assets/images/pune-friends.jpg', caption: 'The party, expanded.' },
      { src: 'assets/images/pune-lake.jpg', caption: 'The full party, by the lake.' },
    ],
  },
  {
    id: 'r8',
    act: 2,
    num: '19',
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
    photos: [
      { src: 'assets/images/goa-beach.jpg', caption: 'Day: unknown. Mood: recorded.' },
      { src: 'assets/images/goa-shades.jpg', caption: 'Regulation beach eyewear.' },
      { src: 'assets/images/goa-bus.jpg', caption: 'En route. Already a memory.' },
    ],
  },
  {
    id: 'r9',
    act: 2,
    num: '20',
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
    photos: [
      { src: 'assets/images/plane.jpg', caption: 'Geography’s preferred vehicle.' },
    ],
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
    title: 'Die With A Smile',
    artist: 'Bruno Mars & Lady Gaga',
    why: '[PLACEHOLDER — why this one matters to you two]',
    memory: '',
    audio: '',
  },
  {
    id: 's2',
    title: 'Sailor Song',
    artist: 'Gigi Perez',
    why: '[PLACEHOLDER — why this one matters]',
    memory: '',
    audio: '',
  },
  {
    id: 's3',
    title: 'Those Eyes',
    artist: 'New West',
    why: '[PLACEHOLDER — why this one matters]',
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
  { id: 'first-ily', title: 'SAID IN THE RAIN', desc: 'Everyone left. They stayed. He said it first.' },
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
  photos: [
    { src: 'assets/images/together.jpg', caption: 'The players.' },
    { src: 'assets/images/rings.jpg', caption: 'Status: documented.' },
  ],
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
  { id: 'map-kk', label: 'KK PARK', sub: 'The rain level', chapter: 'kk' },
  { id: 'map-vk', label: 'VASANT KUNJ', sub: 'Off the map', chapter: 'r5' },
  { id: 'map-pune', label: 'PUNE', sub: 'The friends', chapter: 'r7' },
  { id: 'map-goa', label: 'GOA', sub: 'Seven days', chapter: 'r8' },
  { id: 'map-today', label: 'TODAY', sub: '19 August 2026', chapter: 'final' },
  { id: 'map-year3', label: 'YEAR THREE?', sub: '???', chapter: 'locked' },
]
