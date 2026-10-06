"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import FermorLogo from "@/components/FermorLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "Products", href: "#features" },
  { label: "Calculators", href: "#calculator" },
  { label: "Architecture", href: "#principles" },
  { label: "Articles", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5 px-4 md:px-6" : "py-4 md:py-5 px-4 md:px-8"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand matching fermor.in clean style */}
          <a
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Fermor Home"
          >
            <FermorLogo className="w-7 h-5 text-emerald-600 dark:text-[#75FB90] transition-transform group-hover:scale-105" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-[family-name:var(--font-poppins)]">
              Fermor
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-[#75FB90] dark:bg-[#75FB90]/15 uppercase tracking-wider">
              Beta
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 rounded-full bg-slate-200/60 dark:bg-zinc-800/80 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="#cta"
              className="text-xs font-semibold px-4 py-2 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#75FB90] dark:hover:bg-[#65ea80] dark:text-[#0D0F11] transition-all duration-200 shadow-sm"
            >
              <span>Try Engine</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0D0F11]/95 backdrop-blur-2xl md:hidden pt-28 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Navigation
              </p>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold text-slate-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-[#75FB90] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero login required for calculators</span>
              </div>
              <a
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold text-sm bg-slate-900 text-white dark:bg-[#75FB90] dark:text-[#0D0F11]"
              >
                Open Live Calculators
              </a>
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-xl font-semibold text-sm border border-slate-300 dark:border-zinc-800 text-slate-800 dark:text-zinc-200"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
