import Link from "next/link";
import type { Post } from "@/lib/types";
import Reveal from "@/components/chrome/Reveal";
import { formatMonthYear } from "@/lib/format";

export default function WritingList({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" className="section">
      <div className="sec-head">
        <h2 className="sec-title">Writing</h2>
        <span className="sec-count">notes &amp; ideas</span>
      </div>

      <div className="writing-list">
        {posts.length === 0 && (
          <div className="empty-note">
            No posts yet. Write your first one from the admin.
          </div>
        )}

        {posts.map((b) => (
          <Reveal key={b.id}>
            <Link href={`/blog/${b.slug}`} data-hover="1" className="writing-row">
              <span className="writing-date">
                {formatMonthYear(b.publishedAt)}
              </span>
              <div>
                <h3 className="writing-title">{b.title}</h3>
                <p className="writing-blurb">{b.excerpt}</p>
              </div>
              <span className="writing-read">{b.readingMinutes} min</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
