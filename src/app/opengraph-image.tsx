import { ImageResponse } from "next/og";
import { cv } from "@/content/cv";

// Branded social-share card, auto-applied to all routes (and inherited by pages
// that don't set their own og:image). 1200x630.
export const alt = `${cv.name} · ${cv.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(245,245,240,0.18), transparent 55%)",
          color: "#f5f5f0",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.55)",
          }}
        >
          <span>Portfolio &apos;26</span>
          <span>Frontend / Web</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            <div>Hassan</div>
            <div>Ahmed</div>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              color: "rgba(245,245,240,0.8)",
            }}
          >
            {`${cv.title} · Karachi`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 26,
            color: "rgba(245,245,240,0.5)",
          }}
        >
          <span>React</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>TypeScript</span>
          <span>·</span>
          <span>Firebase</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
