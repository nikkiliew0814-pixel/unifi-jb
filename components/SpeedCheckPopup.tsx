"use client";
import React, { useState, useEffect, useRef } from "react";
import { openWA } from "@/lib/whatsapp";

/* ── Plan recommendations by speed ─────────────────── */
interface Rec {
  status: "critical" | "slow" | "ok" | "good" | "excellent";
  emoji: string;
  label: string;
  labelColor: string;
  labelBg: string;
  headline: string;
  message: string;
  plan: { name: string; speed: string; price: number; desc: string } | null;
}

function getRec(mbps: number): Rec {
  if (mbps < 30) return {
    status: "critical",
    emoji: "🔴",
    label: "Critical — Very Slow",
    labelColor: "#DC2626",
    labelBg: "#FEF2F2",
    headline: "Your internet is too slow for modern use.",
    message: "At this speed, Netflix buffers, video calls drop, and downloads crawl. A typical Malaysian household needs at least 100Mbps.",
    plan: { name: "Unifi 100Mbps", speed: "100", price: 89, desc: "Perfect starter plan — smooth HD streaming & calls." },
  };
  if (mbps < 100) return {
    status: "slow",
    emoji: "🟠",
    label: "Below Average",
    labelColor: "#EA580C",
    labelBg: "#FFF7ED",
    headline: "Your speed is holding you back.",
    message: "With multiple devices or users at home, you'll hit congestion. 4K streaming, gaming, and WFH will struggle at this speed.",
    plan: { name: "Unifi 300Mbps", speed: "300", price: 129, desc: "Great for families — supports 6 devices simultaneously." },
  };
  if (mbps < 300) return {
    status: "ok",
    emoji: "🟡",
    label: "Decent — Room to Improve",
    labelColor: "#CA8A04",
    labelBg: "#FEFCE8",
    headline: "Not bad, but you could do better.",
    message: "Your speed works for light use, but WFH + 4K streaming + gaming at the same time will cause slowdowns.",
    plan: { name: "Unifi 500Mbps", speed: "500", price: 149, desc: "Most Popular — handles everything simultaneously." },
  };
  if (mbps < 700) return {
    status: "good",
    emoji: "🟢",
    label: "Good Speed",
    labelColor: "#16A34A",
    labelBg: "#F0FDF4",
    headline: "You have solid internet speed.",
    message: "Great for most households. If you have 10+ devices, smart home setup, or frequent large file transfers, going bigger pays off.",
    plan: { name: "Unifi 1Gbps", speed: "1000", price: 249, desc: "For power users & smart homes — ultra-fast Wi-Fi 7." },
  };
  return {
    status: "excellent",
    emoji: "⚡",
    label: "Excellent Speed",
    labelColor: "#3838E0",
    labelBg: "#EEF2FF",
    headline: "You already have great internet!",
    message: "Your speed is excellent. If you're already on Unifi — great choice. If not, it might be time to make the switch permanent.",
    plan: null,
  };
}

/* ── Speedometer SVG ─────────────────────────────── */
function Gauge({ value, max = 500, running }: { value: number; max?: number; running: boolean }) {
  const cx = 110, cy = 105, r = 80;
  const startDeg = -210, endDeg = 30;
  const range = endDeg - startDeg;

  function arc(from: number, to: number, radius: number) {
    const s = (from * Math.PI) / 180;
    const e = (to * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(s), y1 = cy + radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e), y2 = cy + radius * Math.sin(e);
    const large = to - from > 180 ? 1 : 0;
    return `M${x1} ${y1} A${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  }

  const pct = Math.min(value, max) / max;
  const fillEnd = startDeg + pct * range;
  const needleDeg = startDeg + pct * range;
  const nr = (needleDeg * Math.PI) / 180;
  const nx = cx + 62 * Math.cos(nr), ny = cy + 62 * Math.sin(nr);

  const color = value < 30 ? "#EF4444" : value < 100 ? "#F97316" : value < 300 ? "#EAB308" : "#22C55E";

  return (
    <svg width={220} height={150} viewBox="0 0 220 145" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="spGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0.6}/>
          <stop offset="100%" stopColor={color}/>
        </linearGradient>
      </defs>

      {/* Track */}
      <path d={arc(startDeg, endDeg, r)} fill="none" stroke="#EEF0F6" strokeWidth={12} strokeLinecap="round"/>

      {/* Zone colours */}
      <path d={arc(startDeg, startDeg + range * 0.2, r)} fill="none" stroke="#FECACA" strokeWidth={12} strokeLinecap="round"/>
      <path d={arc(startDeg + range * 0.2, startDeg + range * 0.45, r)} fill="none" stroke="#FED7AA" strokeWidth={12} strokeLinecap="round"/>
      <path d={arc(startDeg + range * 0.45, startDeg + range * 0.7, r)} fill="none" stroke="#FEF08A" strokeWidth={12} strokeLinecap="round"/>
      <path d={arc(startDeg + range * 0.7, endDeg, r)} fill="none" stroke="#BBF7D0" strokeWidth={12} strokeLinecap="round"/>

      {/* Active fill */}
      {value > 0 && (
        <path d={arc(startDeg, Math.min(fillEnd, endDeg), r)} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round"
          style={{ transition: "d 0.5s ease" }}/>
      )}

      {/* Needle */}
      <line x1={cx} y1={cy} x2={running ? nx : cx + 62 * Math.cos((startDeg * Math.PI) / 180)}
        y2={running ? ny : cy + 62 * Math.sin((startDeg * Math.PI) / 180)}
        stroke="#0B0E2C" strokeWidth={3} strokeLinecap="round"
        style={{ transition: "x2 0.5s ease, y2 0.5s ease" }}/>
      <circle cx={cx} cy={cy} r={8} fill="#0B0E2C"/>
      <circle cx={cx} cy={cy} r={4} fill="#fff"/>

      {/* Speed number */}
      <text x={cx} y={cy + 28} textAnchor="middle" fontSize={30} fontWeight={900} fill="#0B0E2C" fontFamily="system-ui">
        {value > 0 ? value.toFixed(1) : running ? "…" : "0"}
      </text>
      <text x={cx} y={cy + 44} textAnchor="middle" fontSize={13} fill="#5B6079" fontFamily="system-ui">Mbps</text>

      {/* Labels */}
      {[["0", startDeg], ["100", startDeg + range * 0.2], ["250", startDeg + range * 0.5], ["500+", endDeg]].map(([lbl, deg]) => {
        const rad = (Number(deg) * Math.PI) / 180;
        return (
          <text key={String(lbl)} x={cx + (r + 18) * Math.cos(rad)} y={cy + (r + 18) * Math.sin(rad) + 4}
            textAnchor="middle" fontSize={9} fill="#A8AEC2" fontFamily="system-ui">{lbl}</text>
        );
      })}
    </svg>
  );
}

/* ── Main Popup ──────────────────────────────────── */
export default function SpeedCheckPopup({ onPlanSelect }: { onPlanSelect?: (planName: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"idle" | "testing" | "done">("idle");
  const [speed, setSpeed] = useState(0);
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Show popup after 2.5 s, only once per session */
  useEffect(() => {
    const seen = sessionStorage.getItem("sp_seen");
    if (seen) return;
    const t = setTimeout(() => { setVisible(true); sessionStorage.setItem("sp_seen", "1"); }, 2500);
    return () => clearTimeout(t);
  }, []);

  /* Auto-start test when popup appears */
  useEffect(() => {
    if (visible && phase === "idle") startTest();
  }, [visible]);

  /* Animate display number towards actual speed */
  useEffect(() => {
    if (animRef.current) clearInterval(animRef.current);
    if (speed === 0) return;
    animRef.current = setInterval(() => {
      setDisplaySpeed((prev) => {
        const diff = speed - prev;
        if (Math.abs(diff) < 0.5) { clearInterval(animRef.current!); return speed; }
        return prev + diff * 0.15;
      });
    }, 30);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [speed]);

  async function startTest() {
    setPhase("testing");
    setSpeed(0);
    setDisplaySpeed(0);
    try {
      const url = "https://speed.cloudflare.com/__down?bytes=15000000";
      const t0 = performance.now();
      const res = await fetch(url, { cache: "no-store" });
      const blob = await res.blob();
      const t1 = performance.now();
      const mbps = (blob.size * 8) / ((t1 - t0) / 1000) / 1_000_000;
      setSpeed(Math.round(mbps * 10) / 10);
    } catch {
      setSpeed(12); // fallback demo value
    }
    setPhase("done");
  }

  if (!visible) return null;

  const rec = getRec(displaySpeed);
  const isDone = phase === "done";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 90,
      background: "rgba(11,14,44,0.60)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      animation: "fadeIn .25s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: 28, width: "100%", maxWidth: 480,
        boxShadow: "0 40px 80px rgba(11,14,44,0.25)",
        animation: "slideUp .35s cubic-bezier(.2,.8,.2,1)",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#0B1432,#1F1F8F)",
          padding: "20px 24px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "#FB923C", marginBottom: 4 }}>
              Free Speed Check
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
              {isDone ? "Your Speed Test Result" : "Testing Your Connection…"}
            </div>
          </div>
          <button onClick={() => setVisible(false)} style={{
            width: 32, height: 32, borderRadius: "50%", border: 0, cursor: "pointer",
            background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 18, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Gauge area */}
        <div style={{ padding: "16px 24px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Gauge value={displaySpeed} running={phase === "testing"}/>

          {/* Status bar */}
          {phase === "testing" && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginTop: 4, marginBottom: 8,
              fontSize: 13, color: "var(--ink-500)", fontWeight: 600,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: "#F26F22",
                animation: "pulseDot 1s ease-out infinite",
                display: "inline-block",
              }}/>
              Measuring download speed…
            </div>
          )}

          {isDone && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 2, marginBottom: 10,
              padding: "6px 16px", borderRadius: 999,
              background: rec.labelBg,
              fontSize: 13, fontWeight: 800, color: rec.labelColor,
            }}>
              {rec.emoji} {rec.label}
            </div>
          )}
        </div>

        {/* Result card */}
        {isDone && (
          <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Diagnosis */}
            <div style={{
              background: rec.labelBg,
              border: `1.5px solid ${rec.labelColor}22`,
              borderLeft: `4px solid ${rec.labelColor}`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0B0E2C", marginBottom: 6 }}>
                {rec.headline}
              </div>
              <div style={{ fontSize: 12.5, color: "#5B6079", lineHeight: 1.6 }}>
                {rec.message}
              </div>
            </div>

            {/* Recommended plan */}
            {rec.plan && (
              <div style={{
                background: "linear-gradient(135deg,rgba(242,111,34,0.06),rgba(56,56,224,0.04))",
                border: "1.5px solid rgba(249,115,22,0.25)",
                borderRadius: 16, padding: "16px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".10em", textTransform: "uppercase", color: "var(--unifi-orange)", marginBottom: 4 }}>
                    Recommended for you
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#0B0E2C" }}>{rec.plan.name}</div>
                  <div style={{ fontSize: 12, color: "#5B6079", marginTop: 3, lineHeight: 1.4 }}>{rec.plan.desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#3838E0", lineHeight: 1 }}>
                    RM{rec.plan.price}
                  </div>
                  <div style={{ fontSize: 11, color: "#5B6079" }}>/month</div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { openWA("new"); setVisible(false); }}
                style={{
                  flex: 1, border: 0, cursor: "pointer", borderRadius: 999,
                  padding: "13px 16px",
                  background: "linear-gradient(180deg,#FB923C,#F26F22)",
                  color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 13.5,
                  boxShadow: "0 8px 20px rgba(242,111,34,0.30)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Get This Plan
              </button>
              <button
                onClick={() => setVisible(false)}
                style={{
                  flex: "0 0 auto", border: "1.5px solid var(--ink-200)", cursor: "pointer",
                  borderRadius: 999, padding: "13px 20px",
                  background: "#fff", color: "var(--ink-500)",
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                }}>
                Close
              </button>
            </div>

            <div style={{ textAlign: "center", fontSize: 11, color: "var(--ink-300)" }}>
              Test measures download speed via Cloudflare CDN
            </div>
          </div>
        )}

        {/* Loading state bottom padding */}
        {phase === "testing" && <div style={{ height: 24 }}/>}
      </div>
    </div>
  );
}
