"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  PieChart,
  Shield,
  Bot,
  ArrowUpRight,
  Zap,
  Sliders,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Features() {
  const [stepUpActive, setStepUpActive] = useState(false);

  return (
    <section id="features" className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="mint" className="mb-4">
            Unified Financial Suite
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-zinc-100 mb-4">
            One platform.{" "}
            <span className="text-zinc-500">Every money move.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            From calculating your first mutual fund installment to optimizing multi-slab income tax, Fermor equips you with high-precision instruments.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Card 1: Asset Allocation & Portfolio (Col-span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7"
          >
            <Card className="h-full flex flex-col justify-between p-6 md:p-8 bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[11px] text-zinc-400">
                    Macro Intelligence
                  </Badge>
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                  Portfolio Allocation & Risk Radar
                </CardTitle>
                <CardDescription className="mb-6">
                  Aggregate your Indian mutual funds, equities, Sovereign Gold Bonds, and provident funds into one transparent asset allocation map.
                </CardDescription>

                {/* Simulated Allocation Bar */}
                <div className="space-y-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-300 font-semibold">Active Portfolio Health</span>
                    <span className="text-emerald-400 font-bold">Sharpe: 1.42 (Optimal)</span>
                  </div>

                  {/* Multi-segmented progress bar */}
                  <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden flex">
                    <div className="bg-emerald-400 h-full w-[55%]" title="Indian Equities (55%)" />
                    <div className="bg-sky-400 h-full w-[20%]" title="Liquid Debt (20%)" />
                    <div className="bg-amber-400 h-full w-[15%]" title="Sovereign Gold (15%)" />
                    <div className="bg-purple-400 h-full w-[10%]" title="US Tech (10%)" />
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Equity: 55%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span>Debt: 20%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Gold: 15%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>US Tech: 10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-4 border-t border-zinc-900">
                <span>Real-time benchmark rebalancing cues</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  Explore Engine <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 2: Step-Up SIP Supercharger (Col-span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5"
          >
            <Card className="h-full flex flex-col justify-between p-6 md:p-8 bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <Badge variant="mint" className="text-[10px]">
                    Wealth Multiplier
                  </Badge>
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                  Step-Up SIP Planner
                </CardTitle>
                <CardDescription className="mb-5">
                  See what happens when you raise your SIP by 10% annually with yearly salary increments.
                </CardDescription>

                {/* Interactive Toggle for Flat vs Step Up */}
                <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 mb-5">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-zinc-400">Simulation: ₹10,000/mo @ 15 Yrs</span>
                    <button
                      onClick={() => setStepUpActive(!stepUpActive)}
                      className="text-xs font-semibold text-emerald-400 underline cursor-pointer"
                    >
                      {stepUpActive ? "Reset Flat" : "Enable 10% Step-Up"}
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                        {stepUpActive ? "Step-Up 10% Corpus" : "Standard Flat Corpus"}
                      </div>
                      <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
                        {stepUpActive ? "₹1.05 Crore" : "₹50.4 Lakhs"}
                      </div>
                    </div>
                    <Badge variant={stepUpActive ? "glow" : "secondary"} className="text-xs">
                      {stepUpActive ? "+108% Extra Growth" : "Baseline"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-900">
                Tuned for Indian IT & corporate increment cycles.
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 3: Union Budget Tax Optimizer (Col-span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5"
          >
            <Card className="h-full flex flex-col justify-between p-6 md:p-8 bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <Badge variant="purple" className="text-[10px]">
                    FY 2025-26
                  </Badge>
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                  New vs. Old Tax Engine
                </CardTitle>
                <CardDescription className="mb-5">
                  Side-by-side comparison including revised 87A rebate, standard deduction ₹75,000, and 80C/80D/HRA deductions.
                </CardDescription>

                <div className="space-y-2.5 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 text-xs font-mono">
                  <div className="flex justify-between pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400">Gross Salary ₹15,00,000</span>
                    <span className="text-zinc-300 font-bold">Tax Impact</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>New Tax Regime:</span>
                    <span className="text-emerald-400 font-semibold">₹1,17,000 (Recommended)</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Old Tax Regime (w/ 80C):</span>
                    <span>₹1,48,200</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span>Updated for current tax circulars</span>
                <span className="text-purple-400 font-medium">Verify Slabs →</span>
              </div>
            </Card>
          </motion.div>

          {/* Bento Card 4: Conversational Copilot "Ask Fermor" (Col-span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-7"
          >
            <Card className="h-full flex flex-col justify-between p-6 md:p-8 bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <Badge variant="blue" className="text-[10px]">
                    No-Jargon AI
                  </Badge>
                </div>

                <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                  Ask Fermor: Conversational Clarifier
                </CardTitle>
                <CardDescription className="mb-5">
                  Get plain-English answers to complex Indian personal finance queries grounded strictly in verified financial math.
                </CardDescription>

                {/* Simulated Conversational Preview */}
                <div className="space-y-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300 shrink-0">
                      U
                    </div>
                    <div className="bg-zinc-800/90 text-zinc-200 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed">
                      Should I prepay my home loan at 8.75% or invest the surplus into Nifty index funds?
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                      F
                    </div>
                    <div className="bg-emerald-950/30 border border-emerald-500/20 text-zinc-300 px-3 py-2.5 rounded-2xl rounded-tl-sm max-w-[90%] leading-relaxed">
                      <span className="font-semibold text-emerald-300 block mb-1">
                        Effective rate comparison:
                      </span>
                      Your post-tax home loan rate (after Sec 24b relief) is ~6.1%. Over 15+ years, historical index returns (12%) deliver a ~5.9% net spread advantage. However, prepaying gives a guaranteed risk-free return.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-500 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span>Grounded in mathematical truth, not sponsored ads.</span>
                <span className="text-sky-400 font-medium">Try Query →</span>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
