"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import Installation from "@/components/Installation";
import { TrustStrip, SwitchBanner } from "@/components/Sections";
import HomeWidgets from "@/components/HomeWidgets";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import Chatbot from "@/components/Chatbot";
import SpeedCheckPopup from "@/components/SpeedCheckPopup";
import { PLANS, type Plan } from "@/lib/plans";

export default function HomePage() {
  const [modal, setModal] = useState<{ open: boolean; plan: Plan | null }>({ open: false, plan: null });

  const openEnquiry = (plan: Plan | null = null) => setModal({ open: true, plan });
  const closeEnquiry = () => setModal((m) => ({ ...m, open: false }));

  return (
    <>
      <Navbar/>
      <main>
        <Hero onEnquire={() => openEnquiry()}/>
        <Plans onInterested={(planId) => {
          const plan = PLANS.find(p => p.id === planId) ?? null;
          openEnquiry(plan);
        }}/>
        <Installation/>
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
