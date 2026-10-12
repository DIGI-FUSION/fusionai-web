"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Industry } from "@/constants/industries";

interface IndustryHeroProps {
  industry: Industry;
}

export function IndustryHero({ industry }: IndustryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden -mt-24"
      style={{ paddingTop: "6rem" }}
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src={assetPath(industry.heroImage)}
          alt={industry.name}
          fill
          className="object-cover mix-blend-soft-light"
          priority
        />
        <div className="absolute inset-0 bg-[#13161B]" style={{ zIndex: -1 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Pink/Magenta glow */}
        <div
          className="absolute rounded-[100px]"
          style={{
            width: "380px",
            height: "384px",
            right: "2%",
            top: "180px",
            background: "rgba(240, 135, 255, 0.6)",
            filter: "blur(250px)",
          }}
        />
        {/* Blue glow */}
        <div
          className="absolute rounded-[100px]"
          style={{
            width: "380px",
            height: "384px",
            right: "17%",
            top: "320px",
            background: "rgba(51, 177, 255, 0.6)",
            filter: "blur(250px)",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-24 sm:py-32"
        style={{ opacity, scale }}
      >
        <div className="max-w-2xl">
          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={wordVariants}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 600,
                lineHeight: "1.1",
              }}
            >
              {industry.heroTitle}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-6 font-medium"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              lineHeight: "1.4",
            }}
          >
            {industry.heroSubtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/70 mb-8 sm:mb-10 max-w-xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.6}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              lineHeight: "1.7",
            }}
          >
            {industry.heroDescription}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="primary" size="lg" className="text-sm sm:text-base">
                Talk to an expert
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
