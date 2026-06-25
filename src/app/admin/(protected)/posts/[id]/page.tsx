"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/lib/admin/posts";
import PostForm from "@/components/admin/PostForm";
import type { Post } from "@/lib/types";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (id) getPost(id).then(setPost);
  }, [id]);

  if (post === undefined) return <div className="center-screen">Loading…</div>;
  if (post === null)
    return (
      <div>
        <h1>Not found</h1>
        <p className="admin-sub">That post doesn&apos;t exist.</p>
      </div>
    );

  return (
    <div>
      <h1>Edit post</h1>
      <p className="admin-sub" style={{ marginBottom: 24 }}>
        {post.title}
      </p>
      <PostForm initial={post} />
    </div>
  );
}
