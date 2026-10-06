"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
    title: "Market Intelligence",
    description:
      "Real-time insights across stocks, mutual funds and ETFs. Understand where the market is heading before you invest.",
    color: "from-mint/20 to-mint/5",
    borderColor: "hover:border-mint/25",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: "Portfolio Tracking",
    description:
      "See all your investments in one view. Track performance, understand allocation, and spot opportunities as they appear.",
    color: "from-blue/20 to-blue/5",
    borderColor: "hover:border-blue/25",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Smart Planning",
    description:
      "Model financial scenarios. Forecast how market shifts and personal goals shape your future wealth — down to the rupee.",
    color: "from-purple/20 to-purple/5",
    borderColor: "hover:border-purple/25",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    title: "Ask Anything",
    description:
      "Get clear, personalized answers about your money — grounded in your financial data. No jargon, just actionable clarity.",
    color: "from-coral/20 to-coral/5",
    borderColor: "hover:border-coral/25",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll(".reveal");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6"
    >
      {/* Section header */}
      <div className="reveal max-w-[800px] mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
            Everything you need
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-tight mb-4">
          One platform.{" "}
          <span className="text-text-secondary">Every financial decision.</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-[520px] mx-auto leading-relaxed">
          From tracking your first SIP to planning retirement, Fermor gives you the tools to understand your money at every stage.
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`reveal feature-card group ${feature.borderColor}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-text-primary mb-5 group-hover:border-white/[0.16] transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold tracking-tight mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-[15px] leading-relaxed">
                {feature.description}
              </p>

              {/* Learn more link */}
              <div className="mt-5 flex items-center gap-1.5 text-mint text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
