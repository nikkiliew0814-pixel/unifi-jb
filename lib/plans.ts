export interface Plan {
  id: string;
  speed: string;
  unit: string;
  down: string;
  up: string;
  now: number;
  was: number;
  badge: { label: string; tone: "orange" | "blue" | "dark" } | null;
  tagline: string;
  color: string;
  perks: string[];
  featured?: boolean;
  tilt: number;
}

export const PLANS: Plan[] = [
  {
    id: "p100", speed: "100", unit: "Mbps",
    down: "100Mbps", up: "50Mbps", now: 89, was: 99,
    badge: null, tagline: "Starter", color: "#3838E0",
    perks: ["Wi-Fi 6 Combo Box", "24 Hrs Service", "Free installation"],
    tilt: -1,
  },
  {
    id: "p300", speed: "300", unit: "Mbps",
    down: "300Mbps", up: "100Mbps", now: 129, was: 139,
    badge: null, tagline: "Family", color: "#3838E0",
    perks: ["Wi-Fi 6 Combo Box", "24 Hrs Service", "Free installation"],
    tilt: 1,
  },
  {
    id: "p500", speed: "500", unit: "Mbps",
    down: "500Mbps", up: "100Mbps", now: 149, was: 159,
    badge: { label: "Most Popular", tone: "orange" },
    tagline: "WFH + Stream", color: "#F26F22",
    perks: ["Wi-Fi 6 Combo Box", "24 Hrs Service", "Free installation", "Mesh upgrade ready"],
    featured: true, tilt: 0,
  },
  {
    id: "p1g", speed: "1", unit: "Gbps+",
    down: "1Gbps", up: "500Mbps", now: 249, was: 289,
    badge: { label: "Best Value", tone: "blue" },
    tagline: "Heavy Use", color: "#3838E0",
    perks: ["Wi-Fi 7 Combo Box", "12 Business Hours Restoration", "Premium Service"],
    tilt: -1,
  },
  {
    id: "p2g", speed: "2", unit: "Gbps+",
    down: "2Gbps", up: "1Gbps", now: 319, was: 349,
    badge: { label: "Power", tone: "dark" },
    tagline: "Ultimate", color: "#3838E0",
    perks: ["Wi-Fi 7 Combo Box", "12 Business Hours Restoration", "Premium Service"],
    tilt: 1,
  },
];
