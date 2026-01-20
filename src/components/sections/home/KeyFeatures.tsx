"use client";

import Image from "next/image";
import React, { useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";

import { KEY_FEATURES } from "@/constants/features";

// Simplified card with PNG only - no Spline
const FeatureCard = memo(function FeatureCard({
  feature,
}: {
  feature: (typeof KEY_FEATURES)[0];
}) {
  return (
    <div className="w-[90vw] max-w-5xl h-[450px] sm:h-[500px] flex-shrink-0">
      <div
        className="w-full h-full flex flex-col sm:flex-row items-center relative overflow-hidden rounded-[35px]"
        style={{
          background: "linear-gradient(180deg, rgba(21, 19, 23, 0.9) 0%, rgba(25, 22, 28, 0.9) 20%, rgba(7, 32, 50, 0.9) 65%, rgba(0, 36, 59, 0.9) 100%)",
          padding: "clamp(16px, 4vw, 48px)",
        }}
      >
        {/* Text content */}
        <div className="flex flex-col items-start justify-center flex-1 sm:pr-6 md:pr-8 relative z-10 pt-4 sm:pt-0 w-full sm:w-1/2 order-2 sm:order-1 h-full">
          <h3
            className="font-bold mb-3 sm:mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(18px, 5vw, 36px)",
            }}
          >
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            {feature.description}
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 w-full sm:w-1/2 relative flex items-center justify-center min-h-0 order-1 sm:order-2 h-[200px] sm:h-full">
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${feature.color} 0%, transparent 70%)`,
            }}
          />

          <div className="relative w-3/4 h-3/4 z-10">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 70vw, 35vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export function KeyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Optimized scroll animation - pure transform, no state updates
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let rafId = 0;
    let lastProgress = -1;

    const updatePosition = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollStart = -rect.top;
      const scrollRange = containerHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));

      if (Math.abs(progress - lastProgress) > 0.001) {
        lastProgress = progress;
        const translateX = 5 - (progress * 95);
        track.style.transform = `translate3d(${translateX}%, 0, 0)`;
      }

      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background" style={{ height: "400vh" }}>
      <section className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">

        {/* Header */}
        <motion.div
          className="text-center mb-4 sm:mb-8 px-4 sm:px-6 flex-shrink-0 absolute top-8 sm:top-12 left-0 right-0 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white mb-2 drop-shadow-lg">
            Key Features
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg drop-shadow-md">
            Tools to automate, connect, and simplify your work.
          </p>
        </motion.div>

        {/* Horizontal Track */}
        <div className="w-full h-full flex items-center">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-8 px-[10vw] sm:px-[20vw] items-center"
            style={{
              transform: 'translate3d(5%, 0, 0)',
              willChange: 'transform',
            }}
          >
            {KEY_FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
              />
            ))}
          </div>
        </div>

        {/* Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(69, 135, 244, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(69, 135, 244, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </section>
    </div>
  );
}
