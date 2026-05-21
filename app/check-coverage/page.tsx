import type { Metadata } from "next";
import CoverageClient from "./CoverageClient";

export const metadata: Metadata = {
  title: "Check Unifi Coverage – Is Fibre Available at Your Address?",
  description: "Check if Unifi fibre broadband is available at your address in Johor Bahru. Use TM's official coverage map or submit an enquiry for a coverage check.",
  openGraph: {
    title: "Check Unifi Coverage | Unifi JB",
    description: "Is Unifi available at your address? Check coverage instantly or contact our dealer team.",
  },
};

export default function CheckCoveragePage() {
  return <CoverageClient/>;
}
