import { cv } from "@/content/cv";
import { formatMonthYear } from "@/lib/format";
import type { Post } from "@/lib/types";

export default function ArticleHeader({ post }: { post: Post }) {
  return (
    <header style={{ marginBottom: "56px" }}>
      <div className="article-eyebrow">{post.category}</div>
      <h1 className="article-title">{post.title}</h1>
      {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
      <div className="article-byline">
        <span>By {cv.name}</span>
        <span>{formatMonthYear(post.publishedAt)}</span>
        <span>{post.readingMinutes} min read</span>
      </div>
    </header>
  );
}
