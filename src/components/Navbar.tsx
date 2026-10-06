"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Products", href: "#features" },
  { label: "Calculators", href: "#calculator" },
  { label: "About", href: "#principles" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2 px-4 md:px-6" : "py-3.5 px-4 md:px-8"
        }`}
      >
        <div
          className={`max-w-[1200px] mx-auto flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-strong px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "px-4 py-2"
          }`}
        >
          {/* Brand */}
          <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Fermor Home">
            <div className="w-8 h-8 rounded-lg bg-mint flex items-center justify-center shadow-[0_0_12px_rgba(117,251,144,0.3)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#0A0B0D"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[19px] font-extrabold tracking-tight text-text-primary font-[family-name:var(--font-poppins)]">
              Fermor
            </span>
          </a>

          {/* Center links – desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side – desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#cta" className="btn-outline px-4 py-1.5 text-xs font-semibold">
              Sign In
            </a>
            <a href="#cta" className="btn-glow px-4 py-1.5 text-xs">
              Get Started Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text-primary rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-ground/95 backdrop-blur-xl transition-all duration-400 md:hidden flex flex-col justify-center items-center ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-2xl font-semibold text-text-primary hover:text-mint transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-6 w-52">
            <a
              href="#cta"
              className="btn-glow text-center px-6 py-3 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Get Started Free
            </a>
            <a
              href="#cta"
              className="btn-outline text-center px-6 py-3 text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
