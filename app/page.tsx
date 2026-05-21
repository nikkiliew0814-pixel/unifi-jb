"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import { TrustStrip, SwitchBanner } from "@/components/Sections";
import HomeWidgets from "@/components/HomeWidgets";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import Chatbot from "@/components/Chatbot";
import SpeedCheckPopup from "@/components/SpeedCheckPopup";
import { openWA } from "@/lib/whatsapp";
import type { Plan } from "@/lib/plans";

export default function HomePage() {
  const [modal, setModal] = useState<{ open: boolean; plan: Plan | null }>({ open: false, plan: null });

  const openEnquiry = (plan: Plan | null = null) => setModal({ open: true, plan });
  const closeEnquiry = () => setModal((m) => ({ ...m, open: false }));

  return (
    <>
      <Navbar/>
      <main>
        <Hero onEnquire={() => openEnquiry()}/>
        <Plans onInterested={(plan) => openEnquiry(plan)}/>
        <TrustStrip/>
        <SwitchBanner onEnquire={() => openEnquiry()}/>
        <HomeWidgets/>
      </main>
      <Footer onEnquire={() => openEnquiry()}/>

      <EnquiryModal open={modal.open} prefillPlan={modal.plan} onClose={closeEnquiry}/>
      <SpeedCheckPopup/>
      <Chatbot/>
    </>
  );
}
