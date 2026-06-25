import { cv } from "@/content/cv";

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-eyebrow">hi, i&apos;m</div>
      <h1 className="hero-title">
        Hassan
        <br />
        Ahmed
      </h1>
      <div className="hero-row">
        <p className="hero-lead">{cv.tagline}</p>
        <a href="#about" data-hover="1" className="scroll-cue">
          scroll<span style={{ fontSize: "18px" }}>↓</span>
        </a>
      </div>
    </header>
  );
}
