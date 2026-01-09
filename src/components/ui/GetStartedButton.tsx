"use client";

import { Button } from "@/components/ui/Button";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface GetStartedButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "glass";
}

export const GetStartedButton = forwardRef<
  HTMLButtonElement,
  GetStartedButtonProps
>(({ className, size = "lg", variant = "primary", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("px-8", className)}
      {...props}
    >
      Get Started
    </Button>
  );
});

GetStartedButton.displayName = "GetStartedButton";
