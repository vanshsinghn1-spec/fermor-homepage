"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Fermor completely free to use?",
    answer:
      "Yes, 100% free. All our financial calculators, scenario planning engines, and educational resources have no paywalls, subscription tiers, or locked features. We believe fundamental financial clarity should be accessible to every Indian.",
  },
  {
    question: "Are my salary, loan, and investment numbers stored on your servers?",
    answer:
      "No. All calculator math runs entirely inside your browser on your device (client-side execution). Your financial figures are never saved, tracked, or sent to any remote database.",
  },
  {
    question: "How do Fermor's formulas compare to bank calculators?",
    answer:
      "Our tools follow official Indian regulatory methodologies: Fixed Deposits use quarterly compounding per RBI standards, EMIs use the standard reducing balance formula used by top Indian retail banks, and SIPs calculate monthly compounding with annuity-due precision.",
  },
  {
    question: "Do you push financial products or earn covert commissions?",
    answer:
      "No. Most finance portals in India operate as lead-generation engines disguised as advice. Fermor was founded on open methodology and unbiased math. We do not sell insurance, push credit cards, or skew answers for referral fees.",
  },
  {
    question: "Are tax tools updated for FY 2025-26 (AY 2026-27)?",
    answer:
      "Yes. Our tax engines incorporate the latest Union Budget provisions — including the New Tax Regime revised rebate under Section 87A, updated slab thresholds, and the standard deduction.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 px-6">
      {/* Background soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/[0.03] blur-[140px]" />
      </div>

      <div className="relative max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
              Common Questions
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-tight mb-4">
            Frequently Asked{" "}
            <span className="text-text-secondary">Questions</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-[480px] mx-auto">
            Everything you need to know about our tools, data privacy, and methodology.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-surface transition-colors duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-poppins)] text-[15px] md:text-base font-semibold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-surface-2 border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-mint" : "text-text-secondary"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 md:px-6 md:pb-6 text-sm text-text-secondary leading-relaxed border-t border-border/50 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-text-tertiary">
            Have a custom calculation or question?{" "}
            <a
              href="mailto:fermor.in.contact@gmail.com"
              className="text-mint hover:underline font-medium"
            >
              Reach out to our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
