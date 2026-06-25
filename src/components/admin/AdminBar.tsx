"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";

export default function AdminBar() {
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };
  return (
    <div className="admin-bar">
      <Link href="/admin" className="brand">
        ha · admin
      </Link>
      <div className="admin-actions">
        <Link href="/" className="btn btn--ghost" target="_blank">
          View site ↗
        </Link>
        <button type="button" className="btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
