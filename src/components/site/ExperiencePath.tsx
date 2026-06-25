import { cv } from "@/content/cv";
import Reveal from "@/components/chrome/Reveal";

export default function ExperiencePath() {
  return (
    <section id="experience" className="section">
      <div className="eyebrow" style={{ marginBottom: "56px" }}>
        <span className="dot" />
        the path so far
      </div>
      <div className="exp-list">
        {cv.experience.map((e) => (
          <Reveal key={e.role}>
            <div className="exp-row">
              <span className="exp-year">{e.year}</span>
              <div>
                <h3 className="exp-role">{e.role}</h3>
                <div className="exp-org">{e.org}</div>
                <p className="exp-note">{e.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
