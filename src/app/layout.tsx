import type { Metadata } from "next";
import { Patrick_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
import { cv } from "@/content/cv";
import { getSiteUrl } from "@/lib/seo";
import AnalyticsListener from "@/components/chrome/AnalyticsListener";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${cv.name} · ${cv.title}`,
    template: `%s · ${cv.name}`,
  },
  description: cv.summary,
  keywords: [
    "Hassan Ahmed",
    "Frontend Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Karachi",
    "Portfolio",
  ],
  authors: [{ name: cv.name }],
  creator: cv.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${cv.name} · Portfolio`,
    title: `${cv.name} · ${cv.title}`,
    description: cv.summary,
    url: siteUrl,
    // og:image is supplied automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${cv.name} · ${cv.title}`,
    description: cv.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${patrickHand.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <AnalyticsListener />
      </body>
    </html>
  );
}
