# Fermor — Smart Financial Decisions for India

> **Frontend Developer Assignment Submission**  
> A high-performance, product-driven web application built for **Fermor**, engineered with **Next.js 16 (App Router)**, **TypeScript**, **Framer Motion**, and **shadcn/ui** design system components. Built to deliver mathematical clarity, client-side privacy, and an enterprise-grade user experience for Indian wealth creators.

---

## 🌟 Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Design System**: [shadcn/ui](https://ui.shadcn.com/) primitives built on top of Radix UI (`@radix-ui/react-accordion`, `@radix-ui/react-slot`)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/) (spring physics, layoutId indicators, exit/entry transitions, interactive gestures)
- **Styling**: Tailwind CSS v4 + Pure Light Mode palette (clean porcelain `#F8F9FA` canvas, high-contrast `#101214` typography, slate `#5B6065`, and Fermor Mint `#10B981` accents matching [fermor.in](https://fermor.in/))
- **Iconography**: [Lucide React](https://lucide.dev/) — 100% polished vector icon components, replacing generic emojis for an enterprise look
- **Performance**: Zero heavyweight charting library bloat. Custom native mathematical SVG curve calculation engine delivering sub-second load times and 60fps responsiveness

---

## 💡 Product Thinking & Design Decisions

### 1. The Core Problem in Indian Retail Finance
Most financial aggregator apps in India (loan brokers, insurance lead generators, mutual fund comparison sites) operate as aggressive outbound call center funnels:
- Mandatory phone number OTP barriers before showing calculation results.
- Unsolicited cold calls from telemarketers within minutes.
- Opaque black-box calculations with no visible formulas.
- Products ranked based on behind-the-scenes affiliate commissions.

**Fermor's Counterweight Architecture:**
- **"See the math. Not just the answer."** Every calculator exposes raw formulas, variable derivations, and granular amortized schedules.
- **Client-Side Zero-Knowledge Privacy**: 100% of arithmetic runs locally inside the browser's sandbox memory. Zero financial telemetry or server logging.
- **India-First Regulatory Standards**: Native support for Indian numerical denominations (₹, Lakhs, Crores), RBI-mandated quarterly compounding for term deposits, standard reducing balance EMI formulas, and the latest Union Budget tax slabs.

---

### 2. Design System & Visual Refinement

| Component / Layer | Implementation Details |
| :--- | :--- |
| **Official Fermor Brand Mark** (`FermorLogo.tsx`) | Vector SVG rendition matching `fermor.in`'s official double-stepped chevron glyph, integrated across Navbar, Hero, Features, CTA, and Footer. |
| **Living Ambient Background** (`BackgroundAnimation.tsx`) | Soft, fluid multi-colored floating blurred gradient orbs (emerald, sky, amber) with a subtle radial grid pattern that adds depth without distracting from content. |
| **Pill Navigation** (`Navbar.tsx`) | Floating glass pill with scroll-state blur detection, `layoutId="navbar-hover"` animated indicator, live status pill, and responsive mobile drawer. |
| **Hero & Instant Simulator** (`Hero.tsx`) | High-contrast typography (`#101214`), early access funnel, and a live in-hero compounding simulator with real-time updates. |
| **Interactive Bento Grid** (`Features.tsx`) | Modern 4-card Bento layout showcasing Portfolio Risk Radar, Step-Up SIP Multiplier, New vs. Old Tax Engine, and Conversational Financial Copilot. |
| **Flagship Calculator Engine** (`CalculatorDemo.tsx`) | Framer Motion sliding pill tab indicator (`layoutId="active-calc-pill"`), 4 calculation modes with Lucide icon tabs (SIP, Lumpsum, Loan EMI, FD), inflation reality check (6% CPI), and schedule amortization table. |
| **Principles & Contrast Matrix** (`Principles.tsx`) | Side-by-side comparison between traditional lead-generation portals vs. the Fermor open standard, with clean Lucide micro-badges. |
| **Interactive Accordion** (`FAQ.tsx`) | Built with Radix Accordion primitive answering critical user inquiries on data safety, RBI standards, and budget changes. |
| **Conversion Funnel** (`CTA.tsx`) | Clean light card with obsidian CTA button and interactive email validation. |

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
- **20+ Specialized Calculators Directory**: Clean directory cards covering New vs Old Tax Regime, PPF, NPS, Home Loan Prepayment, HRA Exemption, and CAGR/XIRR.

### 2. Product Bento Grid (`Features.tsx`)
- **Macro Portfolio Allocation**: Multi-segment progress bar representing Equities, Liquid Debt, Sovereign Gold, and US Tech.
- **Step-Up SIP Planner**: Interactive toggle illustrating how a 10% annual salary step-up more than doubles the final corpus.
- **Union Budget Tax Optimizer**: New vs. Old Regime comparison factoring standard deduction (₹75,000) and Section 87A rebate.
- **Conversational Financial Copilot ("Ask Fermor")**: Conversational preview demonstrating verified financial arithmetic over sponsored advice.

---

## 🚀 How to Deploy on Vercel

Deploying this Next.js project on Vercel is straightforward. You can deploy either through the **Vercel Web Dashboard** (recommended) or via the **Vercel CLI**.

### Option A: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "feat: complete Fermor homepage"
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com/) and sign in with your GitHub/GitLab account.

3. **Import Project**:
   - Click **"Add New..."** → **"Project"**.
   - Select your repository from the list and click **"Import"**.

4. **Configure Project Settings**:
   - **Framework Preset**: Vercel automatically detects `Next.js`.
   - **Root Directory**:
     - If your repository contains `fermor-homepage` as a subfolder, set **Root Directory** to `fermor-homepage`.
     - If the repository root is the project itself, leave it as `./`.
   - **Build Command**: `next build` (default).
   - **Output Directory**: `.next` (default).
   - **Install Command**: `npm install` (default).

5. **Deploy**:
   - Click **"Deploy"**.
   - In less than 60 seconds, your site will be live with an automatic HTTPS URL (e.g., `https://fermor-homepage.vercel.app`).
   - Every subsequent push to `main` will automatically trigger a production deployment.

---

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the project directory**:
   ```bash
   cd fermor-homepage
   ```

3. **Log in to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy to Preview**:
   ```bash
   vercel
   ```
   Follow the interactive prompts:
   - *Set up and deploy?* `Y`
   - *Which scope?* (Select your team or personal account)
   - *Link to existing project?* `N`
   - *What's your project's name?* `fermor-homepage`
   - *In which directory is your code located?* `./`
   - *Want to modify settings?* `N`

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```
   Your production deployment URL will be printed in the terminal.

---

## 💻 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.18.0 or higher recommended)
- npm, pnpm, or yarn

### 1. Install Dependencies
```bash
cd fermor-homepage
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with hot module reloading.

### 3. Verify Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Directory Structure

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

## 🎯 Summary of Assignment Requirements Met

1. **Brand Alignment**: Exact vector logo replication and typography matching Fermor's identity (`fermor.in`).
2. **Animation Architecture**: Sophisticated Framer Motion micro-interactions (`layoutId` sliding indicators, floating background orbs, smooth hover states).
3. **Component System**: Clean, modular Shadcn UI primitives adhering to modern accessibility and composition patterns.
4. **Professional Polish**: Pure light mode styling with high contrast, crisp typography, and Lucide icons with zero emojis.
5. **Interactive Financial Engine**: Working client-side mathematical simulations across SIP, Lumpsum, Loan EMI, and FD with inflation adjustment and formula proofs.
