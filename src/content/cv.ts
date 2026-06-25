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
  instagram: "https://www.instagram.com/hassanahmed31427/",

  // Hero / meta
  tagline:
    "I design and build fast, responsive web experiences, turning client ideas into production-ready interfaces.",
  summary:
    "Frontend-focused web developer with 1 year of freelance experience building responsive, production-ready web applications using React, Next.js and TypeScript. Skilled in component-based architecture, REST API integration, performance optimization and SEO-friendly development. A Game Engineering student who delivers client sites end to end, from design to deployment.",

  about: {
    lead: "I'm a frontend web developer based in Karachi. I spend my days turning rough ideas and client briefs into living, responsive interfaces, built end to end, from design through deployment.",
    body: "My favorite kind of work sits where clean engineering meets a little bit of craft: component architecture, smooth interactions, SEO-friendly builds, and the small details people feel but never quite notice.",
    currently: "Building client sites with React, Next.js and TypeScript, and learning Node.js, Express and testing with Jest.",
    toolbox:
      "React · Next.js · TypeScript · JavaScript · Tailwind CSS · Firebase · REST APIs · Git · Vercel · Vite",
  },

  experience: [
    {
      year: "2025 to Present",
      role: "Freelance Web Developer",
      org: "Self-employed · Karachi, Pakistan",
      note: "Build and deliver responsive websites for local businesses and individual clients, handling design, development and deployment. Scope requirements directly with clients and translate their needs into clean, functional interfaces using modern frameworks.",
    },
    {
      year: "2025 to 2029",
      role: "B.S. Game Engineering",
      org: "Sir Syed University of Engineering & Technology (SSUET), Karachi",
      note: "Currently studying toward a B.S. in Game Engineering (Fall 2025, expected 2029) while freelancing and shipping live client projects on the side.",
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
      label: "Instagram",
      href: "https://www.instagram.com/hassanahmed31427/",
      icon: "instagram",
    },
    { label: "Email", href: "mailto:hassanahmed4546@icloud.com", icon: "email" },
  ] as { label: string; href: string; icon: SocialIconName }[],
};

export type SocialIconName = "github" | "instagram" | "email";

// The 5 real projects from the CV. Used by the one-click "Seed sample projects"
// button in the admin to populate Firestore (idempotent, keyed by slug).
export const seedProjects: ProjectInput[] = [
  {
    title: "Adscular · Agency Website",
    slug: "adscular-agency-website",
    summary:
      "Full-stack design and build of a 30+ page performance-marketing agency platform with a custom Firebase CMS, comprehensive SEO/AEO schema, and a live dashboard hero.",
    url: "https://adscular.agency",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    coverImage: "/projects/assets/images/adscular.png",
    order: 1,
    status: "published",
    featured: true,
  },
  {
    title: "Elevo · Wellness E-Commerce Store",
    slug: "elevo-wellness-store",
    summary:
      "Fully responsive e-commerce store for a wellness brand: a live product catalog synced from Firestore, an animated cart drawer, a custom admin dashboard with full CRUD for products, orders and customers, plus Google Analytics and a motion-driven UI.",
    url: "https://elevo-delta.vercel.app",
    tags: ["React", "TypeScript", "Vite", "Firebase", "Firestore"],
    coverImage: "/projects/assets/images/elevo.jpeg",
    order: 2,
    status: "published",
    featured: true,
  },
  {
    title: "Student Portal Advanced",
    slug: "student-portal-advanced",
    summary:
      "Web app with CGPA tracking and attendance management, built with a TypeScript front end, a Flask backend, and an interactive animated UI.",
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
];
