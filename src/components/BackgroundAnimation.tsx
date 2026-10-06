"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* Dark mode ambient glows - subtle, deep, cohesive */}
      <div className="hidden dark:block">
        {/* Soft breathing emerald/teal glow at top center */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px] bg-emerald-500"
        />

        {/* Subtle floating deep slate-cyan orb on left */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full blur-[180px] bg-teal-600"
        />

        {/* Subtle floating deep slate orb on right */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 -right-32 w-[600px] h-[600px] rounded-full blur-[190px] bg-slate-700"
        />

        {/* Dark Grid Overlay with subtle radial mask */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_50%,transparent_100%)]" />

        {/* Subtle diagonal light shimmer */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 5,
          }}
          className="absolute top-0 bottom-0 w-[450px] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none"
        />
      </div>

      {/* Light mode ambient glows - clean, airy, pristine */}
      <div className="block dark:hidden">
        {/* Very soft mint highlight at top */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] bg-emerald-300"
        />

        {/* Very soft sky blue highlight on right */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full blur-[150px] bg-sky-200"
        />

        {/* Light Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_35%,#000_60%,transparent_100%)]" />
      </div>
    </div>
  );
}
