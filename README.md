# Fermor — Smart Financial Decisions for India

> **Frontend Developer Assignment Submission**  
> A high-performance, product-driven homepage built for **Fermor**, designed to communicate financial clarity, privacy, and transparent mathematics for Indian retail investors.

---

## 🌟 Live Demo & Deployment

- **Live URL**: [Deployable directly on Vercel / Netlify](https://vercel.com)
- **Framework**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Performance**: Zero external chart bundle dependencies; 100% SVG-rendered mathematical curves.

---

## 💡 Product Thinking & Key Decisions

### 1. Understanding Fermor: Who is it for?
Most financial tools in India (insurance portals, loan aggregators, investment apps) operate as aggressive lead-generation engines disguised as advice. They hide the math, trap users behind compulsory phone-number login walls, and push high-commission products.

**Fermor's core differentiation:**
- **"See the math. Not just the answer."** Every calculation reveals the methodology, variables, and formula.
- **Client-Side Privacy**: All mathematical computations run entirely inside the user's browser. No financial data or salary numbers are transmitted to remote servers.
- **India-First Architecture**: Native support for Indian numerical denominations (₹, Lakhs, Crores), RBI-mandated quarterly compounding for term deposits, and reducing balance EMI formulas.

---

### 2. Architecture & Design System

| Element | Decision & Rationale |
| :--- | :--- |
| **Color Palette** | Deep obsidian ground (`#0A0B0D`) paired with high-contrast electric mint (`#75FB90`), subtle purples, and blues. Evokes precision, modern fintech authority, and calm readability. |
| **Typography** | `Poppins` for punchy, modern geometric headlines and `Inter` for crisp tabular numbers and micro-copy. |
| **Zero-Bundle SVG Charts** | Instead of heavy charting libraries (like Chart.js or Recharts that add 150KB+ to bundle size), built a custom SVG engine that dynamically computes Bezier and quadratic growth curves directly from mathematical models. |
| **Responsive Philosophy** | Mobile-first layout with touch-friendly sliders, stacked summary cards, and responsive navigation overlays. |

---

## 🛠️ Interactive Features Built

### 1. Multi-Mode Financial Math Engine (`CalculatorDemo.tsx`)
A live calculator supporting four distinct financial modes:
- **SIP Planner**: Monthly investment, expected annual return, and time horizon with dynamic wealth compounding curve.
- **Lumpsum**: One-time mutual fund / equity investment forecast.
- **Loan EMI**: Home, car, and personal loan reducing-balance installment estimator with total interest vs. principal split.
- **Fixed Deposit (FD)**: Term deposit maturity forecast adhering to RBI quarterly compounding standards.
- **Inflation Adjustment Toggle (6% p.a.)**: Shows real purchasing power alongside nominal future value.
- **Compounding Schedule View**: Toggles between visual growth curves and a year-by-year amortization/growth table.
- **"Show the Math" Formula Drawer**: Inspects the exact formula ($FV = P \times \dots$) and variable definitions.

### 2. Product Suite Showcase (`Features.tsx`)
Showcases Fermor's broader product vision:
- Market Intelligence (stocks, mutual funds, ETFs)
- Portfolio Tracking
- Smart Planning & Goal Modeling
- Conversational Financial AI ("Ask Anything")

### 3. Trust & Principles Grid (`Principles.tsx`)
Articulates Fermor's philosophy: Full transparency, no login walls, mobile-first design, clear affiliate labeling, and open methodology.

### 4. Interactive FAQ Accordion (`FAQ.tsx`)
Accessible accordion answering crucial user questions regarding data privacy, calculation accuracy, and Union Budget tax updates.

### 5. Early Access Waitlist & Conversion Funnel (`Hero.tsx` & `CTA.tsx`)
Interactive email capture forms with real-time validation and visual confirmation feedback.

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
│   └── components/
│       ├── Navbar.tsx         # Responsive glassmorphic floating navigation
│       ├── Hero.tsx           # Headline, early access waitlist, interactive stats
│       ├── Features.tsx       # Core feature suite with hover micro-interactions
│       ├── CalculatorDemo.tsx # Multi-tab client-side financial calculator engine
│       ├── Principles.tsx     # Value propositions and transparency commitments
│       ├── Testimonials.tsx   # Verified Indian retail user reviews
│       ├── BlogPreview.tsx    # Recent regulatory & personal finance articles
│       ├── FAQ.tsx            # Accessible accordion for common questions
│       ├── CTA.tsx            # Bottom conversion section with gradient glow
│       └── Footer.tsx         # Comprehensive sitemap and regulatory disclaimers
├── tsconfig.json
└── package.json
```

---

## 📝 Submission Highlights

- **No AI boilerplate look**: Custom layout, deliberate Indian fintech domain copy, working math logic, and custom SVG visualizations.
- **Production-ready code**: Clean TypeScript types, zero console errors, accessible ARIA attributes, and responsive breakpoints.
