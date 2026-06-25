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
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Project, ProjectInput } from "@/lib/types";
import { revalidatePublic } from "./revalidate";

const COL = "projects";

function map(id: string, d: DocumentData): Project {
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
    createdAt: null,
    updatedAt: null,
  };
}

/** All projects incl. drafts (admin only; allowed by rules for signed-in users). */
export async function listProjects(): Promise<Project[]> {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => map(d.id, d.data()));
}

export async function getProject(id: string): Promise<Project | null> {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? map(snap.id, snap.data()) : null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => (d.data().slug as string) ?? "").filter(Boolean);
}

export async function createProject(input: ProjectInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await revalidatePublic(["projects"]);
  return ref.id;
}

export async function updateProject(
  id: string,
  input: ProjectInput,
): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
  await revalidatePublic(["projects"]);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
  await revalidatePublic(["projects"]);
}
