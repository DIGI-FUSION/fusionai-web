"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { Industry } from "@/constants/industries";

interface IndustryFeaturesProps {
  industry: Industry;
}

// SVG icons for each feature
const featureIcons = [
  // Real-Time Data Mastery - chart/data icon
  <svg key="0" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <path d="M26 15V25C26 25.5304 25.7893 26.0391 25.4142 26.4142C25.0391 26.7893 24.5304 27 24 27H8C7.46957 27 6.96086 26.7893 6.58579 26.4142C6.21071 26.0391 6 25.5304 6 25V7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 21L14 16L18 19L22 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 5H26V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 11L26 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // Connectivity, Redefined - network/connection icon
  <svg key="1" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <circle cx="16" cy="7" r="3" stroke="white" strokeWidth="2"/>
    <circle cx="7" cy="25" r="3" stroke="white" strokeWidth="2"/>
    <circle cx="25" cy="25" r="3" stroke="white" strokeWidth="2"/>
    <path d="M16 10V15M16 15L8 22M16 15L24 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // AI-Driven Operations - brain/AI icon
  <svg key="2" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <path d="M16 4C11.582 4 8 7.582 8 12C8 14.4 9 16.56 10.6 18L10 28H22L21.4 18C23 16.56 24 14.4 24 12C24 7.582 20.418 4 16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 11V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 11V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
  // Sustainability - leaf/eco icon
  <svg key="3" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <path d="M6 26C6 26 8 18 16 14C24 10 28 6 28 6C28 6 26 14 18 18C10 22 6 26 6 26Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 14V26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 22C12 22 14 20 16 20C18 20 20 22 20 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>,
  // Safety - shield icon
  <svg key="4" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <path d="M16 4L6 8V14C6 20.63 10.28 26.79 16 28C21.72 26.79 26 20.63 26 14V8L16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16L15 19L21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // Tailored/Custom - settings/gear icon
  <svg key="5" viewBox="0 0 32 32" fill="none" className="w-6 h-6 lg:w-7 lg:h-7">
    <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="white" strokeWidth="2"/>
    <path d="M26 16C26 15.4 25.96 14.8 25.88 14.22L29 11.68L26 6.32L22.22 7.78C21.34 7.08 20.36 6.52 19.3 6.14L18.6 2H13.4L12.7 6.14C11.64 6.52 10.66 7.08 9.78 7.78L6 6.32L3 11.68L6.12 14.22C6.04 14.8 6 15.4 6 16C6 16.6 6.04 17.2 6.12 17.78L3 20.32L6 25.68L9.78 24.22C10.66 24.92 11.64 25.48 12.7 25.86L13.4 30H18.6L19.3 25.86C20.36 25.48 21.34 24.92 22.22 24.22L26 25.68L29 20.32L25.88 17.78C25.96 17.2 26 16.6 26 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

export function IndustryFeatures({ industry }: IndustryFeaturesProps) {
  return (
    <section
      className="relative py-10 lg:py-12 px-4 sm:px-6 lg:px-10 overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: "#EAF2FF" }}
    >
      <div className="relative max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-6 lg:mb-8">
            <h2
              className="text-xl sm:text-2xl lg:text-[32px]"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 500,
                lineHeight: "1.2",
                letterSpacing: "0.68px",
                background: "linear-gradient(275.81deg, #4587F4 3.26%, #D2CFFF 121.53%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {industry.featuresTitle}
            </h2>
          </div>
        </AnimatedSection>

        {/* Features Grid - 3x2 */}
        <StaggerContainer
          staggerDelay={0.08}
          delayStart={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {industry.features.map((feature, index) => (
            <StaggerItem key={feature.title} className="h-full">
              <motion.div
                className="h-full p-5 lg:p-6 rounded-[24px]"
                style={{
                  background: "linear-gradient(106.33deg, #F5F9FF 15.16%, #FFFFFF 101.29%)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px rgba(69, 135, 244, 0.15)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Icon - blue gradient circle */}
                <motion.div
                  className="w-[50px] h-[50px] lg:w-[56px] lg:h-[56px] mb-3 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(312.71deg, #4587F4 22.58%, #5047E4 134.05%)",
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  {featureIcons[index]}
                </motion.div>

                {/* Title with gradient */}
                <h3
                  className="text-base sm:text-lg lg:text-xl mb-2"
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 500,
                    lineHeight: "1.3",
                    letterSpacing: "0.02em",
                    background: "linear-gradient(275.81deg, #4587F4 3.26%, #D2CFFF 121.53%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs sm:text-sm lg:text-[14px]"
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: 400,
                    lineHeight: "1.6",
                    color: "#4587F4",
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
