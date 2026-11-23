import type { ProjectInput } from "@/lib/types";

// Static CV data (from Hassan Ahmed's CV). The dynamic parts of the site
// (projects, blog posts) live in Firestore; this is the fixed personal content.

export const cv = {
  name: "Hassan Ahmed",
  title: "Frontend Web Developer",
  location: "Karachi, Pakistan",
  phone: "0339 2774190",
  email: "hassanahmed4546@icloud.com",
  github: "https://github.com/hassanahmedgh",
  githubLabel: "github.com/hassanahmedgh",
  linkedin: "https://www.linkedin.com/in/hassan-ahmed-200769419/",
  instagram: "https://www.instagram.com/hassanahmed31427/",

  // Hero / meta
  tagline:
    "I build fast, responsive, production-ready web applications, from the first design all the way through to deployment.",
  summary:
    "Frontend web developer with 1 year of freelance experience building responsive, production-ready web applications using React, Next.js and TypeScript.",

  about: {
    lead: "I'm a frontend-focused web developer with 1 year of freelance experience building responsive, production-ready web applications using React, Next.js, and TypeScript. I'm skilled in component-based architecture, REST API integration, performance optimization, and SEO-friendly development.",
    body: "I'm a Game Engineering student at SSUET who delivers client sites end to end, from design to deployment, with a growing portfolio of live projects.",
    currently:
      "Freelancing as a web developer for local businesses and individual clients, while learning Node.js, Express and testing with Jest.",
    toolbox:
      "React · Next.js · Angular · TypeScript · Tailwind CSS · REST APIs · Firebase · Git · Vite · Vercel",
    // Headline skill line (rendered above the stack tags in the About section).
    skillsHeadline:
      "Frontend Web Development | TypeScript, Next.js, React, Angular, REST",
  },

  experience: [
    {
      year: "2025 to Present · 1 yr",
      role: "Freelance Web Developer",
      org: "Self-employed · Karachi, Pakistan",
      note: "Build and deliver responsive websites for local businesses and individual clients, handling design, development, and deployment. Work directly with clients to scope requirements and iterate on designs from feedback, translating their needs into clean, functional interfaces using modern frameworks.",
    },
    {
      year: "2025 to 2029",
      role: "B.S. Game Engineering",
      org: "Sir Syed University of Engineering & Technology (SSUET), Karachi",
      note: "Studying toward a B.S. in Game Engineering (Fall 2025, expected 2029), combining technical expertise with creativity while shipping live production projects alongside.",
    },
  ],

  skills: {
    Frontend: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    "Styling & UI": ["Tailwind CSS", "Responsive", "Component UI"],
    "Backend & APIs": ["REST APIs", "Firebase", "Python (Flask)", "C#", "C++"],
    "Tools & Workflow": ["Git", "GitHub", "Vite", "Vercel", "npm", "VS Code", "Claude Code"],
  } as Record<string, string[]>,

  learning: ["Node.js", "Express", "Testing (Jest)"],
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Fluent" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/hassanahmedgh", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hassan-ahmed-200769419/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hassanahmed31427/",
      icon: "instagram",
    },
    { label: "Email", href: "mailto:hassanahmed4546@icloud.com", icon: "email" },
  ] as { label: string; href: string; icon: SocialIconName }[],
};

export type SocialIconName = "github" | "linkedin" | "instagram" | "email";

// The live project set. Used by the one-click "Seed sample projects" button in
// the admin: projects are created/refreshed by slug, and any project in
// Firestore whose slug is NOT in this list is deleted, so this array is the
// single source of truth for what appears on the site.
export const seedProjects: ProjectInput[] = [
  {
    title: "Adscular · Agency Website",
    slug: "adscular-agency-website",
    summary:
      "Full-stack design and build of a 30+ page performance-marketing agency platform with a custom Firebase CMS, comprehensive SEO/AEO schema, and a live dashboard hero.",
    url: "https://www.adscular.agency",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    coverImage: "/projects/assets/images/adscular.svg",
    order: 1,
    status: "published",
    featured: true,
  },
  {
    title: "Elevo · Wellness E-Commerce Store",
    slug: "elevo-wellness-store",
    summary:
      "Fully responsive e-commerce store for a wellness brand, built with React, Vite, and TypeScript on a Firebase/Firestore backend. Features a live product catalog synced from the database, an animated cart drawer, a custom admin dashboard with full CRUD for products, orders, and customers, plus Google Analytics and a motion-driven UI.",
    url: "https://elevo-delta.vercel.app",
    tags: ["React", "TypeScript", "Vite", "Firebase / Firestore"],
    coverImage: "/projects/assets/images/elevo.jpeg",
    order: 2,
    status: "published",
    featured: true,
  },
  {
    title: "Student Portal Advanced",
    slug: "student-portal-advanced",
    summary:
      "Web app with CGPA tracking and attendance management, built with a TypeScript front end, Flask backend, and an interactive animated UI.",
    url: "https://student-portal-advanced.vercel.app",
    tags: ["TypeScript", "Python (Flask)"],
    coverImage: "/projects/assets/images/student-portal.jpeg",
    order: 3,
    status: "published",
    featured: false,
  },
  {
    title: "GYM · Workout Routine App",
    slug: "gym-workout-routine-app",
    summary:
      "Responsive gym workout-routine app with a clean, mobile-friendly interface.",
    url: "https://gym-routine-nine.vercel.app",
    tags: ["React", "TypeScript"],
    coverImage: "/projects/assets/images/gym.jpeg",
    order: 4,
    status: "published",
    featured: false,
  },
  {
    title: "MiniGames Hub",
    slug: "minigames-hub",
    summary:
      "Interactive hub of browser-based mini games with reusable components and responsive design.",
    url: "https://minigameshub.vercel.app",
    tags: ["React", "TypeScript"],
    coverImage: "/projects/assets/images/minigames.jpeg",
    order: 5,
    status: "published",
    featured: false,
  },
  {
    title: "Blackstone Services · Marketing Agency Website",
    slug: "blackstone-services-website",
    summary:
      "Custom-built site for a UAE/US growth agency: animated front-end with cinematic page transitions, a fully custom CMS (blog, portfolio, services, testimonials), built-in SEO suite with sitemap and schema management, and lead capture with email notifications. Built on Next.js + Firebase, scoring fast load times on zero monthly infrastructure cost.",
    url: "https://www.blackstoneservices.ae",
    tags: ["Next.js", "Firebase", "Cloudinary"],
    coverImage: "/projects/assets/images/blackstone.svg",
    order: 6,
    status: "published",
    featured: false,
  },
  {
    title: "Hassan Ahmed · Portfolio & Blog",
    slug: "hassan-ahmed-portfolio",
    summary:
      "Self-hosted portfolio and writing platform with a hand-drawn dark aesthetic, animated intro gate and scroll reveals, plus a private Firebase admin panel for publishing projects and Markdown blog posts. Server-rendered for real SEO with generated sitemap, schema and dynamic Open Graph images, running on zero monthly infrastructure cost.",
    url: "https://www.hassanahmed.site",
    tags: ["Next.js 15", "TypeScript", "Firebase", "React 19"],
    coverImage: "/projects/assets/images/portfolio.svg",
    order: 7,
    status: "published",
    featured: false,
  },
];
