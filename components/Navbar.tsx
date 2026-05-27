"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import { T, t, LANGS } from "@/lib/i18n";
import { WA_DISPLAY, openWA } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { key: "package" as const,   href: "/#package" },
  { key: "speedTest" as const, href: "/check-speed" },
  { key: "faq" as const,       href: "/faq" },
  { key: "news" as const,      href: "/news" },
  { key: "contact" as const,   href: "/contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        transition: "background .25s, box-shadow .25s, border-color .25s",
        background: scrolled ? "rgba(255,250,243,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15,23,42,0.06)" : "1px solid transparent",
      }}>
        <div className="container" style={{
          height: 80, display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/assets/logo-transparent.png" alt="Unifi Authorised Reseller JB"
              width={120} height={48} style={{ height: 48, width: "auto", objectFit: "contain" }} priority/>
          </Link>

          {/* Center nav */}
          <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV_ITEMS.map((n) => (
              <Link key={n.key} href={n.href} style={{
                position: "relative", padding: "10px 14px",
                fontWeight: 600, fontSize: 14, color: "var(--ink-900)",
              }}>
                {t(T.nav[n.key], lang)}
                <span style={{
                  position: "absolute", left: 14, right: 14, bottom: 4, height: 2,
                  background: "linear-gradient(90deg,#FB923C,#F26F22)", borderRadius: 2,
                  transform: "scaleX(0)", transformOrigin: "left",
                  transition: "transform .3s cubic-bezier(.2,.8,.2,1)",
                }}/>
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            {/* Lang switch */}
            <div className="hide-mobile" style={{
              display: "inline-flex", padding: 3, borderRadius: 999,
              background: "rgba(255,255,255,0.7)", border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(8px)",
            }}>
              {LANGS.map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  border: 0, cursor: "pointer", padding: "5px 10px", borderRadius: 999, minWidth: 36,
                  fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
                  color: lang === l ? "#fff" : "var(--ink-700)",
                  background: lang === l ? "linear-gradient(180deg,#FB923C,#F26F22)" : "transparent",
                  boxShadow: lang === l ? "0 6px 14px rgba(242,111,34,0.32)" : "none",
                  transition: "all .2s",
                }}>{l}</button>
              ))}
            </div>

            {/* Hamburger */}
            <button className="show-mobile" onClick={() => setDrawer(true)} style={{
              width: 42, height: 42, borderRadius: 12,
              border: "1px solid rgba(15,23,42,0.1)", background: "rgba(255,255,255,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1={3} y1={6}  x2={21} y2={6}/>
                <line x1={3} y1={12} x2={21} y2={12}/>
                <line x1={3} y1={18} x2={21} y2={18}/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={"drawer-scrim " + (drawer ? "open" : "")} onClick={() => setDrawer(false)}/>
      <aside className={"drawer " + (drawer ? "open" : "")}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Image src="/assets/logo-transparent.png" alt="" width={100} height={40}
            style={{ height: 40, width: "auto", objectFit: "contain" }}/>
          <button onClick={() => setDrawer(false)} style={{
            width: 38, height: 38, borderRadius: 10, border: 0,
            background: "rgba(15,23,42,0.06)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/>
            </svg>
          </button>
        </div>

        {NAV_ITEMS.map((n) => (
          <Link key={n.key} href={n.href} onClick={() => setDrawer(false)} style={{
            padding: "13px 10px", borderRadius: 10,
            fontWeight: 700, fontSize: 16, color: "var(--ink-900)",
            display: "block",
          }}>{t(T.nav[n.key], lang)}</Link>
        ))}

        {/* Mobile lang switch */}
        <div style={{
          display: "flex", padding: 3, borderRadius: 999, marginTop: 12,
          background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)",
          width: "fit-content",
        }}>
          {LANGS.map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              border: 0, cursor: "pointer", padding: "6px 12px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700,
              color: lang === l ? "#fff" : "var(--ink-700)",
              background: lang === l ? "linear-gradient(180deg,#FB923C,#F26F22)" : "transparent",
              transition: "all .2s",
            }}>{l}</button>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <button onClick={() => { setDrawer(false); openWA(); }} style={{
            width: "100%", border: 0, cursor: "pointer",
            background: "linear-gradient(180deg,#2ee36b,#1eb95a)",
            color: "#fff", padding: "14px 22px", borderRadius: 999,
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <WAIcon size={20}/> {WA_DISPLAY}
          </button>
        </div>
      </aside>
    </>
  );
}

function WAIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
