"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";

interface Tier { price: number; contract: number; free: string | null; icon?: "tv" }
interface PlanDef {
  id: string; speed: string; upload: string; isPopular?: boolean; isBestValue?: boolean;
  tiers: Tier[]; features: string[];
}
interface PlansProps { onInterested: (planId: string) => void }

const PLANS: PlanDef[] = [
  {
    id: "p100", speed: "100Mbps", upload: "50Mbps",
    tiers: [{ price: 89, contract: 24, free: null }],
    features: ["100Mbps / 50Mbps", "Wi-Fi 6 Combo Box", "24 Hrs Service Guarantee"],
  },
  {
    id: "p300", speed: "300Mbps", upload: "100Mbps", isBestValue: true,
    tiers: [
      { price: 129, contract: 27, free: "Free 3 Months" },
      { price: 129, contract: 30, free: "Free 6 Months" },
      { price: 139, contract: 36, free: "Free 43″ TV", icon: "tv" },
    ],
    features: ["300Mbps / 100Mbps", "Wi-Fi 6 Combo Box", "Free Mesh Add-on"],
  },
  {
    id: "p500", speed: "500Mbps", upload: "200Mbps", isPopular: true,
    tiers: [
      { price: 149, contract: 27, free: "Free 3 Months" },
      { price: 149, contract: 30, free: "Free 6 Months" },
      { price: 159, contract: 36, free: "Free 55″ TV or iPad 11″", icon: "tv" },
      { price: 169, contract: 36, free: "Free 65″ TV", icon: "tv" },
    ],
    features: ["500Mbps / 200Mbps", "Wi-Fi 6E Combo Box", "Free Mesh Add-on"],
  },
  {
    id: "p1g", speed: "1Gbps", upload: "500Mbps",
    tiers: [
      { price: 249, contract: 30, free: "Free 6 Months" },
      { price: 259, contract: 36, free: "Free 65″ TV", icon: "tv" },
      { price: 269, contract: 36, free: "Free 75″ TV", icon: "tv" },
    ],
    features: ["1Gbps / 500Mbps", "Wi-Fi 7 Combo Box", "Priority Restoration"],
  },
  {
    id: "p2g", speed: "2Gbps+", upload: "1Gbps",
    tiers: [{ price: 319, contract: 24, free: null }],
    features: ["2Gbps / 1Gbps", "Wi-Fi 7 Combo Box", "12-hr Restoration", "Premium Service"],
  },
];

export default function Plans({ onInterested }: PlansProps) {
  const { lang } = useLang();
  return (
    <section id="package" style={{ background: "linear-gradient(180deg, transparent, #fff 30%, #fff 95%, transparent)", paddingTop: 80, paddingBottom: 24, overflow: "visible", position: "relative", zIndex: 1 }}>
      <div className="container" style={{ position: "relative" }}>
        {/* Mascot */}
        <div aria-hidden className="mascot-float" style={{
          position: "absolute", top: -160, right: "6%", width: 260, zIndex: 0,
          animation: "float-y 4s ease-in-out infinite",
          filter: "drop-shadow(0 22px 32px rgba(249,115,22,0.25))",
          transform: "rotate(-6deg)", pointerEvents: "none", opacity: 0.92,
        }}>
          <Image src="/assets/mascot.png" alt="" width={260} height={260} style={{ width: "100%", height: "auto" }}/>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">{t(T.plans.eyebrow, lang)}</div>
          <h2 className="section-title">{t(T.plans.headline, lang)}</h2>
          <p className="section-sub">{t(T.plans.sub, lang)}</p>
        </div>

        {/* Swipe hint — mobile only */}
        <div className="swipe-hint" style={{ display: "none", alignItems: "center", gap: 6, marginTop: 14, marginBottom: 2 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.2} strokeLinecap="round"><line x1={19} y1={12} x2={5} y2={12}/><polyline points="12 5 5 12 12 19"/></svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)", letterSpacing: "0.06em" }}>Swipe to compare plans</span>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.2} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
        </div>

        <div className="pkg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18, marginTop: 22 }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} lang={lang} delay={i * 60} onInterested={() => onInterested(plan.id)}/>
          ))}
        </div>

        <p className="pkg-disclaimer" style={{ fontSize: 13, color: "var(--ink-500)", textAlign: "center", marginTop: 14 }}>
          * Terms and conditions apply. · Up to 6 months free only when switching from Maxis, CelcomDigi or TIME. · Service tax (8%) not included.
        </p>

        <SupportStrip/>
      </div>

      <style>{`
        @media (max-width: 1180px) { .pkg-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px)  { .mascot-float { display: none !important; } }
        @media (max-width: 720px) {
          .swipe-hint { display: flex !important; }
          .pkg-disclaimer { font-size: 11px !important; padding: 0 4px !important; }
          .pkg-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            gap: 14px !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            padding: 8px 16px 20px !important;
          }
          .pkg-grid::-webkit-scrollbar { display: none; }
          .pkg-card {
            flex: 0 0 82vw !important;
            scroll-snap-align: start !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function PlanCard({ plan, lang, delay, onInterested }: { plan: PlanDef; lang: ReturnType<typeof useLang>["lang"]; delay: number; onInterested: () => void }) {
  const isPopular    = plan.isPopular ?? false;
  const isBestValue  = plan.isBestValue ?? false;
  const isHighlighted = isPopular || isBestValue;
  return (
    <div className="pkg-card" style={{
      transform: isPopular ? "translateY(-8px)" : isBestValue ? "translateY(-4px)" : "none",
      boxShadow: isPopular
        ? "0 24px 56px rgba(249,115,22,0.22), 0 0 0 2.5px rgba(249,115,22,0.5)"
        : isBestValue
          ? "0 16px 40px rgba(34,197,94,0.18), 0 0 0 2px rgba(34,197,94,0.45)"
          : "var(--shadow-card)",
      animation: `pkg-fade-up .8s ease ${delay}ms backwards`,
    }}>
      {isPopular && (
        <div style={{
          position: "absolute", top: 0, right: 16, zIndex: 2,
          background: "var(--indigo)", color: "#fff",
          padding: "6px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
          borderRadius: "0 0 8px 8px", boxShadow: "0 4px 12px rgba(67,56,202,0.3)",
        }}>
          ★ {t(T.plans.popular, lang)}
        </div>
      )}
      {isBestValue && (
        <div style={{
          position: "absolute", top: 0, right: 16, zIndex: 2,
          background: "linear-gradient(135deg,#22C55E,#16A34A)", color: "#fff",
          padding: "6px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
          borderRadius: "0 0 8px 8px", boxShadow: "0 4px 12px rgba(34,197,94,0.35)",
        }}>
          ✦ BEST VALUE
        </div>
      )}

      {/* Card header */}
      <div className="pkg-head" style={
        isPopular   ? { background: "linear-gradient(135deg, #818CF8 0%, #4338CA 55%, #312E81 100%)" } :
        isBestValue ? { background: "linear-gradient(135deg, #34D399 0%, #16A34A 55%, #14532D 100%)" } :
        undefined
      }>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "#fff", letterSpacing: "-0.02em", textAlign: "center", position: "relative", zIndex: 1 }}>
          {plan.speed}
        </div>
        <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
          <div className="pkg-exclusive">ONLINE EXCLUSIVE</div>
        </div>
      </div>

      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Tiers */}
        {plan.tiers.map((tier, idx) => (
          <div key={idx} style={{
            padding: "8px 0",
            borderBottom: idx < plan.tiers.length - 1 ? "1px dashed var(--ink-200)" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--indigo)", letterSpacing: "-0.02em" }}>
                RM{tier.price}
              </span>
              <span style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600 }}>/mth</span>
            </div>
            {tier.free && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                {tier.icon === "tv" ? (
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth={2}><rect x="3" y="5" width="18" height="12" rx="1"/><path d="M8 21h8M12 17v4"/></svg>
                ) : (
                  <span style={{ width: 6, height: 6, background: "var(--orange)", borderRadius: "50%" }}/>
                )}
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)" }}>{tier.free}</span>
              </div>
            )}
            <div style={{ fontSize: 11, color: "var(--ink-500)", marginTop: 4 }}>
              {tier.contract} Months Contract
            </div>
          </div>
        ))}

        {/* Features + CTA */}
        <div style={{ marginTop: "auto", paddingTop: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
            {plan.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-700)" }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {f}
              </div>
            ))}
          </div>
          <button onClick={onInterested} style={{
            width: "100%", border: 0, cursor: "pointer", padding: "12px 14px", borderRadius: 999,
            background: "linear-gradient(135deg, #6366F1 0%, var(--indigo) 60%, var(--indigo-deep) 100%)",
            color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
            boxShadow: "0 8px 22px rgba(67,56,202,0.35)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {t(T.plans.cta, lang)}
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pkg-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(${isPopular ? "-8px" : "0"}); }
        }
      `}</style>
    </div>
  );
}

function SupportStrip() {
  const items = [
    { icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>, title: "24/7 Customer Support", sub: "Real humans on WhatsApp & phone, day or night." },
    { icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="11" y2="16"/></svg>, title: "Free Checking & Sign Up", sub: "Coverage check & registration — completely free." },
    { icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: "Fast Installation", sub: "Most homes installed within 3 working days." },
  ];
  return (
    <div className="support-strip" style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          background: "var(--cream)", border: "1.5px solid rgba(249,115,22,0.4)", borderRadius: 18,
          padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 0 0 1px rgba(249,115,22,0.15), 0 10px 24px rgba(249,115,22,0.18)",
          transition: "transform .2s ease, box-shadow .2s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", boxShadow: "0 4px 10px rgba(249,115,22,0.1)", flexShrink: 0 }}>
            {it.icon}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--navy)" }}>{it.title}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>{it.sub}</div>
          </div>
        </div>
      ))}
      <style>{`@media (max-width: 800px) { .support-strip { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
