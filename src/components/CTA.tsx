"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      {/* Background ambient backlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/[0.08] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-8 md:p-14 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.6)] specular-border overflow-hidden"
        >
          {/* Subtle decorative grid inside card */}
          <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Sparkle icon pill */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(52,211,153,0.25)]">
              <Sparkles className="w-6 h-6" />
            </div>

            <Badge variant="mint" className="mb-4">
              Get Started with Fermor
            </Badge>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)] text-zinc-100 max-w-2xl leading-tight mb-4">
              Take back control of your{" "}
              <span className="text-gradient-emerald">financial future</span>.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed mb-9">
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
                  className="h-12 bg-zinc-900/80 border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500"
                  required
                />
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="shrink-0 h-12 px-6 font-bold"
                >
                  {submitted ? (
                    <span className="flex items-center gap-1.5 text-zinc-950 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Added!
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
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
