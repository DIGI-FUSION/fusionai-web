"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/GradientCard";
import { AnimatedSection, StaggerContainer, StaggerItem, TiltCard } from "@/components/animations";

const PATHS = [
  {
    title: "Startups",
    description: "Launch your own AI agents or create a complete digital organization using our tools.",
    image: "/paths/startups.png",
    buttonText: "Get Started",
  },
  {
    title: "Entreprises",
    description: "Custom AI solutions for your sector: Mining, Industry, Retail, and more.",
    image: "/paths/entreprises.png",
    buttonText: "Request a demo",
  },
  {
    title: "Government",
    description: "Technology sovereignty programs and AI training in partnership with public services.",
    image: "/paths/governement.png",
    buttonText: "Learn More",
  },
];

export function ChoosePath() {
  return (
    <section className="relative py-24 px-6 bg-background/95 backdrop-blur-sm overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
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
              }}
            >
              Choose your path with Fusion AI
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
              AI solutions tailored to every profile: startups, businesses, and governments.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards Row with stagger */}
        <StaggerContainer
          staggerDelay={0.15}
          delayStart={0.2}
          className="flex flex-col md:flex-row items-stretch justify-center"
          style={{ gap: "24px" }}
        >
          {PATHS.map((path, index) => (
            <StaggerItem key={path.title}>
              <TiltCard maxTilt={8} glareOpacity={0.15}>
                <GradientCard
                  width="384px"
                  height="423px"
                  className="flex flex-col items-center"
                >
                  {/* Image Container with hover zoom */}
                  <motion.div
                    className="relative overflow-hidden"
                    style={{
                      width: "336px",
                      height: "166px",
                      borderRadius: "8px",
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={path.image}
                      alt={path.title}
                      fill
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
                  <div
                    className="flex flex-col items-center"
                    style={{
                      gap: "14px",
                      width: "336px",
                    }}
                  >
                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 600,
                        fontSize: "22px",
                        lineHeight: "20px",
                        color: "#FFFFFF",
                      }}
                    >
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        width: "336px",
                        height: "78px",
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 300,
                        fontSize: "16px",
                        lineHeight: "26px",
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {path.description}
                    </p>
                  </div>

                  {/* Button with animation */}
                  <div style={{ marginTop: "auto" }}>
                    <motion.button
                      className="group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-medium tracking-tight transition-all duration-300 bg-white/5 hover:bg-gradient-to-r hover:from-[#2B61C7] hover:to-[#213C87] shadow-[inset_0_1px_0_0_rgba(255,255,255,.08)]"
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
