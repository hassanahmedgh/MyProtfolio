"use client";

import AuthGuard from "@/components/admin/AuthGuard";
import AdminBar from "@/components/admin/AdminBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminBar />
      <div className="admin-wrap">{children}</div>
    </AuthGuard>
  );
}
