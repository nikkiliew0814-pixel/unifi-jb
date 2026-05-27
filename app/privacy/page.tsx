import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy – Unifi JB Authorised Reseller",
  description:
    "Privacy Policy for TITAN GROUP CORPORATE SDN. BHD., an Authorised Reseller of Telekom Malaysia (TM) Unifi. Learn how we collect, use, and protect your personal data.",
  openGraph: {
    title: "Privacy Policy | Unifi JB",
    description: "How we handle your personal data when you register for Unifi through our authorised reseller service.",
  },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
