"use client";

import FermorLogo from "@/components/FermorLogo";

export default function Footer() {
  const footerLinks = {
    Calculators: [
      { label: "SIP Wealth Accumulator", href: "#calculator" },
      { label: "Step-Up SIP Planner", href: "#calculator" },
      { label: "Loan EMI & Reducing Balance", href: "#calculator" },
      { label: "Fixed Deposit (RBI Norms)", href: "#calculator" },
      { label: "New vs. Old Tax Regime", href: "#calculator" },
      { label: "Public Provident Fund (PPF)", href: "#calculator" },
    ],
    Products: [
      { label: "Portfolio Radar", href: "#features" },
      { label: "Macro Market Pulse", href: "#features" },
      { label: "Ask Fermor Copilot", href: "#features" },
      { label: "Retirement Horizons", href: "#features" },
      { label: "Financial Literacy for Kids", href: "#features" },
    ],
    Resources: [
      { label: "Research Notes & Blog", href: "#blog" },
      { label: "ITR Filing FY 2025-26", href: "#blog" },
      { label: "RBI Mis-Selling Rights", href: "#blog" },
      { label: "Equity Multiples Guide", href: "#blog" },
    ],
    Company: [
      { label: "Architectural Principles", href: "#principles" },
      { label: "Frequently Asked Questions", href: "#faq" },
      { label: "Contact Engineering", href: "mailto:fermor.in.contact@gmail.com" },
      { label: "Methodology & Disclaimers", href: "#principles" },
    ],
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-zinc-900 bg-white/70 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                <FermorLogo className="w-6 h-4 text-emerald-600 dark:text-[#75FB90]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100 font-[family-name:var(--font-poppins)]">
                Fermor
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-4 max-w-xs">
              Smart financial decisions for India. Free tools, transparent math, and zero spam.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[11px] text-slate-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>In-browser local calculations</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-semibold text-slate-900 dark:text-zinc-300 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-zinc-900/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} Fermor Technologies Pvt. Ltd. Engineered for Indian retail investors.
          </div>
          <div className="text-center md:text-right">
            Calculations are for educational and planning estimates. Not SEBI-registered investment advice.
          </div>
        </div>
      </div>
    </footer>
  );
}
