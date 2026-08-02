# Setup from a phone — no computer needed

You don't have to write or edit any code. You need to do four things, all in
your phone's browser:

1. Make a Supabase account and create the database
2. Upload this project to Replit, which runs it in the cloud
3. Push it to GitHub and let Vercel host it permanently
4. Install it on your home screen

Budget about 40 minutes. Do it in one sitting if you can — the steps build on
each other.

> **Landscape helps.** Turn your phone sideways for the Supabase and Replit
> steps. Those dashboards are cramped in portrait.

---

## Step 1 — Save the zip

Download `worklog.zip` and note where it went — usually the **Files** app on
iPhone, or **Files / Downloads** on Android.

**Don't unzip it.** Replit wants the zip as-is.

---

## Step 2 — Supabase: your database

### Create the project

1. In your browser, go to **supabase.com** and sign up. Free tier is plenty.
2. Tap **New project**.
3. Name it `worklog`. Pick the region closest to you. It generates a database
   password — save it in your notes app.
4. Wait about two minutes while it builds.

### Create the tables

1. In the left sidebar, tap **SQL Editor**, then **New query**.
2. You need the contents of `supabase/schema.sql` from the zip. On a phone the
   easiest way is to ask me in this chat — *"paste the schema SQL"* — and copy
   it straight from my message.
3. Paste it into the editor and tap **Run**.
4. You want to see **Success. No rows returned.**
5. Tap **Table Editor** in the sidebar. You should see three tables: `clients`,
   `projects`, `settings`. If you don't, the SQL didn't run — try again.

### Turn on email login

Go to **Authentication → Sign In / Providers**. Confirm **Email** is enabled.
Turn **off** "Confirm email" for now — it saves you a round trip.

### Copy your two keys

- **Settings → API Keys.** If there's a **Create new API keys** button, tap it.
  Copy the **Publishable key** (starts with `sb_publishable_`).
- **Settings → API.** Copy the **Project URL** (looks like
  `https://abcdefgh.supabase.co`).

Paste both into your notes app for a moment. You'll need them twice.

> **Never copy the secret key.** It bypasses all your security rules.

---

## Step 3 — Replit: get the code running

1. Go to **replit.com** and sign up.
2. Go to **replit.com/import** and choose **ZIP**.
3. Upload `worklog.zip` from your Files app.
4. When it asks for secrets or environment variables, add these two:

   | Key | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | your Project URL |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | your publishable key |

   If it doesn't ask during import, add them afterwards: **Secrets** in the left
   sidebar (padlock icon), **+ New secret** for each.

5. Tap **Run**. The first run installs the libraries and takes a few minutes.
6. A preview window opens with the app. Sign in with your email to test it.

If you see **"Blocked request, this host is not allowed"**, tell me — it means
the config didn't apply and I'll send you a fix.

---

## Step 4 — GitHub + Vercel: permanent free hosting

Replit works, but free projects go to sleep and take a few seconds to wake.
For something you open every day, Vercel is better — instant, free, and it
never sleeps.

### Push to GitHub

1. Sign up at **github.com** if you haven't.
2. Back in Replit, open the **Version Control** tab in the left sidebar (the
   branch icon).
3. Connect your GitHub account when prompted.
4. Tap **Publish to GitHub**. Name the repo `worklog`. Choose **Private**.

Your code is now safely stored, and this is also your backup.

### Deploy on Vercel

1. Go to **vercel.com** and sign up **with GitHub**. That connection matters.
2. Tap **Add New → Project**.
3. Find `worklog` in the list and tap **Import**.
4. Before deploying, expand **Environment Variables** and add the same two:
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. Tap **Deploy**. Give it two minutes.

You'll get a URL like `worklog-yourname.vercel.app`. That's your app, live.

### One last Supabase setting

Go back to Supabase → **Authentication → URL Configuration** and add your
Vercel URL to **Site URL** and **Redirect URLs**. Without this the sign-in
email will send you to the wrong place.

---

## Step 5 — Install it on your phone

Open your Vercel URL in your phone's browser.

- **iPhone (Safari):** tap **Share** → **Add to Home Screen**
- **Android (Chrome):** tap the **⋮** menu → **Install app** or **Add to Home
  Screen**

It now behaves like a normal app — own icon, no browser bar, works offline for
viewing what you've already logged.

---

## Making changes later

Any edit you make in Replit, commit and push from the Version Control tab, and
Vercel rebuilds automatically within a minute. You never touch Vercel again.

Worth being honest: reading and fixing code on a phone screen is genuinely
painful. If you can borrow a laptop for an hour when something needs changing —
a friend's, a library's — it'll save you a lot of frustration. For daily *use*,
though, your phone is exactly right, and that's what this app was designed for.

---

## When something breaks

**Sign-in email never arrives** — check spam. Supabase rate-limits these on the
free tier; wait a few minutes between tries.

**Signed in, but nothing saves** — the schema SQL didn't run properly. Check
Table Editor for three tables.

**"Missing Supabase credentials"** — the environment variables aren't set, or
they're set in Replit but not Vercel. They're needed in both.

**Sign-in link opens the wrong site** — Step 4's last part, the URL
Configuration in Supabase.

**Blank white screen** — take a screenshot and send it to me along with what you
tapped just before.
