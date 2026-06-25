"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

// Raw Markdown textarea with a live, sanitized HTML preview (same pipeline used
// to render the published article).
export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (tab !== "preview") return;
    let active = true;
    markdownToHtml(value).then((h) => {
      if (active) setHtml(h);
    });
    return () => {
      active = false;
    };
  }, [tab, value]);

  return (
    <div className="field">
      <label>Body (Markdown)</label>
      <div className="seg">
        <button
          type="button"
          className={tab === "write" ? "active" : ""}
          onClick={() => setTab("write")}
        >
          Write
        </button>
        <button
          type="button"
          className={tab === "preview" ? "active" : ""}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
      </div>

      {tab === "write" ? (
        <textarea
          className="textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"## A heading\n\nWrite your post in Markdown…\n\n> A quote\n\n- a list item"}
          style={{ marginTop: 12 }}
        />
      ) : (
        <div
          className="prose preview-pane"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
