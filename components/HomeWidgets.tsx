"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

/* ── NEWS DATA (top 3) ─────────────────────────────── */
const NEWS_PREVIEW = [
  {
    tag: "Unifi Plans",
    emoji: "📡",
    date: "12 May 2026",
    title: "Unifi 2Gbps Now Available",
    excerpt: "Experience next-gen ultra-fast internet.",
    accent: "#F26F22",
  },
  {
    tag: "Wi-Fi",
    emoji: "📶",
    date: "08 May 2026",
    title: "How to Improve WiFi Coverage at Home",
    excerpt: "Simple tips for better signal everywhere.",
    accent: "#3838E0",
  },
  {
    tag: "Comparison",
    emoji: "⚡",
    date: "05 May 2026",
    title: "Maxis vs Unifi: Which is Better in 2026?",
    excerpt: "Compare speed, price and performance.",
    accent: "#1FA971",
  },
];

/* ── FAQ DATA (top 5) ──────────────────────────────── */
const FAQ_PREVIEW = [
  "How long does Unifi installation take?",
  "Do I need to pay anything upfront?",
  "Is Unifi available for my area?",
  "Can I switch from Maxis / TIME / Digi?",
  "Is there a contract lock-in period?",
];

/* ══════════════════════════════════════════════════════
   SPEED GAUGE
══════════════════════════════════════════════════════ */
function SpeedGauge() {
  const [speed, setSpeed] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);

  async function runTest() {
    setTesting(true);
    setSpeed(null);
    setProgress(0);

    // Animate progress while fetching
    const tick = setInterval(() => setProgress((p) => Math.min(p + 2, 90)), 80);
    try {
      const url = "https://speed.cloudflare.com/__down?bytes=10000000"; // 10 MB
      const t0 = performance.now();
      const res = await fetch(url, { cache: "no-store" });
      const blob = await res.blob();
      const t1 = performance.now();
      const mbps = (blob.size * 8) / ((t1 - t0) / 1000) / 1_000_000;
      setSpeed(Math.round(mbps * 10) / 10);
    } catch {
      setSpeed(0);
    } finally {
      clearInterval(tick);
      setProgress(100);
      setTesting(false);
    }
  }

  // Needle angle: 0 Mbps = -120°, 1000 Mbps = +120°
  const maxMbps = 1000;
  const val = speed ?? (testing ? (progress / 100) * 400 : 0);
  const angleDeg = -120 + (Math.min(val, maxMbps) / maxMbps) * 240;
  const angleRad = (angleDeg * Math.PI) / 180;
  const cx = 100, cy = 100, r = 72;
  const needleLen = 58;
  const nx = cx + needleLen * Math.cos(angleRad);
  const ny = cy + needleLen * Math.sin(angleRad);

  // Arc path for gauge track
  function arcPath(startDeg: number, endDeg: number, radius: number) {
    const s = ((startDeg) * Math.PI) / 180;
    const e = ((endDeg) * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(s);
    const y1 = cy + radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e);
    const y2 = cy + radius * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  }

  const fillEnd = -120 + (Math.min(val, maxMbps) / maxMbps) * 240;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={200} height={130} viewBox="0 0 200 145" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB923C"/>
            <stop offset="100%" stopColor="#EF4444"/>
          </linearGradient>
        </defs>

        {/* Track */}
        <path d={arcPath(-120, 120, r)} fill="none" stroke="#EEF0F6" strokeWidth={10} strokeLinecap="round"/>

        {/* Fill */}
        {val > 0 && (
          <path d={arcPath(-120, Math.min(fillEnd, 120), r)} fill="none" stroke="url(#gaugeGrad)" strokeWidth={10} strokeLinecap="round"
            style={{ transition: "d 0.4s ease" }}/>
        )}

        {/* Tick marks */}
        {[0, 100, 200, 300, 500, 1000].map((mbps) => {
          const deg = -120 + (mbps / maxMbps) * 240;
          const rad = (deg * Math.PI) / 180;
          const inner = r - 6;
          const outer = r + 4;
          return (
            <line key={mbps}
              x1={cx + inner * Math.cos(rad)} y1={cy + inner * Math.sin(rad)}
              x2={cx + outer * Math.cos(rad)} y2={cy + outer * Math.sin(rad)}
              stroke="#A8AEC2" strokeWidth={1.5}/>
          );
        })}

        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny}
          stroke="#F26F22" strokeWidth={3} strokeLinecap="round"
          style={{ transition: "x2 0.4s ease, y2 0.4s ease" }}/>
        <circle cx={cx} cy={cy} r={6} fill="#F26F22"/>
        <circle cx={cx} cy={cy} r={3} fill="#fff"/>

        {/* Speed label */}
        <text x={cx} y={cy + 30} textAnchor="middle" fontSize={26} fontWeight={800} fill="#0B0E2C"
          fontFamily="system-ui, sans-serif">
          {speed !== null ? speed.toFixed(1) : testing ? "..." : "--"}
        </text>
        <text x={cx} y={cy + 45} textAnchor="middle" fontSize={12} fill="#5B6079"
          fontFamily="system-ui, sans-serif">
          Mbps
        </text>
      </svg>

      <button
        onClick={runTest}
        disabled={testing}
        style={{
          marginTop: 4,
          padding: "11px 28px", borderRadius: 999, border: 0, cursor: testing ? "default" : "pointer",
          background: testing ? "#e5e7eb" : "linear-gradient(180deg,#FB923C,#F26F22)",
          color: testing ? "#9ca3af" : "#fff",
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: testing ? "none" : "0 8px 20px rgba(242,111,34,0.30)",
          transition: "all .25s",
        }}>
        {testing ? "Testing…" : "Start Speed Test"}
        {!testing && (
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
            <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
          </svg>
        )}
      </button>

      <Link href="/check-speed" style={{ marginTop: 10, fontSize: 12, color: "var(--ink-500)", textDecoration: "underline" }}>
        Full speed test page →
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export default function HomeWidgets() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container">
        <div className="hw-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 1.2fr",
          gap: 16, alignItems: "start",
        }}>

          {/* ── SPEED TEST ─────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 20,
            padding: "28px 24px 24px",
            boxShadow: "0 4px 24px rgba(11,14,44,0.07)",
            border: "1px solid rgba(11,14,44,0.06)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-900)", marginBottom: 2 }}>
              Check Your Internet Speed
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 20 }}>
              How fast is your current connection?
            </div>
            <SpeedGauge/>
          </div>

          {/* ── LATEST NEWS ─────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 20,
            padding: "28px 24px 24px",
            boxShadow: "0 4px 24px rgba(11,14,44,0.07)",
            border: "1px solid rgba(11,14,44,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-900)" }}>Latest News</span>
              <Link href="/news" style={{ fontSize: 12, fontWeight: 700, color: "var(--unifi-orange)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                View All News
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
                  <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {NEWS_PREVIEW.map((n, i) => (
                <Link key={i} href="/news" style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  paddingBottom: i < NEWS_PREVIEW.length - 1 ? 14 : 0,
                  borderBottom: i < NEWS_PREVIEW.length - 1 ? "1px solid var(--ink-100)" : "none",
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: 56, height: 44, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${n.accent}22, ${n.accent}44)`,
                    border: `1.5px solid ${n.accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>
                    {n.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-900)", lineHeight: 1.35, marginBottom: 3 }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-500)" }}>{n.excerpt}</div>
                    <div style={{ fontSize: 10.5, color: "var(--ink-300)", marginTop: 3, fontWeight: 600 }}>{n.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── FAQ ─────────────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 20,
            padding: "28px 24px 24px",
            boxShadow: "0 4px 24px rgba(11,14,44,0.07)",
            border: "1px solid rgba(11,14,44,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-900)" }}>FAQ</span>
              <Link href="/faq" style={{ fontSize: 12, fontWeight: 700, color: "var(--unifi-orange)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                View All FAQ
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
                  <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {FAQ_PREVIEW.map((q, i) => (
                <div key={i} style={{ borderBottom: i < FAQ_PREVIEW.length - 1 ? "1px solid var(--ink-100)" : "none" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", border: 0, background: "none", cursor: "pointer",
                      padding: "13px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                      fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "var(--ink-900)",
                      textAlign: "left",
                    }}>
                    <span style={{ flex: 1, lineHeight: 1.35 }}>{q}</span>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: openFaq === i ? "var(--unifi-orange)" : "var(--ink-100)",
                      color: openFaq === i ? "#fff" : "var(--ink-500)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, lineHeight: 1,
                      transition: "all .2s",
                    }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{
                      fontSize: 12, color: "var(--ink-500)", lineHeight: 1.6,
                      paddingBottom: 12, paddingRight: 32,
                    }}>
                      {FAQ_ANSWERS[i]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link href="/faq" style={{
              marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 700,
              padding: "8px 16px", borderRadius: 999,
              background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)",
              color: "var(--unifi-orange-600)",
            }}>
              💬 Need help? Chat with us on WhatsApp
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hw-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .hw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const FAQ_ANSWERS = [
  "Standard installation takes 24–48 hours after registration. Our team will contact you to schedule a convenient time slot.",
  "No upfront payment is required to register. However, all Unifi Home new registrations require RM100 advance payment within 10 days after installation is complete.",
  "Johor Bahru has excellent Unifi coverage. Enter your postcode or area on our coverage check page, or WhatsApp us and we'll verify instantly.",
  "Yes! TM offers a Switch & Save promotion — up to 6 months FREE when you migrate from Maxis, CelcomDigi, or TIME fibre.",
  "Yes, all Unifi Home plans require a 24-month contract. Early termination fees may apply.",
];
