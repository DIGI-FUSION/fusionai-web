"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animations";

const TRUSTED_PARTNERS = [
  { name: "Attijariwafa Bank", logo: "/aba/trustedby/atijari.svg" },
  { name: "Autosur", logo: "/aba/trustedby/autosur.svg" },
  { name: "Aptiv", logo: "/aba/trustedby/aptiv.svg" },
  { name: "Zurich", logo: "/aba/trustedby/zurich.svg" },
  { name: "Amana", logo: "/aba/trustedby/amana.svg" },
  { name: "MSPS", logo: "/aba/trustedby/msps.svg" },
  { name: "ANP", logo: "/aba/trustedby/anp.svg" },
  { name: "Poste", logo: "/aba/trustedby/psote.svg" },
];

// Double the array for infinite scroll effect
const DOUBLED_PARTNERS = [...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS];

export function TrustedBy() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "48px 80px",
        background: "#EAF2FF",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8">
        {/* Heading with gradient text */}
        <AnimatedSection delay={0.2}>
          <h3
            className="text-xl sm:text-2xl font-medium text-center uppercase"
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 500,
              lineHeight: "42px",
              letterSpacing: "0.68px",
              background: "linear-gradient(275.81deg, #4587F4 3.26%, #D2CFFF 121.53%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Trusted By
          </h3>
        </AnimatedSection>

        {/* Logo marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#EAF2FF] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#EAF2FF] to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-12 items-center px-[50px]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {DOUBLED_PARTNERS.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={50}
                  className="object-contain"
                  style={{ height: "50px", width: "auto" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
