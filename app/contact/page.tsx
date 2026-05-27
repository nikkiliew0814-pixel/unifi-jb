import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us – Unifi JB Authorised Reseller | Taman Desa Tebrau",
  description:
    "Visit or WhatsApp our Unifi authorised reseller office in Taman Desa Tebrau, Johor Bahru. Mon–Fri 9am–6pm. Register Unifi, check coverage, or upgrade your plan.",
  openGraph: {
    title: "Contact Unifi JB Reseller | Taman Desa Tebrau",
    description: "Find our office in Johor Bahru. Walk in or WhatsApp us to register Unifi fibre broadband.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
