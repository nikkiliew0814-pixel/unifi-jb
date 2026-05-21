"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import EnquiryModal from "@/components/EnquiryModal";
import { useState } from "react";
import { openWA } from "@/lib/whatsapp";

const SPEED_TIPS = [
  { mbps: "1–10 Mbps",   users: "1 user",        use: "Basic browsing, email" },
  { mbps: "25–50 Mbps",  users: "1–2 users",      use: "HD streaming, video calls" },
  { mbps: "100 Mbps",    users: "2–4 users",      use: "4K streaming, gaming" },
  { mbps: "300 Mbps",    users: "4–6 users",      use: "Multiple 4K streams, WFH" },
  { mbps: "500 Mbps",    users: "6–8 users",      use: "Heavy gaming, large downloads" },
  { mbps: "1 Gbps+",     users: "8–10+ users",    use: "Power users, smart home" },
];

export default function SpeedTestClient() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Navbar/>
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#FFFAF3" }}>
        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #0B1432 0%, #1F1F8F 100%)",
          padding: "60px 0 50px", position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}/>
          <div className="container" style={{ position: "relative", textAlign: "center" }}>
            <span style={{
              display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: ".14em",
              textTransform: "uppercase", color: "#FB923C",
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)",
              marginBottom: 18,
            }}>Free Tool</span>
            <h1 style={{ margin: "0 0 14px", fontSize: "clamp(36px,6vw,68px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", color: "#fff" }}>
              Test Your Internet Speed
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 30px", lineHeight: 1.55 }}>
              Check your current broadband speed. Slow results? We can upgrade your connection today.
            </p>
          </div>
        </section>

        {/* Speed test embed */}
        <section style={{ padding: "0 0 40px", marginTop: -10 }}>
          <div className="container">
            <div style={{
              background: "#fff", borderRadius: 28, overflow: "hidden",
              boxShadow: "0 20px 60px rgba(11,14,44,0.12)",
              border: "1px solid rgba(11,14,44,0.06)",
            }}>
              <iframe
                src="https://fast.com"
                width="100%"
                height="500"
                frameBorder="0"
                title="Internet Speed Test by fast.com"
                style={{ display: "block" }}
                allow="fullscreen"
              />
            </div>
            <p style={{ textAlign: "center", marginTop: 12, fontSize: 12.5, color: "var(--ink-500)" }}>
              Speed test powered by <strong>fast.com</strong> by Netflix. Results may vary based on your network conditions.
            </p>
          </div>
        </section>

        {/* Speed guide */}
        <section style={{ padding: "20px 0 60px" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="eyebrow">Speed Guide</span>
              <h2 style={{ margin: "12px 0 10px", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink-900)" }}>
                How much speed do you actually need?
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-700)", maxWidth: 520, margin: "0 auto" }}>
                Compare your result with our recommended speeds below.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {SPEED_TIPS.map((tip, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 18, padding: "20px 22px",
                  border: "1px solid rgba(11,14,44,0.06)",
                  boxShadow: "0 6px 20px rgba(11,14,44,0.05)",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <div style={{
                    flexShrink: 0, width: 56, height: 56, borderRadius: 14,
                    background: `hsl(${210 + i * 20}, 70%, ${92 - i * 3}%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: `hsl(${210 + i * 20}, 70%, ${40 - i * 2}%)`,
                    letterSpacing: "-.02em", textAlign: "center", lineHeight: 1.1,
                  }}>
                    {tip.mbps.split(" ")[0]}<br/><span style={{ fontSize: 9 }}>Mbps</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-900)" }}>{tip.mbps}</div>
                    <div style={{ fontSize: 12.5, color: "var(--unifi-orange)", fontWeight: 700, marginTop: 2 }}>{tip.users}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-700)", marginTop: 2 }}>{tip.use}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: 36, textAlign: "center",
              background: "linear-gradient(135deg, #F26F22 0%, #F38CC6 60%, #B07CF5 100%)",
              borderRadius: 24, padding: "40px 32px", color: "#fff",
              boxShadow: "0 20px 50px rgba(249,115,22,0.28)",
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>
                Not getting the speed you pay for?
              </h3>
              <p style={{ margin: "0 auto 24px", fontSize: 15, maxWidth: 440, lineHeight: 1.55, opacity: .92 }}>
                Upgrade to a faster Unifi plan today. Our dealer team can arrange same-day processing.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setModal(true)} style={{
                  border: 0, cursor: "pointer", background: "#fff", color: "var(--unifi-orange-600)",
                  padding: "13px 28px", borderRadius: 999,
                  fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
                  display: "inline-flex", alignItems: "center", gap: 9,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
                }}>
                  Upgrade My Plan
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <button onClick={() => openWA("upgrade")} style={{
                  border: "2px solid rgba(255,255,255,0.7)", cursor: "pointer",
                  background: "transparent", color: "#fff",
                  padding: "13px 28px", borderRadius: 999,
                  fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
                }}>
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer onEnquire={() => setModal(true)}/>
      <EnquiryModal open={modal} prefillPlan={null} onClose={() => setModal(false)}/>
      <Chatbot/>
    </>
  );
}
