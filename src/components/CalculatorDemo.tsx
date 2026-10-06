"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Percent,
  Calendar,
  Layers,
  Table as TableIcon,
  LineChart,
  ShieldCheck,
  ChevronDown,
  Info,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
  const [emiPrincipal, setEmiPrincipal] = useState<number>(4500000); // 45 Lakhs Home Loan
  const [emiRate, setEmiRate] = useState<number>(8.75);
  const [emiYears, setEmiYears] = useState<number>(20);

  // FD Inputs
  const [fdPrincipal, setFdPrincipal] = useState<number>(500000);
  const [fdRate, setFdRate] = useState<number>(7.2);
  const [fdYears, setFdYears] = useState<number>(5);

  const inflationRate = 0.06; // standard 6% long-term Indian CPI inflation

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

    // Default: Fixed Deposit (Quarterly Compounding)
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

  // SVG Chart Path
  const pathD = useMemo(() => {
    if (!data.points.length) return "";
    return data.points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${(100 - p.y).toFixed(1)}`)
      .join(" ");
  }, [data.points]);

  const areaD = pathD ? `${pathD} L 100 100 L 0 100 Z` : "";

  return (
    <section id="calculator" className="relative py-28 md:py-36 px-4 md:px-8">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-emerald-500/[0.04] blur-[170px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="mint" className="mb-4">
            Interactive Financial Engine
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-zinc-100 mb-4">
            See the math.{" "}
            <span className="text-zinc-500">Not just the answer.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every calculator displays full formula proofs, inflation adjustments, and granular schedules. Calculated 100% locally on your machine.
          </p>
        </div>

        {/* Tab Selection Bar with Framer Motion layoutId pill */}
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
                  isActive ? "text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-calc-pill"
                    className="absolute inset-0 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)] -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Workstation Card */}
        <Card className="p-6 md:p-10 border-zinc-800/90 bg-zinc-950/85 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] specular-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-6 space-y-7">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 font-[family-name:var(--font-poppins)]">
                    {data.title}
                  </h3>
                  <p className="text-xs text-zinc-500">Fine-tune variables in real time</p>
                </div>

                {/* Inflation Reality Check Toggle */}
                {(activeTab === "SIP" || activeTab === "Lumpsum") && (
                  <button
                    onClick={() => setAdjustInflation(!adjustInflation)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      adjustInflation
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${adjustInflation ? "text-amber-400" : "text-zinc-500"}`} />
                    <span>{adjustInflation ? "Inflation: 6% Adjusted" : "Adjust for Inflation"}</span>
                  </button>
                )}
              </div>

              {/* Slider 1: Capital Amount */}
              {activeTab === "SIP" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Monthly Contribution
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1.5 Lakh</span>
                  </div>
                </div>
              )}

              {activeTab === "Lumpsum" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Total Initial Investment
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>
              )}

              {activeTab === "EMI" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Principal Loan Amount
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                    <span>₹1 Lakh</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1.5 Cr</span>
                  </div>
                </div>
              )}

              {activeTab === "FD" && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      Deposit Amount
                    </label>
                    <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5 Lakhs</span>
                    <span>₹20 Lakhs</span>
                  </div>
                </div>
              )}

              {/* Slider 2: Annual Rate */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {activeTab === "EMI" ? "Interest Rate (p.a.)" : "Expected Growth Rate (p.a.)"}
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                  <span>{activeTab === "FD" ? "3%" : activeTab === "EMI" ? "6%" : "5%"}</span>
                  <span className="text-zinc-400">
                    {activeTab === "FD"
                      ? "7.1% (Standard FD)"
                      : activeTab === "EMI"
                      ? "8.75% (Prime Home Loan)"
                      : "12% (Nifty 50 15-Yr Avg)"}
                  </span>
                  <span>{activeTab === "FD" ? "10%" : activeTab === "EMI" ? "18%" : "30%"}</span>
                </div>
              </div>

              {/* Slider 3: Tenure Years */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Time Horizon
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
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
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
                  <span>1 yr</span>
                  <span>{activeTab === "FD" ? "5 yrs" : "15 yrs"}</span>
                  <span>{activeTab === "FD" ? "10 yrs" : activeTab === "EMI" ? "30 yrs" : "35 yrs"}</span>
                </div>
              </div>

              {/* Collapsible Math Formula Verification Drawer */}
              <div className="pt-2">
                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-400" />
                    <span>Inspect Mathematical Methodology</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
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
                      <div className="p-4 mt-2 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs">
                        <div className="font-semibold text-zinc-200">
                          {data.formulaName}
                        </div>
                        <div className="font-mono bg-zinc-950 p-2.5 rounded-lg text-emerald-400 border border-zinc-800 break-all text-[11px]">
                          {data.formula}
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-[11px]">
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
                {/* View Switcher Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {activeTab === "EMI" ? "Repayment Amortization" : "Wealth Accumulation"}
                    </span>
                    {adjustInflation && (
                      <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">
                        Inflation Adjusted
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => setViewMode("chart")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        viewMode === "chart"
                          ? "bg-zinc-800 text-emerald-400 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <LineChart className="w-3.5 h-3.5" />
                      <span>Chart</span>
                    </button>
                    <button
                      onClick={() => setViewMode("schedule")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        viewMode === "schedule"
                          ? "bg-zinc-800 text-emerald-400 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span>Schedule</span>
                    </button>
                  </div>
                </div>

                {/* Visual Screen */}
                {viewMode === "chart" ? (
                  <div className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 mb-5 h-[230px] flex flex-col justify-between overflow-hidden">
                    {/* Top markers */}
                    <div className="flex justify-between items-start text-[11px] text-zinc-500 font-mono z-10">
                      <span>Baseline Year 0</span>
                      <span className="text-emerald-400 font-bold">
                        {formatINR(data.val3)}
                      </span>
                    </div>

                    {/* SVG Curve */}
                    <div className="absolute inset-x-0 bottom-0 top-8 px-4 pb-3">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaD} fill="url(#chartGrad)" />
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="2.2"
                          vectorEffect="non-scaling-stroke"
                        />
                        {data.points.length > 0 && (
                          <circle
                            cx={data.points[data.points.length - 1].x}
                            cy={100 - data.points[data.points.length - 1].y}
                            r="3.5"
                            fill="#34d399"
                            filter="drop-shadow(0 0 8px rgba(52, 211, 153, 0.9))"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Bottom markers */}
                    <div className="flex justify-between items-end text-[11px] text-zinc-500 font-mono z-10">
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
                  <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-3 mb-5 h-[230px] overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-[11px]">
                          <th className="pb-2 font-medium">Timeline</th>
                          <th className="pb-2 font-medium">Invested / Principal</th>
                          <th className="pb-2 font-medium">Growth / Int.</th>
                          <th className="pb-2 font-medium text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {data.schedule.map((row) => (
                          <tr key={row.year} className="hover:bg-zinc-800/30">
                            <td className="py-2 text-zinc-400">Yr {row.year}</td>
                            <td className="py-2 text-zinc-300">{formatINR(row.invested)}</td>
                            <td className="py-2 text-emerald-400 font-semibold">{formatINR(row.returns)}</td>
                            <td className="py-2 text-right font-bold text-zinc-100">
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
                  <div className="rounded-xl bg-zinc-900/70 border border-zinc-800/80 p-3.5 text-left">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {data.label1}
                    </div>
                    <div className="text-lg font-bold font-mono text-zinc-200 mt-1">
                      {formatINR(data.val1)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-zinc-900/70 border border-zinc-800/80 p-3.5 text-left">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {data.label2}
                    </div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                      {formatINR(data.val2)}
                    </div>
                  </div>
                </div>

                {/* Grand Total Box */}
                <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30 p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {data.label3}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1 font-[family-name:var(--font-poppins)]">
                      {formatINR(data.val3, true)}
                    </div>
                    {adjustInflation && (
                      <div className="text-[11px] text-zinc-500 mt-0.5">
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
                <p className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Calculations run client-side. Zero telemetry or server logging.</span>
                </p>
              </div>
            </div>

          </div>
        </Card>

        {/* 20+ Financial Calculators Strip */}
        <div className="mt-14 text-center">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Explore 20+ specialized calculators built for the Indian tax code
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              { name: "New vs Old Tax Regime", tag: "Budget '26" },
              { name: "Step-Up SIP Planner", tag: "Annual Hike" },
              { name: "PPF (Public Provident Fund)", tag: "7.1% Tax-Free" },
              { name: "NPS Tier 1 & 2", tag: "Sec 80CCD(1B)" },
              { name: "Home Loan Prepayment", tag: "Save Lakhs" },
              { name: "HRA Exemption Calculator", tag: "Sec 10(13A)" },
              { name: "Gratuity Estimator", tag: "Formula" },
              { name: "CAGR & XIRR Multi-Cashflow", tag: "Equity" },
            ].map((tool) => (
              <a
                key={tool.name}
                href="#cta"
                className="group flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-200"
              >
                <span>{tool.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 group-hover:text-emerald-300 group-hover:bg-emerald-500/10 transition-colors">
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
