"use client";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Post, PostInput } from "@/lib/types";
import { estimateReadingMinutes } from "@/lib/slug";
import { revalidatePublic } from "./revalidate";

const COL = "posts";

function map(id: string, d: DocumentData): Post {
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
    publishedAt:
      d.publishedAt instanceof Timestamp
        ? d.publishedAt.toDate().toISOString()
        : null,
    createdAt: null,
    updatedAt: null,
  };
}

/** All posts incl. drafts (admin only). */
export async function listPosts(): Promise<Post[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => map(d.id, d.data()));
}

export async function getPost(id: string): Promise<Post | null> {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? map(snap.id, snap.data()) : null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => (d.data().slug as string) ?? "").filter(Boolean);
}

export async function createPost(input: PostInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    readingMinutes: estimateReadingMinutes(input.body),
    // Stamp publishedAt the moment it first goes live.
    publishedAt: input.status === "published" ? serverTimestamp() : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await revalidatePublic(["posts"]);
  return ref.id;
}

export async function updatePost(id: string, input: PostInput): Promise<void> {
  const existing = await getDoc(doc(db, COL, id));
  const had = existing.exists() ? existing.data() : {};
  const alreadyPublished = had.publishedAt instanceof Timestamp;

  await updateDoc(doc(db, COL, id), {
    ...input,
    readingMinutes: estimateReadingMinutes(input.body),
    // Keep the original publish date; set it now if publishing for the first time.
    publishedAt:
      input.status === "published"
        ? alreadyPublished
          ? had.publishedAt
          : serverTimestamp()
        : alreadyPublished
          ? had.publishedAt
          : null,
    updatedAt: serverTimestamp(),
  });
  await revalidatePublic(["posts"]);
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
  await revalidatePublic(["posts"]);
}
