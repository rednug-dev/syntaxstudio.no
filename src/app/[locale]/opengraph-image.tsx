import { ImageResponse } from "next/og";

export const alt = "Syntax Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const isNo = params.locale === "no";
  const tagline = isNo
    ? "Nettsider, video og markedsføring"
    : "Websites, video and marketing";
  const sub = isNo
    ? "Én partner, hele leveransen."
    : "One partner, the whole job.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 0%, #1a1a1a 0%, #0a0a0a 60%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#ffffff" }}>SYNTAX</span>
          <span style={{ color: "#888888", marginLeft: 12 }}>STUDIO</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a3a3a3",
              fontWeight: 400,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#737373",
          }}
        >
          <span>syntaxstudio.no</span>
          <span style={{ display: "flex", gap: 24 }}>
            <span>{isNo ? "Nettsider" : "Web"}</span>
            <span>·</span>
            <span>{isNo ? "Video" : "Video"}</span>
            <span>·</span>
            <span>{isNo ? "Markedsføring" : "Marketing"}</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
