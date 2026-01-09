"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatedSection } from "@/components/animations";

const INTEGRATIONS = [
  { name: "DeepSeek", logo: "/apps/deepseck.svg" },
  { name: "Figma", logo: "/apps/figma.svg" },
  { name: "GitHub", logo: "/apps/github.svg" },
  { name: "Google", logo: "/apps/google.svg" },
  { name: "Mistral", logo: "/apps/msitral.svg" },
  { name: "Slack", logo: "/apps/slack.svg" },
  { name: "WhatsApp", logo: "/apps/whatsapp.svg" },
  { name: "Anthropic", logo: "/apps/anthropic.svg" },
  { name: "Azure", logo: "/apps/azure.svg" },
  { name: "Golia", logo: "/apps/golia.svg" },
  { name: "Groq", logo: "/apps/groq.svg" },
  { name: "Jira", logo: "/apps/jira.svg" },
  { name: "MongoDB", logo: "/apps/mongodb.svg" },
  { name: "PostgreSQL", logo: "/apps/postgresql.svg" },
  { name: "Redis", logo: "/apps/redis.svg" },
  { name: "SetlistMX", logo: "/apps/setlistmx.svg" },
  { name: "Xata", logo: "/apps/xata.svg" },
];

// Individual app icon with glitch swap animation
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
        width: "66.23px",
        height: "66.23px",
        padding: "11.3077px",
        background: "linear-gradient(138.52deg, rgba(7, 88, 139, 0.4) 4.09%, rgba(25, 22, 28, 0.4) 74.34%, rgba(21, 19, 23, 0.4) 93.2%)",
        borderRadius: "9.69231px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
      }}
      transition={{ 
        layout: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay, type: "spring", stiffness: 200 },
        rotate: { duration: 0.5, delay },
      }}
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 0 30px rgba(69, 135, 244, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Intense glitch effect during swap */}
      {isSwapping && (
        <>
          {/* Distortion slices - horizontal cut effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`slice-${i}`}
              className="absolute w-full bg-transparent"
              style={{ 
                top: `${i * 16.66}%`, 
                height: "16.66%",
                overflow: "hidden",
              }}
              animate={{
                x: [0, (i % 2 === 0 ? 8 : -8), (i % 2 === 0 ? -5 : 5), 0],
                skewX: [0, (i % 2 === 0 ? 5 : -5), 0],
              }}
              transition={{ 
                duration: 0.3,
                times: [0, 0.3, 0.6, 1],
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Flickering opacity */}
          <motion.div
            className="absolute inset-0 bg-black/50 rounded-[9.69231px]"
            animate={{
              opacity: [0, 0.8, 0, 0.5, 0, 0.3, 0],
            }}
            transition={{ duration: 0.4, ease: "linear" }}
          />
          
          {/* RGB split / chromatic aberration on the icon */}
          <motion.div
            className="absolute inset-0 rounded-[9.69231px]"
            style={{ mixBlendMode: "screen" }}
            animate={{
              boxShadow: [
                "inset -4px 0 0 rgba(255,0,0,0.5), inset 4px 0 0 rgba(0,255,255,0.5)",
                "inset 4px 0 0 rgba(255,0,0,0.5), inset -4px 0 0 rgba(0,255,255,0.5)",
                "inset -2px 0 0 rgba(255,0,0,0.3), inset 2px 0 0 rgba(0,255,255,0.3)",
                "none",
              ],
            }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
          
          {/* Horizontal glitch lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-[1px] bg-cyan-400"
              style={{ 
                top: `${10 + i * 12}%`,
                left: 0,
                right: 0,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 1, 0.5, 1, 0],
                opacity: [0, 1, 0.5, 1, 0],
                x: ["-100%", "0%", "20%", "-10%", "100%"],
              }}
              transition={{ 
                duration: 0.35, 
                delay: i * 0.02,
                ease: "linear",
              }}
            />
          ))}
          
          {/* Glowing border with pulse */}
          <motion.div
            className="absolute inset-0 rounded-[9.69231px]"
            animate={{
              boxShadow: [
                "0 0 0 rgba(0, 255, 255, 0)",
                "0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.4)",
                "0 0 30px rgba(0, 255, 255, 1), inset 0 0 20px rgba(0, 255, 255, 0.6)",
                "0 0 10px rgba(0, 255, 255, 0.4)",
                "0 0 0 rgba(0, 255, 255, 0)",
              ],
              borderColor: [
                "transparent",
                "rgba(0, 255, 255, 0.8)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 255, 255, 0.5)",
                "transparent",
              ],
            }}
            style={{ border: "2px solid transparent" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Static noise overlay */}
          <motion.div
            className="absolute inset-0 rounded-[9.69231px] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
            animate={{
              opacity: [0, 0.3, 0.1, 0.4, 0],
            }}
            transition={{ duration: 0.35 }}
          />
        </>
      )}
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-[9.69231px] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(circle at center, rgba(69, 135, 244, 0.3) 0%, transparent 70%)",
        }}
      />
      
      <Image
        src={integration.logo}
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
      }, INTEGRATIONS.length * 50 + 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimatedIn]);

  // Random swap function with glitch effect
  const performSwap = useCallback(() => {
    if (!hasAnimatedIn) return;

    // Pick two random different indices
    const idx1 = Math.floor(Math.random() * shuffledIntegrations.length);
    let idx2 = Math.floor(Math.random() * shuffledIntegrations.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * shuffledIntegrations.length);
    }

    // Set swapping indices to trigger glitch on those apps
    setSwappingIndices([idx1, idx2]);

    // Perform the swap after a small delay
    setTimeout(() => {
      setShuffledIntegrations(prev => {
        const newArr = [...prev];
        [newArr[idx1], newArr[idx2]] = [newArr[idx2], newArr[idx1]];
        return newArr;
      });
    }, 100);

    // Clear swapping indices
    setTimeout(() => {
      setSwappingIndices(null);
    }, 400);
  }, [hasAnimatedIn, shuffledIntegrations.length]);

  // Auto-swap every 2-4 seconds after initial animation
  useEffect(() => {
    if (!hasAnimatedIn) return;

    const scheduleNextSwap = () => {
      const delay = 2000 + Math.random() * 2000; // 2-4 seconds
      return setTimeout(() => {
        performSwap();
        timerRef.current = scheduleNextSwap();
      }, delay);
    };

    const timerRef = { current: scheduleNextSwap() };

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasAnimatedIn, performSwap]);

  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-6 bg-background/95 backdrop-blur-sm overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(69, 135, 244, 0.05) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-full relative" style={{ maxWidth: "1426px", margin: "0 auto" }}>
        {/* Header with animation */}
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

        {/* Logos Container with position swapping */}
        <motion.div
          ref={gridRef}
          className="flex flex-wrap relative"
          style={{
            gap: "14px",
            width: "1426px",
            maxWidth: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
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
                delay={isInView && !hasAnimatedIn ? index * 0.05 : 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
