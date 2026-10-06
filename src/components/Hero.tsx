"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from "lucide-react";
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

  const r = rate / 100 / 12;
  const n = years * 12;
  const futureValue =
    r === 0 ? quickSip * n : quickSip * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const invested = quickSip * n;
  const wealthGained = Math.max(0, futureValue - invested);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Floating pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-sm backdrop-blur-md">
            <FermorLogo className="w-4 h-3 text-emerald-600 dark:text-[#75FB90]" />
            <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 tracking-wide">
              Fermor 2.0 • Honest Personal Finance for India
            </span>
            <span className="text-slate-300 dark:text-zinc-700">|</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium hidden sm:inline">
              100% In-Browser Privacy
            </span>
          </div>
        </motion.div>

        {/* Hero Title - Guaranteed High Contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-[#101214] dark:text-white max-w-4xl leading-[1.08] mb-6"
        >
          Master your money with{" "}
          <span className="text-emerald-600 dark:text-[#75FB90]">
            transparent math
          </span>.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-xl text-[#5B6065] dark:text-zinc-400 max-w-2xl leading-relaxed mb-10"
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
          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#75FB90] dark:hover:bg-[#65ea80] dark:text-[#0D0F11] shadow-md transition-all duration-200"
          >
            <span>Launch Calculator Suite</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#principles"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-slate-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#75FB90]" />
            <span>Explore Our Principles</span>
          </a>
        </motion.div>

        {/* Interactive Live Compounding Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl text-left"
        >
          <div className="relative rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#131619] p-6 md:p-8 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-zinc-800/80 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-[#75FB90]/15 flex items-center justify-center text-emerald-600 dark:text-[#75FB90]">
                  <FermorLogo className="w-5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101214] dark:text-white flex items-center gap-2">
                    Instant SIP Simulation
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-[#75FB90]/20 dark:text-[#75FB90] uppercase tracking-wider">
                      Live
                    </span>
                  </h3>
                  <p className="text-xs text-[#5B6065] dark:text-zinc-500">10-Year Horizon @ 12% p.a. Compounding</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-500 dark:text-zinc-400">Monthly SIP:</span>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#75FB90] bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-2.5 py-1 rounded-md">
                  ₹{quickSip.toLocaleString("en-IN")}/mo
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="pt-6 pb-5">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-zinc-400 mb-2 font-medium">
                <span>Slide to simulate investment size:</span>
                <span className="text-emerald-700 dark:text-[#75FB90] font-bold font-mono">
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

            {/* Live Projected Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 p-3.5">
                <div className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                  Total Invested
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-zinc-100 font-mono mt-1">
                  {formatINR(invested)}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">Over 10 years</div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80 p-3.5">
                <div className="text-[11px] font-medium text-emerald-700 dark:text-[#75FB90] uppercase tracking-wider font-mono">
                  Estimated Growth
                </div>
                <div className="text-lg font-bold text-emerald-700 dark:text-[#75FB90] font-mono mt-1">
                  +{formatINR(wealthGained)}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">Compound returns</div>
              </div>

              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 p-3.5">
                <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 uppercase tracking-wider font-mono">
                  Total Future Value
                </div>
                <div className="text-xl font-extrabold text-emerald-800 dark:text-[#75FB90] font-mono mt-1">
                  {formatINR(futureValue)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">Projected corpus</div>
              </div>
            </div>

            {/* Bottom mini guarantee */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-zinc-800/60 text-xs text-slate-500 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-[#75FB90]" />
                Runs 100% on device. Zero data sent to servers.
              </span>
              <a
                href="#calculator"
                className="text-emerald-700 dark:text-[#75FB90] hover:underline font-semibold flex items-center gap-1"
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
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-200 dark:border-zinc-800/70 pt-8"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#75FB90]" />
            <span>RBI Standard Quarterly Compounding</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#75FB90]" />
            <span>CBDT FY 2025-26 Tax Slabs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#75FB90]" />
            <span>Strict Zero-Promotion Policy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
