"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageField from "./ImageField";
import {
  createProject,
  updateProject,
  getAllProjectSlugs,
} from "@/lib/admin/projects";
import { slugify, ensureUniqueSlug } from "@/lib/slug";
import type { Project, ProjectInput, Status } from "@/lib/types";

export default function ProjectForm({ initial }: { initial?: Project | null }) {
  const editing = Boolean(initial);
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [cover, setCover] = useState<string | null>(initial?.coverImage ?? null);
  const [order, setOrder] = useState(String(initial?.order ?? 0));
  const [status, setStatus] = useState<Status>(initial?.status ?? "draft");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
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
      const all = await getAllProjectSlugs();
      const others = all.filter((s) => s !== initial?.slug);
      const finalSlug = ensureUniqueSlug(slugify(slug || title), others);

      const input: ProjectInput = {
        title: title.trim(),
        slug: finalSlug,
        summary: summary.trim(),
        url: url.trim(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        coverImage: cover,
        order: Number(order) || 0,
        status,
        featured,
      };

      if (editing && initial) await updateProject(initial.id, input);
      else await createProject(input);
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
          <span className="hint">Used for ordering/links. Auto-made unique.</span>
        </div>
        <div className="field">
          <label>Order (lower = first)</label>
          <input
            className="input"
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label>Live URL</label>
        <input
          className="input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="field">
        <label>Tags (comma-separated)</label>
        <input
          className="input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="React, TypeScript, Firebase"
        />
      </div>

      <div className="field">
        <label>Summary</label>
        <textarea
          className="textarea"
          style={{ minHeight: 120, fontFamily: "var(--font-hand)", fontSize: 18 }}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <ImageField value={cover} onChange={setCover} />

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
          <label>Featured</label>
          <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="hint">Highlight this project</span>
          </label>
        </div>
      </div>

      {err && <p className="error-text">{err}</p>}

      <div className="admin-actions" style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn--solid" disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Create project"}
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
