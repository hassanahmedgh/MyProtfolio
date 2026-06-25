"use client";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { seedProjects } from "@/content/cv";
import { seedPosts } from "@/content/posts";
import { estimateReadingMinutes } from "@/lib/slug";
import { revalidatePublic } from "./revalidate";

/**
 * Seed/refresh the 5 real CV projects in Firestore. Runs client-side as the
 * authenticated admin (writes require sign-in per security rules).
 *
 * - New projects (by slug) are created.
 * - Existing projects (by slug) have their canonical fields refreshed
 *   (title/summary/url/tags/order) so re-running fixes stale data, while
 *   preserving anything you customized (coverImage, status, featured).
 */
export async function seedSampleProjects(): Promise<{
  added: number;
  updated: number;
}> {
  const snap = await getDocs(collection(db, "projects"));
  const existingBySlug = new Map<string, { id: string; coverImage: string | null }>();
  snap.docs.forEach((d) => {
    const data = d.data();
    const slug = (data.slug as string) ?? "";
    if (slug) {
      existingBySlug.set(slug, {
        id: d.id,
        coverImage: (data.coverImage as string) ?? null,
      });
    }
  });

  let added = 0;
  let updated = 0;
  for (const p of seedProjects) {
    const existing = existingBySlug.get(p.slug);
    if (existing) {
      await updateDoc(doc(db, "projects", existing.id), {
        title: p.title,
        summary: p.summary,
        url: p.url,
        tags: p.tags,
        order: p.order,
        coverImage: p.coverImage,
        updatedAt: serverTimestamp(),
      });
      updated++;
    } else {
      await addDoc(collection(db, "projects"), {
        ...p,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      added++;
    }
  }

  if (added > 0 || updated > 0) await revalidatePublic(["projects"]);
  return { added, updated };
}

/**
 * Seed/refresh the starter blog posts in Firestore (published). New posts (by
 * slug) are created; existing ones have their content refreshed while keeping
 * their original publish date.
 */
export async function seedSamplePosts(): Promise<{
  added: number;
  updated: number;
}> {
  const snap = await getDocs(collection(db, "posts"));
  const existingBySlug = new Map<string, { id: string; publishedAt: unknown }>();
  snap.docs.forEach((d) => {
    const data = d.data();
    const slug = (data.slug as string) ?? "";
    if (slug) existingBySlug.set(slug, { id: d.id, publishedAt: data.publishedAt });
  });

  let added = 0;
  let updated = 0;
  for (const p of seedPosts) {
    const existing = existingBySlug.get(p.slug);
    const readingMinutes = estimateReadingMinutes(p.body);
    if (existing) {
      const alreadyPublished = existing.publishedAt instanceof Timestamp;
      await updateDoc(doc(db, "posts", existing.id), {
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        coverImage: p.coverImage,
        tags: p.tags,
        category: p.category,
        status: p.status,
        order: p.order,
        readingMinutes,
        publishedAt:
          alreadyPublished
            ? existing.publishedAt
            : p.status === "published"
              ? serverTimestamp()
              : null,
        updatedAt: serverTimestamp(),
      });
      updated++;
    } else {
      await addDoc(collection(db, "posts"), {
        ...p,
        readingMinutes,
        publishedAt: p.status === "published" ? serverTimestamp() : null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      added++;
    }
  }

  if (added > 0 || updated > 0) await revalidatePublic(["posts"]);
  return { added, updated };
}
