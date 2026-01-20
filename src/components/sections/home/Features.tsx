"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/GradientCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { FEATURES } from "@/constants/features";
import { useVisibilityAnimation } from "@/hooks/useVisibilityAnimation";

export function Features() {
  const { ref: visibilityRef, isVisible } = useVisibilityAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={visibilityRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 bg-background overflow-hidden"
    >
      {/* Main container - responsive */}
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 sm:gap-8 py-8 sm:py-16">
        {/* Header section with animation */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-8 sm:mb-12 px-4">
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
              Fusion AI: End-to-End Orchestration Platform
            </h2>
            <p
              className="text-sm sm:text-base"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                lineHeight: "26px",
                color: "rgba(237, 244, 255, 0.7)",
              }}
            >
              Infrastructure, tools, and execution – all in one place.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards container with stagger animation - responsive grid */}
        <StaggerContainer
          staggerDelay={0.15}
          delayStart={0.3}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[1200px]"
        >
          {FEATURES.map((feature, index) => (
            <StaggerItem key={feature.title} className="h-full">
              <div className="h-full">
                <motion.div
                  className="h-full flex"
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <GradientCard className="w-full h-full min-h-[280px] sm:min-h-[305px]">
                    {/* Icon container with floating animation - paused when not visible */}
                    <motion.div
                      className="relative flex items-center justify-center flex-none w-28 h-28 sm:w-[146px] sm:h-[146px]"
                      animate={isVisible ? {
                        y: [0, -8, 0],
                      } : { y: 0 }}
                      transition={{
                        duration: 4,
                        repeat: isVisible ? Infinity : 0,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={146}
                        height={146}
                        className="object-contain w-full h-full"
                      />
                    </motion.div>

                    {/* Text content */}
                    <div className="flex flex-col items-center gap-3 sm:gap-[14px] px-4 w-full">
                      <h3
                        className="text-white text-center text-lg sm:text-[22px]"
                        style={{
                          fontFamily: "var(--font-be-vietnam-pro), sans-serif",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-white text-center text-sm sm:text-base w-full max-w-[336px]"
                        style={{
                          fontFamily: "var(--font-be-vietnam-pro), sans-serif",
                          fontWeight: 300,
                          lineHeight: "26px",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </GradientCard>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
