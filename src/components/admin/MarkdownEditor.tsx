"use client";

import { useEffect, useRef, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

// Raw Markdown textarea + a small formatting toolbar (so you can add links and
// formatting without knowing Markdown) + a live, sanitized HTML preview.
export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [html, setHtml] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

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

  // Wrap the current selection with `before`/`after` (e.g. **bold**, `code`).
  function surround(before: string, after = before, placeholder = "text") {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const sel = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + sel + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const s = start + before.length;
      el.setSelectionRange(s, s + sel.length);
    });
  }

  // Add a prefix to the start of the current line (e.g. "## ", "> ", "- ").
  function linePrefix(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length);
    });
  }

  // Insert a Markdown link, selecting the URL portion for quick editing.
  function insertLink() {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = value.slice(start, end) || "link text";
    const snippet = `[${text}](https://)`;
    const next = value.slice(0, start) + snippet + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const urlPos = start + `[${text}](`.length;
      el.setSelectionRange(urlPos, urlPos + "https://".length);
    });
  }

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

      {tab === "write" && (
        <div className="md-toolbar">
          <button type="button" onClick={() => surround("**")} title="Bold">
            <b>B</b>
          </button>
          <button type="button" onClick={() => surround("*")} title="Italic">
            <i>i</i>
          </button>
          <button type="button" onClick={insertLink} title="Insert link">
            🔗 Link
          </button>
          <button type="button" onClick={() => linePrefix("## ")} title="Heading">
            H2
          </button>
          <button type="button" onClick={() => linePrefix("### ")} title="Sub-heading">
            H3
          </button>
          <button type="button" onClick={() => linePrefix("> ")} title="Quote">
            &ldquo;&rdquo;
          </button>
          <button type="button" onClick={() => linePrefix("- ")} title="List">
            • List
          </button>
          <button type="button" onClick={() => surround("`")} title="Code">
            {"</>"}
          </button>
        </div>
      )}

      {tab === "write" ? (
        <textarea
          ref={ref}
          className="textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Write your post…\n\nSelect text and hit 🔗 Link to add a link, or type [label](https://example.com)."}
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
