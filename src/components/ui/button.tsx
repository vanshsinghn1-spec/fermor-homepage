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
          "bg-[#101214] text-white font-semibold hover:bg-[#27272a] shadow-sm active:scale-[0.98]",
        glow:
          "relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98]",
        secondary:
          "bg-slate-100 text-[#101214] hover:bg-slate-200 border border-slate-200 shadow-sm active:scale-[0.98]",
        outline:
          "border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-800 active:scale-[0.98]",
        ghost:
          "hover:bg-slate-100 hover:text-[#101214] text-slate-600",
        link:
          "text-emerald-600 underline-offset-4 hover:underline",
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
