"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
          {/* Brand with official Fermor Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Fermor Home"
          >
            <div className="flex items-center justify-center p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm transition-transform group-hover:scale-105">
              <FermorLogo className="w-6 h-4 text-emerald-600 dark:text-[#75FB90]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 font-[family-name:var(--font-poppins)]">
                Fermor
              </span>
              <Badge variant="mint" className="text-[10px] px-1.5 py-0 h-4 uppercase font-semibold">
                Beta
              </Badge>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1 rounded-full">
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
                    className="absolute inset-0 rounded-full bg-slate-200/70 dark:bg-zinc-800/80 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions with Theme Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <a href="#cta">Sign In</a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="#calculator" className="flex items-center gap-1">
                <span>Try Engine</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile Right with Toggle & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl md:hidden pt-28 px-6 flex flex-col justify-between pb-10"
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
                  className="text-2xl font-bold text-slate-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-200 dark:border-zinc-900">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero login required for calculators</span>
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full font-bold"
                asChild
              >
                <a href="#calculator" onClick={() => setMobileOpen(false)}>
                  Open Live Calculators
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#cta" onClick={() => setMobileOpen(false)}>
                  Join Waitlist
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
