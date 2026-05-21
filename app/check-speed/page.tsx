import type { Metadata } from "next";
import SpeedTestClient from "./SpeedTestClient";

export const metadata: Metadata = {
  title: "Internet Speed Test – Check Your Broadband Speed",
  description: "Test your internet connection speed for free. Check download, upload and ping. Find out if you need to upgrade your Unifi plan in Johor Bahru.",
  openGraph: {
    title: "Internet Speed Test | Unifi JB",
    description: "Test your internet connection speed for free. Check if your Unifi plan is delivering the promised speeds.",
  },
};

export default function CheckSpeedPage() {
  return <SpeedTestClient/>;
}
