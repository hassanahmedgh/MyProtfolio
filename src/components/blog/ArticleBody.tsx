// Renders pre-sanitized HTML (produced by markdownToHtml -> rehype-sanitize)
// inside the .prose styles that match the design prototype.
export default function ArticleBody({ html }: { html: string }) {
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
