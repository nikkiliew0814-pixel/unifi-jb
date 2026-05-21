"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { openWA } from "@/lib/whatsapp";

const COVERAGE_AREAS = [
  "Johor Bahru City", "Skudai", "Tampoi", "Tebrau", "Masai",
  "Kempas", "Larkin", "Permas Jaya", "Pasir Gudang", "Ulu Tiram",
  "Kulai", "Senai", "Nusa Bestari", "Bukit Indah", "Pandan",
  "Danga Bay", "Iskandar Puteri", "Gelang Patah",
];

export default function CoverageClient() {
  const [area, setArea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!area.trim()) return;
    const msg = `Hi, can you check if Unifi is available at ${area}?`;
    openWA("coverage", ` - Location: ${area}`);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar/>
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#FFFAF3" }}>

        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #1F1F8F 0%, #3838E0 60%, #B07CF5 100%)",
          padding: "60px 0 50px", position: "relative", overflow: "hidden", textAlign: "center",
        }}>
          <div aria-hidden style={{
            position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: 700, height: 700, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
            pointerEvents: "none",
          }}/>
          <div className="container" style={{ position: "relative" }}>
            <span style={{
              display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: ".14em",
              textTransform: "uppercase", color: "#FB923C",
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.30)",
              marginBottom: 18,
            }}>Coverage Check</span>
            <h1 style={{ margin: "0 0 14px", fontSize: "clamp(34px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
              Is Unifi Available<br/>at Your Address?
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.80)", maxWidth: 500, margin: "0 auto", lineHeight: 1.55 }}>
              Check coverage and get a same-day response from our dealer team.
            </p>
          </div>
        </section>

        {/* 2-column layout */}
        <section style={{ padding: "50px 0 70px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

              {/* Left: official map */}
              <div>
                <div style={{
                  background: "#fff", borderRadius: 24, overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(11,14,44,0.10)",
                  border: "1px solid rgba(11,14,44,0.06)",
                }}>
                  <div style={{ padding: "22px 24px 16px", borderBottom: "1px solid rgba(11,14,44,0.06)" }}>
                    <span className="eyebrow">Official TM Coverage Map</span>
                    <h2 style={{ margin: "10px 0 6px", fontSize: 22, fontWeight: 800, color: "var(--ink-900)" }}>
                      Check via TM's Website
                    </h2>
                    <p style={{ fontSize: 13.5, color: "var(--ink-700)", margin: 0 }}>
                      Enter your full address on TM's official portal for the most accurate coverage result.
                    </p>
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <div style={{
                      background: "linear-gradient(135deg, #E6E6FB 0%, #F7F8FB 100%)",
                      borderRadius: 16, padding: "32px 24px", textAlign: "center",
                      border: "1px dashed var(--unifi-blue-300)",
                    }}>
                      <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink-900)", marginBottom: 6 }}>
                        TM Unifi Coverage Checker
                      </div>
                      <p style={{ fontSize: 13, color: "var(--ink-700)", margin: "0 0 18px" }}>
                        Search by postcode or address on TM's official portal
                      </p>
                      <a href="https://www.tm.com.my/unifi/Pages/coverage.aspx" target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "12px 24px", borderRadius: 999,
                          background: "linear-gradient(180deg,#4949E8,#3030C2)", color: "#fff",
                          fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14.5,
                          boxShadow: "0 10px 24px rgba(56,56,224,0.28)",
                          textDecoration: "none",
                        }}>
                        Open TM Coverage Map
                        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1={10} y1={14} x2={21} y2={3}/></svg>
                      </a>
                    </div>

                    {/* Coverage areas */}
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink-500)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>
                        We Cover These Areas in JB
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {COVERAGE_AREAS.map((area) => (
                          <span key={area} style={{
                            padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                            background: "rgba(56,56,224,0.07)", color: "var(--unifi-blue-500)",
                            border: "1px solid rgba(56,56,224,0.14)",
                          }}>{area}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: enquiry form */}
              <div>
                <div style={{
                  background: "#fff", borderRadius: 24, padding: "28px 28px 30px",
                  boxShadow: "0 16px 48px rgba(11,14,44,0.10)",
                  border: "1px solid rgba(11,14,44,0.06)",
                }}>
                  <span className="eyebrow">Quick Coverage Check</span>
                  <h2 style={{ margin: "10px 0 6px", fontSize: 22, fontWeight: 800, color: "var(--ink-900)" }}>
                    Ask Our Dealer Team
                  </h2>
                  <p style={{ fontSize: 13.5, color: "var(--ink-700)", margin: "0 0 22px" }}>
                    Tell us your area and we'll check availability and WhatsApp you within 1 hour.
                  </p>

                  {submitted ? (
                    <div style={{
                      background: "rgba(31,169,113,0.08)", border: "1px solid rgba(31,169,113,0.25)",
                      borderRadius: 16, padding: "28px 24px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)", marginBottom: 6 }}>
                        Request Sent!
                      </div>
                      <p style={{ fontSize: 14, color: "var(--ink-700)", margin: "0 0 18px" }}>
                        Our team will WhatsApp you about coverage for <strong>{area}</strong> within 1 hour.
                      </p>
                      <button onClick={() => { setSubmitted(false); setArea(""); }}
                        className="btn-ghost" style={{ fontSize: 13, padding: "10px 20px" }}>
                        Check Another Area
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div className="modal-field">
                        <label>Your Area / Address</label>
                        <input
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="e.g. Skudai, Johor Bahru"
                          required
                        />
                      </div>
                      <p style={{ fontSize: 12.5, color: "var(--ink-500)", margin: "0" }}>
                        Tip: Include your postcode for more accurate results (e.g. "Taman Desa, 81300 Skudai")
                      </p>
                      <button type="submit" className="btn-primary" style={{ fontSize: 15 }}>
                        Check My Coverage
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                      </button>
                      <div style={{
                        background: "rgba(31,169,113,0.07)", border: "1px solid rgba(31,169,113,0.18)",
                        borderRadius: 10, padding: "9px 12px",
                        fontSize: 12, color: "#0F6E45", display: "flex", alignItems: "center", gap: 7,
                      }}>
                        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Free check · No commitment · WhatsApp response in 1 hour
                      </div>
                    </form>
                  )}
                </div>

                {/* Direct WA card */}
                <div style={{
                  marginTop: 16, borderRadius: 20, padding: "20px 24px",
                  background: "linear-gradient(180deg, #F0FFF6 0%, #DEF8E7 100%)",
                  border: "1px solid rgba(37,211,102,0.20)",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink-900)" }}>Prefer to call directly?</div>
                    <div style={{ fontSize: 13, color: "var(--ink-700)", marginTop: 3 }}>Mon–Sun, 9am–10pm · Reply under 5 mins</div>
                  </div>
                  <button onClick={() => openWA("coverage")} style={{
                    border: 0, cursor: "pointer", flexShrink: 0,
                    background: "linear-gradient(180deg,#2ee36b,#1eb95a)",
                    color: "#fff", padding: "11px 18px", borderRadius: 999,
                    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.5,
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`@media (max-width: 768px) { section > .container > div { grid-template-columns: 1fr !important; } }`}</style>
      </main>
      <Footer onEnquire={() => openWA()}/>
      <Chatbot/>
    </>
  );
}
