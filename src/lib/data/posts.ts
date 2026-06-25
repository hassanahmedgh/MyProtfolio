import "server-only";

import { unstable_cache } from "next/cache";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/server";
import type { Post } from "@/lib/types";
import { toISO } from "./serialize";

function mapPost(id: string, d: DocumentData): Post {
  return {
    id,
    title: d.title ?? "",
    slug: d.slug ?? "",
    excerpt: d.excerpt ?? "",
    body: d.body ?? "",
    coverImage: d.coverImage ?? null,
    tags: Array.isArray(d.tags) ? d.tags : [],
    category: d.category ?? "Journal",
    readingMinutes: typeof d.readingMinutes === "number" ? d.readingMinutes : 1,
    status: d.status === "published" ? "published" : "draft",
    order: typeof d.order === "number" ? d.order : 0,
    seoTitle: d.seoTitle ?? "",
    metaDescription: d.metaDescription ?? "",
    canonicalUrl: d.canonicalUrl ?? "",
    noindex: Boolean(d.noindex),
    publishedAt: toISO(d.publishedAt),
    createdAt: toISO(d.createdAt),
    updatedAt: toISO(d.updatedAt),
  };
}

/**
 * Published posts, newest first. Cached + resilient (returns [] on error).
 * Single equality filter + in-memory sort, so NO composite index is required.
 */
export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    try {
      const db = getDb();
      const q = query(
        collection(db, "posts"),
        where("status", "==", "published"),
      );
      const snap = await getDocs(q);
      return snap.docs
        .map((doc) => mapPost(doc.id, doc.data()))
        .sort((a, b) => {
          const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
          const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
          return tb - ta; // newest first
        });
    } catch (err) {
      console.error("[data] getPublishedPosts failed:", err);
      return [];
    }
  },
  ["published-posts"],
  { tags: ["posts"], revalidate: 300 },
);

/**
 * A single published post by slug, or null (→ notFound()).
 * Two equality filters (no composite index needed).
 */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const db = getDb();
      const q = query(
        collection(db, "posts"),
        where("slug", "==", slug),
        where("status", "==", "published"),
        limit(1),
      );
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const doc = snap.docs[0];
      return mapPost(doc.id, doc.data());
    } catch (err) {
      console.error("[data] getPostBySlug failed:", err);
      return null;
    }
  },
  ["post-by-slug"],
  { tags: ["posts"], revalidate: 300 },
);

/** All published slugs for sitemap + generateStaticParams. */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug).filter(Boolean);
}
