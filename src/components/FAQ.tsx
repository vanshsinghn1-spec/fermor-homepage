"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import FermorLogo from "@/components/FermorLogo";

const faqs = [
  {
    value: "item-1",
    question: "Is Fermor completely free to use? Are there hidden fees or paywalls?",
    answer:
      "Yes, 100% free forever. All our calculators (SIP, EMI, FD, Tax, PPF, NPS), compounding projections, and educational materials have zero paywalls, subscription models, or locked premium tiers. Our mission is to make mathematical financial clarity available to every Indian.",
  },
  {
    value: "item-2",
    question: "Do you store my private salary, loan amounts, or net worth on your servers?",
    answer:
      "No. All mathematical operations run entirely client-side inside your browser's local sandbox memory. Your confidential numbers are never dispatched, logged, or saved to any remote database. You can even run our calculators with your internet connection disabled.",
  },
  {
    value: "item-3",
    question: "How do Fermor's calculation formulas compare against Indian retail banks?",
    answer:
      "Our formulas strictly adhere to Indian regulatory frameworks: Fixed Deposits follow official RBI quarterly compounding protocols, EMIs use the standard reducing balance method mandated for commercial lenders, and our SIP projections use monthly annuity-due calculations benchmarked against long-term historical Nifty 50 index trends.",
  },
  {
    value: "item-4",
    question: "Do you push financial products or earn covert affiliate commissions?",
    answer:
      "No. Traditional aggregator websites operate as lead-generation call centers that sell your contact details to insurance agents. Fermor was founded on open methodology and complete transparency. We do not sell insurance, push high-interest personal loans, or skew calculator outcomes for sponsorship fees.",
  },
  {
    value: "item-5",
    question: "Are your tax tools updated for the latest Union Budget provisions?",
    answer:
      "Yes. Our tax calculators are updated for the New Tax Regime revisions — including the increased Standard Deduction (₹75,000 for salaried employees), revised tax slab thresholds, and marginal relief calculations under Section 87A.",
  },
  {
    value: "item-6",
    question: "Why do you provide an 'Adjust for 6% Inflation' toggle?",
    answer:
      "Most Indian calculators deceive investors by showcasing a dazzling nominal number (e.g., 'Your SIP will become ₹1 Crore in 20 years!') without accounting for eroding purchasing power. At an average 6% CPI inflation, ₹1 Crore in 20 years has the real purchasing equivalent of ~₹31.1 Lakhs today. Fermor shows you the unvarnished reality so you can plan adequately.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="blue" className="mb-4">
            Common Inquiries
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-slate-900 dark:text-zinc-100 mb-4">
            Frequently Asked{" "}
            <span className="text-slate-400 dark:text-zinc-500">Questions.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Everything you need to know about our privacy architecture, calculation accuracy, and regulatory compliance.
          </p>
        </div>

        {/* Shadcn Radix Accordion */}
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value} className="bg-white/80 dark:bg-zinc-950/60 border-slate-200/90 dark:border-zinc-800/80 shadow-sm dark:shadow-none">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-slate-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support contact card */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/60 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-md dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FermorLogo className="w-5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-zinc-200">
                Have a question or custom calculation formula?
              </div>
              <div className="text-xs text-slate-500 dark:text-zinc-500">
                Our engineering team responds to all methodology inquiries.
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:fermor.in.contact@gmail.com">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
