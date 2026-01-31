"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { KEY_FEATURES } from "@/constants/features";

const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds

// Short labels for navigation
const NAV_LABELS = [
  "DATA PLATFORM",
  "AUTOMATION",
  "AGENTIC",
  "FORGE",
  "MIND",
  "ORBITE",
  "MATE",
  "QUICK IT",
  "PROCESSUS",
];

export function KeyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KEY_FEATURES.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const handleIconClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), AUTO_ADVANCE_INTERVAL);
  }, []);

  const activeFeature = KEY_FEATURES[activeIndex];

  return (
    <section className="relative py-16 sm:py-24 bg-background overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
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

        {/* Navigation Icons */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap px-2">
          {KEY_FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={feature.title}
                onClick={() => handleIconClick(index)}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-300 min-w-[70px] sm:min-w-[80px] ${
                  isActive
                    ? "bg-[#1a2a3a] border-[#3a5a7a]"
                    : "bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}
                title={feature.title}
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-[#4A9EFF]" : "text-white/40"
                  }`}
                >
                  {NAV_LABELS[index]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div
                className="w-full min-h-[420px] sm:min-h-[400px] flex flex-col sm:flex-row items-stretch relative overflow-hidden rounded-[24px] border border-white/10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15, 23, 35, 0.95) 0%, rgba(10, 25, 40, 0.95) 100%)",
                }}
              >
                {/* Text content */}
                <div className="flex flex-col items-start justify-start flex-1 p-6 sm:p-8 relative z-10 w-full sm:w-1/2 order-2 sm:order-1">
                  {/* Icon badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1a3050] border border-[#2a4a6a] flex items-center justify-center mb-6">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                      <Image
                        src={activeFeature.icon}
                        alt={activeFeature.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3
                    className="font-bold mb-4 text-xl sm:text-2xl md:text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${activeFeature.color}, #fff)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {activeFeature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 sm:mb-8">
                    {activeFeature.description}
                  </p>

                  {/* Progress dots */}
                  <div className="flex gap-2 mt-auto">
                    {KEY_FEATURES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleIconClick(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === index
                            ? "bg-[#4A9EFF] w-6"
                            : "bg-white/20 w-1.5 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 w-full sm:w-1/2 relative flex items-center justify-center min-h-[180px] sm:min-h-0 order-1 sm:order-2 p-4 sm:p-8">
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at center, ${activeFeature.color} 0%, transparent 60%)`,
                    }}
                  />

                  <motion.div
                    className="relative w-3/4 h-3/4 max-w-[220px] sm:max-w-[280px] aspect-square z-10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 70vw, 35vw"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
