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

export function ParticleField({ count = 50, className = "" }: ParticleFieldProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

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
