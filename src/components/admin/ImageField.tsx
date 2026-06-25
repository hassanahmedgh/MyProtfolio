"use client";

import { useState } from "react";
import { uploadCoverImage } from "@/lib/admin/upload";

// Cover image input supporting BOTH a Firebase Storage upload and a pasted URL.
// Stores a single string (the resulting image URL) via onChange.
export default function ImageField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const url = await uploadCoverImage(file);
      onChange(url);
    } catch {
      setErr(
        "Upload failed. Firebase Storage requires the Blaze plan, so switch to “Paste URL”.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="field">
      <label>Cover image</label>

      <div className="seg" role="tablist">
        <button
          type="button"
          className={mode === "url" ? "active" : ""}
          onClick={() => setMode("url")}
        >
          Paste URL
        </button>
        <button
          type="button"
          className={mode === "upload" ? "active" : ""}
          onClick={() => setMode("upload")}
        >
          Upload
        </button>
      </div>

      {mode === "url" ? (
        <input
          className="input"
          type="text"
          inputMode="url"
          placeholder="https://…/image.jpg or /projects/…"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value.trim() || null)}
          style={{ marginTop: 12 }}
        />
      ) : (
        <div style={{ marginTop: 12 }}>
          <input type="file" accept="image/*" onChange={onFile} disabled={uploading} />
          {uploading && <p className="hint">Uploading…</p>}
          <p className="hint">
            Storage upload needs the Firebase Blaze plan. On the free plan, use
            “Paste URL”.
          </p>
        </div>
      )}

      {err && <p className="error-text" style={{ marginTop: 8 }}>{err}</p>}

      {value && (
        <div className="img-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover preview" />
        </div>
      )}
    </div>
  );
}
