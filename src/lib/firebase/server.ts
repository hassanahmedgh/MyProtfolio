import "server-only";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

// A dedicated, named Firebase app for server-side reads so it never collides with
// the browser/default app's Firestore instance during SSR (where "use client"
// modules also execute). Reads are public and gated by Firestore security rules,
// so no service-account / Admin SDK is required.
const SERVER_APP = "server";

let cachedDb: Firestore | null = null;

export function getDb(): Firestore {
  if (cachedDb) return cachedDb;

  const app: FirebaseApp =
    getApps().find((a) => a.name === SERVER_APP) ??
    initializeApp(firebaseConfig, SERVER_APP);

  try {
    // Long-polling is the reliable transport for the web SDK in Node/serverless.
    cachedDb = initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch {
    // Already initialized for this app (e.g. module re-eval) — reuse it.
    cachedDb = getFirestore(app);
  }
  return cachedDb;
}
