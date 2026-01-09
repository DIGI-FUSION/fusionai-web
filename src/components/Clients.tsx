"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations";

const CLIENTS = [
  { name: "Brave", logo: "/clients/brave.svg" },
  { name: "Microsoft", logo: "/clients/microsoft.svg" },
  { name: "NVIDIA", logo: "/clients/nvidia.svg" },
  { name: "Starlink", logo: "/clients/starlink.svg" },
  { name: "Google", logo: "/clients/google.svg" },
  { name: "GitHub", logo: "/clients/github.svg" },
];

// Duplicate for seamless loop
const DOUBLED_CLIENTS = [...CLIENTS, ...CLIENTS];

export function Clients() {
  return (
    <section className="relative py-16 md:py-20 px-6 bg-background/95 backdrop-blur-sm -mt-48 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading with animation */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mb-16">
            <p className="text-white/60 text-sm md:text-base uppercase tracking-widest font-medium mb-4">
              Powering Tools and Integrations from Companies All Around the World
            </p>
          </div>
        </AnimatedSection>

        {/* Infinite scrolling logos marquee */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          
          <motion.div 
            className="flex gap-12 md:gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {DOUBLED_CLIENTS.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

