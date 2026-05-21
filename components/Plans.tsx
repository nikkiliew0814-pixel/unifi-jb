"use client";
import React, { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";
import { PLANS, type Plan } from "@/lib/plans";

interface PlansProps { onInterested: (plan: Plan) => void; }

export default function Plans({ onInterested }: PlansProps) {
  const { lang } = useLang();
  return (
    <section id="package" style={{ padding: "40px 0 30px", position: "relative" }}>
      <div className="container">
        <div className="glass" style={{ padding: "52px 36px 60px", borderRadius: 32 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            <div style={{ maxWidth: 680 }}>
              <span className="eyebrow">{t(T.plans.eyebrow, lang)}</span>
              <h2 style={{ margin: "14px 0 10px", fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink-900)" }}>
                {t(T.plans.headline, lang)}
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-700)", lineHeight: 1.55, maxWidth: 520 }}>
                {t(T.plans.sub, lang)}
              </p>
            </div>
            <div style={{
              display: "flex", gap: 8, alignItems: "center",
              padding: "9px 14px", borderRadius: 999,
              background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.20)",
              color: "var(--unifi-orange-600)", fontWeight: 700, fontSize: 12.5,
            }}>
              ✦ {t(T.plans.promo, lang)}
            </div>
          </div>

          {/* Cards */}
          <div className="plans-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap: 14, alignItems: "stretch",
          }}>
            {PLANS.map((p, i) => (
              <PlanCard key={p.id} plan={p} index={i} lang={lang} onInterested={() => onInterested(p)}/>
            ))}
          </div>

          {/* Footnotes */}
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 20, color: "var(--ink-500)", fontSize: 12.5 }}>
            <span>* 24-month contract applies.</span>
            <span>* Free installation within 24–48 hours.</span>
            <span>* Service tax 6% not included in displayed price.</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .plans-grid { grid-template-columns: repeat(3,minmax(0,1fr)) !important; } }
        @media (max-width: 720px) {
          .plans-grid {
            grid-template-columns: 84% !important;
            grid-auto-flow: column; grid-auto-columns: 84%;
            overflow-x: auto; scroll-snap-type: x mandatory;
            padding-bottom: 12px; margin: 0 -20px; padding-left: 20px; padding-right: 20px;
          }
          .plans-grid > * { scroll-snap-align: start; }
        }
      `}</style>
    </section>
  );
}

function PlanCard({ plan, lang, onInterested }: { plan: Plan; index: number; lang: ReturnType<typeof useLang>["lang"]; onInterested: () => void }) {
  const [hover, setHover] = useState(false);
  const baseY = plan.tilt * 8;
  const liftY = plan.tilt * 8 - 8;

  const PERK_ICONS: Record<number, React.ReactElement> = {
    0: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></svg>,
    1: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    2: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    3: <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>,
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", display: "flex", flexDirection: "column",
        background: "#fff", borderRadius: 22, padding: "24px 20px 22px",
        border: plan.featured ? "2px solid rgba(249,115,22,0.7)" : "1px solid rgba(15,23,42,0.06)",
        boxShadow: plan.featured
          ? hover ? "0 28px 56px rgba(242,111,34,0.28),0 0 36px rgba(249,115,22,0.22)" : "0 18px 36px rgba(242,111,34,0.16),0 0 0 4px rgba(249,115,22,0.07)"
          : hover ? "0 22px 44px rgba(15,23,42,0.13),0 0 26px rgba(249,115,22,0.15)" : "0 8px 24px rgba(15,23,42,0.06)",
        transform: `translateY(${hover ? liftY : baseY}px)`,
        transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s",
        zIndex: plan.featured ? 2 : 1,
      }}>

      {/* Badge */}
      {plan.badge && (
        <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
          <span className={`pill pill-${plan.badge.tone}`}>
            {plan.badge.tone === "orange" && "⚡ "}
            {plan.badge.label}
          </span>
        </div>
      )}

      {/* Speed */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-500)", marginBottom: 4 }}>
          {plan.tagline}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.03em", lineHeight: 1 }}>
          <span style={{ fontSize: 42 }}>{plan.speed}</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--ink-700)" }}>{plan.unit}</span>
        </div>
      </div>

      {/* Mini pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        <span className="pill pill-soft-b" style={{ fontSize: 9 }}>Online Exclusive</span>
        <span className="pill pill-soft-o" style={{ fontSize: 9 }}>3 Months Free</span>
      </div>

      {/* Perks box */}
      <div style={{
        background: "rgba(249,115,22,0.05)", border: "1px dashed rgba(249,115,22,0.22)",
        borderRadius: 12, padding: "10px 12px",
        display: "flex", flexDirection: "column", gap: 7, marginBottom: 14,
      }}>
        <PerkRow icon={PERK_ICONS[0]} text={`${plan.down} / ${plan.up}`}/>
        {plan.perks.slice(0, 3).map((perk, i) => (
          <PerkRow key={i} icon={PERK_ICONS[i + 1] ?? PERK_ICONS[2]} text={perk}/>
        ))}
      </div>

      {/* Price */}
      <div style={{ marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
          <span style={{ fontWeight: 900, fontSize: 26, color: "var(--unifi-blue-500)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            RM{plan.now}<span style={{ fontWeight: 700, fontSize: 13, color: "var(--ink-700)" }}>/mth</span>
          </span>
          <span style={{ fontWeight: 600, fontSize: 12.5, color: "var(--danger)", textDecoration: "line-through" }}>RM{plan.was}/mth</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-500)", marginTop: 3 }}>24 months contract</div>

        <button onClick={onInterested} style={{
          marginTop: 14, width: "100%", border: 0, cursor: "pointer",
          padding: "12px 12px", borderRadius: 999,
          background: plan.featured
            ? "linear-gradient(180deg,#FB923C 0%,#F26F22 100%)"
            : "linear-gradient(180deg,#4949E8 0%,#3030C2 100%)",
          color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.5,
          boxShadow: plan.featured ? "0 10px 22px rgba(242,111,34,0.30)" : "0 10px 22px rgba(56,56,224,0.25)",
          display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 7,
          transition: "transform .25s",
        }}>
          {t(T.plans.cta, lang)}
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
            <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function PerkRow({ icon, text }: { icon: React.ReactElement; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, fontWeight: 600, color: "var(--ink-900)", lineHeight: 1.35 }}>
      <span style={{ color: "var(--unifi-orange)", marginTop: 1, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{text}</span>
    </div>
  );
}
