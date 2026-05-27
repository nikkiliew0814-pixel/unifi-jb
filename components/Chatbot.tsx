"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";
import { openWA, type ServiceType } from "@/lib/whatsapp";

export default function Chatbot() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const choose = (svc: ServiceType) => { openWA(svc); setOpen(false); };

  const SERVICES: { key: ServiceType; label: string; emoji: string }[] = [
    { key: "new",      label: t(T.chatbot.new, lang),      emoji: "🆕" },
    { key: "renew",    label: t(T.chatbot.renew, lang),    emoji: "🔄" },
    { key: "upgrade",  label: t(T.chatbot.upgrade, lang),  emoji: "⬆️" },
    { key: "coverage", label: t(T.chatbot.coverage, lang), emoji: "📍" },
  ];

  if (dismissed) return null;

  return (
    <>
      {/* Popup menu */}
      {open && (
        <div style={{
          position: "fixed", right: 22, bottom: 96, zIndex: 51,
          width: 300, background: "#fff", borderRadius: 24,
          boxShadow: "0 24px 60px rgba(11,14,44,0.18), 0 0 0 1px rgba(11,14,44,0.05)",
          animation: "chatSlideUp .3s cubic-bezier(.2,.8,.2,1)", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #F26F22 0%, #F38CC6 100%)", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Unifi Helper</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulseDot 1.8s ease-out infinite" }}/>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.90)", fontWeight: 500 }}>Online now</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ width: 28, height: 28, borderRadius: "50%", border: 0, cursor: "pointer", background: "rgba(255,255,255,0.25)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg>
            </button>
          </div>
          {/* Body */}
          <div style={{ padding: "16px 16px 18px" }}>
            <div style={{ display: "flex", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, #F26F22, #F38CC6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
              <div style={{ background: "var(--ink-50)", borderRadius: "4px 14px 14px 14px", padding: "10px 13px", fontSize: 13.5, color: "var(--navy)", lineHeight: 1.45 }}>
                {t(T.chatbot.greeting, lang)}
                <div style={{ marginTop: 6, fontWeight: 600, color: "var(--ink-700)", fontSize: 13 }}>{t(T.chatbot.question, lang)}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SERVICES.map((s) => (
                <button key={s.key} onClick={() => choose(s.key)} style={{
                  width: "100%", cursor: "pointer",
                  background: "rgba(249,115,22,0.06)", border: "1.5px solid rgba(249,115,22,0.18)",
                  borderRadius: 999, padding: "10px 16px",
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.5,
                  color: "var(--navy)", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 10, transition: "all .2s",
                }}>
                  <span style={{ fontSize: 16 }}>{s.emoji}</span>
                  {s.label}
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.4} strokeLinecap="round" style={{ marginLeft: "auto" }}>
                    <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              ))}
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 11, color: "var(--ink-500)", textAlign: "center" }}>
              Opens WhatsApp with pre-filled message
            </p>
          </div>
        </div>
      )}

      {/* FAB — Agent card */}
      <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 50 }}>
        {/* Dismiss */}
        {!open && (
          <button onClick={() => setDismissed(true)} style={{
            position: "absolute", top: -8, right: -6, zIndex: 3,
            width: 20, height: 20, borderRadius: "50%", border: 0, cursor: "pointer",
            background: "rgba(11,14,44,0.30)", color: "#fff", fontSize: 12, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }} title="Dismiss">×</button>
        )}

        <button
          onClick={() => setOpen(!open)}
          aria-label="Chat with Unifi Specialist"
          style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: open ? "14px 22px" : "12px 24px 12px 12px",
            borderRadius: 999, border: 0, cursor: "pointer",
            background: open
              ? "linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%)"
              : "linear-gradient(135deg,#25D366 0%,#1eb95a 100%)",
            boxShadow: open
              ? "0 12px 36px rgba(15,23,42,0.45)"
              : "0 8px 40px rgba(37,211,102,0.55), 0 2px 12px rgba(37,211,102,0.35)",
            transition: "all .3s cubic-bezier(.2,.8,.2,1)", position: "relative",
          }}>

          {open ? (
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round">
              <line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/>
            </svg>
          ) : (
            <>
              {/* Specialist photo avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}>
                  <Image src="/assets/specialist.png" alt="Fibre specialist" width={56} height={56} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}/>
                </div>
                <span style={{ position: "absolute", bottom: 0, right: 0, width: 15, height: 15, borderRadius: "50%", background: "#22C55E", border: "2.5px solid #fff", animation: "pulseDot 1.8s ease-out infinite" }}/>
              </div>

              {/* Text */}
              <div style={{ textAlign: "left", lineHeight: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", fontFamily: "var(--font-sans)" }}>
                  Unifi Specialist
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 700, fontFamily: "var(--font-sans)", marginTop: 4, whiteSpace: "nowrap" }}>
                  Hantar / WhatsApp Saya
                </div>
              </div>

              {/* WA icon */}
              <div style={{ marginLeft: 2, width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(180deg,#2ee36b,#1eb95a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(37,211,102,0.5)" }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              {/* Pulse ring */}
              <span style={{ position: "absolute", inset: -5, borderRadius: 999, border: "2.5px solid rgba(37,211,102,0.5)", animation: "ripple 2.4s ease-out infinite", pointerEvents: "none" }}/>
            </>
          )}
        </button>
      </div>
    </>
  );
}
