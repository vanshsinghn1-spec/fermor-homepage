"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FermorLogo from "@/components/FermorLogo";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      setEmail("");
    }
  };

  return (
    <section id="cta" className="relative py-28 md:py-36 px-4 md:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-14 shadow-xl overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center">
            {/* Official Logo Pill */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-6 shadow-sm">
              <FermorLogo className="w-7 h-5" />
            </div>

            <Badge variant="mint" className="mb-4">
              Get Started with Fermor
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-[#101214] max-w-2xl leading-tight mb-4">
              Take back control of your{" "}
              <span className="text-emerald-700">financial future</span>.
            </h2>

            <p className="text-sm sm:text-base text-[#5B6065] max-w-xl leading-relaxed mb-9">
              Join thousands of Indian wealth creators using transparent math, client-side privacy, and zero spam.
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-slate-50 border-slate-300 text-[#101214] placeholder:text-slate-400 focus-visible:border-emerald-600"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="shrink-0 h-12 px-6 font-bold bg-[#101214] hover:bg-[#27272a] text-white shadow-sm"
                >
                  {submitted ? (
                    <span className="flex items-center gap-1.5 text-white font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Added!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Join Waitlist <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Micro value guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                No credit card required
              </span>
              <span>·</span>
              <span>Zero spam guarantee</span>
              <span>·</span>
              <span>Always free calculators</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
