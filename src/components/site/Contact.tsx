import { cv } from "@/content/cv";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-eyebrow">got something in mind?</div>
      <a href={`mailto:${cv.email}`} data-hover="1" className="contact-cta">
        let&apos;s
        <br />
        talk →
      </a>
      <div className="socials">
        {cv.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            data-hover="1"
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
