import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Unifi JB – Authorised Reseller Johor Bahru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1432 0%, #1F1F8F 50%, #0A0E26 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(249,115,22,0.25), transparent 70%)",
            display: "flex",
          }}
        />

        {/* TM Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 22px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            marginBottom: 28,
          }}
        >
          <span style={{ fontFamily: "Impact, Arial, sans-serif", fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>TM</span>
          <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.25)", display: "flex" }} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FB923C", display: "flex" }}>
            AUTHORISED RESELLER
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>Unifi Johor Bahru</span>
          <span style={{ color: "#FB923C" }}>Best Plans 2025</span>
        </div>

        {/* Sub */}
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            color: "rgba(255,255,255,0.70)",
            textAlign: "center",
            display: "flex",
          }}
        >
          100Mbps–2Gbps · Free Installation · Same-Day Approval
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          {["RM89/mth", "3 Months FREE", "24/7 Support"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(249,115,22,0.18)",
                border: "1px solid rgba(249,115,22,0.40)",
                color: "#FB923C",
                fontSize: 18,
                fontWeight: 700,
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            fontSize: 18,
            color: "rgba(255,255,255,0.40)",
            display: "flex",
          }}
        >
          unifijb.com.my
        </div>
      </div>
    ),
    size
  );
}
