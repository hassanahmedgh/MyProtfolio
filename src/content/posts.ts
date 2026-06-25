import type { PostInput } from "@/lib/types";

// Starter blog posts. The admin "Seed sample posts" button writes these to
// Firestore (published). Edit or delete them anytime from the dashboard.
export const seedPosts: PostInput[] = [
  {
    title: "Making the Web Feel Alive",
    slug: "making-the-web-feel-alive",
    excerpt:
      "Small interactions, big difference. How motion and micro-detail change the way an interface feels, without hurting performance.",
    coverImage: "/blog/making-the-web-feel-alive.svg",
    tags: ["Frontend", "Motion", "UX"],
    category: "Journal · Frontend",
    status: "published",
    order: 1,
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    noindex: false,
    body: `There is a moment when a website stops feeling like a document and starts feeling like a place. A button that presses back. A page that hands off to the next one instead of slamming into it. None of these things are strictly functional, but they are the difference between an interface people tolerate and one they enjoy.

## Motion is communication

Animation is not decoration. Every transition tells the user something: where they came from, where they are going, what just changed. When an item slides out of a list, you understand it was removed. When a panel grows from the button you tapped, you understand where it came from. Done well, motion answers questions before the user thinks to ask them.

The trap is treating animation as a layer you sprinkle on at the end. The interfaces that feel best are the ones where motion was part of the plan, where the layout was designed to move.

> Good motion is invisible. You do not notice it, you just feel that the thing is well made.

## Start with the smallest thing

You do not need a physics engine to make something feel alive. Start with the cursor, the hover, the press. Give interactive elements a state for everything a finger or mouse can do to them:

- A short ease on hover, around 120ms, is often the whole difference between "flat" and "crafted".
- Section reveals as you scroll, so content arrives instead of just appearing.
- A considered page transition instead of a hard cut.
- A loading state with a little personality instead of a bare spinner.

Each one is small. Together they add up to a site that feels intentional.

## Performance is part of the feel

A beautiful animation that drops frames feels worse than no animation at all. Stick to transforms and opacity, keep work off the main thread, and respect \`prefers-reduced-motion\` for the people who need it. Smoothness is a feature, and it is one users feel even when they cannot name it.

Build the thing that works first. Then spend the last ten percent making it feel alive. That ten percent is the part people remember.`,
  },
  {
    title: "Building a Custom CMS with Next.js and Firebase",
    slug: "custom-cms-nextjs-firebase",
    excerpt:
      "How I gave this portfolio its own admin panel: server-rendered content for SEO, and a simple Firebase-backed editor for projects and posts.",
    coverImage: "/blog/custom-cms-nextjs-firebase.svg",
    tags: ["Next.js", "Firebase", "TypeScript"],
    category: "Journal · Engineering",
    status: "published",
    order: 2,
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    noindex: false,
    body: `I wanted to be able to add projects and write posts without redeploying my site every time. A full headless CMS felt like too much for a personal portfolio, so I built a small one with the tools I already use: Next.js and Firebase.

## The shape of it

The data lives in two Firestore collections, \`projects\` and \`posts\`. Each document has a status of draft or published, a slug, and the usual fields. That single status flag does a lot of work: only published documents ever reach the public site.

The public pages are React Server Components that read Firestore on the server. That matters, because it means the content is in the HTML the moment the page loads, which is exactly what search engines want. Reads are cached and revalidated on a short interval, so updates show up without a rebuild.

## Auth without the overhead

Writing is gated by Firebase Authentication. There is a single admin account, and the \`/admin\` routes are wrapped in a guard that redirects anyone who is not signed in. Firestore security rules enforce the same thing on the server side: anyone can read published content, but only a signed-in user can write.

The editor itself is plain React. Posts are written in Markdown and rendered to sanitized HTML at request time, so the database stays clean and the styling stays consistent.

## Lessons

A few things I would tell myself at the start:

- Keep the public read path and the admin write path separate. They have different needs.
- Sanitize Markdown before you render it, even when you are the only author.
- Let the data layer fail gracefully. If Firebase is not configured yet, the site should still build and render empty, not crash.

If you want to see the result, every project and post on this site goes through that exact pipeline. It is not much code, and it turns a static portfolio into something I can actually keep up to date.`,
  },
  {
    title: "An SEO Checklist for Developer Portfolios",
    slug: "seo-checklist-developer-portfolios",
    excerpt:
      "The practical, no-nonsense steps that actually get a developer portfolio found on Google, from structured data to getting indexed.",
    coverImage: "/blog/seo-checklist-developer-portfolios.svg",
    tags: ["SEO", "Web", "Career"],
    category: "Journal · SEO",
    status: "published",
    order: 3,
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    noindex: false,
    body: `A portfolio nobody can find does not help you get hired. The good news is that the SEO basics are not mysterious, and most of them are one-time setup. Here is the checklist I actually follow.

## The basics that move the needle

- **Real metadata on every page.** A unique title and description per page, not one set for the whole site.
- **Structured data.** A \`Person\` and \`WebSite\` schema on the home page, and \`BlogPosting\` on articles. This is how search engines understand who you are.
- **A sitemap and robots file.** Generate the sitemap from your real content so new posts are included automatically.
- **Server-rendered content.** If your projects and posts only appear after JavaScript runs, you are making search engines work harder than they should.
- **Speed.** Compress images, ship less JavaScript, and let the page render fast. Performance is a ranking signal.

## Get indexed

Doing all of the above does nothing until Google knows your site exists. The single most important step is to add your site to Google Search Console, verify it, and submit your sitemap. Then use the URL inspection tool to request indexing of your home page. This turns "found in a few weeks" into "found in a few days".

## Give it something to rank for

Your name alone is hard to rank for, especially if it is common. You will do far better with specific phrases people actually search, like "frontend developer in your city" or the title of a tutorial you wrote. That is the real reason to keep a blog: every post is a new page that can rank.

> SEO is not a trick you add at the end. It is a side effect of building a fast, clear site that you keep adding real content to.

Set it up once, publish consistently, and let it compound.`,
  },
];
