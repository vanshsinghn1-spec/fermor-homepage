import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CalculatorDemo from "@/components/CalculatorDemo";
import Principles from "@/components/Principles";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <CalculatorDemo />
        <Principles />
        <Testimonials />
        <BlogPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
