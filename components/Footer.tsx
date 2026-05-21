"use client";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";

export default function Footer({ onEnquire }: { onEnquire: () => void }) {
  const { lang } = useLang();

  return (
    <footer id="news" style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #0B1432 0%, #0A0E26 100%)",
      color: "rgba(255,255,255,0.78)", padding: "52px 0 24px",
    }}>
      {/* Glow */}
      <div aria-hidden style={{
        position: "absolute", inset: "auto -20% -50% -20%", height: 440, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(249,115,22,0.28), transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none",
      }}/>
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)",
      }}/>

      <div className="container" style={{ position: "relative" }}>
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.3fr 0.8fr",
          gap: 32, paddingBottom: 26,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 14px",
              borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{ fontFamily: "Impact,'Arial Black',sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>TM</span>
              <span style={{ height: 22, width: 1, background: "rgba(255,255,255,0.18)" }}/>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#FB923C" }}>
                Penjual Sah<br/>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 8.5 }}>Authorised Reseller</span>
              </span>
            </div>
            <div style={{ marginTop: 16, fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{t(T.footer.tagline, lang)}</div>
            <div style={{ marginTop: 3, fontSize: 12.5, color: "rgba(255,255,255,0.60)" }}>{t(T.footer.sub, lang)}</div>
            <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.55, color: "rgba(255,255,255,0.55)" }}>
              Your application will be processed right away, and we'll get back to you on the next working day.
            </p>
            <button onClick={onEnquire} style={{
              marginTop: 14, border: 0, cursor: "pointer",
              background: "linear-gradient(180deg,#FB923C,#F26F22)", color: "#fff",
              padding: "10px 20px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: "0 10px 24px rgba(242,111,34,0.40)",
            }}>
              {t(T.footer.register, lang)}
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          {/* Middle - T&C */}
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#fff", marginBottom: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>
              {t(T.footer.terms, lang)}
            </div>
            <ul style={{ listStyle: "disc", margin: 0, paddingLeft: 16, fontSize: 12.5, lineHeight: 1.7, color: "rgba(255,255,255,0.70)" }}>
              <li>Price displayed is EXCLUSIVE of 6% Service Tax.</li>
              <li>Minimum Subscription 24 months.</li>
              <li>Free installation covers standard installation cabling (currently no charges) up to 50 meters of internal fiber.</li>
              <li>Excludes charges imposed by external contractors for concealed wiring, customised wiring etc.</li>
              <li>All Unifi Home New registrations require RM100 advance payment within 10 days after installation complete.</li>
            </ul>
          </div>

          {/* Right - links */}
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#fff", marginBottom: 11, letterSpacing: ".08em", textTransform: "uppercase" }}>
              {t(T.footer.info, lang)}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
              <li><Link href="/privacy">{t(T.footer.privacy, lang)}</Link></li>
              <li><Link href="/refund">{t(T.footer.refund, lang)}</Link></li>
              <li><Link href="/check-coverage">{t(T.nav.coverage, lang)}</Link></li>
              <li><Link href="/check-speed">{t(T.nav.speedTest, lang)}</Link></li>
              <li><Link href="/faq">{t(T.nav.faq, lang)}</Link></li>
              <li><Link href="/news">{t(T.nav.news, lang)}</Link></li>
            </ul>
            <div style={{ marginTop: 18, display: "flex", gap: 9 }}>
              {[
                { label: "WA", href: `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254"}` },
                { label: "📞", href: `tel:+${process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254"}` },
                { label: "🌐", href: "/" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 12, fontWeight: 700,
                }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          fontSize: 12, color: "rgba(255,255,255,0.50)",
        }}>
          <div>{t(T.footer.copyright, lang)}</div>
          <div>Made with care in Malaysia 🇲🇾</div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}
