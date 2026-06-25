import "server-only";

import { unstable_cache } from "next/cache";
import {
  collection,
  getDocs,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase/server";
import type { Project } from "@/lib/types";
import { toISO } from "./serialize";

function mapProject(id: string, d: DocumentData): Project {
  return {
    id,
    title: d.title ?? "",
    slug: d.slug ?? "",
    summary: d.summary ?? "",
    url: d.url ?? "",
    tags: Array.isArray(d.tags) ? d.tags : [],
    coverImage: d.coverImage ?? null,
    order: typeof d.order === "number" ? d.order : 0,
    status: d.status === "published" ? "published" : "draft",
    featured: Boolean(d.featured),
    createdAt: toISO(d.createdAt),
    updatedAt: toISO(d.updatedAt),
  };
}

/**
 * Published projects for the public site, ordered by `order` asc.
 * Cached (ISR + tag) and resilient: returns [] if Firebase isn't configured yet
 * so the site still renders before seeding.
 *
 * Uses a single equality filter + in-memory sort, so NO composite index is
 * required (a portfolio has few projects).
 */
export const getPublishedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const db = getDb();
      const q = query(
        collection(db, "projects"),
        where("status", "==", "published"),
      );
      const snap = await getDocs(q);
      return snap.docs
        .map((doc) => mapProject(doc.id, doc.data()))
        .sort((a, b) => a.order - b.order);
    } catch (err) {
      console.error("[data] getPublishedProjects failed:", err);
      return [];
    }
  },
  ["published-projects"],
  { tags: ["projects"], revalidate: 300 },
);
