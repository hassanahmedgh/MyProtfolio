# Hassan Ahmed — Portfolio

A production Next.js (App Router + TypeScript) portfolio with a Firebase-backed
admin panel for projects and blog posts, full SEO (sitemap, robots, JSON-LD
schema, Open Graph), and the dark, hand-drawn aesthetic from the original design
prototype (custom blob cursor, water-drop intro, scroll reveals).

- **Public site:** `/` (home), `/blog`, `/blog/<slug>`
- **Admin:** `/admin` (login at `/admin/login`)
- **SEO:** `/sitemap.xml`, `/robots.txt`, per-page metadata + JSON-LD, generated `/opengraph-image`

The original design files (`Portfolio.dc.html`, `Blog.dc.html`, `support.js`) are
kept only as a visual reference and can be deleted.

---

## 1. Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Environment variables live in `.env.local` (already filled with your Firebase web
config). `.env.example` documents every variable. The site runs even before
Firebase is configured — project/post lists simply come back empty.

---

## 2. Firebase setup (project `portfolio-91424`)

Do this once in the [Firebase console](https://console.firebase.google.com/).

1. **Authentication** → *Sign-in method* → enable **Email/Password**.
   Then *Users* → **Add user** → your admin email + a strong password. This is
   the only admin account (there is no public sign-up).
2. **Firestore Database** → **Create database** → *Production mode* → choose a
   region (e.g. `asia-south1`, near Karachi).
3. **Firestore → Rules** → paste the contents of [`firestore.rules`](./firestore.rules) → **Publish**.
   (No composite indexes are needed — the public queries use a single filter and
   sort in memory.)
4. **Storage** (only needed for image *uploads*):
   - Cloud Storage now requires the **Blaze (pay-as-you-go)** plan. If you stay
     on the free **Spark** plan, skip this — the admin's **“Paste URL”** image
     option works on any plan.
   - On Blaze: *Storage* → Get started, then **Storage → Rules** → paste
     [`storage.rules`](./storage.rules) → **Publish**.

> Tip: with the Firebase CLI you can deploy rules + indexes from this folder:
> `npx firebase deploy --only firestore:rules,firestore:indexes,storage`

---

## 3. First run as admin

1. `npm run dev`, go to `/admin`, sign in with the account you created.
2. Click **“Seed sample projects”** to load your 5 real CV projects into Firestore
   (idempotent — safe to click again; it skips ones that already exist).
3. Add/edit projects and write blog posts (Markdown, with live preview). Each item
   has a **Draft / Published** status — only *Published* items appear on the public
   site, in `/blog`, and in `sitemap.xml`.
4. Cover images: choose **Upload** (Firebase Storage, needs Blaze) or **Paste URL**.

---

## 4. Deploy to Vercel

1. Push this folder to a Git repo and **import it into Vercel** (framework is
   auto-detected as Next.js).
2. In **Project → Settings → Environment Variables**, add every `NEXT_PUBLIC_*`
   variable from `.env.local` (Production + Preview + Development).
3. `NEXT_PUBLIC_SITE_URL`: leave it blank to auto-use the deployment's Vercel URL,
   or set it to your custom domain once you have one (then redeploy so all SEO
   artifacts use the canonical URL).
4. Deploy.

---

## 5. How it works (architecture notes)

- **Public reads are server-side** (real SSR/SEO) using the Firebase **web SDK**
  inside Server Components — no Admin SDK / service account needed. Reads are
  gated by Firestore rules (`status == 'published'`), cached with ISR
  (`revalidate: 300`) and tags.
- **Admin writes / auth / uploads** use the web SDK in the browser. After a write,
  the admin pings `POST /api/revalidate` so the public pages refresh immediately
  instead of waiting out the 5-minute window.
- **Content model:** Firestore collections `projects` and `posts`. Post bodies are
  authored in Markdown and rendered server-side to **sanitized** HTML
  (`unified` → `rehype-sanitize`).
- **Static content** (name, summary, experience, education, skills, contact) lives
  in [`src/content/cv.ts`](./src/content/cv.ts) — edit it to update the CV text.
- **Design** is a faithful port of the prototype. The blob cursor mounts only on
  fine-pointer (mouse) devices, so on phones/tablets there is no stuck dot. The
  intro plays once per session and is skipped under `prefers-reduced-motion`. The
  layout is responsive across phone / tablet / desktop.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
