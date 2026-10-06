"use client";

import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      setEmail("");
    }
  };

  // Parallax subtle orbs on mouse move
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 md:py-32">
      {/* Background grid */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Gradient orbs */}
      <div ref={orbRef} className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out">
        <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full bg-mint/[0.05] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[550px] h-[550px] rounded-full bg-purple/[0.06] blur-[150px]" />
        <div className="absolute top-[35%] right-[20%] w-[380px] h-[380px] rounded-full bg-blue/[0.05] blur-[110px]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-36 right-[14%] hidden lg:block animate-float">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          📈
        </div>
      </div>
      <div className="absolute bottom-40 left-[12%] hidden lg:block animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-xl shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          ₹
        </div>
      </div>
      <div className="absolute top-[52%] right-[8%] hidden lg:block animate-float" style={{ animationDelay: "4s" }}>
        <div className="w-11 h-11 rounded-lg glass flex items-center justify-center text-lg shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          ⚡
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[920px] mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 bg-mint-dim border border-mint/25 rounded-full px-4 py-1.5 mb-7">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse-glow" />
          <span className="text-xs font-semibold text-mint tracking-wide uppercase">
            Built for Indian Personal Finance
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up font-[family-name:var(--font-poppins)] text-[clamp(34px,6vw,74px)] font-extrabold leading-[1.06] tracking-[-0.035em] mb-5 text-text-primary"
          style={{ animationDelay: "0.1s" }}
        >
          Build your wealth
          <br />
          with <span className="gradient-text">uncompromised clarity</span>.
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up text-text-secondary text-base md:text-xl leading-relaxed max-w-[620px] mx-auto mb-9"
          style={{ animationDelay: "0.2s" }}
        >
          Invest, calculate and plan — without spam or sales pitches. Free transparent tools, accurate Indian formulas, and 100% private in-browser math.
        </p>

        {/* Email form + CTA */}
        <div className="animate-fade-up max-w-[540px] mx-auto" style={{ animationDelay: "0.3s" }}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 glass-strong rounded-2xl sm:rounded-full p-2 sm:p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-label="Email address"
                placeholder="Enter your email for early features..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-text-primary text-[15px] placeholder:text-text-tertiary px-4 py-3 outline-none"
              />
              <button
                type="submit"
                className="btn-glow shrink-0 px-6 py-3 sm:py-2.5 text-sm whitespace-nowrap font-bold"
              >
                {submitted ? "✓ You're on the list!" : "Join Early Access"}
              </button>
            </div>
          </form>

          {/* Quick jump anchor buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-text-tertiary">
            <span>Free forever · No login required</span>
            <span className="hidden sm:inline">·</span>
            <a
              href="#calculator"
              className="text-mint hover:underline font-semibold flex items-center gap-1"
            >
              Try Live Calculator
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className="animate-fade-up mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-[500px] mx-auto pt-6 border-t border-border/50"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            { value: "20+", label: "Calculators" },
            { value: "₹0", label: "No Hidden Fees" },
            { value: "100%", label: "Client Privacy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-text-primary font-[family-name:var(--font-poppins)] tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-text-tertiary mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ground to-transparent pointer-events-none" />
    </section>
  );
}
