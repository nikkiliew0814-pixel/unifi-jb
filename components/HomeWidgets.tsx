"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import type { Lang } from "@/lib/i18n";

/* ─── translations ─────────────────────────────────────── */
const WT: Record<Lang, {
  speedTitle: string; speedSub: string; speedCta: string;
  newsTitle: string; newsView: string;
  faqTitle: string; faqSub: string; waHelp: string;
}> = {
  ENG: {
    speedTitle: "Check Your Internet Speed",
    speedSub: "How fast is your current connection?",
    speedCta: "Start Speed Test",
    newsTitle: "Latest News",
    newsView: "View All News",
    faqTitle: "Frequently Asked",
    faqSub: "Quick answers. Anything else, WhatsApp us.",
    waHelp: "Need help? WhatsApp us",
  },
  BM: {
    speedTitle: "Semak Kelajuan Internet Anda",
    speedSub: "Berapa laju sambungan anda sekarang?",
    speedCta: "Mula Speed Test",
    newsTitle: "Berita Terkini",
    newsView: "Lihat Semua",
    faqTitle: "Soalan Lazim",
    faqSub: "Jawapan pantas. Lain-lain, WhatsApp kami.",
    waHelp: "Perlukan bantuan? WhatsApp kami",
  },
  "中文": {
    speedTitle: "测试您的网速",
    speedSub: "您目前的网速有多快？",
    speedCta: "开始测速",
    newsTitle: "最新消息",
    newsView: "查看全部",
    faqTitle: "常见问题",
    faqSub: "快速解答。其他问题请 WhatsApp 我们。",
    waHelp: "需要帮助？WhatsApp 我们",
  },
};

/* ─── news data ────────────────────────────────────────── */
const NEWS = [
  { tag: "ANNOUNCEMENT", title: "2Gbps tier now available nationwide", date: "22 May 2026", color: "#4338CA" },
  { tag: "TIPS",         title: "How to improve Wi-Fi coverage at home", date: "08 May 2026", color: "#F97316" },
  { tag: "COMPARE",      title: "Comparing fibre providers in 2026",     date: "05 May 2026", color: "#0F172A" },
];

/* ─── FAQ data (3-language) ────────────────────────────── */
const FAQS: Record<Lang, { q: string; a: string }[]> = {
  ENG: [
    { q: "How long does fibre installation take?", a: "Standard installation usually completes within 3 to 5 working days after coverage confirmation." },
    { q: "Do I need to pay anything upfront?", a: "No upfront installation fee for most plans. A RM100 advance may apply for new fibre home registrations, refunded after install." },
    { q: "Is fibre available for my area?", a: "Fill in the coverage form above and we'll check the live map for you — usually within 1 working hour." },
    { q: "Can I switch from Maxis / TIME / CelcomDigi?", a: "Yes. We help you port over and you can claim up to 6 months free subscription as part of our switch campaign." },
    { q: "Is there a contract lock-in period?", a: "Contracts range from 24 to 36 months depending on the package and free gifts. The 2Gbps+ entry plan is 24 months only." },
  ],
  BM: [
    { q: "Berapa lama masa pemasangan fiber?", a: "Pemasangan standard biasanya selesai dalam 3 hingga 5 hari bekerja selepas pengesahan liputan." },
    { q: "Adakah saya perlu bayar sebarang yuran pendahuluan?", a: "Tiada yuran pemasangan untuk kebanyakan pakej. Deposit RM100 mungkin dikenakan untuk pendaftaran rumah baru, dibayar balik selepas pemasangan." },
    { q: "Adakah fiber tersedia di kawasan saya?", a: "Isi borang liputan di atas dan kami akan semak peta liputan langsung untuk anda — biasanya dalam 1 jam bekerja." },
    { q: "Boleh saya tukar dari Maxis / TIME / Digi?", a: "Boleh. Kami bantu anda berpindah dan anda boleh dapatkan sehingga 6 bulan langganan percuma." },
    { q: "Adakah tempoh kontrak?", a: "Kontrak adalah 24 hingga 36 bulan bergantung pada pakej. Pakej 2Gbps+ permulaan adalah 24 bulan sahaja." },
  ],
  "中文": [
    { q: "光纤安装需要多长时间？", a: "在确认覆盖范围后，标准安装通常在 3 至 5 个工作日内完成。" },
    { q: "我需要预付任何费用吗？", a: "大多数配套无需预付安装费。新光纤住宅可能需 RM100 押金，安装后退还。" },
    { q: "我的地区有光纤服务吗？", a: "填写上方覆盖表单，我们会在 1 个工作小时内为您查询。" },
    { q: "可以从 Maxis / TIME / Digi 转过来吗？", a: "可以。我们协助您转网，您可享高达 6 个月免费订阅。" },
    { q: "是否有合约锁定期？", a: "合约根据配套为 24 至 36 个月。2Gbps+ 入门配套为 24 个月。" },
  ],
};

/* ══════════════════════════════════════════════════════════
   SPEED GAUGE — 270° arc, 135→405°
══════════════════════════════════════════════════════════ */
function SpeedGauge() {
  const [val, setVal] = useState(0);
  const [testing, setTesting] = useState(false);

  async function runTest() {
    if (testing) return;
    setTesting(true);
    setVal(0);

    // Animate counter while fetching
    let animated = 0;
    const iv = setInterval(() => {
      animated += (400 - animated) * 0.08 + Math.random() * 6 - 3;
      setVal(parseFloat(animated.toFixed(1)));
    }, 60);

    try {
      const t0 = performance.now();
      const res = await fetch("https://speed.cloudflare.com/__down?bytes=10000000", { cache: "no-store" });
      const blob = await res.blob();
      const t1 = performance.now();
      const mbps = (blob.size * 8) / ((t1 - t0) / 1000) / 1_000_000;
      clearInterval(iv);
      setVal(parseFloat(mbps.toFixed(1)));
    } catch {
      clearInterval(iv);
      setVal(0);
    } finally {
      setTesting(false);
    }
  }

  const size = 210;
  const cx = size / 2, cy = size / 2, r = 82;
  const startAngle = 135, endAngle = 405, sweep = 270;
  const pct = Math.min(val / 1000, 1);

  function polar(angleDeg: number): [number, number] {
    const a = (angleDeg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }

  const [sx, sy] = polar(startAngle);
  const [ex, ey] = polar(endAngle);
  const valAngle = startAngle + sweep * pct;
  const [vx, vy] = polar(valAngle);

  const statusLabel = testing ? "Measuring…" : val === 0 ? "Press Start" : val > 300 ? "Excellent" : val > 100 ? "Good" : val > 30 ? "Decent" : "Slow";
  const statusColor = testing ? "#F97316" : val === 0 ? "#94A3B8" : val > 300 ? "#22C55E" : val > 100 ? "#84CC16" : val > 30 ? "#EAB308" : "#EF4444";
  const statusBg   = testing ? "rgba(249,115,22,0.1)" : val === 0 ? "#F1F5F9" : val > 300 ? "#DCFCE7" : val > 100 ? "#F7FEE7" : val > 30 ? "#FEFCE8" : "#FEE2E2";

  const labels = [
    { v: "0",    a: 135 }, { v: "100",  a: 175 }, { v: "300",  a: 228 },
    { v: "500",  a: 270 }, { v: "800",  a: 337 }, { v: "1000+", a: 400 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          <defs>
            <linearGradient id="spd-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDBA74"/>
              <stop offset="60%" stopColor="#F97316"/>
              <stop offset="100%" stopColor="#C2410C"/>
            </linearGradient>
            <pattern id="dot-pat" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#FDBA74"/>
            </pattern>
          </defs>

          {/* base arc (270°, large-arc = 1) */}
          <path d={`M ${sx} ${sy} A ${r} ${r} 0 1 1 ${ex} ${ey}`}
            fill="none" stroke="#FDE6CD" strokeWidth="11" strokeLinecap="round"/>

          {/* fill arc */}
          {pct > 0 && (
            <path
              d={`M ${sx} ${sy} A ${r} ${r} 0 ${pct > 0.5 ? 1 : 0} 1 ${vx} ${vy}`}
              fill="none" stroke="url(#spd-fill)" strokeWidth="11" strokeLinecap="round"
              style={{ filter: "drop-shadow(0 4px 10px rgba(249,115,22,0.4))", transition: "all .3s ease" }}
            />
          )}

          {/* dotted center */}
          <circle cx={cx} cy={cy} r="48" fill="url(#dot-pat)" opacity="0.5"/>

          {/* arc labels */}
          {labels.map(l => {
            const a = (l.a - 90) * Math.PI / 180;
            const tx = cx + (r + 20) * Math.cos(a);
            const ty = cy + (r + 20) * Math.sin(a);
            return (
              <text key={l.v} x={tx} y={ty} fontFamily="system-ui" fontSize="8.5" fontWeight="600"
                fill="#64748B" textAnchor="middle" dy="3">
                {l.v}
              </text>
            );
          })}
        </svg>

        {/* center readout */}
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "var(--navy)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {val.toFixed(1)}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, letterSpacing: "0.06em", marginTop: 2 }}>Mbps</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5, marginTop: 6,
              fontSize: 10, fontWeight: 700, color: statusColor,
              background: statusBg, padding: "2px 8px", borderRadius: 999,
              transition: "all .3s",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor }}/>
              {statusLabel}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 2 }}>
        <button onClick={runTest} disabled={testing} style={{
          padding: "12px 28px", borderRadius: 999, border: 0,
          cursor: testing ? "default" : "pointer",
          background: testing ? "#E5E7EB" : "linear-gradient(135deg,#FB923C,#F26F22)",
          color: testing ? "#9CA3AF" : "#fff",
          fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: testing ? "none" : "0 8px 20px rgba(249,115,22,0.30)",
          transition: "all .25s",
        }}>
          {testing ? "Testing…" : "Start Speed Test"}
          {!testing && (
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
              <line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/>
            </svg>
          )}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--ink-500)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Secure
          </span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-300)" }}/>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Real-time
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function HomeWidgets() {
  const { lang } = useLang();
  const tw = WT[lang] ?? WT.ENG;
  const faqs = FAQS[lang] ?? FAQS.ENG;
  const [openFaq, setOpenFaq] = useState(0);

  const WA_NUM = process.env.NEXT_PUBLIC_WA_NUMBER ?? "60167482254";

  return (
    <section style={{ paddingTop: 0, paddingBottom: 48, position: "relative", zIndex: 1 }}>
      <div className="container">
        <div className="snf-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.2fr",
          gap: 20, alignItems: "stretch",
        }}>

          {/* ── SPEED TEST ─────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 28, padding: "28px 26px",
            border: "1px solid var(--ink-200)", boxShadow: "var(--shadow-card)",
            display: "flex", flexDirection: "column",
          }}>
            <div className="section-label">SPEEDTEST</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--navy)", margin: "8px 0 4px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {tw.speedTitle}
            </h3>
            <p style={{ color: "var(--ink-500)", margin: "0 0 10px", fontSize: 13 }}>{tw.speedSub}</p>

            <div style={{ display: "grid", placeItems: "center", marginTop: "auto" }}>
              <SpeedGauge/>
            </div>
          </div>

          {/* ── LATEST NEWS ─────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 28, padding: "28px 26px",
            border: "1px solid var(--ink-200)", boxShadow: "var(--shadow-card)",
            display: "flex", flexDirection: "column",
          }}>
            <div className="section-label">NEWS</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, marginBottom: 14 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--navy)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {tw.newsTitle}
              </h3>
              <Link href="/news" style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)", display: "inline-flex", alignItems: "center", gap: 3 }}>
                {tw.newsView}
                <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {NEWS.map((n, i) => (
                <Link key={i} href="/news" style={{
                  display: "grid", gridTemplateColumns: "72px 1fr", gap: 12,
                  padding: "12px 0",
                  borderTop: "1px solid var(--ink-200)",
                  textDecoration: "none", transition: "background .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--cream)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  {/* colored thumbnail */}
                  <div style={{
                    aspectRatio: "1/1", borderRadius: 10,
                    background: `linear-gradient(135deg, ${n.color}, ${n.color}99)`,
                    position: "relative", overflow: "hidden",
                    display: "grid", placeItems: "center",
                  }}>
                    <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.12em", color: "#fff", padding: "0 5px", textAlign: "center", opacity: 0.92, lineHeight: 1.2 }}>
                      {n.tag}
                    </div>
                    {/* dot pattern overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1.5px)",
                      backgroundSize: "8px 8px",
                    }}/>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13.5, color: "var(--navy)", lineHeight: 1.3 }}>
                      {n.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--ink-500)", marginTop: 6 }}>
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {n.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/news" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginTop: 14, padding: "10px 12px",
              background: "var(--cream)", borderRadius: 12,
              fontSize: 12, fontWeight: 600, color: "var(--navy)", textDecoration: "none",
            }}>
              View All Updates
              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          {/* ── FAQ ─────────────────────────────────── */}
          <div style={{
            background: "#fff", borderRadius: 28, padding: "28px 26px",
            border: "1px solid var(--ink-200)", boxShadow: "var(--shadow-card)",
            display: "flex", flexDirection: "column",
          }}>
            <div className="section-label">FAQ</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--navy)", margin: "8px 0 4px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {tw.faqTitle}
            </h3>
            <p style={{ color: "var(--ink-500)", fontSize: 13, lineHeight: 1.5, margin: "0 0 8px" }}>{tw.faqSub}</p>

            <div style={{ flex: 1 }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderTop: "1px solid var(--ink-200)", padding: "12px 0" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                    background: "none", border: 0, cursor: "pointer",
                    textAlign: "left", color: "var(--navy)",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13.5, lineHeight: 1.35,
                  }}>
                    {f.q}
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: openFaq === i ? "var(--orange)" : "rgba(249,115,22,0.10)",
                      color: openFaq === i ? "#fff" : "var(--orange)",
                      display: "grid", placeItems: "center",
                      transition: "all .2s ease",
                      fontSize: 16, fontWeight: 700,
                    }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height .35s ease, opacity .25s ease",
                    opacity: openFaq === i ? 1 : 0,
                    paddingTop: openFaq === i ? 8 : 0,
                  }}>
                    <p style={{ margin: 0, color: "var(--ink-500)", fontSize: 13, lineHeight: 1.6 }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a href={`https://wa.me/${WA_NUM}?text=${encodeURIComponent("Hi, I have a question about Unifi.")}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                marginTop: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "12px 16px",
                background: "rgba(249,115,22,0.07)", borderRadius: 14,
                color: "#C2410C", fontSize: 13, fontWeight: 700,
                border: "1px solid rgba(249,115,22,0.22)", textDecoration: "none",
              }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="#C2410C">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {tw.waHelp}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1180px) {
          .snf-grid { grid-template-columns: 1fr 1fr !important; }
          .snf-grid > *:nth-child(3) { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .snf-grid { grid-template-columns: 1fr !important; }
          .snf-grid > *:nth-child(3) { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
