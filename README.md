# Fermor — Smart Financial Decisions for India

> **Frontend Developer Assignment Submission**  
> A high-performance, product-driven homepage built for **Fermor**, engineered with **Next.js (App Router)**, **TypeScript**, **Framer Motion**, and **shadcn/ui** design system components. Communicates financial clarity, privacy, and transparent mathematics for Indian retail investors.

---

## 🌟 Tech Stack & Design Architecture

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Design System**: [shadcn/ui](https://ui.shadcn.com/) primitives built with Radix UI (`@radix-ui/react-accordion`, `@radix-ui/react-slider`, `@radix-ui/react-tabs`, `@radix-ui/react-slot`)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/) (spring physics, layoutId indicators, exit/entry transitions, interactive gestures)
- **Styling**: Tailwind CSS v4 + Deep Zinc palette (`#09090b`), emerald accents (`#34d399`), and glassmorphism
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Zero Heavyweight Chart Bloat**: Custom native SVG curve calculation engine delivering sub-second loads and 60fps responsiveness.

---

## 💡 Product Thinking & Design Decisions

### 1. The Core Problem with Indian Personal Finance
Most financial aggregator apps in India (loan portals, insurance brokers, mutual fund platforms) operate as aggressive lead-generation engines disguised as advice:
- Mandatory phone number OTP barriers before showing basic calculation numbers.
- Unsolicited cold calls from telemarketers within minutes.
- Opaque black-box calculations with no visible formulas.
- Products ranked based on behind-the-scenes commissions.

**Fermor's Counterweight Architecture:**
- **"See the math. Not just the answer."** Every calculation reveals the methodology, variables, compounding frequency, and formula.
- **Client-Side In-Browser Privacy**: 100% of arithmetic runs locally on the user's device memory. Zero financial telemetry or server logging.
- **India-First Regulatory Standards**: Native support for Indian numerical denominations (₹, Lakhs, Crores), RBI-mandated quarterly compounding for term deposits, standard reducing balance EMI formulas, and the latest Union Budget tax slabs.

---

### 2. Design System Upgrades (Framer Motion & shadcn/ui)

| Component / Layer | Implementation Details |
| :--- | :--- |
| **Official Fermor Brand Mark** (`FermorLogo.tsx`) | Vector SVG rendition matching `fermor.in`'s official double-stepped chevron glyph, integrated across Navbar, Hero, and Footer. |
| **Light & Dark Mode Engine** (`ThemeToggle.tsx`) | Seamless client-side theme switcher via `next-themes` with animated spring-physics sun/moon icons and balanced palettes. |
| **Living Background Animation** (`BackgroundAnimation.tsx`) | Continuous multi-colored floating blurred gradient orbs (indigo, sky, purple, emerald, amber) with organic easing and diagonal light sweeps. |
| **Pill Navigation** (`Navbar.tsx`) | Floating glass pill with scroll-state blur detection, `layoutId="navbar-hover"` animated indicator, live status pill, and mobile drawer. |
| **Hero & Instant Simulator** (`Hero.tsx`) | High-contrast typography with ambient radial lighting, early access funnel, and a live in-hero compounding simulator. |
| **Interactive Bento Grid** (`Features.tsx`) | Modern 4-card Bento layout showcasing Portfolio Risk Radar, Step-Up SIP Multiplier, New vs. Old Tax Engine, and Conversational Financial Copilot. |
| **Flagship Calculator Engine** (`CalculatorDemo.tsx`) | Framer Motion sliding pill tab indicator (`layoutId="active-calc-pill"`), 4 calculation modes (SIP, Lumpsum, Loan EMI, FD), inflation reality check (6% CPI), and schedule amortization table. |
| **Principles & Contrast Matrix** (`Principles.tsx`) | Direct side-by-side comparison between traditional lead-generation portals vs. the Fermor open standard. |
| **Interactive Accordion** (`FAQ.tsx`) | Built with Radix Accordion primitive answering critical user inquiries on data safety, RBI standards, and budget changes. |
| **Conversion Funnel** (`CTA.tsx`) | Specular-border terminal card with ambient backlight and instant waitlist submission. |

---

## 🛠️ Interactive Features Built

### 1. Multi-Mode Financial Math Engine (`CalculatorDemo.tsx`)
- **SIP Wealth Accumulator**: Monthly installment, annual return rate, and tenure with dynamic compounding curve.
- **Lumpsum Planner**: One-time mutual fund / equity growth calculation.
- **Loan EMI Amortizer**: Home, car, and personal loan reducing-balance installment calculator with principal vs. interest breakdown.
- **Fixed Deposit (FD)**: Compounded quarterly per official RBI standards.
- **Inflation Reality Check (6% p.a.)**: Shows real purchasing power alongside nominal future value.
- **Compounding Schedule View**: Toggles between visual growth curves and a year-by-year amortization/growth table.
- **"Inspect Mathematical Methodology" Drawer**: Expands actual mathematical formulas ($FV$, $EMI$, $A$) and regulatory assumptions.

### 2. Product Bento Grid (`Features.tsx`)
- **Macro Portfolio Allocation**: Multi-segment progress bar representing Equities, Liquid Debt, Sovereign Gold, and US Tech.
- **Step-Up SIP Planner**: Interactive toggle illustrating how a 10% annual salary step-up more than doubles the final corpus.
- **Union Budget Tax Optimizer**: New vs. Old Regime comparison factoring standard deduction (₹75,000) and Section 87A rebate.
- **Conversational Financial Copilot ("Ask Fermor")**: Clean conversational terminal preview.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or later
- npm, pnpm, or yarn

### 1. Install Dependencies
```bash
cd fermor-homepage
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
fermor-homepage/
├── public/                 # Static assets and favicon
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, keyframe animations, glassmorphism utilities
│   │   ├── layout.tsx      # Root metadata, OpenGraph tags, Google font optimization
│   │   └── page.tsx        # Homepage page composition
│   ├── components/
│   │   ├── ui/             # shadcn/ui components (Radix primitives)
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── slider.tsx
│   │   │   └── tabs.tsx
│   │   ├── Navbar.tsx         # Responsive glassmorphic floating navigation with Framer Motion
│   │   ├── Hero.tsx           # Headline, live interactive SIP simulator, and trust badges
│   │   ├── Features.tsx       # Bento Grid feature suite with interactive Step-Up toggle
│   │   ├── CalculatorDemo.tsx # Flagship multi-tab client-side financial calculator engine
│   │   ├── Principles.tsx     # Value propositions and industry contrast matrix
│   │   ├── Testimonials.tsx   # Verified Indian retail user reviews with star ratings
│   │   ├── BlogPreview.tsx    # Recent regulatory & personal finance research notes
│   │   ├── FAQ.tsx            # Accessible Radix Accordion for common questions
│   │   ├── CTA.tsx            # Bottom conversion section with specular glow
│   │   └── Footer.tsx         # Comprehensive sitemap and regulatory disclaimers
│   └── lib/
│       └── utils.ts           # Standard cn class merge utility
├── tsconfig.json
└── package.json
```
