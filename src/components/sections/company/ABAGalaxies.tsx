"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { GradientCard } from "@/components/ui/GradientCard";

interface GalaxyCard {
  title: string;
  companies: {
    name: string;
    logo: string;
  }[];
}

const GALAXIES: GalaxyCard[] = [
  {
    title: "AI of Things",
    companies: [
      { name: "Mediot", logo: "/aba/mediot.svg" },
      { name: "FMC24", logo: "/aba/fmc24.svg" },
      { name: "Digieye", logo: "/aba/DIGIEYE.svg" },
    ],
  },
  {
    title: "Health-Tech",
    companies: [
      { name: "Mediot", logo: "/aba/mediot.svg" },
      { name: "FMC24", logo: "/aba/fmc24.svg" },
      { name: "Digieye", logo: "/aba/DIGIEYE.svg" },
    ],
  },
  {
    title: "Smart Cities",
    companies: [
      { name: "Nextcore", logo: "/aba/nextcore.svg" },
      { name: "Icity", logo: "/aba/Icity.svg" },
    ],
  },
  {
    title: "Smart Supply Chain",
    companies: [{ name: "SCX Technology", logo: "/aba/scx.svg" }],
  },
  {
    title: "Industry X.0",
    companies: [
      { name: "Hardiot", logo: "/aba/hardiot.svg" },
      { name: "Mana Technology", logo: "/aba/mana.svg" },
    ],
  },
];

function GalaxyCardComponent({ galaxy, index }: { galaxy: GalaxyCard; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <GradientCard className="w-full h-full min-h-[280px]" padding="24px" gap="16px">
        {/* Card title */}
        <h3
          className="text-base font-medium text-white/80 self-start"
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {galaxy.title}
        </h3>

        {/* Company logos */}
        <div className="flex flex-col gap-3 w-full">
          {galaxy.companies.map((company, companyIndex) => (
            <motion.div
              key={company.name}
              className="flex items-center justify-center rounded-[12px] py-4 px-5"
              style={{
                background: "linear-gradient(135deg, rgba(66, 133, 244, 0.2) 0%, rgba(66, 133, 244, 0.08) 100%)",
                border: "1px solid rgba(66, 133, 244, 0.25)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + companyIndex * 0.1 + 0.3 }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(66, 133, 244, 0.5)",
                background: "linear-gradient(135deg, rgba(66, 133, 244, 0.25) 0%, rgba(66, 133, 244, 0.12) 100%)",
              }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={160}
                height={45}
                className="object-contain"
                style={{ height: "auto", maxHeight: "45px" }}
              />
            </motion.div>
          ))}
        </div>
      </GradientCard>
    </motion.div>
  );
}

export function ABAGalaxies() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 overflow-hidden bg-background"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            right: "10%",
            bottom: "20%",
            background: "rgba(147, 51, 234, 0.15)",
            filter: "blur(150px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            right: "30%",
            bottom: "10%",
            background: "rgba(66, 133, 244, 0.1)",
            filter: "blur(150px)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section header */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Aba Technology&apos;s Galaxies
            </h2>
            <p
              className="text-white/50 text-sm md:text-base"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Integrated & global actor in AIoT&apos;s value chain
            </p>
          </div>
        </AnimatedSection>

        {/* Galaxy cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {GALAXIES.map((galaxy, index) => (
            <GalaxyCardComponent key={galaxy.title} galaxy={galaxy} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
