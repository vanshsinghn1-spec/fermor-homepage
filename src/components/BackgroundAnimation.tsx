"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* Dynamic Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 dark:opacity-30 bg-gradient-to-br from-indigo-500 via-sky-400 to-transparent"
      />

      <motion.div
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full blur-[160px] opacity-35 dark:opacity-25 bg-gradient-to-bl from-purple-500 via-violet-600 to-emerald-400"
      />

      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 left-1/4 w-[550px] h-[550px] rounded-full blur-[150px] opacity-30 dark:opacity-20 bg-gradient-to-tr from-emerald-400 via-teal-500 to-sky-500"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.15, 1, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 right-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 dark:opacity-20 bg-gradient-to-tl from-amber-400 via-rose-500 to-indigo-500"
      />

      {/* Grid Mesh with subtle radial mask */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_60%,transparent_100%)]" />

      {/* Subtle sweeping light shimmer beam */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 4,
        }}
        className="absolute top-0 bottom-0 w-96 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] dark:via-emerald-400/[0.03] to-transparent pointer-events-none"
      />
    </div>
  );
}
