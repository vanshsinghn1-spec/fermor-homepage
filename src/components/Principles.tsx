"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Lock,
  Scale,
  FileCode,
  Smartphone,
  ShieldAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    icon: Eye,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    title: "100% Mathematical Transparency",
    description:
      "Every calculator displays the raw mathematical formula, variable derivations, and compounding schedule. We never present arbitrary numbers without showing the underlying arithmetic.",
  },
  {
    icon: Lock,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    title: "Client-Side Zero-Knowledge Privacy",
    description:
      "All calculations execute entirely inside your device's browser memory. Your salary, net worth, liabilities, and investment figures never touch our servers.",
  },
  {
    icon: Scale,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    title: "Zero Covert Affiliate Commissions",
    description:
      "We do not push high-commission insurance policies or credit cards. When comparison tools rank financial instruments, order is determined purely by math, not sponsorship.",
  },
  {
    icon: FileCode,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    title: "Open Regulatory Methodologies",
    description:
      "Our algorithms adhere strictly to RBI Master Directions for quarterly term deposits, CBDT circulars for tax rebates, and standard reducing-balance loan amortization schedules.",
  },
  {
    icon: Smartphone,
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    title: "Mobile-First Performance",
    description:
      "Over 75% of Indian internet users make decisions on smartphones. Our calculators use zero-bundle native SVG mathematics for sub-second, 60fps responsiveness on any screen.",
  },
  {
    icon: ShieldAlert,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    title: "No Mandatory Phone Number Walls",
    description:
      "Most portals capture your mobile number to trigger aggressive outbound call center loops. Fermor's calculators are completely open without forced registration.",
  },
];

export default function Principles() {
  return (
    <section id="principles" className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4">
            Our Architectural Standard
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-slate-900 dark:text-zinc-100 mb-4">
            Built on principles,{" "}
            <span className="text-slate-400 dark:text-zinc-500">not paywalls.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Indian retail finance is plagued by aggressive lead-generation funnels. Fermor is engineered to be the honest, quiet counterweight.
          </p>
        </div>

        {/* Contrast Comparison Banner */}
        <div className="mb-14 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-950/70 p-6 md:p-8 backdrop-blur-xl shadow-lg dark:shadow-none">
          <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-6 text-center font-[family-name:var(--font-poppins)]">
            How Fermor Compares to Traditional Financial Portals
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Industry Norm */}
            <div className="rounded-2xl bg-rose-50/70 dark:bg-zinc-900/50 border border-rose-200 dark:border-zinc-800/70 p-5 space-y-3.5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>The Industry Norm (Lead Gen Engines)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Forces mobile OTP verification before displaying calculation results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Sells your phone number to 3rd-party insurance & loan telemarketers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Ranks mutual funds & insurance based on behind-the-scenes commissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Opaque black-box calculations with no visible mathematical formulas</span>
                </li>
              </ul>
            </div>

            {/* The Fermor Standard */}
            <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 p-5 space-y-3.5">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Fermor Standard (Unbiased Math)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>100% open calculators with zero login or phone registration required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Client-side in-browser execution. Zero financial data stored or transmitted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Unbiased recommendations calculated purely from objective mathematical rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Full formula proofs, variable inspection, and amortized schedules provided</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card className="h-full p-6 bg-white/80 dark:bg-zinc-950/70 border-slate-200/90 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-md dark:shadow-none group">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
