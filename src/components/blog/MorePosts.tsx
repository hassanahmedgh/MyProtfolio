import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatMonthYear } from "@/lib/format";

export default function MorePosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="more-writing">
      <div className="more-head">More writing</div>
      {posts.map((m) => (
        <Link key={m.id} href={`/blog/${m.slug}`} data-hover="1" className="more-row">
          <span className="t">{m.title}</span>
          <span className="d">{formatMonthYear(m.publishedAt)}</span>
        </Link>
      ))}
    </div>
  );
}
