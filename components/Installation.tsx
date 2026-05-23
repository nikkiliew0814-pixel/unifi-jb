"use client";
import React from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/assets/installer1.png", caption: "Survey · Taman Johor Bahru" },
  { src: "/assets/installer2.png", caption: "Cabinet · Bandar Baru JB" },
  { src: "/assets/installer3.png", caption: "Router Setup · Taman Universiti" },
  { src: "/assets/installer4.png", caption: "Final Walkthrough · Skudai" },
];

export default function Installation() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 48, position: "relative", zIndex: 1 }}>
      <div className="container">
        <div style={{
          background: "#fff", borderRadius: 32, padding: "40px 36px",
          border: "1px solid var(--ink-200)", boxShadow: "var(--shadow-card)",
        }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div className="section-label">OUR INSTALLATION WORKS</div>
            <h2 className="section-title">Professional installation you can trust.</h2>
          </div>

          {/* Photo grid + trust card */}
          <div className="inst-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {PHOTOS.map((img, i) => (
              <figure key={i} style={{
                margin: 0, position: "relative", aspectRatio: "4/5",
                borderRadius: 18, overflow: "hidden",
                boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
                border: "1px solid var(--ink-200)", background: "#F8FAFC",
              }}>
                <Image src={img.src} alt={img.caption} fill style={{ objectFit: "cover" }}/>
                <figcaption style={{
                  position: "absolute", left: 10, bottom: 10,
                  background: "rgba(15,23,42,0.72)", backdropFilter: "blur(8px)",
                  color: "#fff", fontSize: 11, fontWeight: 600,
                  padding: "5px 10px", borderRadius: 999, letterSpacing: "0.04em",
                }}>{img.caption}</figcaption>
              </figure>
            ))}

            {/* Trust card — 5th column */}
            <div style={{
              background: "linear-gradient(180deg, var(--cream) 0%, #fff 100%)",
              borderRadius: 18, padding: 18,
              border: "1px solid rgba(245,230,211,0.9)",
              aspectRatio: "4/5", display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #fff, #FDE6CD 65%, #F97316)", flexShrink: 0, boxShadow: "0 4px 10px rgba(249,115,22,0.25)" }}/>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "var(--navy)", lineHeight: 1.2 }}>
                  Why families choose us
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
                {["TM Authorised Dealer", "Certified Technicians", "Neat & Professional", "Safe & Reliable", "100% Satisfaction"].map(item => (
                  <li key={item} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: 11.5, color: "var(--ink-700)", fontWeight: 500, lineHeight: 1.25 }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.5} strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/60167482254" target="_blank" rel="noopener" style={{
                marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "10px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700,
                background: "linear-gradient(135deg, #FB923C, #F26F22)", color: "#fff",
                boxShadow: "0 6px 16px rgba(249,115,22,0.30)",
              }}>
                Enquire Now
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .inst-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 720px)  { .inst-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
