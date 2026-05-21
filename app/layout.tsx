import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://unifi-jb.com"),
  title: {
    default: "Unifi Johor Bahru | TM Authorised Reseller | Best Fibre Plans JB",
    template: "%s | Unifi JB",
  },
  description:
    "Daftar Unifi di Johor Bahru dengan reseller sah TM. Semak coverage, bandingkan pakej 100Mbps–2Gbps, dan mohon sekarang. Register Unifi in Johor Bahru – unifi plan murah JB.",
  keywords: [
    "unifi johor bahru", "daftar unifi jb", "unifi plan murah",
    "unifi reseller jb", "broadband johor bahru", "fiber internet jb",
    "TM unifi dealer", "pendaftaran unifi jb",
  ],
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Unifi JB – TM Authorised Reseller",
    title: "Unifi Johor Bahru | TM Authorised Reseller",
    description: "Daftar Unifi di Johor Bahru dengan reseller sah TM. Semak coverage, bandingkan pakej 100Mbps–2Gbps.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Unifi JB Authorised Reseller" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Unifi JB Authorised Reseller",
  description: "TM Unifi authorised reseller in Johor Bahru offering fibre broadband plans from 100Mbps to 2Gbps.",
  telephone: "+60167482254",
  url: "https://unifi-jb.com",
  image: "https://unifi-jb.com/assets/logo.png",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Johor",
    addressLocality: "Johor Bahru",
    addressCountry: "MY",
  },
  areaServed: [
    { "@type": "City", name: "Johor Bahru" },
    { "@type": "State", name: "Johor" },
    { "@type": "Country", name: "Malaysia" },
  ],
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "22:00",
  }],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+60167482254",
    contactType: "customer service",
    availableLanguage: ["English", "Malay", "Chinese"],
  },
  priceRange: "RM89–RM319/month",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      </head>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
