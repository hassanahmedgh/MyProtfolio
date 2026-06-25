"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageField from "./ImageField";
import MarkdownEditor from "./MarkdownEditor";
import { createPost, updatePost, getAllPostSlugs } from "@/lib/admin/posts";
import { slugify, ensureUniqueSlug } from "@/lib/slug";
import type { Post, PostInput, Status } from "@/lib/types";

export default function PostForm({ initial }: { initial?: Post | null }) {
  const editing = Boolean(initial);
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Journal · Frontend");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [cover, setCover] = useState<string | null>(initial?.coverImage ?? null);
  const [body, setBody] = useState(initial?.body ?? "");
  const [status, setStatus] = useState<Status>(initial?.status ?? "draft");
  const [order, setOrder] = useState(String(initial?.order ?? 0));
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.metaDescription ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.canonicalUrl ?? "");
  const [noindex, setNoindex] = useState(initial?.noindex ?? false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErr("Title is required.");
      return;
    }
    setErr("");
    setSaving(true);
    try {
      const all = await getAllPostSlugs();
      const others = all.filter((s) => s !== initial?.slug);
      const finalSlug = ensureUniqueSlug(slugify(slug || title), others);

      const input: PostInput = {
        title: title.trim(),
        slug: finalSlug,
        excerpt: excerpt.trim(),
        body,
        coverImage: cover,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: category.trim() || "Journal",
        status,
        order: Number(order) || 0,
        seoTitle: seoTitle.trim(),
        metaDescription: metaDescription.trim(),
        canonicalUrl: canonicalUrl.trim(),
        noindex,
      };

      if (editing && initial) await updatePost(initial.id, input);
      else await createPost(input);
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setErr(
        "Could not save. Make sure you're signed in. " +
          (e instanceof Error ? e.message : ""),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            if (!slug && title) setSlug(slugify(title));
          }}
          required
        />
      </div>

      <div className="row2">
        <div className="field">
          <label>Slug</label>
          <input
            className="input"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto from title"
          />
          <span className="hint">The /blog/&lt;slug&gt; URL. Avoid changing after publish.</span>
        </div>
        <div className="field">
          <label>Eyebrow / category</label>
          <input
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label>Excerpt (used in lists + meta description)</label>
        <textarea
          className="textarea"
          style={{ minHeight: 100, fontFamily: "var(--font-hand)", fontSize: 18 }}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Tags (comma-separated)</label>
        <input
          className="input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Frontend, Motion"
        />
      </div>

      <ImageField value={cover} onChange={setCover} />

      <MarkdownEditor value={body} onChange={setBody} />

      <div className="row2">
        <div className="field">
          <label>Status</label>
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="field">
          <label>Order (optional pin)</label>
          <input
            className="input"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
      </div>

      <h2 style={{ fontSize: 22, margin: "32px 0 6px" }}>SEO</h2>
      <p className="admin-sub" style={{ marginBottom: 18 }}>
        All optional. Leave blank to use smart defaults.
      </p>

      <div className="field">
        <label>Meta title</label>
        <input
          className="input"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="Defaults to the post title"
        />
        <span className="hint">
          The clickable headline in Google / browser tab. ~60 characters.
        </span>
      </div>

      <div className="field">
        <label>Meta description</label>
        <textarea
          className="textarea"
          style={{ minHeight: 90, fontFamily: "var(--font-hand)", fontSize: 18 }}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Defaults to the excerpt"
        />
        <span className="hint">
          The grey summary text under the title in search results. ~155 characters.
        </span>
      </div>

      <div className="field">
        <label>Canonical URL</label>
        <input
          className="input"
          type="text"
          value={canonicalUrl}
          onChange={(e) => setCanonicalUrl(e.target.value)}
          placeholder="Defaults to this post's own URL"
        />
        <span className="hint">
          Only set this if this content also lives at another URL (points search
          engines to the original).
        </span>
      </div>

      <div className="field">
        <label>Search visibility</label>
        <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
          <input
            type="checkbox"
            checked={noindex}
            onChange={(e) => setNoindex(e.target.checked)}
          />
          <span className="hint">
            Hide this post from search engines (noindex). Keep OFF for normal posts.
          </span>
        </label>
      </div>

      <p className="hint" style={{ marginBottom: 18 }}>
        Tags above are used as keywords, and the cover image is the social-share
        (Open Graph) image.
      </p>

      {err && <p className="error-text">{err}</p>}

      <div className="admin-actions" style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn--solid" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Create post"}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
