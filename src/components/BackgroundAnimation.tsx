"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* Soft animated gradient orb 1: Mint/Emerald */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.12, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-1/4 w-[650px] h-[500px] rounded-full blur-[140px] opacity-[0.09] bg-gradient-to-br from-emerald-400 via-teal-300 to-transparent"
      />

      {/* Soft animated gradient orb 2: Sky Blue */}
      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.08] bg-gradient-to-bl from-sky-400 via-indigo-200 to-transparent"
      />

      {/* Soft animated gradient orb 3: Gentle Warm Amber / Rose */}
      <motion.div
        animate={{
          x: [0, 50, -60, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 -left-20 w-[550px] h-[550px] rounded-full blur-[150px] opacity-[0.06] bg-gradient-to-tr from-amber-300 via-rose-200 to-transparent"
      />

      {/* Grid Pattern with subtle radial mask */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_60%,transparent_100%)]" />

      {/* Soft sweeping light shimmer */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 6,
        }}
        className="absolute top-0 bottom-0 w-[400px] -skew-x-12 bg-gradient-to-r from-transparent via-emerald-100/[0.2] to-transparent pointer-events-none"
      />
    </div>
  );
}
