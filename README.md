# Fermor — Smart Financial Decisions for India

**Frontend Engineering Intern Assignment Submission**  
A high-performance, product-driven web application built for **Fermor**, engineered with Next.js 16 (App Router), TypeScript, Framer Motion, and shadcn/ui design system primitives. Built to deliver mathematical clarity, client-side zero-knowledge privacy, and an enterprise-grade user experience for Indian wealth creators.

**Live Production Deployment**: [https://fermor-homepage-silk.vercel.app/](https://fermor-homepage-silk.vercel.app/)  
**GitHub Repository**: [https://github.com/vanshsinghn1-spec/fermor-homepage](https://github.com/vanshsinghn1-spec/fermor-homepage)  
**Official Reference**: [https://fermor.in/](https://fermor.in/)

---

## Overview & Live Links

- **Production URL**: [https://fermor-homepage-silk.vercel.app/](https://fermor-homepage-silk.vercel.app/)
- **Hosting Platform**: Vercel (Edge Network, Automatic SSL, Continuous Deployment)
- **Repository**: Public GitHub Repository (`main` branch)

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Design System**: shadcn/ui primitives built on Radix UI (`@radix-ui/react-accordion`, `@radix-ui/react-slot`)
- **Animation Engine**: Framer Motion (spring physics, layoutId indicators, exit and entry transitions, interactive gestures)
- **Styling**: Tailwind CSS v4 configured with a pure Light Mode palette:
  - Canvas: Porcelain (`#F8F9FA` / `#FFFFFF`)
  - Typography: Deep Graphite (`#101214`) and Slate (`#5B6065`)
  - Borders: Crisp Slate (`#E2E8F0`)
  - Brand Accent: Fermor Mint (`#10B981` / `#059669`) matching the official identity at `fermor.in`
- **Iconography**: Lucide React vector icon components (100% SVG, zero emojis)
- **Performance**: Native mathematical SVG curve calculation engine delivering sub-second load times and 60fps rendering without heavyweight charting library overhead

---

## Product Thinking & Problem Statement

### The Problem in Indian Retail Finance
Most financial aggregator portals in India (loan brokers, insurance lead generators, mutual fund platforms) operate as aggressive outbound sales funnels:
- Mandatory mobile number and OTP capture before revealing basic calculation numbers.
- Immediate cold calls from third-party telemarketers.
- Opaque, black-box calculations with no visible formulas or compounding schedules.
- Recommendations skewed by hidden affiliate commissions.

### The Fermor Engineering Counterweight
- **"See the math. Not just the answer."**: Every calculator exposes raw formulas, variable derivations, and granular amortized schedules.
- **Client-Side Zero-Knowledge Privacy**: Calculations execute strictly within browser sandbox memory. Zero financial data is dispatched to or logged on remote servers.
- **India-First Regulatory Standards**: Native support for Indian numerical denominations (₹, Lakhs, Crores), RBI-mandated quarterly compounding for term deposits, standard reducing balance EMI formulas, and the latest Union Budget tax slabs.

---

## Design System & Component Hierarchy

| Component | Path | Description |
| :--- | :--- | :--- |
| Official Brand Mark | `src/components/FermorLogo.tsx` | Vector SVG rendition matching `fermor.in`'s official double-stepped chevron glyph, integrated across Navbar, Hero, Features, CTA, and Footer. |
| Living Background | `src/components/BackgroundAnimation.tsx` | Soft, fluid multi-colored floating blurred gradient orbs (emerald, sky, amber) with a subtle radial grid pattern that adds depth without distracting from content. |
| Navigation Bar | `src/components/Navbar.tsx` | Floating glass pill with scroll-state blur detection, `layoutId="navbar-hover"` animated indicator, live status pill, and responsive mobile drawer. |
| Hero Section | `src/components/Hero.tsx` | High-contrast typography (`#101214`), early access funnel, and a live in-hero compounding simulator with real-time updates. |
| Features Bento Grid | `src/components/Features.tsx` | Modern 4-card Bento layout showcasing Portfolio Risk Radar, Step-Up SIP Multiplier, New vs. Old Tax Engine, and Conversational Financial Copilot. |
| Interactive Calculator | `src/components/CalculatorDemo.tsx` | Framer Motion sliding pill tab indicator (`layoutId="active-calc-pill"`), 4 calculation modes with Lucide icon tabs (SIP, Lumpsum, Loan EMI, FD), inflation reality check (6% CPI), and schedule amortization table. |
| Architectural Principles | `src/components/Principles.tsx` | Side-by-side comparison between traditional lead-generation portals vs. the Fermor open standard, with clean Lucide micro-badges. |
| FAQ Accordion | `src/components/FAQ.tsx` | Built with Radix Accordion primitive answering critical user inquiries on data safety, RBI standards, and budget changes. |
| Waitlist Conversion | `src/components/CTA.tsx` | Clean light card with obsidian CTA button and interactive email validation. |
| Footer | `src/components/Footer.tsx` | Comprehensive category navigation, in-browser privacy status, and regulatory disclaimers. |

---

## Interactive Features

### 1. Multi-Mode Financial Math Engine (`CalculatorDemo.tsx`)
- **SIP Wealth Accumulator**: Monthly installment, annual return rate, and tenure with dynamic compounding curve.
- **Lumpsum Planner**: One-time mutual fund / equity growth calculation.
- **Loan EMI Amortizer**: Home, car, and personal loan reducing-balance installment calculator with principal vs. interest breakdown.
- **Fixed Deposit (FD)**: Compounded quarterly per official RBI standards.
- **Inflation Reality Check (6% p.a.)**: Shows real purchasing power alongside nominal future value.
- **Compounding Schedule View**: Toggles between visual growth curves and a year-by-year amortization/growth table.
- **Mathematical Methodology Drawer**: Expands actual mathematical formulas ($FV$, $EMI$, $A$) and regulatory assumptions.
- **Specialized Calculators Directory**: 20+ specialized tool tags covering New vs Old Tax Regime, PPF, NPS, Home Loan Prepayment, HRA Exemption, and CAGR/XIRR.

### 2. Product Bento Grid (`Features.tsx`)
- **Macro Portfolio Allocation**: Multi-segment progress bar representing Equities, Liquid Debt, Sovereign Gold, and US Tech.
- **Step-Up SIP Planner**: Interactive toggle illustrating how a 10% annual salary step-up more than doubles the final corpus.
- **Union Budget Tax Optimizer**: New vs. Old Regime comparison factoring standard deduction (₹75,000) and Section 87A rebate.
- **Conversational Financial Copilot**: Conversational preview demonstrating verified financial arithmetic over sponsored advice.

---

## Local Development & Setup

### Prerequisites
- Node.js (version 18.18.0 or higher recommended)
- npm, pnpm, or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/vanshsinghn1-spec/fermor-homepage.git
cd fermor-homepage

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Validation
```bash
# Compile and validate production bundle
npm run build

# Run production server
npm run start
```

---

## Project Structure

```
fermor-homepage/
├── public/
│   ├── fermor-logo.svg           # Official Fermor SVG vector asset
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css           # Core Light Mode tokens & slider styles
│   │   ├── layout.tsx            # Root layout with fonts & metadata
│   │   └── page.tsx              # Assembled homepage
│   ├── components/
│   │   ├── BackgroundAnimation.tsx # Ambient orbs & grid background
│   │   ├── BlogPreview.tsx       # Research notes & regulatory updates
│   │   ├── CalculatorDemo.tsx    # Interactive 4-in-1 financial engine
│   │   ├── CTA.tsx               # Conversion waitlist card
│   │   ├── FAQ.tsx               # Radix Accordion Q&A
│   │   ├── Features.tsx          # 4-card Bento grid
│   │   ├── FermorLogo.tsx        # Official brand mark component
│   │   ├── Footer.tsx            # Navigation & regulatory disclaimers
│   │   ├── Hero.tsx              # Hero header + live SIP preview
│   │   ├── Navbar.tsx            # Glass pill navigation
│   │   ├── Principles.tsx        # Architectural standards & contrast matrix
│   │   ├── Testimonials.tsx      # Verified user trust cards
│   │   └── ui/                   # Shadcn UI primitives
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── lib/
│       └── utils.ts              # Tailwind clsx + twMerge utility
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## Assignment Requirements Checklist

- [x] Brand Alignment: Exact vector logo replication and typography matching Fermor's identity (`fermor.in`).
- [x] Animation Architecture: Framer Motion micro-interactions (`layoutId` sliding indicators, floating background orbs, smooth hover states).
- [x] Component System: Modular Shadcn UI primitives adhering to accessibility and composition patterns.
- [x] Visual Refinement: Pure light mode styling with high contrast, crisp typography, and Lucide icons with zero emojis.
- [x] Interactive Financial Engine: Working client-side mathematical simulations across SIP, Lumpsum, Loan EMI, and FD with inflation adjustment and formula proofs.
- [x] Live Deployment: Deployed on Vercel at `https://fermor-homepage-silk.vercel.app/`.
