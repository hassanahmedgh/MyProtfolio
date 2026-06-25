"use client";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { seedProjects } from "@/content/cv";
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
