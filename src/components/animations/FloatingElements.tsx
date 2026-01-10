"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Floating animation for decorative elements
interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  xOffset?: number;
}

export function Floating({
  children,
  className = "",
  duration = 6,
  delay = 0,
  yOffset = 20,
  xOffset = 0,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
        x: [0, xOffset, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax element that responds to scroll
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className = "", speed = 0.5 }: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      style={{
        // We'll use CSS for the actual parallax effect
      }}
    >
      {children}
    </motion.div>
  );
}

// Rotating/pulsing orbs for backgrounds
interface GlowOrbProps {
  className?: string;
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

export function GlowOrb({
  className = "",
  size = 300,
  color = "rgba(69, 135, 244, 0.3)",
  duration = 8,
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated grid/dot pattern
export function AnimatedGrid({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated connecting lines (for tech feel)
interface AnimatedLineProps {
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal";
}

export function AnimatedLine({ className = "", direction = "horizontal" }: AnimatedLineProps) {
  const getGradient = () => {
    switch (direction) {
      case "horizontal":
        return "linear-gradient(90deg, transparent, rgba(69, 135, 244, 0.5), transparent)";
      case "vertical":
        return "linear-gradient(180deg, transparent, rgba(69, 135, 244, 0.5), transparent)";
      case "diagonal":
        return "linear-gradient(135deg, transparent, rgba(69, 135, 244, 0.5), transparent)";
    }
  };

  const animationProps = direction === "horizontal" 
    ? { x: ["-100%", "100%"] }
    : direction === "vertical"
    ? { y: ["-100%", "100%"] }
    : { x: ["-100%", "100%"], y: ["-100%", "100%"] };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        style={{
          background: getGradient(),
        }}
        animate={animationProps}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Particle effect for premium feel
interface ParticleFieldProps {
  count?: number;
  className?: string;
}

// Pre-generated fixed particle positions to avoid hydration mismatch
const FIXED_PARTICLES = [
  { id: 0, x: 85.59, y: 90.68, size: 3.2, duration: 15.5, delay: 2.1 },
  { id: 1, x: 12.34, y: 45.67, size: 2.1, duration: 12.3, delay: 1.5 },
  { id: 2, x: 67.89, y: 23.45, size: 1.8, duration: 18.2, delay: 3.2 },
  { id: 3, x: 34.56, y: 78.90, size: 2.9, duration: 14.1, delay: 0.8 },
  { id: 4, x: 91.23, y: 56.78, size: 1.5, duration: 16.7, delay: 4.0 },
  { id: 5, x: 23.45, y: 12.34, size: 3.5, duration: 11.9, delay: 2.5 },
  { id: 6, x: 56.78, y: 89.01, size: 2.3, duration: 19.0, delay: 1.2 },
  { id: 7, x: 78.90, y: 34.56, size: 1.9, duration: 13.5, delay: 3.8 },
  { id: 8, x: 45.67, y: 67.89, size: 2.7, duration: 17.3, delay: 0.5 },
  { id: 9, x: 9.12, y: 91.23, size: 3.1, duration: 10.8, delay: 2.9 },
  { id: 10, x: 70.34, y: 5.67, size: 2.0, duration: 15.0, delay: 1.8 },
  { id: 11, x: 38.90, y: 48.12, size: 1.6, duration: 18.5, delay: 4.3 },
  { id: 12, x: 82.45, y: 72.34, size: 2.8, duration: 12.7, delay: 0.3 },
  { id: 13, x: 15.67, y: 28.90, size: 3.3, duration: 14.8, delay: 3.5 },
  { id: 14, x: 53.12, y: 83.45, size: 1.7, duration: 16.2, delay: 2.0 },
  { id: 15, x: 96.78, y: 19.56, size: 2.5, duration: 11.4, delay: 1.0 },
  { id: 16, x: 27.34, y: 61.78, size: 2.2, duration: 19.5, delay: 3.0 },
  { id: 17, x: 61.90, y: 42.01, size: 1.4, duration: 13.0, delay: 4.5 },
  { id: 18, x: 84.23, y: 95.34, size: 3.0, duration: 17.8, delay: 0.7 },
  { id: 19, x: 3.56, y: 7.89, size: 2.6, duration: 10.2, delay: 2.3 },
  { id: 20, x: 48.67, y: 53.12, size: 1.3, duration: 15.3, delay: 1.3 },
  { id: 21, x: 72.01, y: 36.45, size: 2.4, duration: 18.0, delay: 3.7 },
  { id: 22, x: 19.23, y: 79.67, size: 3.4, duration: 12.0, delay: 0.1 },
  { id: 23, x: 65.45, y: 14.89, size: 1.2, duration: 14.5, delay: 2.7 },
  { id: 24, x: 31.78, y: 87.12, size: 2.1, duration: 16.9, delay: 4.1 },
  { id: 25, x: 88.90, y: 59.34, size: 3.2, duration: 11.1, delay: 1.6 },
  { id: 26, x: 7.12, y: 31.56, size: 1.8, duration: 19.3, delay: 3.3 },
  { id: 27, x: 42.34, y: 74.78, size: 2.9, duration: 13.7, delay: 0.9 },
  { id: 28, x: 76.56, y: 47.90, size: 1.5, duration: 17.0, delay: 2.4 },
  { id: 29, x: 24.78, y: 2.12, size: 3.5, duration: 10.5, delay: 4.7 },
  { id: 30, x: 59.01, y: 68.34, size: 2.3, duration: 15.7, delay: 1.1 },
  { id: 31, x: 93.23, y: 25.56, size: 1.9, duration: 18.7, delay: 3.9 },
  { id: 32, x: 16.45, y: 92.78, size: 2.7, duration: 12.4, delay: 0.4 },
  { id: 33, x: 50.67, y: 39.01, size: 3.1, duration: 14.2, delay: 2.6 },
  { id: 34, x: 73.89, y: 84.23, size: 2.0, duration: 16.5, delay: 4.4 },
  { id: 35, x: 5.12, y: 51.45, size: 1.6, duration: 11.6, delay: 1.4 },
  { id: 36, x: 40.34, y: 16.67, size: 2.8, duration: 19.7, delay: 3.1 },
  { id: 37, x: 67.56, y: 63.89, size: 3.3, duration: 13.2, delay: 0.6 },
  { id: 38, x: 21.78, y: 96.12, size: 1.7, duration: 17.5, delay: 2.2 },
  { id: 39, x: 86.01, y: 10.34, size: 2.5, duration: 10.9, delay: 4.8 },
  { id: 40, x: 33.23, y: 55.56, size: 2.2, duration: 15.1, delay: 1.7 },
  { id: 41, x: 58.45, y: 81.78, size: 1.4, duration: 18.3, delay: 3.4 },
  { id: 42, x: 95.67, y: 43.01, size: 3.0, duration: 12.8, delay: 0.2 },
  { id: 43, x: 11.89, y: 20.23, size: 2.6, duration: 14.9, delay: 2.8 },
  { id: 44, x: 46.12, y: 76.45, size: 1.3, duration: 16.3, delay: 4.2 },
  { id: 45, x: 79.34, y: 33.67, size: 2.4, duration: 11.2, delay: 1.9 },
  { id: 46, x: 14.56, y: 58.89, size: 3.4, duration: 19.1, delay: 3.6 },
  { id: 47, x: 52.78, y: 4.12, size: 1.2, duration: 13.9, delay: 0.0 },
  { id: 48, x: 89.01, y: 71.34, size: 2.1, duration: 17.2, delay: 2.5 },
  { id: 49, x: 29.23, y: 94.56, size: 1.8, duration: 10.3, delay: 4.6 },
];

export function ParticleField({ count = 50, className = "" }: ParticleFieldProps) {
  const particles = FIXED_PARTICLES.slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
