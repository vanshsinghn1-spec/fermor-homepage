"use client";

import { useState, useMemo } from "react";

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
  const [showFormula, setShowFormula] = useState(false);
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [activeView, setActiveView] = useState<"chart" | "schedule">("chart");

  // SIP inputs
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // Lumpsum inputs
  const [lumpPrincipal, setLumpPrincipal] = useState<number>(100000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // EMI inputs
  const [emiPrincipal, setEmiPrincipal] = useState<number>(3000000); // 30 Lakhs
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiYears, setEmiYears] = useState<number>(20);

  // FD inputs
  const [fdPrincipal, setFdPrincipal] = useState<number>(200000);
  const [fdRate, setFdRate] = useState<number>(7.1);
  const [fdYears, setFdYears] = useState<number>(5);

  const inflationRate = 0.06; // standard 6% inflation in India

  // Computations
  const calculations = useMemo(() => {
    if (activeTab === "SIP") {
      const i = sipRate / 100 / 12;
      const n = sipYears * 12;
      const nominalFV =
        i === 0
          ? sipMonthly * n
          : sipMonthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const totalInvested = sipMonthly * n;
      const finalVal = adjustInflation
        ? nominalFV / Math.pow(1 + inflationRate, sipYears)
        : nominalFV;
      const wealthGained = Math.max(0, finalVal - totalInvested);

      // Points for graph
      const points: { x: number; y: number; year: number; val: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      for (let yr = 0; yr <= sipYears; yr++) {
        const months = yr * 12;
        const investedSoFar = sipMonthly * months;
        let v =
          i === 0
            ? investedSoFar
            : sipMonthly * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
        if (adjustInflation && yr > 0) {
          v = v / Math.pow(1 + inflationRate, yr);
        }
        points.push({
          x: sipYears > 0 ? (yr / sipYears) * 100 : 0,
          y: nominalFV > 0 ? (v / (adjustInflation ? finalVal : nominalFV)) * 100 : 0,
          year: yr,
          val: v,
        });

        if (yr > 0 && (yr === 1 || yr % (sipYears > 15 ? 5 : 2) === 0 || yr === sipYears)) {
          schedule.push({
            year: yr,
            invested: investedSoFar,
            returns: Math.max(0, v - investedSoFar),
            total: v,
          });
        }
      }

      return {
        label1: "Total Invested",
        val1: totalInvested,
        label2: adjustInflation ? "Real Returns (Inflation Adj.)" : "Est. Wealth Gained",
        val2: wealthGained,
        label3: adjustInflation ? "Real Future Value" : "Expected Total Value",
        val3: finalVal,
        points,
        schedule,
        formulaName: "Future Value of Annuity Due",
        formulaLatex: "FV = P × [((1 + r/12)^n - 1) / (r/12)] × (1 + r/12)",
        explanation:
          "Where P is monthly deposit, r is annual interest rate, and n is total months. Compounded monthly with investments at the start of each month.",
      };
    }

    if (activeTab === "Lumpsum") {
      const r = lumpRate / 100;
      const nominalFV = lumpPrincipal * Math.pow(1 + r, lumpYears);
      const finalVal = adjustInflation
        ? nominalFV / Math.pow(1 + inflationRate, lumpYears)
        : nominalFV;
      const wealthGained = Math.max(0, finalVal - lumpPrincipal);

      const points: { x: number; y: number; year: number; val: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      for (let yr = 0; yr <= lumpYears; yr++) {
        let v = lumpPrincipal * Math.pow(1 + r, yr);
        if (adjustInflation && yr > 0) {
          v = v / Math.pow(1 + inflationRate, yr);
        }
        points.push({
          x: lumpYears > 0 ? (yr / lumpYears) * 100 : 0,
          y: nominalFV > 0 ? (v / (adjustInflation ? finalVal : nominalFV)) * 100 : 0,
          year: yr,
          val: v,
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
        label1: "Initial Investment",
        val1: lumpPrincipal,
        label2: adjustInflation ? "Real Wealth Gained" : "Est. Returns",
        val2: wealthGained,
        label3: adjustInflation ? "Real Purchasing Value" : "Maturity Value",
        val3: finalVal,
        points,
        schedule,
        formulaName: "Compound Interest Formula",
        formulaLatex: "A = P × (1 + r)^t",
        explanation:
          "Where P is principal investment, r is annual return rate, and t is time in years.",
      };
    }

    if (activeTab === "EMI") {
      const r = emiRate / 12 / 100;
      const n = emiYears * 12;
      const emiMonthly =
        r === 0
          ? emiPrincipal / n
          : (emiPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emiMonthly * n;
      const totalInterest = Math.max(0, totalPayment - emiPrincipal);

      // Balance decay curve over years
      const points: { x: number; y: number; year: number; val: number }[] = [];
      const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

      let balance = emiPrincipal;
      let cumInterest = 0;
      let cumPrincipal = 0;

      for (let yr = 0; yr <= emiYears; yr++) {
        points.push({
          x: emiYears > 0 ? (yr / emiYears) * 100 : 0,
          y: emiPrincipal > 0 ? (balance / emiPrincipal) * 100 : 0,
          year: yr,
          val: balance,
        });

        if (yr > 0 && (yr === 1 || yr % (emiYears > 15 ? 5 : 2) === 0 || yr === emiYears)) {
          schedule.push({
            year: yr,
            invested: cumPrincipal,
            returns: cumInterest,
            total: balance,
          });
        }

        // Advance 1 year
        for (let m = 0; m < 12; m++) {
          const interestMonth = balance * r;
          const principalMonth = emiMonthly - interestMonth;
          balance = Math.max(0, balance - principalMonth);
          cumInterest += interestMonth;
          cumPrincipal += principalMonth;
        }
      }

      return {
        label1: "Principal Loan",
        val1: emiPrincipal,
        label2: "Total Interest Payable",
        val2: totalInterest,
        label3: "Monthly EMI",
        val3: emiMonthly,
        points,
        schedule,
        formulaName: "Equated Monthly Installment (Reducing Balance)",
        formulaLatex: "EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]",
        explanation:
          "Where P is principal loan amount, r is monthly interest rate, and n is duration in months. Computed using standard Indian bank reducing balance method.",
      };
    }

    // Default: FD (Quarterly compounding per Indian banking standards)
    const quarterlyRate = fdRate / 100 / 4;
    const quarters = fdYears * 4;
    const maturityVal = fdPrincipal * Math.pow(1 + quarterlyRate, quarters);
    const fdInterest = maturityVal - fdPrincipal;

    const points: { x: number; y: number; year: number; val: number }[] = [];
    const schedule: { year: number; invested: number; returns: number; total: number }[] = [];

    for (let yr = 0; yr <= fdYears; yr++) {
      const v = fdPrincipal * Math.pow(1 + quarterlyRate, yr * 4);
      points.push({
        x: fdYears > 0 ? (yr / fdYears) * 100 : 0,
        y: maturityVal > 0 ? (v / maturityVal) * 100 : 0,
        year: yr,
        val: v,
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
      label1: "Principal Deposit",
      val1: fdPrincipal,
      label2: "Total Interest Earned",
      val2: fdInterest,
      label3: "Maturity Amount",
      val3: maturityVal,
      points,
      schedule,
      formulaName: "Fixed Deposit (Quarterly Compounding)",
      formulaLatex: "A = P × (1 + r/4)^(4 × t)",
      explanation:
        "Per RBI guidelines, Indian banks calculate interest on domestic term deposits compounded quarterly. Senior citizen rates may be 0.50% higher.",
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

  // SVG Chart path calculation
  const pathD = useMemo(() => {
    if (!calculations.points.length) return "";
    return calculations.points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${(100 - p.y).toFixed(1)}`)
      .join(" ");
  }, [calculations.points]);

  const areaD = pathD ? `${pathD} L 100 100 L 0 100 Z` : "";

  return (
    <section id="calculator" className="relative py-28 md:py-36 px-6">
      {/* Background radial accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-mint/[0.03] blur-[180px]" />
      </div>

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
              Interactive Math Engine
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-tight mb-4">
            See the math.{" "}
            <span className="text-text-secondary">Not just the answer.</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-[560px] mx-auto leading-relaxed">
            Every calculation runs 100% in your browser. Verify the exact formula, adjust for inflation, or inspect the year-by-year compounding schedule.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(["SIP", "Lumpsum", "EMI", "FD"] as CalculatorType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-mint text-[#0A0B0D] shadow-[0_0_20px_rgba(117,251,144,0.3)] scale-[1.02]"
                  : "bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-surface-3 border border-border"
              }`}
            >
              {tab === "SIP" && "📈 SIP Planner"}
              {tab === "Lumpsum" && "💰 Lumpsum"}
              {tab === "EMI" && "🏠 Loan EMI"}
              {tab === "FD" && "🏦 Fixed Deposit"}
            </button>
          ))}
        </div>

        {/* Main Calculator Card */}
        <div className="max-w-[960px] mx-auto">
          <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.35)] border border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              
              {/* Left Column: Sliders & Direct Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center text-mint font-bold text-lg">
                      {activeTab === "SIP" && "₹"}
                      {activeTab === "Lumpsum" && "₹"}
                      {activeTab === "EMI" && "%"}
                      {activeTab === "FD" && "FD"}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-poppins)] text-base md:text-lg font-bold">
                        {activeTab === "SIP" && "Systematic Investment Plan"}
                        {activeTab === "Lumpsum" && "One-Time Mutual Fund"}
                        {activeTab === "EMI" && "Home & Car Loan EMI"}
                        {activeTab === "FD" && "Bank Fixed Deposit"}
                      </h3>
                      <p className="text-xs text-text-tertiary">Real-time formula calculation</p>
                    </div>
                  </div>

                  {(activeTab === "SIP" || activeTab === "Lumpsum") && (
                    <button
                      onClick={() => setAdjustInflation(!adjustInflation)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        adjustInflation
                          ? "bg-mint/15 border-mint text-mint font-semibold"
                          : "border-border text-text-tertiary hover:text-text-secondary"
                      }`}
                      title="Adjust future value for 6% annual inflation"
                    >
                      {adjustInflation ? "Inflation: On (6%)" : "Adjust Inflation"}
                    </button>
                  )}
                </div>

                {/* Input 1 */}
                {activeTab === "SIP" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-text-secondary font-medium">Monthly Investment</label>
                      <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
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
                      className="calc-slider"
                      aria-label="Monthly Investment Slider"
                    />
                    <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                      <span>₹500</span>
                      <span>₹50,000</span>
                      <span>₹1,50,000</span>
                    </div>
                  </div>
                )}

                {activeTab === "Lumpsum" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-text-secondary font-medium">Total Investment</label>
                      <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                        {formatINR(lumpPrincipal, true)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="2000000"
                      step="5000"
                      value={lumpPrincipal}
                      onChange={(e) => setLumpPrincipal(Number(e.target.value))}
                      className="calc-slider"
                      aria-label="Total Investment Slider"
                    />
                    <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                      <span>₹5,000</span>
                      <span>₹5,00,000</span>
                      <span>₹20,00,000</span>
                    </div>
                  </div>
                )}

                {activeTab === "EMI" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-text-secondary font-medium">Loan Amount</label>
                      <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                        {formatINR(emiPrincipal, true)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={emiPrincipal}
                      onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                      className="calc-slider"
                      aria-label="Loan Amount Slider"
                    />
                    <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                      <span>₹1 Lakh</span>
                      <span>₹50 Lakhs</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>
                )}

                {activeTab === "FD" && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-text-secondary font-medium">Deposit Amount</label>
                      <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                        {formatINR(fdPrincipal, true)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={fdPrincipal}
                      onChange={(e) => setFdPrincipal(Number(e.target.value))}
                      className="calc-slider"
                      aria-label="Deposit Amount Slider"
                    />
                    <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                      <span>₹10,000</span>
                      <span>₹5,00,000</span>
                      <span>₹10,00,000</span>
                    </div>
                  </div>
                )}

                {/* Input 2: Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-text-secondary font-medium">
                      {activeTab === "EMI" ? "Interest Rate (p.a.)" : "Expected Return / Rate (p.a.)"}
                    </label>
                    <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
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
                    className="calc-slider"
                    aria-label="Interest Rate Slider"
                  />
                  <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                    <span>{activeTab === "FD" ? "3%" : activeTab === "EMI" ? "6%" : "5%"}</span>
                    <span>{activeTab === "FD" ? "7.1% (Standard)" : activeTab === "EMI" ? "9.5% (Avg Home)" : "12% (Nifty 50)"}</span>
                    <span>{activeTab === "FD" ? "10%" : activeTab === "EMI" ? "18%" : "30%"}</span>
                  </div>
                </div>

                {/* Input 3: Tenure */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-text-secondary font-medium">Time Period</label>
                    <span className="text-sm font-bold text-mint px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
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
                    className="calc-slider"
                    aria-label="Tenure Slider"
                  />
                  <div className="flex justify-between text-[11px] text-text-tertiary mt-1.5">
                    <span>1 yr</span>
                    <span>{activeTab === "FD" ? "5 yrs" : "15 yrs"}</span>
                    <span>{activeTab === "FD" ? "10 yrs" : activeTab === "EMI" ? "30 yrs" : "35 yrs"}</span>
                  </div>
                </div>

                {/* Math Transparency Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowFormula(!showFormula)}
                    className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-mint transition-colors"
                  >
                    <span>{showFormula ? "▾ Hide math formula" : "▸ Show the math formula"}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-mint">
                      Verified
                    </span>
                  </button>

                  {showFormula && (
                    <div className="mt-3 p-4 rounded-xl bg-surface border border-border text-xs space-y-2 animate-fade-in">
                      <div className="font-semibold text-text-primary">
                        {calculations.formulaName}
                      </div>
                      <div className="font-mono bg-black/40 px-3 py-2 rounded text-mint break-all">
                        {calculations.formulaLatex}
                      </div>
                      <p className="text-text-tertiary leading-relaxed text-[11px]">
                        {calculations.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Visualization & Breakdown Results */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* View Switcher: Graph vs Schedule */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      {activeTab === "EMI" ? "Loan Amortization Curve" : "Wealth Progression"}
                    </span>
                    <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg border border-border text-xs">
                      <button
                        onClick={() => setActiveView("chart")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeView === "chart"
                            ? "bg-mint text-ground font-bold"
                            : "text-text-tertiary hover:text-text-primary"
                        }`}
                      >
                        Chart
                      </button>
                      <button
                        onClick={() => setActiveView("schedule")}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeView === "schedule"
                            ? "bg-mint text-ground font-bold"
                            : "text-text-tertiary hover:text-text-primary"
                        }`}
                      >
                        Schedule
                      </button>
                    </div>
                  </div>

                  {/* Visual Screen */}
                  {activeView === "chart" ? (
                    <div className="bg-surface-2/60 rounded-2xl border border-border p-4 mb-5 h-[200px] flex flex-col justify-between relative overflow-hidden">
                      <div className="flex justify-between items-start text-[11px] text-text-tertiary z-10">
                        <span>Start</span>
                        <span>{formatINR(calculations.val3)}</span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 top-6 px-3 pb-3">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="calcGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#75FB90" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#75FB90" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d={areaD} fill="url(#calcGrad)" />
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#75FB90"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                          />
                          {calculations.points.length > 0 && (
                            <circle
                              cx={calculations.points[calculations.points.length - 1].x}
                              cy={100 - calculations.points[calculations.points.length - 1].y}
                              r="3"
                              fill="#75FB90"
                              filter="drop-shadow(0 0 6px rgba(117, 251, 144, 0.9))"
                            />
                          )}
                        </svg>
                      </div>

                      <div className="flex justify-between items-end text-[11px] text-text-tertiary z-10">
                        <span>Year 0</span>
                        <span>
                          {activeTab === "SIP"
                            ? `${sipYears} Years`
                            : activeTab === "Lumpsum"
                            ? `${lumpYears} Years`
                            : activeTab === "EMI"
                            ? `${emiYears} Years`
                            : `${fdYears} Years`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-surface-2/60 rounded-2xl border border-border p-3 mb-5 h-[200px] overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-border text-text-tertiary text-[11px]">
                            <th className="pb-2 font-medium">Year</th>
                            <th className="pb-2 font-medium">Invested / Principal</th>
                            <th className="pb-2 font-medium">Growth / Int.</th>
                            <th className="pb-2 font-medium text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {calculations.schedule.map((row) => (
                            <tr key={row.year} className="hover:bg-white/[0.02]">
                              <td className="py-2 text-text-secondary font-mono">Yr {row.year}</td>
                              <td className="py-2 text-text-secondary">{formatINR(row.invested)}</td>
                              <td className="py-2 text-mint">{formatINR(row.returns)}</td>
                              <td className="py-2 text-right font-semibold text-text-primary">
                                {formatINR(row.total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Summary Metric Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="bg-surface rounded-xl border border-border px-4 py-3">
                      <div className="text-xs text-text-tertiary">{calculations.label1}</div>
                      <div className="text-base font-bold text-text-primary mt-0.5">
                        {formatINR(calculations.val1)}
                      </div>
                    </div>
                    <div className="bg-surface rounded-xl border border-border px-4 py-3">
                      <div className="text-xs text-text-tertiary">{calculations.label2}</div>
                      <div className="text-base font-bold text-mint mt-0.5">
                        {formatINR(calculations.val2)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-mint/10 to-blue/10 rounded-xl border border-mint/25 px-5 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-text-secondary">
                        {calculations.label3}
                      </div>
                      <div className="text-2xl font-black text-mint font-[family-name:var(--font-poppins)] tracking-tight mt-0.5">
                        {formatINR(calculations.val3, true)}
                      </div>
                    </div>
                    <a
                      href="#cta"
                      className="px-4 py-2 rounded-lg bg-mint text-ground text-xs font-bold hover:shadow-[0_0_16px_rgba(117,251,144,0.4)] transition-all"
                    >
                      Plan Goal
                    </a>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <p className="text-[11px] text-text-tertiary">
                    Calculations run entirely in your browser using standard Indian financial formulas.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Extended Tools Strip */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4">
            Explore 20+ other precision financial calculators
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-[850px] mx-auto">
            {[
              { name: "Income Tax (New vs Old)", tag: "Budget 26" },
              { name: "PPF Calculator", tag: "7.1% tax-free" },
              { name: "NPS Retirement", tag: "80CCD(1B)" },
              { name: "Home Loan Prepayment", tag: "Save Interest" },
              { name: "HRA Exemption", tag: "Section 10(13A)" },
              { name: "Gratuity Calculator", tag: "Formula" },
              { name: "CAGR / XIRR", tag: "Mutual Funds" },
              { name: "Step-Up SIP", tag: "Annual Hike" },
            ].map((tool) => (
              <a
                key={tool.name}
                href="#cta"
                className="group flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-2 text-xs font-medium text-text-secondary hover:text-mint hover:border-mint/30 transition-all duration-200"
              >
                <span>{tool.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-text-tertiary group-hover:text-mint group-hover:bg-mint/10 transition-colors">
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
