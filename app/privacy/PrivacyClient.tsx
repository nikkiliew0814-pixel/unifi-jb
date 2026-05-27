"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import EnquiryModal from "@/components/EnquiryModal";
import { WA_DISPLAY } from "@/lib/whatsapp";

const SECTIONS = [
  {
    num: "1",
    title: "Data Controller & Contact Information",
    content: (
      <>
        <p>We are a registered business in Malaysia (<strong>SSM Reg No: 202101036094</strong>). If you have any questions regarding your personal data, you may contact our Data Protection Officer:</p>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column" as const, gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2} strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <a href="mailto:nikkiliew0814@gmail.com" style={{ color: "var(--indigo)", fontWeight: 600, fontSize: 14 }}>nikkiliew0814@gmail.com</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2} strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.21 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </span>
            <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-900)" }}>{WA_DISPLAY}</span>
          </div>
        </div>
      </>
    ),
  },
  {
    num: "2",
    title: "Information We Collect",
    content: (
      <>
        <p>When you use our registration forms, we collect the following personal data:</p>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {[
            { label: "Identity Data", desc: "Full name (required for TM Unifi subscription)." },
            { label: "Contact Data", desc: "Phone number, email address, and installation address." },
            { label: "Technical Data", desc: "IP address, browser type, and usage data via cookies to improve your experience." },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.5} strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.55 }}><strong style={{ color: "var(--ink-900)" }}>{label}:</strong> {desc}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    num: "3",
    title: "How We Use Your Data",
    content: (
      <>
        <p>We use your information strictly for the following purposes:</p>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {[
            { label: "Service Registration", desc: "To process your application for Unifi broadband services with Telekom Malaysia (TM)." },
            { label: "Verification", desc: "To check service coverage at your provided address." },
            { label: "Communication", desc: "To contact you regarding your application status or installation appointments." },
            { label: "Legal Compliance", desc: "To comply with Malaysian laws and Google Ads transparency policies." },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={2.5} strokeLinecap="round" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
              <span style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.55 }}><strong style={{ color: "var(--ink-900)" }}>{label}:</strong> {desc}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    num: "4",
    title: "Disclosure to Third Parties (Telekom Malaysia)",
    content: (
      <p>As an Authorised Reseller, we do not own the Unifi service. By submitting your information, you acknowledge and consent that your data will be shared with <strong>Telekom Malaysia (TM)</strong> for the sole purpose of activating your broadband subscription. We do not sell or rent your personal data to any other third-party marketers.</p>
    ),
  },
  {
    num: "5",
    title: "Data Retention",
    content: (
      <p>We retain your personal data only as long as necessary to fulfill the registration process and for legal or audit purposes required by TM or Malaysian law.</p>
    ),
  },
];

export default function PrivacyClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, paddingBottom: 80, minHeight: "100vh", background: "var(--cream)" }}>
        <div className="container" style={{ maxWidth: 760 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div className="section-label" style={{ marginBottom: 10 }}>Legal</div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 42px)", color: "var(--navy)",
              letterSpacing: "-0.02em", margin: "0 0 12px",
            }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-500)", margin: 0 }}>
              Last updated: May 2026 · Effective immediately
            </p>
          </div>

          {/* Intro card */}
          <div style={{
            background: "#fff", borderRadius: 20, padding: "22px 26px",
            border: "1.5px solid rgba(249,115,22,0.15)",
            boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
            marginBottom: 28,
          }}>
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--ink-700)", lineHeight: 1.7 }}>
              This Privacy Policy describes how{" "}
              <strong style={{ color: "var(--navy)" }}>TITAN GROUP CORPORATE SDN. BHD.</strong>,
              an Authorized Reseller of Telekom Malaysia (TM) Unifi, collects, uses, and discloses
              your personal information when you visit{" "}
              <strong>pasangunifi.com</strong> or use our services to register for Unifi Fibre.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {SECTIONS.map((sec) => (
              <div key={sec.num} style={{
                background: "#fff", borderRadius: 20, padding: "24px 28px",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 2px 12px rgba(15,23,42,0.04)",
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: "linear-gradient(135deg, #FB923C, #F26F22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "#fff",
                  }}>
                    {sec.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
                      color: "var(--navy)", margin: "0 0 12px", letterSpacing: "-0.01em",
                    }}>
                      {sec.title}
                    </h2>
                    <div style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.7 }}>
                      {sec.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 32, padding: "18px 22px", borderRadius: 14,
            background: "rgba(67,56,202,0.05)", border: "1px solid rgba(67,56,202,0.12)",
          }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-500)", lineHeight: 1.6 }}>
              By using this website or submitting our registration form, you consent to the collection and use of your information as described in this Privacy Policy. For questions, contact us at{" "}
              <a href="mailto:nikkiliew0814@gmail.com" style={{ color: "var(--indigo)", fontWeight: 600 }}>nikkiliew0814@gmail.com</a>.
            </p>
          </div>

        </div>
      </main>

      <Footer onEnquire={() => setModalOpen(true)} />
      <Chatbot />
      <EnquiryModal open={modalOpen} prefillPlan={null} onClose={() => setModalOpen(false)} />
    </>
  );
}
