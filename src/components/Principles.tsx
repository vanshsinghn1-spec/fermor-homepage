"use client";

import { useEffect, useRef } from "react";

const principles = [
  {
    icon: "🔍",
    title: "Full transparency",
    description: "Every calculator shows the complete math behind the result — not just a number.",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    description: "All calculations run in your browser. Your salary, loan, and investment numbers never leave your device.",
  },
  {
    icon: "🚪",
    title: "No login walls",
    description: "Every tool is free and open. An account is optional — only needed if you want to save results.",
  },
  {
    icon: "📱",
    title: "Mobile first",
    description: "Most Indians are on phones. Every tool is designed to work beautifully on a 5-inch screen.",
  },
  {
    icon: "💡",
    title: "Clear labeling",
    description: "Ads and affiliate links are always marked. We never disguise promotions as neutral advice.",
  },
  {
    icon: "📐",
    title: "Open methodology",
    description: "Our formulas, assumptions, and data sources are documented. Verify everything we do.",
  },
];

export default function Principles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="principles" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
              What we stand for
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-tight mb-4">
            Built on principles,{" "}
            <span className="text-text-secondary">not paywalls.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-[520px] mx-auto leading-relaxed">
            Most finance tools in India sell you products. We built something clean, fast and honest.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((item, i) => (
            <div
              key={item.title}
              className="reveal principle-item"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[15px] text-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
