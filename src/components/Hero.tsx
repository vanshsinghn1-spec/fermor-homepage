"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FermorLogo from "@/components/FermorLogo";

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function Hero() {
  const [quickSip, setQuickSip] = useState<number>(10000);
  const years = 10;
  const rate = 12;

  // Monthly compounding SIP formula
  const r = rate / 100 / 12;
  const n = years * 12;
  const futureValue =
    r === 0 ? quickSip * n : quickSip * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const invested = quickSip * n;
  const wealthGained = Math.max(0, futureValue - invested);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Floating pill badge with official Fermor Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-md shadow-sm">
            <FermorLogo className="w-5 h-3.5 text-emerald-600 dark:text-[#75FB90]" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide">
              Fermor 2.0 • Honest Indian Personal Finance
            </span>
            <span className="text-slate-300 dark:text-zinc-600">|</span>
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium hidden sm:inline">
              100% In-Browser Privacy
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-slate-900 dark:text-zinc-100 max-w-4xl leading-[1.08] mb-6"
        >
          Master your money with{" "}
          <span className="text-gradient-emerald">transparent math</span>.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          No login walls. No cold calls. No disguised commissions. Free calculators, tax models, and portfolio intelligence built specifically for India.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-14 w-full sm:w-auto"
        >
          <Button variant="glow" size="lg" className="w-full sm:w-auto gap-2" asChild>
            <a href="#calculator">
              <span>Launch Calculator Suite</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2" asChild>
            <a href="#principles">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Explore Our Principles</span>
            </a>
          </Button>
        </motion.div>

        {/* Interactive Live Compounding Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <div className="relative rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-950/80 p-6 md:p-8 backdrop-blur-2xl shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] specular-border">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-zinc-800/80 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  <FermorLogo className="w-5 h-3.5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                    Instant SIP Simulation
                    <Badge variant="mint" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                      Live
                    </Badge>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">10-Year Horizon @ 12% p.a. Compounding</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-500 dark:text-zinc-400">Monthly SIP:</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-2.5 py-1 rounded-md">
                  ₹{quickSip.toLocaleString("en-IN")}/mo
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="pt-6 pb-5">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-zinc-400 mb-2 font-medium">
                <span>Slide to simulate investment size:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                  {formatINR(quickSip)} per month
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={quickSip}
                onChange={(e) => setQuickSip(Number(e.target.value))}
                className="w-full"
                aria-label="Quick SIP Investment Slider"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1.5 font-mono">
                <span>₹1,000/mo</span>
                <span>₹50,000/mo</span>
                <span>₹1,00,000/mo</span>
              </div>
            </div>

            {/* Live Projected Metrics with Rich Color Coding */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 p-3.5 text-left">
                <div className="text-[11px] font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  You Invest
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-zinc-200 font-mono mt-1">
                  {formatINR(invested)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5">Over 10 years</div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 p-3.5 text-left">
                <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Estimated Growth
                </div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  +{formatINR(wealthGained)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5">Compound interest</div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-indigo-50 dark:from-emerald-950/20 to-teal-50 dark:to-teal-950/20 border border-indigo-200 dark:border-emerald-500/30 p-3.5 text-left">
                <div className="text-[11px] font-medium text-indigo-600 dark:text-emerald-300 uppercase tracking-wider">
                  Total Future Value
                </div>
                <div className="text-xl font-extrabold text-indigo-700 dark:text-emerald-400 font-mono mt-1">
                  {formatINR(futureValue)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">Purchasing power estimate</div>
              </div>
            </div>

            {/* Bottom mini guarantee */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-zinc-800/60 text-xs text-slate-500 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                Runs 100% on device. Zero data sent to servers.
              </span>
              <a
                href="#calculator"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium flex items-center gap-1"
              >
                Open Full Engine →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Ecosystem Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 dark:text-zinc-400 border-t border-slate-200 dark:border-zinc-800/70 pt-8"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>RBI Standard Quarterly Compounding</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-500" />
            <span>CBDT FY 2025-26 Tax Slabs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <span>Strict Zero-Promotion Policy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
