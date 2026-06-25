"use client";

import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";

// Gates protected admin pages. While auth state resolves we show a loader; if no
// user, redirect to the login page. Writes are also enforced by Firestore rules.
export default function AuthGuard({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace("/admin/login");
    });
  }, [router]);

  if (user === undefined) return <div className="center-screen">Checking session…</div>;
  if (!user) return <div className="center-screen">Redirecting to login…</div>;
  return <>{children}</>;
}
