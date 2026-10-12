"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { INTEGRATIONS } from "@/constants/integrations";

// Simplified app icon - removed expensive glitch effects
function AppIcon({
  integration,
  index,
  isSwapping,
  delay,
}: {
  integration: typeof INTEGRATIONS[0];
  index: number;
  isSwapping: boolean;
  delay: number;
}) {
  return (
    <motion.div
      layout
      layoutId={integration.name}
      className="group relative"
      style={{
        width: "clamp(52px, 6vw, 66.23px)",
        height: "clamp(52px, 6vw, 66.23px)",
        padding: "clamp(8px, 1.4vw, 11.3077px)",
        background: "linear-gradient(138.52deg, rgba(7, 88, 139, 0.4) 4.09%, rgba(25, 22, 28, 0.4) 74.34%, rgba(21, 19, 23, 0.4) 93.2%)",
        borderRadius: "9.69231px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px rgba(69, 135, 244, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Simplified swap indicator - just a flash effect */}
      {isSwapping && (
        <motion.div
          className="absolute inset-0 rounded-[9.69231px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(0, 255, 255, 0.3)",
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
          }}
        />
      )}

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-[9.69231px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: "radial-gradient(circle at center, rgba(69, 135, 244, 0.3) 0%, transparent 70%)",
        }}
      />

      <Image
        src={assetPath(integration.logo)}
        alt={`${integration.name} integration`}
        fill
        className="object-contain !w-full !h-full"
      />
    </motion.div>
  );
}

export function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.3 });
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const [shuffledIntegrations, setShuffledIntegrations] = useState(INTEGRATIONS);
  const [swappingIndices, setSwappingIndices] = useState<[number, number] | null>(null);

  // Track when initial animation is complete
  useEffect(() => {
    if (isInView && !hasAnimatedIn) {
      const timer = setTimeout(() => {
        setHasAnimatedIn(true);
      }, INTEGRATIONS.length * 40 + 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimatedIn]);

  // Simplified swap function - less frequent, simpler effect
  const performSwap = useCallback(() => {
    if (!hasAnimatedIn) return;

    const idx1 = Math.floor(Math.random() * shuffledIntegrations.length);
    let idx2 = Math.floor(Math.random() * shuffledIntegrations.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * shuffledIntegrations.length);
    }

    setSwappingIndices([idx1, idx2]);

    setTimeout(() => {
      setShuffledIntegrations(prev => {
        const newArr = [...prev];
        [newArr[idx1], newArr[idx2]] = [newArr[idx2], newArr[idx1]];
        return newArr;
      });
    }, 80);

    setTimeout(() => {
      setSwappingIndices(null);
    }, 300);
  }, [hasAnimatedIn, shuffledIntegrations.length]);

  // Auto-swap every 3-5 seconds (increased from 2-4 for less CPU usage)
  useEffect(() => {
    if (!hasAnimatedIn || !isInView) return;

    const scheduleNextSwap = () => {
      const delay = 3000 + Math.random() * 2000; // 3-5 seconds
      return setTimeout(() => {
        performSwap();
        timerRef.current = scheduleNextSwap();
      }, delay);
    };

    const timerRef = { current: scheduleNextSwap() };

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasAnimatedIn, isInView, performSwap]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-6 bg-background overflow-hidden"
    >
      {/* Static background effect - CSS animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background: "radial-gradient(ellipse at center, rgba(69, 135, 244, 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-full relative" style={{ maxWidth: "1426px", margin: "0 auto" }}>
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 500,
                fontSize: "42px",
                lineHeight: "120%",
                letterSpacing: "0.02em",
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              Seamlessly integrate your favorite apps
            </h2>
            <p
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: "16px",
                lineHeight: "26px",
                color: "rgba(237, 244, 255, 0.7)",
                margin: 0,
              }}
            >
              AutoFlow connects effortlessly with the tools you already use. Whether it's communication, design, development, or task management — we've got you covered.
            </p>
          </div>
        </AnimatedSection>

        {/* Logos Container */}
        <motion.div
          ref={gridRef}
          className="flex flex-nowrap justify-center relative overflow-x-auto sm:overflow-visible"
          style={{
            gap: "14px",
            width: "1426px",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <AnimatePresence mode="popLayout">
            {shuffledIntegrations.map((integration, index) => (
              <AppIcon
                key={integration.name}
                integration={integration}
                index={index}
                isSwapping={swappingIndices?.includes(index) ?? false}
                delay={isInView && !hasAnimatedIn ? index * 0.04 : 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
