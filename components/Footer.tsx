"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";

const WA_NUM = process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254";
const WA_DISPLAY = process.env.NEXT_PUBLIC_WA_DISPLAY ?? "016-7482254";

export default function Footer({ onEnquire }: { onEnquire: () => void }) {
  const { lang } = useLang();

  return (
    <footer id="news" style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #0B1432 0%, #0A0E26 100%)",
      color: "rgba(255,255,255,0.78)", padding: "60px 0 24px",
    }}>
      {/* Background glow orb */}
      <div aria-hidden style={{
        position: "absolute", top: -80, right: "10%", width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }}/>
      {/* Bottom glow */}
      <div aria-hidden style={{
        position: "absolute", bottom: -60, left: "30%", width: 500, height: 300,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(67,56,202,0.15), transparent 70%)",
        filter: "blur(30px)", pointerEvents: "none",
      }}/>
      {/* Top border line */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 35%, rgba(67,56,202,0.4) 65%, transparent)",
      }}/>

      {/* Decorative SVG path lines */}
      <svg aria-hidden width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06 }} preserveAspectRatio="none">
        <path d="M0,150 Q300,80 600,180 T1200,120" stroke="#F97316" strokeWidth="1.5" fill="none"/>
        <path d="M0,260 Q400,180 800,280 T1400,200" stroke="#6366F1" strokeWidth="1" fill="none"/>
        <path d="M200,0 Q500,120 400,350" stroke="#F97316" strokeWidth="0.8" fill="none"/>
      </svg>

      <div className="container" style={{ position: "relative" }}>
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1.4fr 0.9fr 1fr",
          gap: 36, paddingBottom: 32,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 14px",
              borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 16,
            }}>
              <span style={{ fontFamily: "Impact,'Arial Black',sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>TM</span>
              <span style={{ height: 22, width: 1, background: "rgba(255,255,255,0.18)" }}/>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#FB923C" }}>
                Penjual Sah<br/>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 8.5 }}>Authorised Reseller</span>
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t(T.footer.tagline, lang)}</div>
            <div style={{ marginTop: 3, fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>{t(T.footer.sub, lang)}</div>
            <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.6, color: "rgba(255,255,255,0.50)" }}>
              Your application will be processed right away, and we'll get back to you on the next working day.
            </p>
            <button onClick={onEnquire} style={{
              marginTop: 16, border: 0, cursor: "pointer",
              background: "linear-gradient(135deg, #FB923C, #F26F22)", color: "#fff",
              padding: "11px 22px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.5,
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: "0 10px 24px rgba(242,111,34,0.40)",
            }}>
              {t(T.footer.register, lang)}
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          {/* Col 2 — T&C */}
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", marginBottom: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>
              {t(T.footer.terms, lang)}
            </div>
            <ul style={{ listStyle: "disc", margin: 0, paddingLeft: 16, fontSize: 12.5, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>
              <li>Price displayed is EXCLUSIVE of 8% Service Tax.</li>
              <li>Minimum subscription 24 months.</li>
              <li>Free installation covers standard cabling up to 50 metres of internal fibre.</li>
              <li>Excludes charges by external contractors for concealed or customised wiring.</li>
              <li>All Unifi Home new registrations require RM100 advance payment within 10 days after installation is complete.</li>
              <li>Up to 6 months free only when switching from Maxis, CelcomDigi or TIME.</li>
            </ul>
          </div>

          {/* Col 3 — Info links */}
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", marginBottom: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>
              {t(T.footer.info, lang)}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: t(T.footer.privacy, lang), href: "/privacy" },
                { label: t(T.footer.refund, lang), href: "/refund" },
                { label: t(T.nav.speedTest, lang), href: "/check-speed" },
                { label: t(T.nav.faq, lang), href: "/faq" },
                { label: t(T.nav.news, lang), href: "/news" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{
                    fontSize: 13, color: "rgba(255,255,255,0.70)",
                    display: "inline-flex", alignItems: "center", gap: 6,
                    transition: "color .2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FB923C")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Specialist card */}
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", marginBottom: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Chat With Us
            </div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 20, padding: 18, marginBottom: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(249,115,22,0.5)" }}>
                    <Image src="/assets/specialist.png" alt="Specialist" width={52} height={52} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}/>
                  </div>
                  <span style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#22C55E", border: "2px solid #0A0E26" }}/>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Unifi Specialist</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#25D366", display: "inline-block" }}/>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>Replied in 5 mins</span>
                  </div>
                </div>
              </div>
              <a
                href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent("Hi, I'd like to know more about Unifi plans.")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "11px 16px", borderRadius: 999, border: 0, cursor: "pointer",
                  background: "linear-gradient(135deg, #25D366, #1EB954)",
                  color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.5,
                  boxShadow: "0 8px 20px rgba(37,211,102,0.30)", textDecoration: "none",
                }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {WA_DISPLAY}
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
                },
                {
                  label: "TikTok",
                  href: "https://tiktok.com",
                  icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.76a8.16 8.16 0 004.77 1.52V7.83a4.85 4.85 0 01-1-.14z"/></svg>,
                },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.75)", transition: "all .2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(249,115,22,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#FB923C"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{
          paddingTop: 20, display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10,
          fontSize: 12, color: "rgba(255,255,255,0.40)",
        }}>
          <div>{t(T.footer.copyright, lang)}</div>
          <div>Made with care in Malaysia 🇲🇾</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 620px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
