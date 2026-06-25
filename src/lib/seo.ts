// Single source of truth for the canonical site URL used across metadata,
// canonicals, Open Graph, sitemap and robots.
//
// Precedence:
//   1. NEXT_PUBLIC_SITE_URL  (set this to your real domain in production)
//   2. https://$VERCEL_URL   (auto-provided on Vercel deployments/previews)
//   3. http://localhost:3000 (local dev fallback)
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;

  return "http://localhost:3000";
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = ""): string {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
