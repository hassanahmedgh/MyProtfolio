"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";

/**
 * Upload an image to Firebase Storage under covers/ and return its download URL.
 * NOTE: Cloud Storage requires the Firebase Blaze plan. On the free Spark plan
 * this will fail — use the "Paste URL" option in ImageField instead.
 */
export async function uploadCoverImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `covers/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
