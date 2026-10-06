export default function Footer() {
  const footerLinks = {
    Calculators: [
      { label: "SIP Calculator", href: "#calculator" },
      { label: "Loan EMI Calculator", href: "#calculator" },
      { label: "Fixed Deposit (FD)", href: "#calculator" },
      { label: "Lumpsum Mutual Fund", href: "#calculator" },
      { label: "Income Tax (New vs Old)", href: "#calculator" },
      { label: "PPF & NPS Estimator", href: "#calculator" },
    ],
    Products: [
      { label: "Market Intelligence", href: "#features" },
      { label: "Portfolio Tracking", href: "#features" },
      { label: "Smart Planning", href: "#features" },
      { label: "Ask Anything AI", href: "#features" },
      { label: "Financial Literacy for Kids", href: "#features" },
    ],
    Resources: [
      { label: "Blog & Guides", href: "#blog" },
      { label: "ITR Deadline 2026", href: "#blog" },
      { label: "RBI Product Guidelines", href: "#blog" },
      { label: "Stock P/E Valuation", href: "#blog" },
    ],
    Company: [
      { label: "Our Principles", href: "#principles" },
      { label: "Frequently Asked Questions", href: "#faq" },
      { label: "Contact Us", href: "mailto:fermor.in.contact@gmail.com" },
      { label: "Methodology & Disclaimers", href: "#principles" },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
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
              <span className="text-lg font-extrabold tracking-tight text-text-primary font-[family-name:var(--font-poppins)]">
                Fermor
              </span>
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed max-w-[220px]">
              Clarity for every financial decision. Free tools, clear math, built for India.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold text-text-tertiary tracking-[0.12em] uppercase mb-4">
                {category}
              </h4>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Fermor Technologies Pvt. Ltd. All rights reserved.
          </span>
          <span className="text-xs text-text-tertiary">
            Results are for estimation and educational purposes. Not SEBI-registered investment advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
