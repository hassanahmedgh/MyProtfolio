import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Shell for all /admin pages (login + protected). The blob cursor is NOT mounted
// here (it lives in the public-site layout), so admin keeps the native cursor.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin">{children}</div>;
}
