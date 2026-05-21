"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import EnquiryModal from "@/components/EnquiryModal";

const NEWS = [
  {
    tag: "Satellite Internet",
    emoji: "🛸",
    date: "May 2026",
    title: "SpaceX Starlink Now Available in Malaysia — Should You Switch?",
    excerpt:
      "SpaceX Starlink has officially launched residential service in Malaysia at RM220/month. But is satellite internet a viable alternative to Unifi fibre for JB households? We break down the key differences.",
    body: `Starlink uses Low Earth Orbit (LEO) satellites to deliver internet anywhere in Malaysia, making it revolutionary for rural and remote areas. However, for urban Johor Bahru residents already covered by Unifi fibre, the comparison favours fibre:\n\n**Latency:** Unifi fibre delivers 5–10ms ping. Starlink achieves 20–40ms. For gaming and video calls, lower latency is critical.\n\n**Speed:** Starlink delivers 50–250Mbps in practice. Unifi delivers a consistent 100Mbps–2Gbps depending on your plan.\n\n**Cost:** Starlink starts at RM220/month + RM1,500 hardware. Unifi starts at RM89/month with free installation.\n\n**Verdict:** For Johor Bahru homes with Unifi coverage, fibre remains the superior choice. Starlink shines in areas without fibre infrastructure.`,
    readMin: 4,
    accent: "#6366F1",
  },
  {
    tag: "Unifi Plans",
    emoji: "📡",
    date: "Apr 2026",
    title: "Unifi 2025–2026 Plan Updates: What's New for Johor Bahru Subscribers",
    excerpt:
      "TM Unifi has refreshed its home broadband lineup, introducing Wi-Fi 7 routers for 500Mbps+ plans and a new 2Gbps tier. Here's what current and new subscribers need to know.",
    body: `TM's latest plan refresh brings several improvements for Malaysian homes:\n\n**Wi-Fi 7 for Higher Plans:** The 1Gbps and 2Gbps plans now include a Wi-Fi 7 router (previously Wi-Fi 6), enabling theoretical speeds of up to 46Gbps on your local network.\n\n**2Gbps Tier:** A new 2Gbps plan at RM319/month targets households with 10+ devices, smart home setups, and WFH professionals needing maximum bandwidth.\n\n**3 Months Free Promotion:** New registrations across all plans qualify for 3 months of free subscription — effectively reducing the 24-month commitment cost significantly.\n\n**Switch & Save:** TM is actively offering 6 months free for subscribers switching from Maxis, CelcomDigi, or TIME fibre.`,
    readMin: 3,
    accent: "#F26F22",
  },
  {
    tag: "Technology",
    emoji: "⚡",
    date: "Mar 2026",
    title: "Wi-Fi 7 Explained: Do Malaysian Homes Really Need It?",
    excerpt:
      "Wi-Fi 7 (802.11be) is here, promising 46Gbps theoretical speeds and ultra-low latency. But does it matter for a typical Malaysian family with Netflix, TikTok, and a few smartphones?",
    body: `Wi-Fi 7 represents a genuine leap in home networking. Here's what it means in practice:\n\n**Speed:** Wi-Fi 7 supports up to 46Gbps (vs. 9.6Gbps for Wi-Fi 6). In real-world use, you'll see 2–5× faster speeds on compatible devices.\n\n**Multi-Link Operation (MLO):** Devices can connect across multiple frequency bands simultaneously, eliminating the usual drop when moving around your home.\n\n**Latency:** Wi-Fi 7 reduces latency to as low as 1ms — critical for cloud gaming, AR/VR, and professional video calls.\n\n**Do you need it?** If you have 4–6 devices: Wi-Fi 6 is still excellent. If you have 10+ devices or gaming + streaming simultaneously: Wi-Fi 7 makes a noticeable difference. Our 1Gbps and 2Gbps plans now include Wi-Fi 7 routers.`,
    readMin: 5,
    accent: "#3838E0",
  },
  {
    tag: "5G vs Fibre",
    emoji: "📶",
    date: "Feb 2026",
    title: "5G Home Broadband vs Unifi Fibre: Which is Better for JB Families?",
    excerpt:
      "With Maxis, Celcom, and Digi rolling out 5G home broadband, many Johor Bahru families are asking: should we switch from Unifi fibre? Here's an honest comparison.",
    body: `5G home broadband is gaining traction, but there are important trade-offs:\n\n**Reliability:** Fibre is a physical connection — not affected by weather, building materials, or tower congestion. 5G signal quality varies by location.\n\n**Speed:** 5G home broadband delivers 100–500Mbps in urban areas. Unifi delivers consistent 100Mbps–2Gbps. During peak hours, 5G towers get congested; fibre doesn't.\n\n**Latency:** Fibre: 5–10ms. 5G: 15–30ms. Fibre wins for gaming and video calls.\n\n**Cost:** 5G home plans range from RM99–RM199/month. Unifi offers comparable speeds starting from RM89/month.\n\n**Verdict:** For Johor Bahru families who need reliable, high-speed internet for WFH, streaming, and gaming — Unifi fibre remains the gold standard. 5G is best as a backup or for those without fibre coverage.`,
    readMin: 6,
    accent: "#1FA971",
  },
  {
    tag: "Smart Home",
    emoji: "🏠",
    date: "Jan 2026",
    title: "How Much Internet Speed Does a Malaysian Smart Home Need?",
    excerpt:
      "Smart TVs, security cameras, smart speakers, robot vacuums — modern Malaysian homes are getting smarter. But are you on the right broadband plan to support it all?",
    body: `Smart home devices consume more bandwidth than most people realise. Here's a breakdown:\n\n**Smart TVs:** 4K streaming requires 25Mbps per TV. If you have 2 TVs running simultaneously: 50Mbps minimum.\n\n**Security Cameras:** Each 1080p IP camera uses 1–4Mbps. 4 cameras = up to 16Mbps continuous upload.\n\n**Smart Speakers & Displays:** 1–5Mbps for voice commands and video calls.\n\n**Gaming Consoles:** 25–100Mbps for stable online gaming, downloads included.\n\n**Total recommendation for a smart home:**\n- 5–8 smart devices: 300Mbps plan\n- 10–15 smart devices: 500Mbps plan  \n- 15+ devices: 1Gbps plan\n\nOur dealer team can assess your specific setup and recommend the right plan.`,
    readMin: 4,
    accent: "#F38CC6",
  },
  {
    tag: "Fibre Guide",
    emoji: "💡",
    date: "Dec 2025",
    title: "First Time Applying for Unifi? Complete Guide for New Subscribers",
    excerpt:
      "Never signed up for Unifi before? This step-by-step guide covers everything from coverage check to installation day — specifically for Johor Bahru residents.",
    body: `Getting started with Unifi is simpler than you think. Here's the complete journey:\n\n**Step 1: Check Coverage**\nUse our coverage checker or TM's official portal to verify Unifi is available at your address.\n\n**Step 2: Choose Your Plan**\n- 100Mbps (RM89/mth): 1-4 people, basic streaming\n- 300Mbps (RM129/mth): 4-6 people, WFH-friendly\n- 500Mbps (RM149/mth): Most popular, handles everything\n- 1Gbps+ (RM249/mth): Power users, big families\n\n**Step 3: Register Through Our Dealer**\nSubmit your IC number, address, and contact details. No upfront payment at registration.\n\n**Step 4: Installation Day**\nTM's technician arrives at your scheduled slot (1–2 hour window). They install the ONT (fibre box) and Wi-Fi router. The whole process takes 2–4 hours.\n\n**Step 5: Pay RM100 Advance**\nWithin 10 days of installation, pay your first month in advance. Your RM200 deposit goes to TM directly.`,
    readMin: 7,
    accent: "#F26F22",
  },
];

export default function NewsClient() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Navbar/>
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#FFFAF3" }}>
        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #0A0E26 0%, #0B1432 60%, #1F1F8F 100%)",
          padding: "60px 0 50px", position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden style={{
            position: "absolute", top: 0, right: "-10%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }}/>
          <div className="container" style={{ position: "relative" }}>
            <span style={{
              display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: ".14em",
              textTransform: "uppercase", color: "#FB923C",
              padding: "5px 14px", borderRadius: 999,
              background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.25)",
              marginBottom: 18,
            }}>Broadband News & Guides</span>
            <h1 style={{ margin: "0 0 14px", fontSize: "clamp(34px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
              Stay Ahead in the<br/>Connected World
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.78)", maxWidth: 520, margin: 0, lineHeight: 1.55 }}>
              Starlink, 5G, Wi-Fi 7, Unifi updates — everything you need to make the right broadband decision.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section style={{ padding: "50px 0 70px" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
              {NEWS.map((article, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 24, overflow: "hidden",
                  boxShadow: "0 8px 28px rgba(11,14,44,0.07)",
                  border: "1px solid rgba(11,14,44,0.06)",
                  display: "flex", flexDirection: "column",
                  transition: "transform .25s, box-shadow .25s",
                }}>
                  {/* Color accent bar */}
                  <div style={{ height: 5, background: article.accent }}/>

                  <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Meta */}
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontSize: 22 }}>{article.emoji}</span>
                      <span style={{
                        padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 800,
                        letterSpacing: ".08em", textTransform: "uppercase",
                        background: `${article.accent}18`, color: article.accent,
                        border: `1px solid ${article.accent}30`,
                      }}>{article.tag}</span>
                      <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-500)", fontWeight: 600 }}>{article.date}</span>
                    </div>

                    <h2 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--ink-900)" }}>
                      {article.title}
                    </h2>
                    <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--ink-700)", lineHeight: 1.6, flex: 1 }}>
                      {article.excerpt}
                    </p>

                    {/* Expanded body */}
                    {expanded === i && (
                      <div style={{
                        background: "var(--ink-50)", borderRadius: 14, padding: "16px 18px",
                        fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.7,
                        marginBottom: 14, whiteSpace: "pre-line",
                      }}>
                        {article.body.replace(/\*\*(.*?)\*\*/g, "$1")}
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <button onClick={() => setExpanded(expanded === i ? null : i)} style={{
                        border: 0, cursor: "pointer", background: "transparent", padding: 0,
                        fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 700,
                        color: article.accent,
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        {expanded === i ? "Show less" : `Read full article`}
                        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"
                          style={{ transform: expanded === i ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                      <span style={{ fontSize: 12, color: "var(--ink-400)", fontWeight: 500 }}>
                        {article.readMin} min read
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div style={{
              marginTop: 48, borderRadius: 24, padding: "44px 36px", textAlign: "center",
              background: "linear-gradient(135deg, #1F1F8F 0%, #3838E0 60%, #8B8BEF 100%)",
              color: "#fff", boxShadow: "0 20px 60px rgba(56,56,224,0.30)",
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: .85, marginBottom: 10 }}>
                Ready to upgrade?
              </div>
              <h3 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>
                Get the fastest Unifi plan for your home
              </h3>
              <p style={{ margin: "0 auto 26px", fontSize: 15, opacity: .88, maxWidth: 440, lineHeight: 1.55 }}>
                Our dealer team is available 7 days a week. Same-day processing, free installation.
              </p>
              <button onClick={() => setModal(true)} style={{
                border: 0, cursor: "pointer", background: "#fff", color: "var(--unifi-blue-500)",
                padding: "14px 32px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
              }}>
                Register Now — It's Free
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
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
