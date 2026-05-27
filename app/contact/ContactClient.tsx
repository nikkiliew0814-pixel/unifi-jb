"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import EnquiryModal from "@/components/EnquiryModal";
import { WA_DISPLAY, waLink } from "@/lib/whatsapp";

const ADDRESS = "117A, Jalan Harmonium 35/1, Taman Desa Tebrau, 81100 Johor Bahru, Johor";
const MAPS_EMBED = "https://maps.google.com/maps?q=117A+Jalan+Harmonium+35%2F1+Taman+Desa+Tebrau+81100+Johor+Bahru+Johor&output=embed&hl=en";
const MAPS_LINK  = "https://maps.google.com/maps?q=117A+Jalan+Harmonium+35%2F1+Taman+Desa+Tebrau+81100+Johor+Bahru+Johor";

export default function ContactClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 80, minHeight: "100vh", background: "var(--cream)" }}>
        <div className="container" style={{ maxWidth: 1000 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div className="section-label">HUBUNGI KAMI</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 44px)", color: "var(--navy)",
              letterSpacing: "-0.02em", margin: "8px 0 10px",
            }}>
              Come Visit Us
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink-500)", margin: 0, maxWidth: 480 }}>
              We're a real office with a real team — walk in or WhatsApp us anytime.
            </p>
          </div>

          {/* Main grid */}
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, alignItems: "start" }}>

            {/* Map */}
            <div style={{
              borderRadius: 24, overflow: "hidden",
              border: "1.5px solid rgba(15,23,42,0.08)",
              boxShadow: "0 8px 32px rgba(15,23,42,0.08)",
              aspectRatio: "4/3", position: "relative", background: "#e8eaf0",
            }}>
              <iframe
                src={MAPS_EMBED}
                width="100%" height="100%"
                style={{ border: 0, display: "block", position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Unifi JB Office Location"
              />
            </div>

            {/* Info card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Address */}
              <div style={{
                background: "#fff", borderRadius: 20, padding: "22px 24px",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: "linear-gradient(135deg,#FB923C,#F26F22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx={12} cy={10} r={3}/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 5 }}>Our Office</div>
                    <p style={{ margin: "0 0 10px", fontSize: 14, color: "var(--ink-900)", fontWeight: 600, lineHeight: 1.5 }}>{ADDRESS}</p>
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 12.5, fontWeight: 700, color: "var(--indigo)",
                      textDecoration: "none",
                    }}>
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{
                background: "#fff", borderRadius: 20, padding: "22px 24px",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 2px 16px rgba(15,23,42,0.05)",
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: "linear-gradient(135deg,#FB923C,#F26F22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
                      <circle cx={12} cy={12} r={10}/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 }}>Operating Hours</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-900)" }}>Isnin – Jumaat</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>9:00am – 6:00pm</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-500)" }}>Sabtu – Ahad</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-400)" }}>Tutup</span>
                    </div>
                    <div style={{
                      marginTop: 12, padding: "8px 12px", borderRadius: 10,
                      background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)",
                      fontSize: 12, color: "#0F6E45", fontWeight: 600,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block" }}/>
                      WhatsApp kami 7 hari seminggu
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={waLink("new")} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                padding: "16px 24px", borderRadius: 999,
                background: "linear-gradient(135deg,#25D366,#1eb95a)",
                color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 16,
                boxShadow: "0 10px 32px rgba(37,211,102,0.40)",
                textDecoration: "none", transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 14px 40px rgba(37,211,102,0.50)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 32px rgba(37,211,102,0.40)"; }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp {WA_DISPLAY}
              </a>

              {/* Register CTA */}
              <button onClick={() => setModalOpen(true)} style={{
                border: 0, cursor: "pointer",
                padding: "14px 24px", borderRadius: 999,
                background: "linear-gradient(135deg,#6366F1,var(--indigo))",
                color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
                boxShadow: "0 8px 24px rgba(67,56,202,0.30)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                Daftar Unifi Sekarang
              </button>

            </div>
          </div>

        </div>
      </main>

      <Footer onEnquire={() => setModalOpen(true)} />
      <Chatbot />
      <EnquiryModal open={modalOpen} prefillPlan={null} onClose={() => setModalOpen(false)} />

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
