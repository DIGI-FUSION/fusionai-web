"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  amount = 0.3,
  style,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 60, x: 0 };
      case "down":
        return { y: -60, x: 0 };
      case "left":
        return { y: 0, x: 60 };
      case "right":
        return { y: 0, x: -60 };
      case "none":
        return { y: 0, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
  style?: CSSProperties;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayStart = 0,
  style,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayStart,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Stagger item (to be used inside StaggerContainer)
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  style?: CSSProperties;
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  style,
}: StaggerItemProps) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40, x: 0 };
      case "down":
        return { y: -40, x: 0 };
      case "left":
        return { y: 0, x: 40 };
      case "right":
        return { y: 0, x: -40 };
    }
  };

  const offset = getOffset();

  const itemVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
