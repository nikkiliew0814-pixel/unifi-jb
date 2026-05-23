"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";
import { openWA } from "@/lib/whatsapp";

interface HeroProps { onEnquire: () => void; }

export default function Hero({ onEnquire }: HeroProps) {
  const { lang } = useLang();

  return (
    <header id="top" style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
      {/* Full-bleed family photo background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Image
          src="/assets/hero-family.png" alt="" fill
          style={{ objectFit: "cover", objectPosition: "right center", filter: "saturate(1.05) contrast(1.02)" }}
          priority
        />
        {/* warm gradient wash — keeps left text readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(95deg, rgba(255,247,237,0.96) 0%, rgba(255,247,237,0.88) 32%, rgba(255,247,237,0.55) 50%, rgba(255,247,237,0.15) 68%, transparent 85%)",
        }}/>
        {/* atmospheric accents */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(50% 60% at 88% 25%, rgba(253,186,116,0.45), transparent 60%)," +
            "radial-gradient(40% 40% at 92% 90%, rgba(249,115,22,0.22), transparent 65%)",
        }}/>
        {/* faint grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.18,
          backgroundImage: "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)",
        }}/>
        {/* orbit ring */}
        <svg style={{ position: "absolute", right: "-8%", top: "8%", width: 720, height: 720, opacity: 0.55, pointerEvents: "none" }} viewBox="0 0 700 700">
          <defs>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="rgba(249,115,22,0)"/>
              <stop offset="80%" stopColor="rgba(249,115,22,0.45)"/>
              <stop offset="100%" stopColor="rgba(249,115,22,0)"/>
            </radialGradient>
          </defs>
          <g style={{ transformOrigin: "350px 350px", animation: "orbit-spin 80s linear infinite" }}>
            <ellipse cx="350" cy="350" rx="320" ry="120" fill="none" stroke="url(#orbGlow)" strokeWidth="1.4" transform="rotate(-18 350 350)"/>
            <ellipse cx="350" cy="350" rx="280" ry="90" fill="none" stroke="rgba(249,115,22,0.35)" strokeDasharray="2 6" transform="rotate(-30 350 350)"/>
            <circle cx="660" cy="380" r="4" fill="#F97316"/>
          </g>
        </svg>
        {/* blur circles */}
        <div style={{ position: "absolute", top: 120, left: "8%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(253,186,116,0.5), transparent 70%)", filter: "blur(20px)" }}/>
        <div style={{ position: "absolute", bottom: 60, right: "20%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)", filter: "blur(16px)" }}/>
      </div>

      <div className="container hero-grid" style={{
        position: "relative", zIndex: 1, minHeight: 760,
        padding: "48px 24px 0",
        display: "grid", gridTemplateColumns: "minmax(0, 620px) 1fr",
        gap: 40, alignItems: "center",
      }}>
        {/* LEFT — copy */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="#F97316"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: "var(--orange)" }}>
              {t(T.hero.eyebrow, lang)}
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(42px, 6.4vw, 88px)",
            lineHeight: 0.94, letterSpacing: "-0.035em",
            margin: 0, color: "var(--navy)",
          }}>
            <div>{t(T.hero.line1, lang)}</div>
            <div>{t(T.hero.line2, lang)}</div>
            <div className="gradient-text-orange" style={{ marginTop: 2 }}>{t(T.hero.line3, lang)}</div>
            <div style={{ display: "flex", alignItems: "baseline", columnGap: "0.16em", whiteSpace: "nowrap", fontSize: "clamp(34px, 5vw, 70px)", lineHeight: 1 }}>
              <span className="gradient-text-orange">{t(T.hero.line4a, lang)}</span>
              <span style={{ color: "var(--navy)", opacity: 0.35, fontWeight: 700, margin: "0 0.18em" }}>+</span>
              <span className="gradient-text-indigo">{t(T.hero.line4b, lang)}</span>
            </div>
          </h1>

          <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.55, color: "var(--ink-700)", maxWidth: 460, marginTop: 22 }}>
            {t(T.hero.sub, lang)}
          </p>

          {/* Quick lead form */}
          <QuickLeadForm lang={lang} onSubmit={() => onEnquire()}/>

          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <button onClick={onEnquire} className="btn-primary" style={{ fontSize: 14, padding: "12px 22px" }}>
              {t(T.hero.cta1, lang)}
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a href="#package" className="btn-ghost" style={{ fontSize: 14, padding: "12px 22px" }}>
              {t(T.hero.cta2, lang)}
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>

        {/* RIGHT — floating chips */}
        <div className="hero-right-stack" style={{ position: "relative", height: "100%", minHeight: 480, pointerEvents: "none" }}>
          {[
            { top: "8%", left: "12%", delay: "0s", icon: "📶", label: "Wi-Fi 7" },
            { top: "26%", right: "8%", delay: ".4s", icon: "▶️", label: "4K Streaming" },
            { top: "52%", left: "18%", delay: ".2s", icon: "🏠", label: "Whole Home" },
          ].map((chip) => (
            <div key={chip.label} style={{ position: "absolute", ...chip, animation: `float-y 4s ease-in-out ${chip.delay} infinite`, pointerEvents: "auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", padding: "8px 14px", borderRadius: 999, boxShadow: "0 10px 24px rgba(15,23,42,0.08)" }}>
                <span style={{ fontSize: 14 }}>{chip.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{chip.label}</span>
              </div>
            </div>
          ))}
          {/* 24/7 badge */}
          <div style={{ position: "absolute", bottom: 20, left: "8%", background: "#fff", padding: "10px 14px", borderRadius: 999, display: "flex", alignItems: "center", gap: 10, boxShadow: "var(--shadow-card)", pointerEvents: "auto" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--orange-50)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--navy)", fontSize: 16, lineHeight: 1 }}>24/7</div>
              <div style={{ fontSize: 10, color: "var(--ink-500)", fontWeight: 600, letterSpacing: "0.1em", marginTop: 2 }}>SUPPORT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust mini bar */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 40, paddingTop: 32 }}>
        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap",
          padding: "18px 24px", borderRadius: 20,
          background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
        }}>
          {[
            { icon: "🛡️", label: t(T.hero.trust1, lang) },
            { icon: "⏱️", label: t(T.hero.trust2, lang) },
            { icon: "⭐", label: t(T.hero.trust3, lang) },
          ].map((it) => (
            <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--navy)" }}>
              <span style={{ color: "var(--orange)", fontSize: 16 }}>{it.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: 0 !important; }
          .hero-right-stack { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function QuickLeadForm({ lang, onSubmit }: { lang: string; onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
    const msg = encodeURIComponent(`Hi, I want to register a new Unifi plan.\nName: ${name}\nPhone: ${phone}`);
    const num = process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254";
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <form onSubmit={submit} style={{
      marginTop: 28,
      background: "rgba(255,255,255,0.80)", backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
      borderRadius: 28, padding: 20,
      boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
      border: "1px solid rgba(255,255,255,0.85)", maxWidth: 500,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>Check coverage &amp; get started</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <input
          style={{ height: 48, borderRadius: 12, border: "1.5px solid var(--ink-200)", background: "#fff", padding: "0 14px", fontSize: 14, color: "var(--navy)", fontFamily: "var(--font-sans)", outline: "none", width: "100%" }}
          placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
        />
        <input
          style={{ height: 48, borderRadius: 12, border: "1.5px solid var(--ink-200)", background: "#fff", padding: "0 14px", fontSize: 14, color: "var(--navy)", fontFamily: "var(--font-sans)", outline: "none", width: "100%" }}
          placeholder="Phone number" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <button type="submit" className="btn-primary" style={{ fontSize: 14, padding: "11px 22px" }}>
          {sent ? "✓ Sent — we'll call you" : "Check Coverage Now"}
          {!sent && <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>}
        </button>
        <span style={{ fontSize: 12, color: "var(--ink-500)", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ color: "#25D366" }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </span>
          We'll contact you on WhatsApp
        </span>
      </div>
    </form>
  );
}
