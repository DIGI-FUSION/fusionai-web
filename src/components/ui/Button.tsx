"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glass" | "outline-glow" | "transparent-edge";
type Size = "sm" | "md" | "lg";

export interface UIButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: Variant;
  size?: Size;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-[30px] font-medium transition-transform will-change-transform select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98]";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-[#4285F4] to-[#6AA2FF] shadow-[0_14px_30px_-14px_rgba(66,133,244,.9)] hover:from-[#4C8CF6] hover:to-[#7BB0FF]",
  glass:
    "!text-white !bg-white/[0.06] !backdrop-blur-[32px] !backdrop-saturate-[200%] !border !border-white/20 shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.25),0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:!bg-white/[0.1] transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:rounded-[30px] before:pointer-events-none before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.5),transparent_50%)] before:mix-blend-overlay",
  "outline-glow":
    "text-white/90 bg-transparent border border-transparent [--glow:rgba(59,130,246,.45)] hover:[box-shadow:0_0_0_2px_var(--glow),0_8px_30px_-12px_var(--glow)] before:[content:''] before:absolute before:inset-0 before:rounded-[30px] before:p-[1px] before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:xor] before:bg-[linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,.06))] relative",
  "transparent-edge":
    "text-white/90 bg-transparent border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,.08)] hover:bg-white/5",
};

export const Button = forwardRef<HTMLButtonElement, UIButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
