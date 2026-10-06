"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-zinc-800 bg-zinc-900/80 text-zinc-300",
        secondary:
          "border border-zinc-700/50 bg-zinc-800 text-zinc-200",
        mint:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        glow:
          "border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]",
        outline:
          "border border-zinc-800 text-zinc-400",
        blue:
          "border border-sky-500/30 bg-sky-500/10 text-sky-400",
        purple:
          "border border-purple-500/30 bg-purple-500/10 text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
