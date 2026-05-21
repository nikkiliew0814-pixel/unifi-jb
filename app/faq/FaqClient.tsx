"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import EnquiryModal from "@/components/EnquiryModal";
import { useLang } from "@/lib/LangContext";

interface FaqItem {
  q: { ENG: string; BM: string; "中文": string };
  a: { ENG: string; BM: string; "中文": string };
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: "Speed & Plans",
    q: {
      ENG: "How much Mbps does my household need?",
      BM:  "Berapa Mbps yang diperlukan untuk isi rumah saya?",
      "中文": "家里几个人需要多少Mbps？",
    },
    a: {
      ENG: "1–2 people with light use: 100Mbps is enough. 3–4 people simultaneously streaming Netflix + video calls: 300Mbps recommended. 5+ people or anyone WFH/gaming: 500Mbps or above. A family of 4 needs a minimum of 100Mbps for comfortable daily use.",
      BM:  "1–2 orang penggunaan ringan: 100Mbps sudah mencukupi. 3–4 orang streaming Netflix + video call serentak: 300Mbps disyorkan. 5 orang atau lebih atau ada yang WFH/gaming: 500Mbps atau lebih. Sebuah keluarga 4 orang memerlukan sekurang-kurangnya 100Mbps untuk penggunaan harian yang selesa.",
      "中文": "1-2人轻度使用：100Mbps足够。3-4人同时串流Netflix + 视频通话：建议300Mbps。5人以上或有人WFH/gaming：500Mbps或以上。4口之家舒适日常使用最少需要100Mbps。",
    },
  },
  {
    category: "Speed & Plans",
    q: {
      ENG: "What is the difference between 100Mbps, 300Mbps, 500Mbps and 1Gbps?",
      BM:  "Apa perbezaan antara 100Mbps, 300Mbps, 500Mbps dan 1Gbps?",
      "中文": "100Mbps、300Mbps、500Mbps和1Gbps有什么区别？",
    },
    a: {
      ENG: "100Mbps: Downloads a 1GB file in ~80 seconds. Enough for a small family. 300Mbps: Supports 6 simultaneous 4K streams. Great for WFH. 500Mbps: Best for gaming + streaming + multiple devices. 1Gbps: Ultra-fast for power users, smart homes, or home offices.",
      BM:  "100Mbps: Muat turun fail 1GB dalam ~80 saat. Cukup untuk keluarga kecil. 300Mbps: Menyokong 6 strim 4K serentak. Sesuai untuk WFH. 500Mbps: Terbaik untuk gaming + streaming + banyak peranti. 1Gbps: Ultra-laju untuk pengguna kuasa, rumah pintar, atau pejabat rumah.",
      "中文": "100Mbps：下载1GB文件约80秒，适合小家庭。300Mbps：支持6个同时4K流媒体，适合WFH。500Mbps：最适合游戏+流媒体+多设备。1Gbps：超快速，适合高级用户、智能家庭或家庭办公室。",
    },
  },
  {
    category: "Technology",
    q: {
      ENG: "What is Fibre / Unifi Fibre broadband?",
      BM:  "Apakah Fibre / jalur lebar Unifi Fibre?",
      "中文": "什么是光纤/Unifi光纤宽带？",
    },
    a: {
      ENG: "Fibre transmits data via optical fibre cables — over 10× faster than traditional copper ADSL — with superior stability not affected by distance. Unifi uses FTTH (Fibre to the Home) technology, running the fibre cable directly to your front door.",
      BM:  "Fibre menghantar data melalui kabel serat optik — lebih 10 kali lebih laju daripada ADSL kuprum tradisional — dengan kestabilan yang lebih baik tidak terjejas oleh jarak. Unifi menggunakan teknologi FTTH (Fibre to the Home), menjalankan kabel gentian terus ke pintu depan anda.",
      "中文": "光纤通过光纤电缆传输数据——比传统铜线ADSL快10倍以上——稳定性更高，不受距离影响。Unifi使用FTTH（光纤入户）技术，将光纤电缆直接接入您家门。",
    },
  },
  {
    category: "Technology",
    q: {
      ENG: "What is Wi-Fi 6 and Wi-Fi 7? Do I need it?",
      BM:  "Apakah Wi-Fi 6 dan Wi-Fi 7? Adakah saya memerlukannya?",
      "中文": "什么是Wi-Fi 6和Wi-Fi 7？我需要它吗？",
    },
    a: {
      ENG: "Wi-Fi 6 offers speeds up to 9.6Gbps (vs. Wi-Fi 5's 3.5Gbps), handles more devices simultaneously, and has lower latency. Wi-Fi 7 doubles this with speeds up to 46Gbps. For most families (4–6 devices), Wi-Fi 6 is more than sufficient. Wi-Fi 7 benefits smart homes with 15+ connected devices.",
      BM:  "Wi-Fi 6 menawarkan kelajuan sehingga 9.6Gbps (berbanding 3.5Gbps Wi-Fi 5), mengendalikan lebih banyak peranti serentak dan mempunyai kependaman yang lebih rendah. Wi-Fi 7 menggandakan ini dengan kelajuan sehingga 46Gbps. Untuk kebanyakan keluarga (4–6 peranti), Wi-Fi 6 sudah lebih daripada mencukupi.",
      "中文": "Wi-Fi 6提供高达9.6Gbps的速度（比Wi-Fi 5的3.5Gbps），可同时处理更多设备，延迟更低。Wi-Fi 7速度可达46Gbps。对于大多数家庭（4-6个设备），Wi-Fi 6已经足够。Wi-Fi 7适合拥有15+联网设备的智能家庭。",
    },
  },
  {
    category: "Fees & Pricing",
    q: {
      ENG: "What are the Unifi installation fees?",
      BM:  "Apakah yuran pemasangan Unifi?",
      "中文": "Unifi安装费用是多少？",
    },
    a: {
      ENG: "New users typically pay no installation fee (TM promotion), but require a RM200 deposit (refunded when contract ends). Some plans include a free router. All new Unifi Home registrations require RM100 advance payment within 10 days of installation. Service tax of 6% applies to monthly fees.",
      BM:  "Pengguna baru biasanya tidak membayar yuran pemasangan (promosi TM), tetapi memerlukan deposit RM200 (dikembalikan apabila kontrak tamat). Sesetengah pelan termasuk penghala percuma. Semua pendaftaran Unifi Home baharu memerlukan bayaran pendahuluan RM100 dalam masa 10 hari selepas pemasangan. Cukai perkhidmatan 6% dikenakan ke atas caj bulanan.",
      "中文": "新用户通常免安装费（TM促销），但需缴付RM200押金（合约期满退还）。部分套餐包含免费路由器。所有Unifi Home新注册需在安装完成后10天内支付RM100预付款。月费另加6%服务税。",
    },
  },
  {
    category: "Fees & Pricing",
    q: {
      ENG: "What is the minimum contract period?",
      BM:  "Apakah tempoh kontrak minimum?",
      "中文": "最短合约期限是多久？",
    },
    a: {
      ENG: "The minimum subscription period is 24 months (2 years). Early termination fees apply if you cancel before the contract ends. After the contract period, you can continue month-to-month or renew for another term.",
      BM:  "Tempoh langganan minimum adalah 24 bulan (2 tahun). Yuran penamatan awal dikenakan jika anda membatalkan sebelum kontrak tamat. Selepas tempoh kontrak, anda boleh meneruskan bulan ke bulan atau memperbaharui untuk tempoh lain.",
      "中文": "最短订阅期限为24个月（2年）。合约期前取消将收取提前终止费。合约期满后，您可以按月续签或重新签订合约。",
    },
  },
  {
    category: "Installation",
    q: {
      ENG: "How long does Unifi installation take?",
      BM:  "Berapa lama pemasangan Unifi mengambil masa?",
      "中文": "Unifi安装需要多长时间？",
    },
    a: {
      ENG: "Generally 3–7 working days, depending on area coverage and TM engineer availability. In Johor Bahru city areas, it is usually faster (3–5 days). Our dealer will confirm your exact installation date after application approval.",
      BM:  "Secara amnya 3–7 hari bekerja, bergantung kepada liputan kawasan dan ketersediaan jurutera TM. Di kawasan bandar Johor Bahru, biasanya lebih cepat (3–5 hari). Penjual kami akan mengesahkan tarikh pemasangan tepat anda selepas kelulusan permohonan.",
      "中文": "一般需要3-7个工作日，取决于区域覆盖和TM工程师排期。乔治士宾市区通常更快（3-5天）。申请批准后，我们的经销商将确认您的确切安装日期。",
    },
  },
  {
    category: "Installation",
    q: {
      ENG: "Will Unifi work in my condo / apartment?",
      BM:  "Adakah Unifi berfungsi di kondominium / apartmen saya?",
      "中文": "Unifi在我的公寓/公寓里能用吗？",
    },
    a: {
      ENG: "Yes! Unifi works in most condos and apartments in Malaysia, including high-rises. The TM technician will run the fibre from the building's riser to your unit. Some older buildings may require additional cabling. We handle all coordination with building management.",
      BM:  "Ya! Unifi berfungsi di kebanyakan kondominium dan apartmen di Malaysia, termasuk bangunan tinggi. Jurutera TM akan menjalankan gentian dari riser bangunan ke unit anda. Sesetengah bangunan lama mungkin memerlukan kabel tambahan. Kami mengendalikan semua penyelarasan dengan pengurusan bangunan.",
      "中文": "是的！Unifi适用于马来西亚大多数公寓，包括高层建筑。TM技术员将从楼宇竖管引光纤至您的单位。一些旧楼可能需要额外布线。我们负责与楼宇管理层的所有协调工作。",
    },
  },
  {
    category: "Comparison",
    q: {
      ENG: "What is the difference between Unifi and Maxis / CelcomDigi?",
      BM:  "Apakah perbezaan antara Unifi dan Maxis / CelcomDigi?",
      "中文": "Unifi和Maxis/CelcomDigi有什么区别？",
    },
    a: {
      ENG: "Unifi is wired fibre broadband — the most stable option, ideal for home and WFH. Maxis/CelcomDigi use wireless 4G/5G technology: flexible but speed depends on signal strength. For families, streamers, or WFH professionals, Unifi fibre is consistently faster and more reliable.",
      BM:  "Unifi adalah jalur lebar gentian berwayar — pilihan paling stabil, sesuai untuk rumah dan WFH. Maxis/CelcomDigi menggunakan teknologi wayarles 4G/5G: fleksibel tetapi kelajuan bergantung pada kekuatan isyarat. Untuk keluarga, penstrim, atau profesional WFH, gentian Unifi secara konsisten lebih laju dan lebih dipercayai.",
      "中文": "Unifi是有线光纤宽带——最稳定的选择，适合家庭和WFH使用。Maxis/CelcomDigi使用无线4G/5G技术：灵活但速度受信号强度影响。对于家庭、流媒体用户或WFH专业人士，Unifi光纤始终更快更可靠。",
    },
  },
  {
    category: "Comparison",
    q: {
      ENG: "Is Unifi better than TIME dotCom?",
      BM:  "Adakah Unifi lebih baik daripada TIME dotCom?",
      "中文": "Unifi比TIME dotCom好吗？",
    },
    a: {
      ENG: "Both use fibre technology. Unifi (TM) has wider coverage across Malaysia — especially in suburban and rural areas. TIME has competitive pricing but is mainly available in selected urban condos. In Johor Bahru, Unifi covers significantly more areas than TIME.",
      BM:  "Kedua-duanya menggunakan teknologi gentian. Unifi (TM) mempunyai liputan yang lebih luas di seluruh Malaysia — terutamanya di kawasan pinggir bandar dan luar bandar. TIME mempunyai harga yang kompetitif tetapi terutamanya tersedia di kondominium bandar terpilih. Di Johor Bahru, Unifi meliputi kawasan yang jauh lebih banyak daripada TIME.",
      "中文": "两者都使用光纤技术。Unifi（TM）在马来西亚覆盖面更广——尤其是郊区和农村地区。TIME价格具竞争力，但主要覆盖部分城市公寓。在柔佛新山，Unifi覆盖的区域远多于TIME。",
    },
  },
  {
    category: "News",
    q: {
      ENG: "Will SpaceX Starlink affect my Unifi subscription?",
      BM:  "Adakah SpaceX Starlink akan mempengaruhi langganan Unifi saya?",
      "中文": "SpaceX星链会影响我的Unifi订阅吗？",
    },
    a: {
      ENG: "Starlink is a satellite internet service — great for remote areas without fibre coverage. However, for urban Johor Bahru homes and businesses, Unifi fibre is superior: lower latency (5ms vs 20–40ms for Starlink), more consistent speeds, and significantly lower cost. Starlink starts at RM220/month for basic residential, while Unifi offers 100Mbps from RM89/month.",
      BM:  "Starlink adalah perkhidmatan internet satelit — sesuai untuk kawasan terpencil tanpa liputan gentian. Walau bagaimanapun, untuk rumah dan perniagaan di Johor Bahru bandar, gentian Unifi adalah lebih baik: kependaman lebih rendah (5ms berbanding 20–40ms untuk Starlink), kelajuan yang lebih konsisten, dan kos yang jauh lebih rendah. Starlink bermula dari RM220/bulan untuk kediaman asas, manakala Unifi menawarkan 100Mbps dari RM89/bulan.",
      "中文": "星链是卫星互联网服务——非常适合没有光纤覆盖的偏远地区。然而，对于城市柔佛新山的家庭和企业，Unifi光纤更优越：延迟更低（5ms vs星链的20-40ms）、速度更稳定、成本更低。星链基础住宅套餐起价RM220/月，而Unifi提供100Mbps从RM89/月起。",
    },
  },
];

const CATEGORIES = [...new Set(FAQS.map((f) => f.category))];

export default function FaqClient() {
  const { lang } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modal, setModal] = useState(false);

  const filtered = activeCategory === "All" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <>
      <Navbar/>
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#FFFAF3" }}>
        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #0B1432 0%, #1F1F8F 60%, #3838E0 100%)",
          padding: "60px 0 50px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div aria-hidden style={{
            position: "absolute", bottom: "-30%", left: "50%", transform: "translateX(-50%)",
            width: 800, height: 400,
            background: "radial-gradient(ellipse, rgba(249,115,22,0.25), transparent 70%)",
            filter: "blur(30px)", pointerEvents: "none",
          }}/>
          <div className="container" style={{ position: "relative" }}>
            <span className="eyebrow" style={{ display: "inline-block", marginBottom: 18 }}>
              {lang === "BM" ? "Soalan Lazim" : lang === "中文" ? "常见问题" : "Frequently Asked Questions"}
            </span>
            <h1 style={{ margin: "0 0 14px", fontSize: "clamp(34px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff" }}>
              {lang === "BM" ? "Semua yang perlu anda tahu" : lang === "中文" ? "关于Unifi您需要了解的一切" : "Everything you need to know\nabout Unifi"}
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.80)", maxWidth: 500, margin: "0 auto", lineHeight: 1.55 }}>
              {lang === "BM" ? "Jawapan jelas dalam Bahasa Melayu, Inggeris dan Cina." : lang === "中文" ? "中文、英文、马来文完整解答。" : "Clear answers in English, Malay and Chinese."}
            </p>
          </div>
        </section>

        {/* FAQ content */}
        <section style={{ padding: "50px 0 70px" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            {/* Category filter */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
              {["All", ...CATEGORIES].map((cat) => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIdx(null); }} style={{
                  padding: "8px 18px", borderRadius: 999, border: 0, cursor: "pointer",
                  fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700,
                  background: activeCategory === cat ? "var(--unifi-orange)" : "rgba(11,14,44,0.06)",
                  color: activeCategory === cat ? "#fff" : "var(--ink-700)",
                  transition: "all .2s",
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={i} style={{
                    background: "#fff", borderRadius: 18,
                    border: isOpen ? "1.5px solid rgba(249,115,22,0.35)" : "1px solid rgba(11,14,44,0.07)",
                    boxShadow: isOpen ? "0 8px 28px rgba(249,115,22,0.12)" : "0 2px 10px rgba(11,14,44,0.04)",
                    overflow: "hidden",
                    transition: "all .25s",
                  }}>
                    <button onClick={() => setOpenIdx(isOpen ? null : i)} style={{
                      width: "100%", padding: "18px 22px", border: 0, cursor: "pointer",
                      background: "transparent", textAlign: "left",
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14,
                    }}>
                      <div>
                        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "var(--unifi-orange)", marginBottom: 4 }}>
                          {faq.category}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink-900)", lineHeight: 1.35, textAlign: "left" }}>
                          {faq.q[lang] ?? faq.q.ENG}
                        </div>
                      </div>
                      <span style={{
                        flexShrink: 0, width: 32, height: 32, borderRadius: "50%",
                        background: isOpen ? "var(--unifi-orange)" : "rgba(11,14,44,0.06)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        color: isOpen ? "#fff" : "var(--ink-700)",
                        transition: "all .25s",
                      }}>
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .25s" }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 22px 20px", fontSize: 15, lineHeight: 1.65, color: "var(--ink-700)" }}>
                        {faq.a[lang] ?? faq.a.ENG}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{
              marginTop: 48, background: "linear-gradient(135deg, #FEE9D8 0%, #FFD1B0 100%)",
              borderRadius: 24, padding: "36px 32px", textAlign: "center",
              border: "1px solid rgba(249,115,22,0.20)",
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--unifi-orange)", marginBottom: 10 }}>
                Still have questions?
              </div>
              <h3 style={{ margin: "0 0 12px", fontSize: 26, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
                Chat with our expert team
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--ink-700)", margin: "0 0 22px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
                We reply in under 5 minutes on WhatsApp. Mon–Sun, 9am–10pm.
              </p>
              <button onClick={() => setModal(true)} className="btn-primary" style={{ margin: "0 auto" }}>
                Get a Free Consultation
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
