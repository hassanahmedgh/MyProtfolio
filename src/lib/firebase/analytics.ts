"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { app } from "./client";

// getAnalytics throws during SSR and on unsupported environments, so it must be
// called from the browser only and guarded with isSupported(). Call this inside
// a useEffect (see AnalyticsListener).
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return null;
  try {
    if (await isSupported()) return getAnalytics(app);
  } catch {
    /* analytics unavailable — ignore */
  }
  return null;
}
