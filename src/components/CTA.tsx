"use client";

import { useState, useEffect, useRef } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="relative max-w-[700px] mx-auto">
        <div className="reveal text-center">
          {/* Decorative sparkle */}
          <div className="flex justify-center mb-6">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="animate-pulse-glow">
              <path
                d="M21 1.5C22.8 11.8 30.2 19.2 40.5 21C30.2 22.8 22.8 30.2 21 40.5C19.2 30.2 11.8 22.8 1.5 21C11.8 19.2 19.2 11.8 21 1.5Z"
                fill="url(#sparkleGrad)"
              />
              <defs>
                <linearGradient id="sparkleGrad" x1="4" y1="4" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#75FB90" />
                  <stop offset="1" stopColor="#668CFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4.5vw,52px)] font-extrabold tracking-[-0.035em] leading-tight mb-5">
            Start making{" "}
            <span className="gradient-text">smarter decisions</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-[480px] mx-auto leading-relaxed mb-10">
            Join thousands of Indians who are taking control of their finances — with clarity, not confusion.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto">
            <div className="flex items-center gap-1.5 glass-strong rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-text-primary text-[15px] placeholder:text-text-tertiary px-4 py-3 outline-none"
              />
              <button
                type="submit"
                className="btn-glow shrink-0 px-5 py-2.5 text-[13.5px] whitespace-nowrap"
              >
                {submitted ? "✓ Added!" : "Get Started"}
              </button>
            </div>
            <p className="text-text-tertiary text-xs mt-3">
              Free forever · No credit card · Takes 10 seconds
            </p>
          </form>
        </div>
      </div>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-mint/[0.04] blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple/[0.05] blur-[100px]" />
      </div>
    </section>
  );
}
