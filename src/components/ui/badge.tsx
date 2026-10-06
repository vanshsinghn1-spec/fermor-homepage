"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200 bg-slate-100 text-[#101214]",
        secondary:
          "border border-slate-200 bg-slate-50 text-slate-600",
        mint:
          "border border-emerald-200 bg-emerald-50 text-emerald-800",
        glow:
          "border border-emerald-300 bg-emerald-100/70 text-emerald-900 shadow-sm",
        outline:
          "border border-slate-300 bg-white text-slate-700",
        blue:
          "border border-sky-200 bg-sky-50 text-sky-800",
        purple:
          "border border-purple-200 bg-purple-50 text-purple-800",
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
