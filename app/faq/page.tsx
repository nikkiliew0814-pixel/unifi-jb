import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ – Unifi Johor Bahru | Soalan Lazim | 常见问题",
  description:
    "Frequently asked questions about Unifi fibre broadband in Johor Bahru. Learn about plans, pricing, installation, coverage, and speed. Soalan lazim Unifi JB. Unifi JB常见问题解答。",
  openGraph: {
    title: "Unifi JB FAQ – Everything You Need to Know",
    description: "How much Mbps do I need? What is Fibre? How long does installation take? All answered here.",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much Mbps does my household need in Johor Bahru?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Johor Bahru households: 1–2 people (light browsing & streaming) — 100Mbps at RM89/month is sufficient. 3–4 people (Netflix 4K + video calls simultaneously) — 300Mbps at RM129/month is recommended. 5+ people or WFH + gaming — 500Mbps at RM149/month or above. A Malaysian family of 4 needs minimum 100Mbps for comfortable daily use.",
      },
    },
    {
      "@type": "Question",
      name: "What is Unifi Fibre broadband and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unifi is TM's (Telekom Malaysia) fibre broadband service using FTTH (Fibre to the Home) technology. It transmits data via optical fibre cables, delivering speeds from 100Mbps to 2Gbps — over 10 times faster than traditional copper ADSL. It is available across most of Johor Bahru including Skudai, Tampoi, Tebrau, Masai, Gelang Patah, Iskandar Puteri, and Senai.",
      },
    },
    {
      "@type": "Question",
      name: "What are the Unifi registration and installation fees in JB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no standard installation fee for most Unifi Home plans in Johor Bahru (standard cabling up to 50 metres is free). All new Unifi Home registrations require an RM100 advance payment within 10 days after installation is complete. The advance payment is applied to your first bill. Contracts range from 24 to 36 months depending on the plan selected.",
      },
    },
    {
      "@type": "Question",
      name: "How long does Unifi installation take in Johor Bahru?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Johor Bahru, Unifi installation typically takes 3 to 5 working days after registration and coverage confirmation. Areas well-covered by TM infrastructure — such as JB city centre, Skudai, and Tebrau — are often faster. Our authorised dealer team will contact you within 1 working day to confirm your installation slot.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from Maxis, TIME, or CelcomDigi to Unifi in JB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TM's Switch & Save campaign offers up to 6 months free internet subscription when you port over from Maxis, CelcomDigi, or TIME to Unifi in Johor Bahru. Our dealer handles the porting process and waives the termination fee. Unifi fibre delivers lower latency (5–10ms vs 20–40ms for wireless), more consistent speeds, and better value for families.",
      },
    },
    {
      "@type": "Question",
      name: "Which areas in Johor Bahru have Unifi coverage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unifi fibre coverage in Johor Bahru includes: JB City Centre, Johor Bahru, Skudai, Tampoi, Tebrau, Masai, Gelang Patah, Iskandar Puteri (Nusajaya), Senai, Kulai, Kluang, Muar, Batu Pahat, and most major residential areas in Johor. Coverage continues to expand. Contact our authorised dealer to verify your specific address.",
      },
    },
    {
      "@type": "Question",
      name: "What Unifi plans are available in Johor Bahru and how much do they cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unifi plans available in Johor Bahru (2026 pricing): 100Mbps at RM89/month (24-month contract), 300Mbps at RM129/month (up to 6 months free or free TV bundle), 500Mbps at RM149/month — most popular — (up to 6 months free or free 55-inch TV), 1Gbps at RM249/month (free 6 months or free 65-inch TV), 2Gbps at RM319/month (24-month contract, Wi-Fi 7 router included). All prices exclude 8% service tax.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqClient/>
    </>
  );
}
