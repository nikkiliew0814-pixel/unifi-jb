@AGENTS.md
# Project: Unifi JB Lead Generation Website


## IMPORTANT: Read Next.js docs first
Before writing ANY code, read node_modules/next/dist/docs/ for current APIs.
This project uses App Router, not Pages Router. Never use pages/ directory.

## Project Purpose
A lead generation website for Unifi internet reseller in Johor Bahru.
Goal: collect enquiries via form and WhatsApp.

## Business Info
- WhatsApp: 016-7482254
- Service area: Malaysia

## WhatsApp Smart Link Format
When user selects service type, pre-fill WhatsApp message:
- New registration: "Hi, I want to register a new Unifi plan"
- Renew: "Hi, I want to know more about renew package"
- Upgrade: "Hi, I want to upgrade my current Unifi plan"
- Coverage check: "Hi, can you check if Unifi is available at [area]?"

## Required Pages & Features
1. / (homepage) - Hero, packages, WhatsApp CTA
2. /check-speed - Internet speed test widget
3. /check-coverage - Link to TM coverage map + enquiry form
4. /faq - SEO/GEO optimized Q&A content
5. /news - Unifi & broadband news (static for now)

## SEO Requirements
- Every page needs: title, description, og:image meta tags
- Use next/metadata API
- Keywords: unifi johor bahru, daftar unifi jb, unifi plan murah
- FAQ page must use FAQPage schema (JSON-LD)
- Homepage must use LocalBusiness schema

## GEO Requirements  
- FAQ answers must be direct and factual (AI loves citing these)
- Include specific numbers: "A family of 4 needs minimum 100Mbps"
- Write in both English and Malay where possible

## Design Style
- Fast loading: no heavy libraries
- Mobile-first (most users on phone)


## Chatbot Flow
Simple rule-based chatbot (no AI API needed for MVP):
1. "What do you need?" → New Plan / Renew / Upgrade / Check Coverage
2. User selects → Redirect to WhatsApp with pre-filled message
3. Keep it simple: chatbot is just a fancy WhatsApp router

## DO NOT
- Do not use pages/ directory (use app/ only)
- Do not install unnecessary packages
- Do not use any CSS framework other than Tailwind
- Do not hardcode phone numbers anywhere except env variables

