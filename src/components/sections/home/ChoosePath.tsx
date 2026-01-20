"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/GradientCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { TiltCard } from "@/components/animations/MagneticButton";
import { PATHS } from "@/constants/paths";

export function ChoosePath() {
  return (
    <section className="relative py-12 sm:py-24 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header with animation */}
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-16 px-4">
            <h2
              className="text-2xl sm:text-3xl md:text-[42px] mb-3 sm:mb-4"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 500,
                lineHeight: "120%",
                letterSpacing: "0.02em",
                color: "#FFFFFF",
              }}
            >
              Choose your path with Fusion AI
            </h2>
            <p
              className="text-sm sm:text-base"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                lineHeight: "26px",
                color: "rgba(237, 244, 255, 0.7)",
              }}
            >
              AI solutions tailored to every profile: startups, businesses, and governments.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards Row with stagger */}
        <StaggerContainer
          staggerDelay={0.15}
          delayStart={0.2}
          className="flex flex-col md:flex-row items-stretch justify-center gap-4 sm:gap-6"
        >
          {PATHS.map((path, index) => (
            <StaggerItem key={path.title}>
              <TiltCard maxTilt={8} glareOpacity={0.15}>
                <GradientCard
                  className="flex flex-col items-center w-full md:w-[384px] h-auto min-h-[380px] sm:min-h-[423px]"
                >
                  {/* Image Container with hover zoom */}
                  <motion.div
                    className="relative overflow-hidden w-full max-w-[336px] h-[140px] sm:h-[166px] rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={path.image}
                      alt={path.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 336px"
                      className="object-cover transition-all duration-500"
                      style={{
                        mixBlendMode: "luminosity",
                      }}
                    />
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex flex-col items-center gap-3 sm:gap-[14px] w-full max-w-[336px] px-4">
                    {/* Title */}
                    <h3
                      className="text-lg sm:text-[22px]"
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 600,
                        lineHeight: "20px",
                        color: "#FFFFFF",
                      }}
                    >
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm sm:text-base w-full"
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 300,
                        lineHeight: "26px",
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {path.description}
                    </p>
                  </div>

                  {/* Button with animation */}
                  <div className="mt-auto w-full flex justify-center px-4">
                    <motion.button
                      className="group relative inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-medium tracking-tight transition-all duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-[#2B61C7] hover:to-[#213C87] shadow-[inset_0_1px_0_0_rgba(255,255,255,.08)]"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 14px 30px -14px rgba(66,133,244,.6)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <span className="relative z-10">{path.buttonText}</span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-white/15 group-hover:border-white/30"
                      />
                    </motion.button>
                  </div>
                </GradientCard>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
