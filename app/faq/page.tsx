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
      name: "How much Mbps does my household need?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1-2 people light use: 100Mbps is enough. 3-4 people simultaneous Netflix + video calls: 300Mbps recommended. 5+ people or WFH/gaming: 500Mbps or above. A family of 4 needs minimum 100Mbps for comfortable daily use.",
      },
    },
    {
      "@type": "Question",
      name: "What is Fibre / Unifi Fibre broadband?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fibre is data transmission via optical fibre cables, over 10 times faster than traditional copper ADSL, with higher stability not affected by distance. Unifi uses FTTH (Fibre to the Home) technology, bringing the fibre cable directly to your home.",
      },
    },
    {
      "@type": "Question",
      name: "What are the Unifi installation fees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New users typically pay no installation fee (TM promotion), but need to pay RM200 deposit (refunded after contract ends). Some plans include a free router. All Unifi Home new registrations require RM100 advance payment within 10 days after installation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does Unifi installation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally 3-7 working days, depending on area coverage and TM engineer schedule. In Johor Bahru city areas, it is usually faster. Our dealer can confirm the exact timeline based on your location.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Unifi and Maxis/Digi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unifi is wired fibre broadband with the highest stability, ideal for home and WFH use. Maxis/Digi uses wireless 4G/5G technology which is flexible but speed is affected by signal strength. Unifi is recommended for families, heavy streamers, and work-from-home setups.",
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
