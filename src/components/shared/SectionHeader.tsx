"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  return (
    <AnimatedSection>
      <div className={`text-${align} mb-16`}>
        <h2 className="text-5xl font-medium text-white mb-2">{title}</h2>
        {subtitle && (
          <p className="text-white/60 text-lg">{subtitle}</p>
        )}
      </div>
    </AnimatedSection>
  );
}
