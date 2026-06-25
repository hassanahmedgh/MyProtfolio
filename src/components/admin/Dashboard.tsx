"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listProjects, deleteProject } from "@/lib/admin/projects";
import { listPosts, deletePost } from "@/lib/admin/posts";
import { seedSampleProjects } from "@/lib/admin/seed";
import type { Project, Post } from "@/lib/types";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [seeding, setSeeding] = useState(false);

  const load = useCallback(async () => {
    setErr("");
    try {
      const [p, b] = await Promise.all([listProjects(), listPosts()]);
      setProjects(p);
      setPosts(b);
    } catch (e) {
      setErr(
        "Could not load data. Check that Firestore is enabled and rules are published. " +
          (e instanceof Error ? e.message : ""),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onSeed = async () => {
    setSeeding(true);
    setMsg("");
    setErr("");
    try {
      const { added, updated } = await seedSampleProjects();
      setMsg(`Seeded ${added} new project(s); refreshed ${updated} existing.`);
      await load();
    } catch (e) {
      setErr("Seeding failed. " + (e instanceof Error ? e.message : ""));
    } finally {
      setSeeding(false);
    }
  };

  const onDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete project “${title}”? This cannot be undone.`)) return;
    await deleteProject(id);
    await load();
  };

  const onDeletePost = async (id: string, title: string) => {
    if (!confirm(`Delete post “${title}”? This cannot be undone.`)) return;
    await deletePost(id);
    await load();
  };

  if (loading) return <div className="center-screen">Loading…</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="admin-sub">Manage your projects and blog posts.</p>

      {err && <p className="error-text">{err}</p>}
      {msg && <p className="ok-text">{msg}</p>}

      {/* PROJECTS */}
      <h2>Projects</h2>
      <div className="admin-actions" style={{ marginBottom: 16 }}>
        <Link href="/admin/projects/new" className="btn btn--solid">
          + New project
        </Link>
        <button
          type="button"
          className="btn"
          onClick={onSeed}
          disabled={seeding}
        >
          {seeding ? "Seeding…" : "Seed sample projects"}
        </button>
      </div>

      <div className="admin-list">
        {projects.length === 0 && (
          <div className="admin-item">
            <span className="s">No projects yet.</span>
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className="admin-item">
            <div className="meta">
              <span className="t">{p.title}</span>
              <span className="s">
                #{p.order} · {p.tags.join(", ")}
              </span>
            </div>
            <div className="admin-actions">
              <span className={`badge badge--${p.status}`}>{p.status}</span>
              <Link href={`/admin/projects/${p.id}`} className="btn btn--ghost">
                Edit
              </Link>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => onDeleteProject(p.id, p.title)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POSTS */}
      <h2>Blog posts</h2>
      <div className="admin-actions" style={{ marginBottom: 16 }}>
        <Link href="/admin/posts/new" className="btn btn--solid">
          + New post
        </Link>
      </div>

      <div className="admin-list">
        {posts.length === 0 && (
          <div className="admin-item">
            <span className="s">No posts yet.</span>
          </div>
        )}
        {posts.map((b) => (
          <div key={b.id} className="admin-item">
            <div className="meta">
              <span className="t">{b.title}</span>
              <span className="s">
                /{b.slug} · {b.readingMinutes} min
              </span>
            </div>
            <div className="admin-actions">
              <span className={`badge badge--${b.status}`}>{b.status}</span>
              {b.status === "published" && (
                <Link href={`/blog/${b.slug}`} className="btn btn--ghost" target="_blank">
                  View
                </Link>
              )}
              <Link href={`/admin/posts/${b.id}`} className="btn btn--ghost">
                Edit
              </Link>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => onDeletePost(b.id, b.title)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
