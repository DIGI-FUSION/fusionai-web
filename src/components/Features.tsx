"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/GradientCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";

const FEATURES = [
  {
    title: "Smart Infrastructure",
    description: "Hybrid Edge/Cloud deployment. Scalable, secure, and optimized for performance.",
    icon: "/features/brain.svg",
  },
  {
    title: "Device Integration",
    description: "Connect and control IoT devices, cameras, and sensors with ease.",
    icon: "/features/pc.svg",
  },
  {
    title: "AI Lifecycle",
    description: "From data collection to model training and deployment — it's all covered.",
    icon: "/features/brainAI.svg",
  },
];

export function Features() {
  return (
    <section className="relative py-20 px-6 bg-background/95 backdrop-blur-sm overflow-hidden">
      {/* Main container - matching Figma specs */}
      <div 
        className="mx-auto flex flex-col items-center"
        style={{
          width: "1200px",
          height: "526px",
          padding: "62px 0px",
          gap: "24px",
        }}
      >
        {/* Header section with animation */}
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 500,
                fontSize: "42px",
                lineHeight: "120%",
                letterSpacing: "0.02em",
                color: "#FFFFFF",
              }}
            >
              Fusion AI: End-to-End Orchestration Platform
            </h2>
            <p
              className="mt-4"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: "16px",
                lineHeight: "26px",
                color: "rgba(237, 244, 255, 0.7)",
              }}
            >
              Infrastructure, tools, and execution – all in one place.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards container with stagger animation */}
        <StaggerContainer
          staggerDelay={0.15}
          delayStart={0.3}
          className="flex flex-row items-center"
          style={{
            width: "1200px",
            height: "305px",
            gap: "24px",
          }}
        >
          {FEATURES.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <GradientCard width="384px" height="305px">
                  {/* Icon container with floating animation */}
                  <motion.div 
                    className="relative flex items-center justify-center flex-none"
                    style={{
                      width: "146px",
                      height: "146px",
                    }}
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={146}
                      height={146}
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Text content */}
                  <div 
                    className="flex flex-col items-center"
                    style={{
                      width: "336px",
                      height: "87px",
                      gap: "14px",
                    }}
                  >
                    <h3
                      className="text-white text-center"
                      style={{
                        fontFamily: "var(--font-be-vietnam-pro), sans-serif",
                        fontWeight: 600,
                        fontSize: "22px",
                        lineHeight: "20px",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-white text-center"
                      style={{
                        width: "336px",
                        fontFamily: "var(--font-be-vietnam-pro), sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "26px",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </GradientCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
