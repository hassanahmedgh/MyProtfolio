import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

// Markdown -> sanitized HTML. Sanitization is mandatory before the result is
// injected via dangerouslySetInnerHTML, even though authoring is admin-only.
// Pure + isomorphic: used server-side for the published article and client-side
// for the admin live preview.
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown ?? "");
  return String(file);
}
