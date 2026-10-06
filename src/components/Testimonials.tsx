"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "Finally a finance tool that doesn't try to sell me something. Clean math, clean interface.",
    name: "Arjun M.",
    role: "Software Engineer, Bengaluru",
    avatar: "A",
  },
  {
    quote: "I used to guess my tax liability. Now I know it exactly, down to the last rupee. Fermor's tax calculator is genuinely useful.",
    name: "Priya S.",
    role: "CA, Mumbai",
    avatar: "P",
  },
  {
    quote: "The SIP calculator showed me why starting early matters — the math is right there, no hand-waving.",
    name: "Rahul K.",
    role: "Product Manager, Hyderabad",
    avatar: "R",
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} className="relative py-28 md:py-36 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-purple/[0.03] blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-mint/[0.02] blur-[120px]" />
      </div>

      <div className="relative max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
              From our users
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-tight">
            Trusted by thousands{" "}
            <span className="text-text-secondary">across India.</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal feature-card !p-7"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#75FB90">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-secondary text-[14.5px] leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-mint/15 border border-mint/20 flex items-center justify-center text-sm font-bold text-mint">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-tertiary">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
