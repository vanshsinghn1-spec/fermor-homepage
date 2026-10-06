"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    quote:
      "Every other finance website immediately asked for my phone number and sent 5 cold calls within 10 minutes. Fermor let me calculate my ₹45L home loan prepayment options in 30 seconds with complete privacy. Beautiful engineering.",
    author: "Arjun Madhavan",
    role: "Senior Software Engineer",
    location: "Bengaluru",
    verified: "Verified Home Loan Planner",
  },
  {
    quote:
      "As a practicing CA, I frequently spot mathematical rounding errors on popular Indian finance apps. Fermor's New vs. Old Tax Regime engine correctly implements the Section 87A rebate marginal relief and standard deduction nuances. Highly recommended.",
    author: "Priya Seshadri, FCA",
    role: "Chartered Accountant & Tax Consultant",
    location: "Mumbai",
    verified: "Verified Tax Professional",
  },
  {
    quote:
      "The 'Adjust for 6% Inflation' toggle completely changed my perspective on long-term retirement planning. Seeing the difference between nominal ₹2 Crore and real purchasing power gave me the wake-up call I actually needed.",
    author: "Rahul Kulkarni",
    role: "VP of Product",
    location: "Hyderabad",
    verified: "Verified Long-Term Investor",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="mint" className="mb-4">
            User Trust & Validation
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-[#101214] mb-4">
            Trusted by creators{" "}
            <span className="text-slate-400">across India.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5B6065] leading-relaxed">
            From tech professionals in Bengaluru to tax practitioners in Mumbai, here is why Indians switch to Fermor.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 md:p-7 bg-white border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#101214]">
                      {t.author}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.role} · {t.location}
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700" title={t.verified}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
