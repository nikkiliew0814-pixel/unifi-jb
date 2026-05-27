import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://pasangunifi.com"),
  title: {
    default: "Pasang Unifi JB | Reseller Sah TM | Daftar Sekarang",
    template: "%s | Unifi JB",
  },
  description:
    "Daftar Unifi Johor Bahru dengan ejen sah TM. Pakej dari RM89, percuma pemasangan & modem WiFi 6. Coverage JB disahkan. WhatsApp sekarang!",
  keywords: [
    "unifi johor bahru", "daftar unifi jb", "unifi plan murah",
    "unifi reseller jb", "broadband johor bahru", "fiber internet jb",
    "TM unifi dealer", "pendaftaran unifi jb",
  ],
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Unifi JB – TM Authorised Reseller",
    title: "Pasang Unifi JB | Reseller Sah TM | Daftar Sekarang",
    description: "Daftar Unifi Johor Bahru dengan ejen sah TM. Pakej dari RM89, percuma pemasangan & modem WiFi 6. Coverage JB disahkan.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Unifi JB Authorised Reseller" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Unifi JB Authorised Reseller",
  description: "TM Unifi authorised reseller in Johor Bahru offering fibre broadband plans from 100Mbps to 2Gbps. Plans start from RM89/month with free installation.",
  telephone: "+60167482254",
  url: "https://pasangunifi.com",
  image: "https://pasangunifi.com/assets/logo-transparent.png",
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
