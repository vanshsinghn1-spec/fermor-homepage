import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fermor — Smart financial decisions for India",
  description:
    "Clarity for every financial decision. Free tools, insights and calculators that help you understand, plan and grow your money — built for India.",
  keywords: [
    "Fermor",
    "personal finance",
    "India",
    "SIP calculator",
    "EMI calculator",
    "financial planning",
    "investment tools",
    "tax calculator",
  ],
  openGraph: {
    title: "Fermor — Smart financial decisions for India",
    description:
      "Free SIP, EMI, FD, tax, and retirement calculators built for India. No sign-up, no ads, just clear math.",
    type: "website",
    url: "https://fermor.in",
    siteName: "Fermor",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fermor_in",
    title: "Fermor: Finance Smarter",
    description:
      "Free calculators, comparisons, and clear math for every money move in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-[#f8f9fa] text-[#101214] antialiased selection:bg-emerald-200 selection:text-[#101214]">
        {children}
      </body>
    </html>
  );
}
