export type Status = "draft" | "published";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  url: string;
  tags: string[];
  coverImage: string | null;
  order: number;
  status: Status;
  featured: boolean;
  /** ISO strings — Firestore Timestamps are converted at the data layer so they cross the server→client boundary. */
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Raw Markdown source, authored in the admin. Rendered to sanitized HTML at request time. */
  body: string;
  coverImage: string | null;
  tags: string[];
  category: string;
  readingMinutes: number;
  status: Status;
  order: number;
  /** SEO overrides (all optional — blank falls back to sensible defaults). */
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  publishedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/** Shape used by the admin create/edit forms (no server-managed fields). */
export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;
export type PostInput = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "publishedAt" | "readingMinutes"
>;
