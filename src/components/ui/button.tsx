"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-400 text-zinc-950 font-semibold hover:bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_28px_rgba(52,211,153,0.45)] active:scale-[0.98]",
        glow:
          "relative overflow-hidden bg-gradient-to-r from-emerald-400 to-teal-300 text-zinc-950 font-bold shadow-[0_0_24px_rgba(52,211,153,0.35)] hover:shadow-[0_0_36px_rgba(52,211,153,0.55)] active:scale-[0.98]",
        secondary:
          "bg-zinc-800/80 text-zinc-100 hover:bg-zinc-700/80 border border-zinc-700/60 shadow-sm active:scale-[0.98]",
        outline:
          "border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700 text-zinc-200 active:scale-[0.98]",
        ghost:
          "hover:bg-zinc-800/60 hover:text-zinc-100 text-zinc-400",
        link:
          "text-emerald-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
