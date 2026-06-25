import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px" }}>
      <div>
        <h1 className="hero-title" style={{ fontSize: "clamp(80px,18vw,200px)" }}>
          404
        </h1>
        <p className="hero-lead" style={{ margin: "20px auto 36px", maxWidth: 480 }}>
          This page wandered off. Let&apos;s get you back.
        </p>
        <Link href="/" data-hover="1" className="article-back" style={{ fontSize: 14 }}>
          ← back to portfolio
        </Link>
      </div>
    </div>
  );
}
