import type { Project } from "@/lib/types";
import Reveal from "@/components/chrome/Reveal";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function WorkList({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section">
      <div className="sec-head">
        <h2 className="sec-title">
          Selected
          <br />
          Work
        </h2>
        <span className="sec-count">{pad(projects.length)} projects</span>
      </div>

      <div className="work-list">
        {projects.length === 0 && (
          <div className="empty-note">
            No projects yet. Add them from the admin (or seed the sample set).
          </div>
        )}

        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <a
              href={p.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              data-hover="1"
              className="work-row"
            >
              <span className="work-no">{pad(i + 1)}</span>
              <div>
                <h3 className="work-title">{p.title}</h3>
                <span className="work-tags">{p.tags.join(" · ")}</span>
              </div>
              <div className="work-shot">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt={p.title} loading="lazy" />
                ) : (
                  <span className="shot-label">project shot →</span>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
