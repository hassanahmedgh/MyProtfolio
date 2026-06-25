import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/data/posts";
import { formatMonthYear } from "@/lib/format";

export const runtime = "nodejs";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and ideas on frontend development, motion and the web, by Hassan Ahmed.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <div className="page-bg page-bg--blog">
      <nav className="nav">
        <Link href="/" className="nav-brand" aria-label="Home">
          <span className="mark">ha</span>
          <span className="bullet" />
        </Link>
        <Link href="/" className="article-back" data-hover="1">
          ← back to work
        </Link>
      </nav>

      <section className="article" style={{ maxWidth: 880 }}>
        <div className="article-eyebrow">Journal</div>
        <h1 className="article-title" style={{ marginBottom: 44 }}>
          Writing
        </h1>

        <div className="writing-list">
          {posts.length === 0 && (
            <div className="empty-note">No posts published yet. Check back soon.</div>
          )}
          {posts.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="writing-row"
              data-hover="1"
            >
              <span className="writing-date">{formatMonthYear(b.publishedAt)}</span>
              <div>
                <h3 className="writing-title">{b.title}</h3>
                <p className="writing-blurb">{b.excerpt}</p>
              </div>
              <span className="writing-read">{b.readingMinutes} min</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
