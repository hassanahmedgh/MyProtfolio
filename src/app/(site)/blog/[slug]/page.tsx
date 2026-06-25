import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPublishedPosts,
  getAllPostSlugs,
} from "@/lib/data/posts";
import { markdownToHtml } from "@/lib/markdown";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleBody from "@/components/blog/ArticleBody";
import MorePosts from "@/components/blog/MorePosts";
import JsonLd from "@/components/seo/JsonLd";
import { cv } from "@/content/cv";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const revalidate = 300;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  // Per-post SEO overrides, each falling back to a sensible default.
  const metaTitle = post.seoTitle?.trim() || post.title;
  const metaDescription = post.metaDescription?.trim() || post.excerpt;
  const canonical = post.canonicalUrl?.trim() || `/blog/${post.slug}`;
  // Use the post cover for social cards, but skip SVG (most social platforms
  // don't render SVG) and let it inherit the generated PNG OG image instead.
  const ogCover =
    post.coverImage && !post.coverImage.toLowerCase().endsWith(".svg")
      ? post.coverImage
      : null;
  const images = ogCover ? [ogCover] : undefined;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      authors: [cv.name],
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      ...(images ? { images } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.body);
  const all = await getPublishedPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const year = new Date().getFullYear();

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription?.trim() || post.excerpt,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    author: { "@type": "Person", name: cv.name, url: getSiteUrl() },
    publisher: { "@type": "Person", name: cv.name, url: getSiteUrl() },
    image:
      post.coverImage && !post.coverImage.toLowerCase().endsWith(".svg")
        ? [post.coverImage]
        : [absoluteUrl("/opengraph-image")],
    keywords: post.tags.join(", "),
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };

  return (
    <div className="page-bg page-bg--blog">
      <JsonLd data={blogPostingLd} />

      <nav className="nav">
        <Link href="/" className="nav-brand" aria-label="Home">
          <span className="mark">ha</span>
          <span className="bullet" />
        </Link>
        <Link href="/blog" className="article-back" data-hover="1">
          ← back to writing
        </Link>
      </nav>

      <article className="article">
        <ArticleHeader post={post} />

        {post.coverImage && (
          <div className="article-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <ArticleBody html={html} />

        <MorePosts posts={more} />

        <div style={{ marginTop: 80, textAlign: "center" }}>
          <Link href="/" className="article-back" data-hover="1">
            ← back to portfolio
          </Link>
        </div>
      </article>

      <footer className="article-footer">
        <span>© {year} Hassan Ahmed</span>
        <span>built with too much coffee</span>
      </footer>
    </div>
  );
}
