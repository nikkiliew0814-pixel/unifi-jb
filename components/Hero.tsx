"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";
import { openWA } from "@/lib/whatsapp";

interface HeroProps {
  onEnquire: () => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const { lang } = useLang();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" style={{
      position: "relative", minHeight: 820,
      padding: "130px 0 60px",
      display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      <HeroBackdrop />

      <div className="container" style={{ position: "relative", zIndex: 5, width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
          gap: 48, alignItems: "center",
        }}>
          {/* LEFT — copy */}
          <div style={{ position: "relative" }}>
            <div style={{
              display: "inline-block",
              fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase",
              color: "var(--unifi-orange)",
              padding: "6px 14px", borderRadius: 999,
              background: "rgba(242,111,34,0.10)",
              border: "1px solid rgba(242,111,34,0.20)",
              marginBottom: 20,
              animation: "fadeIn .5s ease",
            }}>
              {t(T.hero.eyebrow, lang)}
            </div>

            <h1 style={{
              margin: "0 0 28px",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 900, lineHeight: .95,
              letterSpacing: "-0.03em", color: "var(--ink-900)",
              whiteSpace: "pre-line",
              animation: "slideUp .6s .08s cubic-bezier(.2,.8,.2,1) both",
            }}>
              {t(T.hero.headline, lang).split("\n").map((line, i) =>
                i === 2
                  ? <span key={i} style={{
                      display: "block",
                      background: "linear-gradient(180deg, #FB923C 0%, #F26F22 55%, #DD5E14 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 6px 18px rgba(249,115,22,0.35))",
                    }}>{line}</span>
                  : <span key={i} style={{ display: "block" }}>{line}</span>
              )}
            </h1>

            <div style={{ marginBottom: 28, animation: "slideUp .6s .16s cubic-bezier(.2,.8,.2,1) both" }}>
              <QuickLeadForm lang={lang}/>
            </div>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: 12,
              animation: "slideUp .6s .24s cubic-bezier(.2,.8,.2,1) both",
            }}>
              <button className="btn-primary" onClick={onEnquire}>
                {t(T.hero.cta1, lang)}
                <ArrowIcon/>
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("package")}>
                {t(T.hero.cta2, lang)}
              </button>
            </div>

            <div style={{
              display: "flex", gap: 24, marginTop: 36, flexWrap: "wrap",
              animation: "slideUp .6s .32s cubic-bezier(.2,.8,.2,1) both",
            }}>
              <TrustChip icon="shield" label={t(T.hero.trust1, lang)}/>
              <TrustChip icon="bolt"   label={t(T.hero.trust2, lang)}/>
              <TrustChip icon="star"   label={t(T.hero.trust3, lang)}/>
            </div>
          </div>

          {/* RIGHT — reserved for backdrop scene */}
          <div style={{ minHeight: 320, position: "relative" }} className="hide-mobile"/>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", left: "50%", bottom: 24, transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        color: "var(--ink-500)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em",
        zIndex: 6,
      }}>
        <span style={{ textTransform: "uppercase" }}>Scroll</span>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"
          style={{ animation: "bob 1.6s ease-in-out infinite" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          #top .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Quick lead form ---------- */
function QuickLeadForm({ lang }: { lang: ReturnType<typeof useLang>["lang"] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState<{ name?: boolean; phone?: boolean }>({});

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof err = {};
    if (name.trim().length < 2) errs.name = true;
    if (!/^[0-9+\-\s]{8,}$/.test(phone)) errs.phone = true;
    setErr(errs);
    if (!Object.keys(errs).length) {
      const txt = encodeURIComponent(
        `Hi, I'm ${name.trim()} (${phone.trim()}). I'd like to check Unifi Fibre coverage at my address.`
      );
      window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254"}?text=${txt}`, "_blank", "noopener");
    }
  };

  return (
    <form onSubmit={handle} style={{
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(18px) saturate(140%)",
      WebkitBackdropFilter: "blur(18px) saturate(140%)",
      border: "1px solid rgba(255,255,255,0.95)",
      borderRadius: 24, padding: "22px",
      boxShadow: "0 14px 40px rgba(15,23,42,0.10)",
      maxWidth: 520,
    }}>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink-900)", marginBottom: 14 }}>
        {t(T.hero.quickTitle, lang)}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={name} onChange={(e) => setName(e.target.value)}
          placeholder={t(T.hero.quickName, lang)}
          style={{
            flex: 1, minWidth: "40%",
            fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-900)",
            background: "#fff",
            border: `1.5px solid ${err.name ? "var(--danger)" : "var(--ink-200)"}`,
            borderRadius: 999, padding: "11px 18px", outline: "none",
          }}/>
        <input
          value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder={t(T.hero.quickPhone, lang)} inputMode="tel"
          style={{
            flex: 1, minWidth: "40%",
            fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-900)",
            background: "#fff",
            border: `1.5px solid ${err.phone ? "var(--danger)" : "var(--ink-200)"}`,
            borderRadius: 999, padding: "11px 18px", outline: "none",
          }}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" style={{
          border: 0, cursor: "pointer",
          background: "linear-gradient(180deg, #FB923C 0%, #F26F22 100%)",
          color: "#fff", padding: "12px 22px", borderRadius: 999,
          fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: "0 12px 28px rgba(242,111,34,0.32)",
        }}>
          {t(T.hero.quickBtn, lang)} <ArrowIcon size={14}/>
        </button>
        <span style={{ fontSize: 12.5, color: "var(--ink-700)", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
          {t(T.hero.quickNote, lang)}
          <span style={{
            width: 22, height: 22, borderRadius: "50%",
            background: "linear-gradient(180deg,#2ee36b,#1eb95a)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
        </span>
      </div>
    </form>
  );
}

/* ---------- Hero backdrop ---------- */
function HeroBackdrop() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1, pointerEvents: "none" }}>
      {/* Atmospheric orbs */}
      <div style={{
        position: "absolute", top: "-10%", right: "-8%", width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(253,186,116,0.45), transparent 70%)",
        filter: "blur(40px)", animation: "floatA 9s ease-in-out infinite",
      }}/>
      <div style={{
        position: "absolute", bottom: "-12%", left: "-6%", width: 460, height: 460, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)",
        filter: "blur(48px)", animation: "floatB 11s ease-in-out infinite",
      }}/>
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse at 30% 30%, #000 0%, transparent 65%)",
        WebkitMaskImage: "radial-gradient(ellipse at 30% 30%, #000 0%, transparent 65%)",
        opacity: .45,
      }}/>
      {/* Scene image */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        aspectRatio: "1672 / 941", height: "100%",
      }}>
        <Image src="/assets/hero-scene.png" alt="" fill style={{ objectFit: "cover" }} priority/>
        {/* Floating spec chips */}
        <SpecChip top="8%"  left="22%" label="1Gbps" sub="Speed"   delay=".2s"/>
        <SpecChip top="56%" right="3%" label="24/7"  sub="Support" delay=".8s"/>
        <SpecChip bottom="14%" left="35%" label="0ms" sub="Lag"    delay="1.4s"/>
      </div>
      {/* White-to-transparent scrim */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(90deg, rgba(255,250,241,0.97) 0%, rgba(255,250,241,0.90) 22%, rgba(255,250,241,0.45) 46%, rgba(255,250,241,0) 65%)",
      }}/>
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(180deg, rgba(255,250,241,0.55) 0%, transparent 22%, transparent 80%, rgba(255,250,241,0.85) 100%)",
      }}/>
    </div>
  );
}

function SpecChip({ top, left, right, bottom, label, sub, delay }: {
  top?: string; left?: string; right?: string; bottom?: string;
  label: string; sub: string; delay: string;
}) {
  return (
    <div style={{
      position: "absolute", top, left, right, bottom,
      padding: "10px 14px", borderRadius: 16,
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(14px) saturate(140%)",
      WebkitBackdropFilter: "blur(14px) saturate(140%)",
      border: "1px solid rgba(255,255,255,0.95)",
      animation: `floatA 6s ease-in-out ${delay} infinite`,
    }}>
      <div style={{
        fontWeight: 900, fontSize: 20, lineHeight: 1,
        background: "linear-gradient(180deg,#FB923C,#DD5E14)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{label}</div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-700)", marginTop: 3 }}>{sub}</div>
    </div>
  );
}

function TrustChip({ icon, label }: { icon: string; label: string }) {
  const icons: Record<string, React.ReactElement> = {
    shield: <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    bolt:   <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    star:   <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--ink-900)" }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%",
        background: "rgba(249,115,22,0.12)", color: "var(--unifi-orange)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>{icons[icon]}</span>
      {label}
    </div>
  );
}

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
      <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
