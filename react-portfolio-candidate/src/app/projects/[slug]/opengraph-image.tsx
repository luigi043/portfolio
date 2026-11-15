import { ImageResponse } from "next/og";

export const alt = "Luiz Fehlberg portfolio case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#050a14",
        color: "#f5f5f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", color: "#30d5c8", fontSize: 28 }}>
        LUIZ FEHLBERG / CASE STUDY
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: 900,
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        Computer Engineer &amp; Software Developer
      </div>
      <div style={{ display: "flex", color: "#9bc8ff", fontSize: 30 }}>
        Architecture · Decisions · Verified result
      </div>
    </div>,
    size,
  );
}
