"use client";
import React, { useState } from "react";
import Image from "next/image";

/* ============================================================
   TRUST STRIP
   ============================================================ */
const TRUST_STRIP = [
  { icon: "headset",   title: "24/7 Customer Support",   body: "Real people, always here to help." },
  { icon: "clipCheck", title: "Free Checking & Sign Up", body: "No hidden charges. Zero upfront fees." },
  { icon: "truck",     title: "Fast Installation",       body: "Typically within 24–48 hours." },
];

export function TrustStrip() {
  return (
    <section style={{ padding: "4px 0 4px" }}>
      <div className="container">
        <div className="trust-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {TRUST_STRIP.map((t, i) => <TrustStripCard key={i} t={t}/>)}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .trust-strip { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function TrustStripCard({ t }: { t: typeof TRUST_STRIP[0] }) {
  const [hover, setHover] = useState(false);
  const ICONS: Record<string, React.ReactElement> = {
    headset:   <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
    clipCheck: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    truck:     <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: "relative", background: "#fff", borderRadius: 20, padding: "14px 18px",
      border: "1.5px solid rgba(249,115,22,0.65)",
      boxShadow: hover
        ? "0 0 0 1px rgba(249,115,22,0.4), 0 0 28px rgba(249,115,22,0.5), 0 8px 20px rgba(15,23,42,0.07)"
        : "0 0 0 1px rgba(249,115,22,0.12), 0 0 18px rgba(249,115,22,0.30), 0 3px 10px rgba(15,23,42,0.04)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "all .3s cubic-bezier(.2,.8,.2,1)",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <span style={{
        flexShrink: 0, width: 42, height: 42, borderRadius: 12,
        background: "rgba(249,115,22,0.10)", color: "var(--unifi-orange)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>{ICONS[t.icon]}</span>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)", lineHeight: 1.2 }}>{t.title}</div>
        <div style={{ marginTop: 2, fontSize: 12.5, color: "var(--ink-700)", lineHeight: 1.4 }}>{t.body}</div>
      </div>
    </div>
  );
}

/* ============================================================
   SWITCH BANNER
   ============================================================ */
export function SwitchBanner({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section id="switch" style={{ padding: "24px 0 40px" }}>
      <div className="container">
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 32,
          background: "linear-gradient(120deg, #FFF1E2 0%, #FFE2CC 35%, #FFD1B0 65%, #FFE7BF 100%)",
          boxShadow: "0 20px 60px rgba(15,23,42,0.10)", minHeight: 300,
        }}>
          {/* Right gradient wash */}
          <div aria-hidden style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "55%",
            background: "linear-gradient(95deg, transparent 0%, rgba(255,180,138,0.5) 40%, rgba(178,108,232,0.30) 100%)",
          }}/>
          {/* Family image */}
          <Image src="/assets/banner-family.png" alt="" fill style={{
            objectFit: "cover", objectPosition: "right center",
            maskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 100%)",
          }}/>

          {/* Copy */}
          <div style={{ position: "relative", zIndex: 2, padding: "48px 48px", maxWidth: 580 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 999,
              background: "rgba(11,14,44,0.06)", color: "var(--ink-900)",
              fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14,
            }}>
              ⚡ Switch & Save Campaign
            </div>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
              Switch from <span style={{ color: "#1F1F8F" }}>Maxis</span>,{" "}
              <span style={{ color: "#1F1F8F" }}>CelcomDigi</span> or{" "}
              <span style={{ color: "#1F1F8F" }}>TIME</span>
            </h3>
            <div style={{
              fontWeight: 900, lineHeight: .95, letterSpacing: "-0.04em", marginTop: 12,
              fontSize: "clamp(52px,8vw,92px)",
              background: "linear-gradient(180deg, #FB923C 0%, #F26F22 60%, #DD5E14 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 8px 18px rgba(249,115,22,0.32))",
            }}>FREE</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "var(--ink-900)", marginTop: 4 }}>
              Up to <span style={{ color: "var(--unifi-orange)" }}>6 Months</span> internet subscription*
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.55, maxWidth: 420, margin: "12px 0 20px" }}>
              Zero interruption. Fast setup. Better coverage. Family-ready connectivity — we'll port your line and waive your termination fee.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <button className="btn-primary" onClick={onEnquire} style={{ fontSize: 14 }}>
                Switch & Enjoy Now
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <span style={{ fontSize: 12, color: "var(--ink-500)" }}>*Terms and conditions apply.</span>
            </div>
          </div>

          {/* Floating disc */}
          <div style={{
            position: "absolute", top: 28, right: 48, zIndex: 3,
            width: 110, height: 110, borderRadius: "50%",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFEEDC 100%)",
            border: "1px solid rgba(249,115,22,0.30)",
            boxShadow: "0 14px 36px rgba(242,111,34,0.28), 0 0 0 6px rgba(255,255,255,0.5)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transform: "rotate(-8deg)", animation: "floatA 5s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: ".14em", color: "var(--ink-700)", textTransform: "uppercase" }}>Limited</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--unifi-orange)", lineHeight: 1, marginTop: 2 }}>FREE</div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-900)", marginTop: 3 }}>up to 6 mo*</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY CHOOSE
   ============================================================ */
const FEATURES = [
  { icon: "globe",    title: "Wider Coverage in Malaysia", body: "Nationwide TM fibre network with unmatched reliability across Peninsular and East Malaysia.", span: 7, accent: "orange" },
  { icon: "building", title: "Best for Condo & Landed",     body: "Optimised for high-rises, apartments and bungalows — we'll route the line cleanly.", span: 5, accent: "blue" },
  { icon: "signup",   title: "Easy & Free Sign Up",         body: "Apply online in 3 minutes. We process the same working day. Zero upfront fee.", span: 5, accent: "orange" },
  { icon: "clock",    title: "Installation in 24–48H",      body: "Quick, professional install by TM-certified technicians. We confirm the slot with you.", span: 7, accent: "blue" },
];

const F_ICONS: Record<string, React.ReactElement> = {
  globe:    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  building: <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  signup:   <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  clock:    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

export function WhyChoose() {
  return (
    <section id="why" style={{ padding: "60px 0 40px" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 52px" }}>
          <span className="eyebrow">Why Choose Unifi Fibre?</span>
          <h2 style={{ margin: "14px 0 12px", fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink-900)" }}>
            Future-Ready.<br/>
            <span style={{ background: "linear-gradient(95deg, #F26F22 0%, #B07CF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Always Ahead.
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-700)", lineHeight: 1.55 }}>
            Four reasons families across Malaysia keep choosing Unifi as their everyday connection.
          </p>
        </div>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ gridColumn: `span ${f.span}` }}>
              <FeatureCard f={f} idx={i}/>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .why-grid > * { grid-column: span 12 !important; } }`}</style>
    </section>
  );
}

function FeatureCard({ f, idx }: { f: typeof FEATURES[0]; idx: number }) {
  const [h, setH] = useState(false);
  const ac = f.accent === "orange" ? "var(--unifi-orange)" : "var(--unifi-blue)";
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      position: "relative",
      background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.7)", borderRadius: 24,
      padding: `${idx % 2 === 0 ? 34 : 28}px 26px 26px`,
      minHeight: 210,
      boxShadow: h ? "0 14px 36px rgba(15,23,42,0.09)" : "0 4px 16px rgba(15,23,42,0.04)",
      transform: h ? "translateY(-4px)" : "translateY(0)",
      transition: "all .3s cubic-bezier(.2,.8,.2,1)",
      display: "flex", gap: 20, alignItems: "flex-start",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
        background: f.accent === "orange"
          ? "linear-gradient(180deg, rgba(253,186,116,0.25), rgba(249,115,22,0.10))"
          : "linear-gradient(180deg, rgba(139,139,239,0.25), rgba(56,56,224,0.08))",
        border: f.accent === "orange"
          ? "1px solid rgba(249,115,22,0.18)" : "1px solid rgba(56,56,224,0.14)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: ac,
      }}>
        {F_ICONS[f.icon]}
      </div>
      <div>
        <h3 style={{ margin: "0 0 7px", fontSize: 20, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--ink-900)" }}>{f.title}</h3>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-700)" }}>{f.body}</p>
      </div>
      <div style={{ position: "absolute", top: 14, right: 18, fontSize: 12.5, fontWeight: 800, color: "var(--ink-300)", letterSpacing: ".08em" }}>0{idx + 1}</div>
    </div>
  );
}

/* ============================================================
   TRUST BLOCK
   ============================================================ */
const CHECKLIST = [
  "Free equipment (ONU & Wi-Fi router)",
  "No hidden charges",
  "Unlimited quota with no throttling",
  "24/7 customer support",
  "Compatible with all devices",
];

export function TrustBlock({ onEnquire, onWhatsApp }: { onEnquire: () => void; onWhatsApp: () => void }) {
  return (
    <section id="trust" style={{ padding: "40px 0 70px" }}>
      <div className="container">
        <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr 0.85fr", gap: 18, alignItems: "stretch" }}>

          {/* LEFT - gradient hero card */}
          <div style={{
            position: "relative", overflow: "hidden",
            padding: "38px 34px", borderRadius: 24, color: "#fff",
            background: "linear-gradient(135deg, #F26F22 0%, #F38CC6 60%, #B07CF5 100%)",
            boxShadow: "0 20px 50px rgba(249,115,22,0.28)",
            display: "flex", flexDirection: "column",
          }}>
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(110deg, rgba(255,255,255,0.16) 0%, transparent 40%)",
            }}/>
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>No.1 Fibre in Malaysia</span>
            <h3 style={{ margin: "14px 0 10px", fontSize: 34, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              Trusted by Millions.<br/>Built for Tomorrow.
            </h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.92)", maxWidth: 340 }}>
              Unifi is Malaysia's No.1 Fibre Broadband Provider. As an authorised TM dealer we sign you up the same working day.
            </p>
            <div style={{ marginTop: "auto", paddingTop: 26 }}>
              <button onClick={onEnquire} style={{
                border: 0, cursor: "pointer", background: "#fff", color: "var(--unifi-orange-600)",
                padding: "13px 26px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14.5,
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
              }}>
                Register Now
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>

          {/* MIDDLE - checklist */}
          <div style={{
            background: "#fff", borderRadius: 24, padding: "34px 30px",
            border: "1px solid rgba(15,23,42,0.05)", boxShadow: "0 8px 26px rgba(15,23,42,0.05)",
          }}>
            <span className="eyebrow">What's included</span>
            <h3 style={{ margin: "12px 0 20px", fontSize: 21, fontWeight: 800, color: "var(--ink-900)" }}>
              Everything in one transparent price
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
              {CHECKLIST.map((c, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "rgba(31,169,113,0.12)", color: "#1FA971",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-900)" }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT - WA card */}
          <div style={{
            position: "relative", overflow: "hidden", borderRadius: 24, padding: 26,
            background: "linear-gradient(180deg, #F0FFF6 0%, #DEF8E7 100%)",
            border: "1px solid rgba(37,211,102,0.18)", boxShadow: "0 10px 30px rgba(37,211,102,0.10)",
            display: "flex", flexDirection: "column",
          }}>
            <div aria-hidden style={{
              position: "absolute", right: -30, bottom: -30,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37,211,102,0.22), transparent 70%)", filter: "blur(10px)",
            }}/>
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              background: "linear-gradient(180deg,#2ee36b,#1eb95a)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 22px rgba(37,211,102,0.35)",
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div style={{ marginTop: 16, fontSize: 12.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1A7A40" }}>
              Need help right now?
            </div>
            <h3 style={{ margin: "7px 0 5px", fontSize: 21, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
              Chat with us on WhatsApp
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.5 }}>
              Average reply under 5 minutes. Mon–Sun, 9am–10pm.
            </p>
            <div style={{ marginTop: "auto", paddingTop: 18 }}>
              <button onClick={onWhatsApp} style={{
                width: "100%", border: 0, cursor: "pointer",
                background: "linear-gradient(180deg,#2ee36b,#1eb95a)",
                color: "#fff", padding: "13px 20px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14.5,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
                boxShadow: "0 12px 26px rgba(37,211,102,0.35)",
              }}>
                <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {process.env.NEXT_PUBLIC_WA_DISPLAY ?? "016-3264257"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .trust-grid { grid-template-columns: 1fr 1fr !important; } .trust-grid > :first-child { grid-column: span 2; } }
        @media (max-width: 720px) { .trust-grid { grid-template-columns: 1fr !important; } .trust-grid > :first-child { grid-column: auto; } }
      `}</style>
    </section>
  );
}
