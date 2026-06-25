import { cv } from "@/content/cv";

export default function About() {
  const allSkills = Object.values(cv.skills).flat();

  return (
    <section id="about" className="section">
      <div className="eyebrow" style={{ marginBottom: "50px" }}>
        <span className="dot" />
        so, about me
      </div>
      <div className="about-grid">
        <div>
          <p className="about-lead">{cv.about.lead}</p>
          <p className="about-body">{cv.about.body}</p>
        </div>
        <div className="about-side">
          <div className="h">currently</div>
          <p>{cv.about.currently}</p>
          <div className="h">toolbox</div>
          <p>{cv.about.toolbox}</p>
          <div className="h">stack</div>
          <div className="skill-tags">
            {allSkills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
