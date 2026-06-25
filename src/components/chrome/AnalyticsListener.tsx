"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase/analytics";

// Initializes Firebase Analytics in the browser only (guarded by isSupported()).
export default function AnalyticsListener() {
  useEffect(() => {
    void initAnalytics();
  }, []);
  return null;
}
