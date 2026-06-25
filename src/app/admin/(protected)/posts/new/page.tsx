import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1>New post</h1>
      <p className="admin-sub" style={{ marginBottom: 24 }}>
        Write a new blog post in Markdown.
      </p>
      <PostForm />
    </div>
  );
}
