"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Floating animation for decorative elements - simplified
interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
}

export function Floating({
  children,
  className = "",
  duration = 6,
  delay = 0,
  yOffset = 20,
}: FloatingProps) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Parallax element - kept minimal
interface ParallaxProps {
  children: ReactNode;
  className?: string;
}

export function Parallax({ children, className = "" }: ParallaxProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Rotating/pulsing orbs for backgrounds - CSS animation
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
  delay = 0,
}: GlowOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none animate-scale-pulse ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// Static grid/dot pattern - no animation
export function AnimatedGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-40 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

// Animated connecting lines - simplified
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

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="w-full h-full animate-scan-line"
        style={{
          background: getGradient(),
        }}
      />
    </div>
  );
}

// Optimized particle field - reduced default count from 50 to 15
interface ParticleFieldProps {
  count?: number;
  className?: string;
}

// Pre-generated fixed particle positions (reduced to 15 for performance)
const FIXED_PARTICLES = [
  { id: 0, x: 85.59, y: 90.68, size: 3.2 },
  { id: 1, x: 12.34, y: 45.67, size: 2.1 },
  { id: 2, x: 67.89, y: 23.45, size: 1.8 },
  { id: 3, x: 34.56, y: 78.90, size: 2.9 },
  { id: 4, x: 91.23, y: 56.78, size: 1.5 },
  { id: 5, x: 23.45, y: 12.34, size: 3.5 },
  { id: 6, x: 56.78, y: 89.01, size: 2.3 },
  { id: 7, x: 78.90, y: 34.56, size: 1.9 },
  { id: 8, x: 45.67, y: 67.89, size: 2.7 },
  { id: 9, x: 9.12, y: 91.23, size: 3.1 },
  { id: 10, x: 70.34, y: 5.67, size: 2.0 },
  { id: 11, x: 38.90, y: 48.12, size: 1.6 },
  { id: 12, x: 82.45, y: 72.34, size: 2.8 },
  { id: 13, x: 15.67, y: 28.90, size: 3.3 },
  { id: 14, x: 53.12, y: 83.45, size: 1.7 },
];

export function ParticleField({ count = 15, className = "" }: ParticleFieldProps) {
  // Cap at 15 particles max for performance
  const particles = FIXED_PARTICLES.slice(0, Math.min(count, 15));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, i) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30 animate-float-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animationDelay: `${i * 0.3}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
