"use client";

import Image from "next/image";
import { GradientCard } from "@/components/ui/GradientCard";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

import { KEY_FEATURES } from "@/constants";

// Animated feature card with 3D transforms
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
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouse(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isActive ? 1 : 0.85,
        filter: isActive ? "none" : "brightness(0.6)",
      }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d",
          width: "clamp(60px, 15vw, 100px)",
          height: "clamp(60px, 15vw, 100px)",
          background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
          border: isActive ? `2px solid ${feature.color}` : "2px solid rgba(255,255,255,0.1)",
          boxShadow: isActive ? `0 0 30px ${feature.color}40` : "none",
        }}
        whileHover={{ scale: isActive ? 1.05 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 20% 20%, ${feature.color}30, transparent 50%)`,
              `radial-gradient(circle at 80% 80%, ${feature.color}30, transparent 50%)`,
              `radial-gradient(circle at 20% 20%, ${feature.color}30, transparent 50%)`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Icon - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{ width: "clamp(20px, 6vw, 40px)", height: "clamp(20px, 6vw, 40px)" }}
            animate={isActive ? {
              y: [0, -3, 0],
              rotate: [0, 5, 0, -5, 0],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              fill
              sizes="40px"
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Glowing ring effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              border: `2px solid ${feature.color}`,
              boxShadow: `inset 0 0 20px ${feature.color}40`,
            }}
          />
        )}
      </motion.div>
      
      {/* Mini title */}
      <motion.p
        className="text-center mt-1 sm:mt-2 text-[8px] sm:text-[10px] font-medium"
        style={{
          color: isActive ? feature.color : "rgba(255,255,255,0.5)",
          maxWidth: "clamp(60px, 15vw, 100px)",
        }}
        animate={{ opacity: isActive ? 1 : 0.5 }}
      >
        {feature.title.replace("FUSION ", "")}
      </motion.p>
    </motion.div>
  );
}

// Main expanded card content
function ExpandedContent({ feature, index }: { feature: (typeof KEY_FEATURES)[0]; index: number }) {
  // Fixed particle positions - no randomness
  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: (i * 23 + 17) % 100,
    top: (i * 37 + 13) % 100,
    duration: 3 + (i % 5) * 0.4,
    delay: (i % 10) * 0.2,
  }));

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="w-full h-full flex items-center"
    >
      <GradientCard
        variant="gradient-bg"
        width="100%"
        height="auto"
        padding="clamp(16px, 4vw, 48px)"
        className="flex flex-col sm:flex-row items-center relative overflow-hidden min-h-[400px] sm:min-h-[360px]"
      >
        {/* Animated ring with static icon - absolute top left of card */}
        <div
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20"
          style={{ width: "clamp(36px, 8vw, 60px)", height: "clamp(36px, 8vw, 60px)" }}
        >
          {/* Rotate only the conic gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${feature.color}, transparent, ${feature.color})`,
              filter: "blur(3px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Keep the icon static */}
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

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: feature.color,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Left side - Text content */}
        <div className="flex flex-col items-start justify-center flex-1 sm:pr-6 md:pr-8 relative z-10 pt-12 sm:pt-16 w-full">
          {/* Title with typewriter effect */}
          <motion.h3
            className="font-bold mb-3 sm:mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(18px, 5vw, 36px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description with staggered words */}
          <motion.p
            className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl"
            style={{ textAlign: "left" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {feature.description}
          </motion.p>

          {/* Animated progress indicator */}
          <div className="mt-6 sm:mt-8 flex items-center gap-2">
            {KEY_FEATURES.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                style={{
                  width: i === index ? "40px" : "8px",
                  background: i === index ? feature.color : "rgba(255,255,255,0.2)",
                }}
                layoutId={`progress-${i}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ))}
          </div>
        </div>

        {/* Right side - Image with floating animation */}
        <motion.div
          className="relative mt-6 sm:mt-0 flex-shrink-0"
          style={{ width: "clamp(180px, 50vw, 400px)", height: "clamp(180px, 50vw, 400px)" }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glowing backdrop */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${feature.color}40, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 400px"
            className="object-contain relative z-10"
          />
        </motion.div>
      </GradientCard>
    </motion.div>
  );
}

export function KeyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KEY_FEATURES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative py-12 sm:py-24 bg-background/95 backdrop-blur-sm overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(69, 135, 244, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(69, 135, 244, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-6 sm:mb-8 px-4 sm:px-6"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>
        <motion.p
          className="text-white/60 text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tools to automate, connect, and simplify your work.
        </motion.p>
      </motion.div>

      {/* Features Grid - Radial layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Feature cards orbit */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {KEY_FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
              isActive={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
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
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
