// Strip BOM (﻿) and whitespace that some editors/env systems inject
export const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER ?? "60163264257").replace(/^﻿/, "").trim();
export const WA_DISPLAY = (process.env.NEXT_PUBLIC_WA_DISPLAY ?? "016-3264257").replace(/^﻿/, "").trim();

export type ServiceType = "new" | "renew" | "upgrade" | "coverage";

const MESSAGES: Record<ServiceType, string> = {
  new:      "Hi, I want to register a new Unifi plan",
  renew:    "Hi, I want to know more about renew package",
  upgrade:  "Hi, I want to upgrade my current Unifi plan",
  coverage: "Hi, can you check if Unifi is available at my area?",
};

export function waLink(service?: ServiceType, extra?: string): string {
  const msg = service ? MESSAGES[service] : "Hi, I'm interested in Unifi Fibre. Can you tell me about availability at my address?";
  const text = encodeURIComponent(extra ? `${msg} ${extra}` : msg);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

export function openWA(service?: ServiceType, extra?: string): void {
  const a = document.createElement("a");
  a.href = waLink(service, extra);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
