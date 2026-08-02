# Worklog

A personal work diary and earnings tracker. Calendar first, dashboard second,
installable on your phone.

Built with React + Vite + Tailwind v4 + Supabase.

---

## Get it running — 4 steps, ~15 minutes

Everything else is already written. These are the parts only you can do.

### 1. Install Node.js

Download the **LTS** version from https://nodejs.org and install with defaults.

Open a terminal (**Terminal** on Mac, **PowerShell** on Windows) and check:

```bash
node -v
```

You need v18 or higher. If it says "command not found", close the terminal and
open a new one.

### 2. Install the project

In the terminal, navigate into this folder and run:

```bash
npm install
```

This downloads the libraries. It takes a minute and prints a lot. Warnings are
fine; errors are not.

### 3. Create your Supabase project

1. Sign up at https://supabase.com — the free tier is far more than you need.
2. **New project**. Name it `worklog`, pick the region closest to you, save the
   database password somewhere.
3. When it finishes provisioning, open **SQL Editor → New query**. Paste the
   entire contents of `supabase/schema.sql` and hit **Run**. You should see
   "Success. No rows returned."
4. Go to **Authentication → Sign In / Providers** and make sure **Email** is
   enabled. Turn **off** "Confirm email" while you're setting up.
5. Go to **Settings → API Keys**. If you see a **Create new API keys** button,
   click it. Copy the **Publishable key** — it starts with `sb_publishable_`.
6. Go to **Settings → API** and copy the **Project URL**.

> Do not copy the **secret** key. That one bypasses all your security rules and
> must never appear in browser code.

### 4. Add your keys

Rename `.env.local.example` to `.env.local` and fill in the two values:

```
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

No quotes, no spaces around the `=`.

Then:

```bash
npm run dev
```

Open the URL it prints. Enter your email, click the link it sends, and you're in.

---

## Putting it on your phone

The app needs to be online for your phone to reach it.

```bash
npm install -g vercel
vercel
```

Answer the prompts (accept the defaults). When it asks for environment
variables — or afterwards in the Vercel dashboard under **Settings →
Environment Variables** — add the same two keys from `.env.local`.

Then on your phone, open the URL Vercel gives you and use **Share → Add to Home
Screen**. It installs like a normal app: own icon, no browser bar, works
offline for viewing.

---

## Every file, and why it exists

### Configuration

| File | What it does |
|---|---|
| `package.json` | The list of libraries and the `dev` / `build` commands |
| `vite.config.js` | Wires up React, Tailwind, and the PWA plugin that makes it installable |
| `index.html` | The single HTML page. Loads the fonts and mounts React |
| `.env.local` | Your Supabase keys. Gitignored — never shared, never committed |
| `supabase/schema.sql` | The database tables. Run once, in Supabase |

### `src/index.css` — the design system

Every colour, font and radius lives in the `@theme` block at the top. The
palette is "Studio": `#0A0E14` base, `#63C7EC` accent.

Change `--color-accent` here and the entire app re-colours. Adding a light mode
later means adding a second set of these values, nothing more.

### `src/lib/` — logic with no appearance

| File | What it does |
|---|---|
| `supabase.js` | The one connection to your database. Everything imports this |
| `format.js` | Money and duration formatting. `parseDuration` accepts "90", "1h 30m" or "1:30" |
| `dates.js` | Calendar grid maths, week boundaries, date formatting |
| `stats.js` | **Every number on the dashboard and reports.** Streaks, payout periods, chart series, CSV export |

`stats.js` is worth understanding. Nothing is stored as a running total —
every figure is calculated from the project list each time. That's slightly
more work for the computer and much safer for you: totals can never drift out
of sync with the underlying data, and deleting a project instantly corrects
every number that referenced it.

### `src/hooks/` — data loading

| File | What it does |
|---|---|
| `useAuth.js` | Tracks who's signed in. Supabase keeps the session, so you stay logged in |
| `useSettings.js` | Your rate, currency, goal, week start. Creates the row on first launch |
| `useProjects.js` | Loads every project into memory, and handles add / edit / delete / mark-paid |

`useProjects.js` loads your entire history at once. That sounds wasteful but
isn't: a few hundred rows a year is nothing, and holding them all in memory
means the calendar, dashboard, reports and search read from the same array with
zero extra network calls. Screens switch instantly and the app works offline.
If you ever pass roughly 20,000 projects, this is the one file to revisit.

Deletes are **optimistic** — the row disappears immediately and is restored if
the server rejects it. That's why the app feels instant rather than laggy.

### `src/components/` — reusable pieces

| File | What it does |
|---|---|
| `ui.jsx` | Buttons, inputs, cards, chips. Generic — knows nothing about projects |
| `Nav.jsx` | The five-tab bottom bar |
| `ProjectRow.jsx` | One project in a list. Used by the day sheet and search |
| `DaySheet.jsx` | The panel that slides up when you tap a date |
| `ProjectForm.jsx` | Add and edit, in one component so the two can't drift apart |

### `src/screens/` — one file per tab

| File | What it does |
|---|---|
| `Login.jsx` | Magic-link sign in. No password to create or forget |
| `Calendar.jsx` | The home screen and the month grid |
| `Dashboard.jsx` | Totals, goal progress, and payout periods |
| `Reports.jsx` | The four charts. Lazy-loaded, so its chart library doesn't slow the calendar |
| `Find.jsx` | Search, filters, sorting |
| `SettingsScreen.jsx` | Rate, currency, goal, CSV export, sign out |

### `src/App.jsx` — the shell

Owns exactly three things: which tab is showing, which day sheet is open, and
which project is being edited. Data lives in the hooks, appearance lives in the
screens. Keeping this file thin is what makes new features cheap.

---

## How the design works

**The calendar cell carries three facts.** The date, the project count, and —
as the bar along the bottom — that day's earnings relative to your best day
that month. You read the shape of a month before reading any number.

**Quick add is one tap.** Because your rate is flat, the big button on the day
sheet logs a project with your rate and that date already filled in. The full
form is the smaller, secondary option, because you'll rarely need it.

**Payments are handled by period, not per project.** Your client pays monthly,
so unpaid work is grouped into monthly payout periods and cleared with one
button. Marking thirty checkboxes individually would be miserable. The
per-project `paid` flag still exists underneath for exceptions.

---

## Built to grow

The database already has the columns for what you mentioned wanting later:

- **`clients` table** — empty, with `projects.client_id` already pointing at it.
  Adding a second client is a form, not a migration.
- **`rate_type`** on projects — `'flat'` today, `'hourly'` when you need it.
- **`project_type`** — free text, unused, waiting for categories.
- **`paid_on`** — already stamped when you mark a period paid, so tax reporting
  later can answer "when was I actually paid" and not just "when did I work".

Expenses and profit tracking need one new table and one new screen. Nothing in
the existing code has to change to accommodate them.

---

## When something breaks

**"Missing Supabase credentials"** — `.env.local` is missing, misnamed, or the
dev server wasn't restarted after you created it. Vite only reads env files at
startup.

**Sign-in email never arrives** — check spam. Supabase's free tier rate-limits
these; wait a few minutes between attempts.

**Signed in but no data saves** — the schema SQL didn't run, or ran partially.
Check **Table Editor** in Supabase for three tables.

**Blank white screen** — open the browser console (F12) and read the first red
error. That message is the actual problem; everything below it is fallout.
