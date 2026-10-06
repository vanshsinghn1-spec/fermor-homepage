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
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-[#101214] mb-4">
            Frequently Asked{" "}
            <span className="text-slate-400">Questions.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5B6065] leading-relaxed">
            Everything you need to know about our privacy architecture, calculation accuracy, and regulatory compliance.
          </p>
        </div>

        {/* Shadcn Radix Accordion */}
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value} className="bg-white border-slate-200 shadow-sm">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-[#101214] hover:text-emerald-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[#5B6065] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support contact card */}
        <div className="mt-12 p-6 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <FermorLogo className="w-5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#101214]">
                Have a question or custom calculation formula?
              </div>
              <div className="text-xs text-slate-500">
                Our engineering team responds to all methodology inquiries.
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:fermor.in.contact@gmail.com" className="font-semibold text-slate-800">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
