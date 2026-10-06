"use client";

import { useEffect, useRef } from "react";

const posts = [
  {
    tag: "TAX",
    title: "ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know",
    excerpt: "A complete calendar of income tax return deadlines for individuals, HUFs, and businesses — with penalty details.",
    date: "Oct 2, 2026",
    color: "bg-mint/10 text-mint",
  },
  {
    tag: "REGULATION",
    title: "RBI Financial Product Mis-Selling Rules: What Banks Must Now Do",
    excerpt: "New RBI guidelines on how banks must sell financial products. What it means for your next insurance or mutual fund purchase.",
    date: "Sep 28, 2026",
    color: "bg-blue/10 text-blue",
  },
  {
    tag: "MARKETS",
    title: "Understanding P/E Ratios: When a Stock Is Really Expensive",
    excerpt: "Price-to-earnings ratios explained with real Indian examples. Learn when a high P/E is justified — and when it isn't.",
    date: "Sep 22, 2026",
    color: "bg-purple/10 text-purple",
  },
];

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="relative py-28 md:py-36 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-5">
              <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                Learn with us
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] leading-tight">
              From the blog
            </h2>
          </div>
          <a
            href="#"
            className="btn-outline px-5 py-2.5 text-sm font-semibold flex items-center gap-2 shrink-0"
          >
            All posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className="reveal feature-card group cursor-pointer !p-0 overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Colored top accent */}
              <div className="h-1 bg-gradient-to-r from-mint via-blue to-purple opacity-30 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="p-7">
                {/* Tag + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full ${post.color}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-text-tertiary">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold leading-snug mb-3 group-hover:text-mint transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-5 flex items-center gap-1.5 text-text-tertiary text-xs font-semibold group-hover:text-mint transition-colors duration-300">
                  Read more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
