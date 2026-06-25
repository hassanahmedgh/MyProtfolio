import Link from "next/link";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Path" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="#top" data-hover="1" className="nav-brand" aria-label="Home">
        <span className="mark">ha</span>
        <span className="bullet" />
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-hover="1">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
