"use client";

import Image from "next/image";
import { GradientCard } from "@/components/ui/GradientCard";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import { KEY_FEATURES } from "@/constants/features";

// Optimized feature card - removed expensive 3D transforms and infinite animations
function FeatureCard({
  feature,
  index,
  isActive,
  onClick,
}: {
  feature: (typeof KEY_FEATURES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1 : 0.85,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden transition-shadow duration-300"
        style={{
          width: "clamp(60px, 15vw, 100px)",
          height: "clamp(60px, 15vw, 100px)",
          background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
          border: isActive ? `2px solid ${feature.color}` : "2px solid rgba(255,255,255,0.1)",
          boxShadow: isActive ? `0 0 30px ${feature.color}40` : "none",
          filter: isActive ? "none" : "brightness(0.6)",
          willChange: isActive ? "transform" : "auto",
        }}
        whileHover={{ scale: isActive ? 1.05 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Static gradient background - no animation */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${feature.color}25, transparent 60%)`,
          }}
        />

        {/* Icon - centered, no animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{ width: "clamp(20px, 6vw, 40px)", height: "clamp(20px, 6vw, 40px)" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Glowing ring effect - CSS animation instead of Framer */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-2xl animate-pulse"
            style={{
              border: `2px solid ${feature.color}`,
              boxShadow: `inset 0 0 20px ${feature.color}40`,
              opacity: 0.5,
            }}
          />
        )}
      </motion.div>

      {/* Mini title */}
      <p
        className="text-center mt-1 sm:mt-2 text-[8px] sm:text-[10px] font-medium transition-colors duration-300"
        style={{
          color: isActive ? feature.color : "rgba(255,255,255,0.5)",
          maxWidth: "clamp(60px, 15vw, 100px)",
          opacity: isActive ? 1 : 0.5,
        }}
      >
        {feature.title.replace("FUSION ", "")}
      </p>
    </motion.div>
  );
}

// Optimized expanded content - reduced particles from 20 to 8, CSS animations for ring
function ExpandedContent({ feature, index, isVisible }: { feature: (typeof KEY_FEATURES)[0]; index: number; isVisible: boolean }) {
  // Reduced particle count from 20 to 8
  const particles = Array.from({ length: 8 }, (_, i) => ({
    left: (i * 29 + 17) % 100,
    top: (i * 37 + 13) % 100,
  }));

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
    >
      <GradientCard
        variant="gradient-bg"
        width="100%"
        height="auto"
        padding="clamp(16px, 4vw, 48px)"
        className="w-full max-w-5xl flex flex-col sm:flex-row items-center relative overflow-hidden min-h-[400px] sm:min-h-[360px] mx-auto"
      >
        {/* Rotating ring with CSS animation - much more performant than Framer */}
        <div
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20"
          style={{ width: "clamp(36px, 8vw, 60px)", height: "clamp(36px, 8vw, 60px)" }}
        >
          {/* CSS animated ring - GPU accelerated */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: `conic-gradient(from 0deg, ${feature.color}, transparent, ${feature.color})`,
              filter: "blur(3px)",
            }}
          />
          {/* Static icon */}
          <div
            className="absolute inset-1 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={24}
              height={24}
              className="object-contain w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>

        {/* Optimized particles - only render when visible, reduced count, CSS animation */}
        {isVisible && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float-particle"
                style={{
                  background: feature.color,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Left side - Text content */}
        <div className="flex flex-col items-start justify-center flex-1 sm:pr-6 md:pr-8 relative z-10 pt-12 sm:pt-16 w-full">
          {/* Title */}
          <motion.h3
            className="font-bold mb-3 sm:mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(18px, 5vw, 36px)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl"
            style={{ textAlign: "left" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {feature.description}
          </motion.p>

          {/* Progress indicator - simplified, no layoutId animation */}
          <div className="mt-6 sm:mt-8 flex items-center gap-2">
            {KEY_FEATURES.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "40px" : "8px",
                  background: i === index ? feature.color : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right side - Image with CSS float animation */}
        <div
          className="relative mt-6 sm:mt-0 flex-shrink-0 animate-float"
          style={{
            width: "clamp(180px, 50vw, 400px)",
            height: "clamp(180px, 50vw, 400px)",
          }}
        >
          {/* Static glowing backdrop - no animation */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${feature.color}30, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />

          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 400px"
            className="object-contain relative z-10"
          />
        </div>
      </GradientCard>
    </motion.div>
  );
}

export function KeyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Pause state: timestamp (ms) until which auto-rotate should be paused
  const [pausedUntil, setPausedUntil] = useState<number | null>(null);
  const lastRotateRef = useRef<number>(Date.now());

  // Auto-rotate through features - only when in view and not paused
  useEffect(() => {
    if (!isInView) return;

    const tick = setInterval(() => {
      const now = Date.now();
      // if paused, do nothing
      if (pausedUntil && now < pausedUntil) return;

      // rotate every 5000ms since last rotation
      if (now - lastRotateRef.current >= 5000) {
        setActiveIndex((prev) => (prev + 1) % KEY_FEATURES.length);
        lastRotateRef.current = now;
      }
    }, 500);

    return () => clearInterval(tick);
  }, [isInView, pausedUntil]);

  function handleFeatureClick(idx: number) {
    setActiveIndex(idx);
    // pause auto-rotate for 40 seconds
    const until = Date.now() + 40000;
    setPausedUntil(until);
    lastRotateRef.current = Date.now();
  }

  return (
    <section ref={containerRef} className="relative py-12 sm:py-24 bg-background/95 backdrop-blur-sm overflow-hidden">
      {/* Static background grid - no animation */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(69, 135, 244, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(69, 135, 244, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header - simplified, no scroll-based animation */}
      <motion.div
        className="text-center mb-6 sm:mb-8 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-2">
          Key Features
        </h2>
        <p className="text-white/60 text-sm sm:text-base md:text-lg">
          Tools to automate, connect, and simplify your work.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Feature cards */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {KEY_FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
              isActive={idx === activeIndex}
              onClick={() => handleFeatureClick(idx)}
            />
          ))}
        </div>

        {/* Expanded content */}
        <div className="mt-2 sm:mt-4">
          <AnimatePresence mode="wait">
            <ExpandedContent
              key={activeIndex}
              feature={KEY_FEATURES[activeIndex]}
              index={activeIndex}
              isVisible={isInView}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
