import { ImageResponse } from "next/og";

// Home-screen / bookmark icon for iOS and friends.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(circle at 50% 25%, rgba(245,245,240,0.18), transparent 60%)",
          color: "#f5f5f0",
          fontSize: 110,
          fontWeight: 800,
          letterSpacing: -4,
          fontFamily: "sans-serif",
        }}
      >
        ha
      </div>
    ),
    { ...size },
  );
}
