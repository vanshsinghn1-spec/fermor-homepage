"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table as TableIcon,
  LineChart,
  ShieldCheck,
  ChevronDown,
  Info,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import FermorLogo from "@/components/FermorLogo";

type CalculatorType = "SIP" | "Lumpsum" | "EMI" | "FD";

function formatINR(n: number, full: boolean = false): string {
  if (isNaN(n) || !isFinite(n)) return "₹0";
  const rounded = Math.round(n);
  if (!full) {
    if (rounded >= 10000000) return `₹${(rounded / 10000000).toFixed(2)} Cr`;
    if (rounded >= 100000) return `₹${(rounded / 100000).toFixed(2)} L`;
  }
  return `₹${rounded.toLocaleString("en-IN")}`;
}

export default function CalculatorDemo() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("SIP");
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [viewMode, setViewMode] = useState<"chart" | "schedule">("chart");
  const [showFormula, setShowFormula] = useState(false);

  // SIP Inputs
  const [sipMonthly, setSipMonthly] = useState<number>(15000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(15);

  // Lumpsum Inputs
  const [lumpPrincipal, setLumpPrincipal] = useState<number>(200000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // EMI Inputs
  const [emiPrincipal, setEmiPrincipal] = useState<number>(4500000);
  const [emiRate, setEmiRate] = useState<number>(8.75);
  const [emiYears, setEmiYears] = useState<number>(20);

  // FD Inputs
  const [fdPrincipal, setFdPrincipal] = useState<number>(500000);
  const [fdRate, setFdRate] = useState<number>(7.2);
  const [fdYears, setFdYears] = useState<number>(5);

  const inflationRate = 0.06;

  // Calculation Engine
  const data = useMemo(() => {
    if (activeTab === "SIP") {
      const i = sipRate / 100 / 12;
      const n = sipYears * 12;
      const nominalFV =
        i === 0
          ? sipMonthly * n
          : sipMonthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const totalInvested = sipMonthly * n;
      const realFV = nominalFV / Math.pow(1 + inflationRate, sipYears);
      const displayFV = adjustInflation ? realFV : nominalFV;
      const wealthGained = Math.max(0, displayFV - totalInvested);

      const points: { x: number; y: number; year: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      for (let yr = 0; yr <= sipYears; yr++) {
        const m = yr * 12;
        const inv = sipMonthly * m;
        let v =
          i === 0
            ? inv
            : sipMonthly * (((Math.pow(1 + i, m) - 1) / i) * (1 + i));
        if (adjustInflation && yr > 0) {
          v = v / Math.pow(1 + inflationRate, yr);
        }

        points.push({
          x: sipYears > 0 ? (yr / sipYears) * 100 : 0,
          y: nominalFV > 0 ? (v / (adjustInflation ? realFV : nominalFV)) * 100 : 0,
          year: yr,
        });

        if (yr > 0 && (yr === 1 || yr % (sipYears > 15 ? 5 : 2) === 0 || yr === sipYears)) {
          schedule.push({
            year: yr,
            invested: inv,
            returns: Math.max(0, v - inv),
            total: v,
          });
        }
      }

      return {
        title: "Systematic Investment Plan (SIP)",
        label1: "Total Amount Invested",
        val1: totalInvested,
        label2: adjustInflation ? "Real Wealth Created" : "Est. Capital Gains",
        val2: wealthGained,
        label3: adjustInflation ? "Real Purchasing Power" : "Projected Corpus",
        val3: displayFV,
        nominalValue: nominalFV,
        realValue: realFV,
        points,
        schedule,
        formula: "FV = P × [((1 + r/12)^n - 1) / (r/12)] × (1 + r/12)",
        formulaName: "Future Value of Annuity-Due",
        explanation:
          "Compounded monthly at beginning of each period. Benchmarked against long-term Nifty 50 historical index compounding (12% CAGR).",
      };
    }

    if (activeTab === "Lumpsum") {
      const r = lumpRate / 100;
      const nominalFV = lumpPrincipal * Math.pow(1 + r, lumpYears);
      const realFV = nominalFV / Math.pow(1 + inflationRate, lumpYears);
      const displayFV = adjustInflation ? realFV : nominalFV;
      const wealthGained = Math.max(0, displayFV - lumpPrincipal);

      const points: { x: number; y: number; year: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      for (let yr = 0; yr <= lumpYears; yr++) {
        let v = lumpPrincipal * Math.pow(1 + r, yr);
        if (adjustInflation && yr > 0) {
          v = v / Math.pow(1 + inflationRate, yr);
        }
        points.push({
          x: lumpYears > 0 ? (yr / lumpYears) * 100 : 0,
          y: nominalFV > 0 ? (v / (adjustInflation ? realFV : nominalFV)) * 100 : 0,
          year: yr,
        });

        if (yr > 0 && (yr === 1 || yr % (lumpYears > 15 ? 5 : 2) === 0 || yr === lumpYears)) {
          schedule.push({
            year: yr,
            invested: lumpPrincipal,
            returns: Math.max(0, v - lumpPrincipal),
            total: v,
          });
        }
      }

      return {
        title: "Lumpsum Mutual Fund Investment",
        label1: "Initial Capital Deposited",
        val1: lumpPrincipal,
        label2: adjustInflation ? "Real Capital Growth" : "Est. Wealth Added",
        val2: wealthGained,
        label3: adjustInflation ? "Real Purchasing Power" : "Maturity Corpus",
        val3: displayFV,
        nominalValue: nominalFV,
        realValue: realFV,
        points,
        schedule,
        formula: "A = P × (1 + r)^t",
        formulaName: "Annual Compound Interest",
        explanation:
          "Exponential annual compounding on one-time lump-sum equity or debt allocation.",
      };
    }

    if (activeTab === "EMI") {
      const r = emiRate / 12 / 100;
      const n = emiYears * 12;
      const monthlyEmi =
        r === 0
          ? emiPrincipal / n
          : (emiPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyEmi * n;
      const totalInterest = Math.max(0, totalPayment - emiPrincipal);

      const points: { x: number; y: number; year: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      let balance = emiPrincipal;
      let cumInterest = 0;
      let cumPrincipal = 0;

      for (let yr = 0; yr <= emiYears; yr++) {
        points.push({
          x: emiYears > 0 ? (yr / emiYears) * 100 : 0,
          y: emiPrincipal > 0 ? (balance / emiPrincipal) * 100 : 0,
          year: yr,
        });

        if (yr > 0 && (yr === 1 || yr % (emiYears > 15 ? 5 : 2) === 0 || yr === emiYears)) {
          schedule.push({
            year: yr,
            invested: cumPrincipal,
            returns: cumInterest,
            total: balance,
          });
        }

        for (let m = 0; m < 12; m++) {
          const interestMonth = balance * r;
          const principalMonth = monthlyEmi - interestMonth;
          balance = Math.max(0, balance - principalMonth);
          cumInterest += interestMonth;
          cumPrincipal += principalMonth;
        }
      }

      return {
        title: "Loan EMI & Reducing Balance",
        label1: "Sanctioned Loan Principal",
        val1: emiPrincipal,
        label2: "Total Interest Paid to Bank",
        val2: totalInterest,
        label3: "Monthly EMI Payment",
        val3: monthlyEmi,
        nominalValue: totalPayment,
        realValue: totalPayment,
        points,
        schedule,
        formula: "EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]",
        formulaName: "Standard Reducing Balance Amortization",
        explanation:
          "Official banking formula recognized by RBI. Interest is levied exclusively on the declining outstanding principal each month.",
      };
    }

    // Default: Fixed Deposit
    const quarterlyRate = fdRate / 100 / 4;
    const quarters = fdYears * 4;
    const maturityVal = fdPrincipal * Math.pow(1 + quarterlyRate, quarters);
    const fdInterest = maturityVal - fdPrincipal;

    const points: { x: number; y: number; year: number }[] = [];
    const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

    for (let yr = 0; yr <= fdYears; yr++) {
      const v = fdPrincipal * Math.pow(1 + quarterlyRate, yr * 4);
      points.push({
        x: fdYears > 0 ? (yr / fdYears) * 100 : 0,
        y: maturityVal > 0 ? (v / maturityVal) * 100 : 0,
        year: yr,
      });

      if (yr > 0 && (yr === 1 || yr % (fdYears > 5 ? 2 : 1) === 0 || yr === fdYears)) {
        schedule.push({
          year: yr,
          invested: fdPrincipal,
          returns: v - fdPrincipal,
          total: v,
        });
      }
    }

    return {
      title: "Bank Fixed Deposit (FD)",
      label1: "Principal Term Deposit",
      val1: fdPrincipal,
      label2: "Guaranteed Interest Accrued",
      val2: fdInterest,
      label3: "Final Maturity Value",
      val3: maturityVal,
      nominalValue: maturityVal,
      realValue: maturityVal / Math.pow(1 + inflationRate, fdYears),
      points,
      schedule,
      formula: "A = P × (1 + r/4)^(4 × t)",
      formulaName: "RBI Quarterly Compounding Protocol",
      explanation:
        "Per RBI guidelines, all scheduled commercial Indian banks (SBI, HDFC, ICICI) compound interest on term deposits quarterly.",
    };
  }, [
    activeTab,
    adjustInflation,
    sipMonthly,
    sipRate,
    sipYears,
    lumpPrincipal,
    lumpRate,
    lumpYears,
    emiPrincipal,
    emiRate,
    emiYears,
    fdPrincipal,
    fdRate,
    fdYears,
  ]);

  const pathD = useMemo(() => {
    if (!data.points.length) return "";
    return data.points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${(100 - p.y).toFixed(1)}`)
      .join(" ");
  }, [data.points]);

  const areaD = pathD ? `${pathD} L 100 100 L 0 100 Z` : "";

  return (
    <section id="calculator" className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="mint" className="gap-1.5 py-1 px-3">
              <FermorLogo className="w-4 h-3" />
              <span>Interactive Financial Engine</span>
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-slate-900 dark:text-zinc-100 mb-4">
            See the math.{" "}
            <span className="text-slate-400 dark:text-zinc-500">Not just the answer.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Every calculator displays full formula proofs, inflation adjustments, and granular schedules. Calculated 100% locally on your machine.
          </p>
        </div>

        {/* Tab Selection Bar with Framer Motion layoutId */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(
            [
              { id: "SIP", label: "📈 SIP Accumulator" },
              { id: "Lumpsum", label: "💰 Lumpsum" },
              { id: "EMI", label: "🏠 Loan EMI" },
              { id: "FD", label: "🏦 Fixed Deposit" },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-white dark:text-zinc-950 font-bold"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 bg-slate-100/80 dark:bg-zinc-900/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-calc-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 shadow-md -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workstation Card */}
        <Card className="p-6 md:p-10 border-slate-200/90 dark:border-zinc-800/90 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-xl dark:shadow-[0_25px_70px_rgba(0,0,0,0.5)] specular-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-6 space-y-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800/80">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 font-[family-name:var(--font-poppins)]">
                    {data.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">Fine-tune variables in real time</p>
                </div>

                {(activeTab === "SIP" || activeTab === "Lumpsum") && (
                  <button
                    onClick={() => setAdjustInflation(!adjustInflation)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      adjustInflation
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-300 shadow-sm"
                        : "border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${adjustInflation ? "text-amber-500" : "text-slate-400 dark:text-zinc-500"}`} />
                    <span>{adjustInflation ? "Inflation: 6% Adjusted" : "Adjust for Inflation"}</span>
                  </button>
                )}
              </div>

              {/* Slider 1 */}
              {activeTab === "SIP" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                      Monthly Contribution
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                      {formatINR(sipMonthly, true)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="150000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full"
                    aria-label="Monthly SIP Amount"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1.5 Lakh</span>
                  </div>
                </div>
              )}

              {activeTab === "Lumpsum" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                      Total Initial Investment
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                      {formatINR(lumpPrincipal, true)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={lumpPrincipal}
                    onChange={(e) => setLumpPrincipal(Number(e.target.value))}
                    className="w-full"
                    aria-label="Lumpsum Principal"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>
              )}

              {activeTab === "EMI" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                      Principal Loan Amount
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                      {formatINR(emiPrincipal, true)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="15000000"
                    step="50000"
                    value={emiPrincipal}
                    onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                    className="w-full"
                    aria-label="Loan Principal"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                    <span>₹1 Lakh</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1.5 Cr</span>
                  </div>
                </div>
              )}

              {activeTab === "FD" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                      Deposit Amount
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                      {formatINR(fdPrincipal, true)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={fdPrincipal}
                    onChange={(e) => setFdPrincipal(Number(e.target.value))}
                    className="w-full"
                    aria-label="FD Principal"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>
              )}

              {/* Slider 2: Rate */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    {activeTab === "EMI" ? "Interest Rate (p.a.)" : "Expected Growth Rate (p.a.)"}
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                    {activeTab === "SIP" && `${sipRate}%`}
                    {activeTab === "Lumpsum" && `${lumpRate}%`}
                    {activeTab === "EMI" && `${emiRate}%`}
                    {activeTab === "FD" && `${fdRate}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min={activeTab === "FD" ? "3" : activeTab === "EMI" ? "6" : "5"}
                  max={activeTab === "FD" ? "10" : activeTab === "EMI" ? "18" : "30"}
                  step="0.1"
                  value={
                    activeTab === "SIP"
                      ? sipRate
                      : activeTab === "Lumpsum"
                      ? lumpRate
                      : activeTab === "EMI"
                      ? emiRate
                      : fdRate
                  }
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (activeTab === "SIP") setSipRate(v);
                    else if (activeTab === "Lumpsum") setLumpRate(v);
                    else if (activeTab === "EMI") setEmiRate(v);
                    else setFdRate(v);
                  }}
                  className="w-full"
                  aria-label="Annual Rate"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                  <span>{activeTab === "FD" ? "3%" : activeTab === "EMI" ? "6%" : "5%"}</span>
                  <span className="text-slate-600 dark:text-zinc-400">
                    {activeTab === "FD"
                      ? "7.1% (Standard FD)"
                      : activeTab === "EMI"
                      ? "8.75% (Prime Home Loan)"
                      : "12% (Nifty 50 15-Yr Avg)"}
                  </span>
                  <span>{activeTab === "FD" ? "10%" : activeTab === "EMI" ? "18%" : "30%"}</span>
                </div>
              </div>

              {/* Slider 3: Years */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    Time Horizon
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 rounded-lg">
                    {activeTab === "SIP" && `${sipYears} Years`}
                    {activeTab === "Lumpsum" && `${lumpYears} Years`}
                    {activeTab === "EMI" && `${emiYears} Years`}
                    {activeTab === "FD" && `${fdYears} Years`}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={activeTab === "FD" ? "10" : activeTab === "EMI" ? "30" : "35"}
                  step="1"
                  value={
                    activeTab === "SIP"
                      ? sipYears
                      : activeTab === "Lumpsum"
                      ? lumpYears
                      : activeTab === "EMI"
                      ? emiYears
                      : fdYears
                  }
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (activeTab === "SIP") setSipYears(v);
                    else if (activeTab === "Lumpsum") setLumpYears(v);
                    else if (activeTab === "EMI") setEmiYears(v);
                    else setFdYears(v);
                  }}
                  className="w-full"
                  aria-label="Tenure Years"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                  <span>1 yr</span>
                  <span>{activeTab === "FD" ? "5 yrs" : "15 yrs"}</span>
                  <span>{activeTab === "FD" ? "10 yrs" : activeTab === "EMI" ? "30 yrs" : "35 yrs"}</span>
                </div>
              </div>

              {/* Methodology Inspection Drawer */}
              <div className="pt-2">
                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Inspect Mathematical Methodology</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 dark:text-zinc-500 transition-transform duration-200 ${
                      showFormula ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showFormula && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 mt-2 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                        <div className="font-semibold text-slate-800 dark:text-zinc-200">
                          {data.formulaName}
                        </div>
                        <div className="font-mono bg-white dark:bg-zinc-950 p-2.5 rounded-lg text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 break-all text-[11px]">
                          {data.formula}
                        </div>
                        <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                          {data.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Visualization & Breakdown Results */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* View Switcher */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      {activeTab === "EMI" ? "Repayment Amortization" : "Wealth Accumulation"}
                    </span>
                    {adjustInflation && (
                      <Badge variant="outline" className="text-[10px] text-amber-600 dark:text-amber-400 border-amber-500/30">
                        Inflation Adjusted
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-900/80 p-1 rounded-xl border border-slate-200 dark:border-zinc-800">
                    <button
                      onClick={() => setViewMode("chart")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        viewMode === "chart"
                          ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                          : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      <LineChart className="w-3.5 h-3.5" />
                      <span>Chart</span>
                    </button>
                    <button
                      onClick={() => setViewMode("schedule")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        viewMode === "schedule"
                          ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                          : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>

                {/* Visual View */}
                {viewMode === "chart" ? (
                  <div className="relative rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 p-4 mb-5 h-[230px] flex flex-col justify-between overflow-hidden">
                    <div className="flex justify-between items-start text-[11px] text-slate-500 dark:text-zinc-500 font-mono z-10">
                      <span>Baseline Year 0</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {formatINR(data.val3)}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 top-8 px-4 pb-3">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaD} fill="url(#chartGrad)" />
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.4"
                          vectorEffect="non-scaling-stroke"
                        />
                        {data.points.length > 0 && (
                          <circle
                            cx={data.points[data.points.length - 1].x}
                            cy={100 - data.points[data.points.length - 1].y}
                            r="3.5"
                            fill="#10b981"
                            filter="drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))"
                          />
                        )}
                      </svg>
                    </div>

                    <div className="flex justify-between items-end text-[11px] text-slate-400 dark:text-zinc-500 font-mono z-10">
                      <span>0 yrs</span>
                      <span>
                        {activeTab === "SIP"
                          ? `${sipYears} yrs`
                          : activeTab === "Lumpsum"
                          ? `${lumpYears} yrs`
                          : activeTab === "EMI"
                          ? `${emiYears} yrs`
                          : `${fdYears} yrs`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 p-3 mb-5 h-[230px] overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 text-[11px]">
                          <th className="pb-2 font-medium">Timeline</th>
                          <th className="pb-2 font-medium">Invested / Principal</th>
                          <th className="pb-2 font-medium">Growth / Int.</th>
                          <th className="pb-2 font-medium text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/50">
                        {data.schedule.map((row) => (
                          <tr key={row.year} className="hover:bg-slate-100/60 dark:hover:bg-zinc-800/30">
                            <td className="py-2 text-slate-600 dark:text-zinc-400">Yr {row.year}</td>
                            <td className="py-2 text-slate-700 dark:text-zinc-300">{formatINR(row.invested)}</td>
                            <td className="py-2 text-emerald-600 dark:text-emerald-400 font-semibold">{formatINR(row.returns)}</td>
                            <td className="py-2 text-right font-bold text-slate-900 dark:text-zinc-100">
                              {formatINR(row.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/90 dark:border-zinc-800/80 p-3.5 text-left">
                    <div className="text-xs font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      {data.label1}
                    </div>
                    <div className="text-lg font-bold font-mono text-slate-900 dark:text-zinc-200 mt-1">
                      {formatINR(data.val1)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200/90 dark:border-zinc-800/80 p-3.5 text-left">
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {data.label2}
                    </div>
                    <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                      {formatINR(data.val2)}
                    </div>
                  </div>
                </div>

                {/* Grand Total Box */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                      {data.label3}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 mt-1 font-[family-name:var(--font-poppins)]">
                      {formatINR(data.val3, true)}
                    </div>
                    {adjustInflation && (
                      <div className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5">
                        Nominal value before inflation: {formatINR(data.nominalValue, true)}
                      </div>
                    )}
                  </div>
                  <Button variant="glow" size="sm" asChild>
                    <a href="#cta">Model Goal</a>
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-slate-500 dark:text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Calculations run client-side. Zero telemetry or server logging.</span>
                </p>
              </div>
            </div>

          </div>
        </Card>

        {/* 20+ Financial Calculators Strip with Diverse Color Badges */}
        <div className="mt-14 text-center">
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider mb-4">
            Explore 20+ specialized calculators built for the Indian tax code
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              { name: "New vs Old Tax Regime", tag: "Budget '26", color: "bg-purple-500/10 text-purple-700 dark:text-purple-300" },
              { name: "Step-Up SIP Planner", tag: "Annual Hike", color: "bg-teal-500/10 text-teal-700 dark:text-teal-300" },
              { name: "PPF (Public Provident Fund)", tag: "7.1% Tax-Free", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
              { name: "NPS Tier 1 & 2", tag: "Sec 80CCD(1B)", color: "bg-sky-500/10 text-sky-700 dark:text-sky-300" },
              { name: "Home Loan Prepayment", tag: "Save Lakhs", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
              { name: "HRA Exemption Calculator", tag: "Sec 10(13A)", color: "bg-rose-500/10 text-rose-700 dark:text-rose-300" },
              { name: "Gratuity Estimator", tag: "Formula", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300" },
              { name: "CAGR & XIRR Multi-Cashflow", tag: "Equity", color: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
            ].map((tool) => (
              <a
                key={tool.name}
                href="#cta"
                className="group flex items-center gap-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 px-4 py-2 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 shadow-sm"
              >
                <span>{tool.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${tool.color}`}>
                  {tool.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
