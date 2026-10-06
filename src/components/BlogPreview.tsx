"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const articles = [
  {
    category: "TAXATION",
    badgeVariant: "mint" as const,
    title: "ITR Filing FY 2025-26: Complete Calendar, Penalties, & Section 87A Nuances",
    excerpt:
      "A step-by-step breakdown of income tax filing dates for salaried individuals, HUFs, and professionals — with clear explanations of Section 234A/B/C interest fees.",
    readTime: "5 min read",
    date: "Updated Oct 2026",
  },
  {
    category: "REGULATION",
    badgeVariant: "blue" as const,
    title: "RBI Directives on Financial Mis-Selling: What Banks Cannot Force You to Buy",
    excerpt:
      "The latest Reserve Bank guidelines banning bundled insurance with home loans, unrequested credit limits, and misleading return projections.",
    readTime: "4 min read",
    date: "Updated Sep 2026",
  },
  {
    category: "VALUATION",
    badgeVariant: "purple" as const,
    title: "Evaluating Indian Equity Multiples: Beyond Trailing P/E Ratios",
    excerpt:
      "Why standard P/E can deceive investors during high capex cycles. How to analyze EV/EBITDA and Return on Capital Employed (ROCE) in Indian mid-caps.",
    readTime: "7 min read",
    date: "Updated Sep 2026",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with view all button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Badge variant="mint" className="mb-4">
              Financial Knowledge Base
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-zinc-100">
              Clarity from the blog.
            </h2>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="#blog" className="flex items-center gap-1.5 self-start md:self-auto">
              <span>View All Research Notes</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 md:p-7 bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 group cursor-pointer">
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={item.badgeVariant} className="text-[10px]">
                      {item.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <CardTitle className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors leading-snug mb-3">
                    {item.title}
                  </CardTitle>

                  {/* Excerpt */}
                  <CardDescription className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {item.excerpt}
                  </CardDescription>
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500 font-medium">
                  <span>{item.date}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Note <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
