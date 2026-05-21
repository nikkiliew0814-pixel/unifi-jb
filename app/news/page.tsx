import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Broadband News – Unifi, Starlink, 5G & Fibre Updates Malaysia",
  description: "Stay updated on the latest broadband news in Malaysia — Unifi plan updates, SpaceX Starlink satellite internet, 5G expansion, Wi-Fi 7, and smart home technology.",
  openGraph: {
    title: "Broadband & Internet News Malaysia | Unifi JB",
    description: "Latest news on Unifi, Starlink, 5G, and broadband technology in Malaysia.",
  },
};

export default function NewsPage() {
  return <NewsClient/>;
}
