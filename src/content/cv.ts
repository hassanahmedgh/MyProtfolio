import type { ProjectInput } from "@/lib/types";

// Static CV data (from Hassan Ahmed's CV). The dynamic parts of the site
// (projects, blog posts) live in Firestore; this is the fixed personal content.

export const cv = {
  name: "Hassan Ahmed",
  title: "Full-Stack Web Developer",
  location: "Karachi, Pakistan",
  phone: "0339 2774190",
  email: "hassanahmed4546@icloud.com",
  github: "https://github.com/hassanahmedgh",
  githubLabel: "github.com/hassanahmedgh",
  instagram: "https://www.instagram.com/hassanahmed31427/",

  // Hero / meta
  tagline:
    "I build fast, responsive, production-ready web applications, from the frontend all the way through to deployment.",
  summary:
    "Full-stack web developer with 2 years of experience in React, Next.js and TypeScript. Building responsive, high-performance web applications at Adscular since 2024, with backend work in Node.js, .NET and Python.",

  about: {
    lead: "I'm a full-stack web developer with 2 years of experience in React, Next.js, and TypeScript. I've been working for Adscular since 2024, building responsive, high-performance web applications, integrating REST APIs, and developing backend solutions with Node.js, .NET, and Python.",
    body: "I'm currently studying Game Engineering at SSUET, combining technical expertise with creativity to build production-ready applications from frontend to deployment.",
    currently:
      "Building production web apps at Adscular with Next.js and TypeScript, plus backend work in Node.js, .NET and Python.",
    toolbox:
      "React · Next.js · TypeScript · Node.js · .NET · Python · REST APIs · Firebase · Tailwind CSS · Git · Vercel",
    // Headline skill line (rendered above the stack tags in the About section).
    skillsHeadline:
      "Full-Stack Web Development | TypeScript, Next.js, React, Node.js, REST",
  },

  experience: [
    {
      year: "2024 to Present",
      role: "Full-Stack Web Developer",
      org: "Adscular · Karachi, Pakistan",
      note: "Build responsive, high-performance web applications end to end: component architecture and UI in React/Next.js and TypeScript, REST API integration, and backend solutions in Node.js, .NET and Python. Ship client platforms from design through deployment.",
    },
    {
      year: "2025 to 2029",
      role: "B.S. Game Engineering",
      org: "Sir Syed University of Engineering & Technology (SSUET), Karachi",
      note: "Studying toward a B.S. in Game Engineering (Fall 2025, expected 2029), combining technical expertise with creativity while shipping live production projects alongside.",
    },
  ],

  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    "Styling & UI": ["Tailwind CSS", "Responsive", "Component UI"],
    "Backend & APIs": ["Node.js", ".NET (C#)", "Python", "REST APIs", "Firebase"],
    "Tools & Workflow": ["Git", "GitHub", "Vite", "Vercel", "npm", "VS Code", "Claude Code"],
  } as Record<string, string[]>,

  learning: ["Express", "Testing (Jest)"],
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Fluent" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/hassanahmedgh", icon: "github" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hassanahmed31427/",
      icon: "instagram",
    },
    { label: "Email", href: "mailto:hassanahmed4546@icloud.com", icon: "email" },
  ] as { label: string; href: string; icon: SocialIconName }[],
};

export type SocialIconName = "github" | "instagram" | "email";

// The live project set. Used by the one-click "Seed sample projects" button in
// the admin: projects are created/refreshed by slug, and any project in
// Firestore whose slug is NOT in this list is deleted, so this array is the
// single source of truth for what appears on the site.
export const seedProjects: ProjectInput[] = [
  {
    title: "Adscular · Performance Marketing Agency Website",
    slug: "adscular-agency-website",
    summary:
      "Custom-built site and admin for a performance marketing agency: fully custom CMS (case studies, blog, services, industries, locations), role-based team accounts, media library with automatic image optimisation and deduplication, built-in SEO suite with schema, redirect and sitemap management plus automated audits, and lead capture with campaign attribution and email notifications. Built on Next.js with a self-hosted .NET 10 backend, keeping all client and lead data on owned infrastructure with no third-party processors.",
    url: "https://www.adscular.agency",
    tags: ["Next.js", ".NET 10", "SQL Server"],
    coverImage: "/projects/assets/images/adscular.png",
    order: 1,
    status: "published",
    featured: true,
  },
  {
    title: "Blackstone Services · Marketing Agency Website",
    slug: "blackstone-services-website",
    summary:
      "Custom-built site for a UAE/US growth agency: animated front-end with cinematic page transitions, a fully custom CMS (blog, portfolio, services, testimonials), built-in SEO suite with sitemap and schema management, and lead capture with email notifications. Built on Next.js + Firebase, scoring fast load times on zero monthly infrastructure cost.",
    url: "https://www.blackstoneservices.ae",
    tags: ["Next.js", "Firebase", "Cloudinary"],
    coverImage: "/projects/assets/images/blackstone.svg",
    order: 2,
    status: "published",
    featured: true,
  },
  {
    title: "Hassan Ahmed · Portfolio & Blog",
    slug: "hassan-ahmed-portfolio",
    summary:
      "Self-hosted portfolio and writing platform with a hand-drawn dark aesthetic, animated intro gate and scroll reveals, plus a private Firebase admin panel for publishing projects and Markdown blog posts. Server-rendered for real SEO with generated sitemap, schema and dynamic Open Graph images, running on zero monthly infrastructure cost.",
    url: "https://www.hassanahmed.site",
    tags: ["Next.js 15", "TypeScript", "Firebase", "React 19"],
    coverImage: "/projects/assets/images/portfolio.svg",
    order: 3,
    status: "published",
    featured: true,
  },
];
