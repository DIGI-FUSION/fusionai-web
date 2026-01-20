"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GetStartedButton } from "@/components/ui/GetStartedButton";

// Reduced from 15 to 6 particles for performance
const PARTICLES = [
  { id: 0, x: 10, y: 20, size: 3 },
  { id: 1, x: 85, y: 15, size: 4 },
  { id: 2, x: 25, y: 70, size: 2 },
  { id: 3, x: 75, y: 80, size: 5 },
  { id: 4, x: 50, y: 30, size: 3 },
  { id: 5, x: 15, y: 55, size: 4 },
];

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="bg-background overflow-hidden py-8 sm:py-16 px-4 sm:px-6"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[1200px] rounded-[20px] sm:rounded-[30px] p-12 sm:p-[89px_40px]"
        style={{
          backdropFilter: "blur(3.65px)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage: "linear-gradient(-67.7715deg, rgba(5, 0, 74, 0.1) 6.5965%, rgba(100, 72, 255, 0.1) 100.84%)",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Static gradient spotlight - no mouse tracking */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(55, 93, 251, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Static grid background - no animation */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(55, 93, 251, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(55, 93, 251, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated border - CSS animation */}
        <div
          aria-hidden="true"
          className={`animate-border-glow ${!isInView ? 'animation-paused' : ''}`}
          style={{
            position: "absolute",
            border: "1px solid #043d88",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "30px",
          }}
        />

        {/* Glow orbs - CSS animation instead of Framer */}
        <div
          className={`absolute pointer-events-none w-32 h-32 sm:w-[180px] sm:h-[180px] animate-scale-pulse ${!isInView ? 'animation-paused' : ''}`}
          style={{
            right: "10%",
            top: "10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240, 135, 255, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div
          className={`absolute pointer-events-none w-32 h-32 sm:w-[180px] sm:h-[180px] animate-scale-pulse ${!isInView ? 'animation-paused' : ''}`}
          style={{
            left: "10%",
            top: "15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(51, 177, 255, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
            animationDelay: "3s",
          }}
        />

        {/* Particles - CSS animation, reduced count */}
        {isInView && PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full pointer-events-none animate-float-particle ${!isInView ? 'animation-paused' : ''}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: particle.id % 2 === 0
                ? "rgba(240, 135, 255, 0.6)"
                : "rgba(51, 177, 255, 0.6)",
              animationDelay: `${particle.id * 0.4}s`,
              opacity: 0,
            }}
          />
        ))}

        {/* Scanning line - CSS animation */}
        <div
          className={`absolute left-0 right-0 h-[1px] pointer-events-none animate-scan-line ${!isInView ? 'animation-paused' : ''}`}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(55, 93, 251, 0.5), transparent)",
            top: 0,
          }}
        />

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center px-4"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 500,
            width: "100%",
            position: "relative",
            zIndex: 10,
          }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-[48px]"
            style={{
              lineHeight: "1.2",
              color: "white",
              letterSpacing: "0.68px",
              margin: 0,
            }}
          >
            Ready to Automate Your Work?
          </h2>
          <p
            className="text-base sm:text-lg md:text-[20px]"
            style={{
              lineHeight: "1.4",
              color: "#c4c4c4",
              margin: 0,
            }}
          >
            Sign up now and start saving time today.
          </p>
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4"
          style={{
            alignItems: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <GetStartedButton size="md" className="w-full sm:w-auto" />
          </motion.div>

          {/* Start on GitHub Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
            style={{
              position: "relative",
              borderRadius: "33.261px",
              cursor: "pointer",
            }}
          >
            <div
              className="flex gap-3 items-center justify-center w-full p-3 sm:p-[13.305px]"
              style={{
                overflow: "clip",
                borderRadius: "inherit",
                backgroundImage: "linear-gradient(244.75deg, rgba(255, 255, 255, 0.12) 2.51%, rgba(255, 255, 255, 0) 64.942%)",
              }}
            >
              {/* GitHub Icon */}
              <div className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0">
                <svg
                  style={{ display: "block", width: "100%", height: "100%" }}
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 22.1742 22.1742"
                >
                  <g clipPath="url(#clip0_cta)">
                    <path
                      d="M11.0857 0.23085C4.96422 0.23085 -3.59748e-05 5.21451 -3.59748e-05 11.3623C-3.59748e-05 16.2795 3.17643 20.451 7.58356 21.9242C8.13791 22.0267 8.34025 21.683 8.34025 21.3879C8.34025 21.1231 8.33055 20.4233 8.32501 19.4947C5.2414 20.1669 4.59003 18.0021 4.59003 18.0021C4.08696 16.716 3.35936 16.3737 3.35936 16.3737C2.35182 15.6835 3.4342 15.6974 3.4342 15.6974C4.54707 15.7764 5.13192 16.8449 5.13192 16.8449C6.12144 18.5454 7.72769 18.0548 8.35966 17.7693C8.45944 17.05 8.74632 16.5594 9.06369 16.2808C6.60235 15.9995 4.0135 15.0446 4.0135 10.7802C4.0135 9.56482 4.4459 8.57114 5.15548 7.79227C5.04045 7.51093 4.66071 6.37866 5.26358 4.84725C5.26358 4.84725 6.1949 4.5479 8.31254 5.98784C9.19673 5.74115 10.1447 5.61781 11.0885 5.61365C12.0295 5.61919 12.9788 5.74115 13.8644 5.98923C15.9807 4.54928 16.9106 4.84864 16.9106 4.84864C17.5148 6.38143 17.1351 7.51232 17.0215 7.79365C17.7324 8.57253 18.1607 9.56621 18.1607 10.7816C18.1607 15.0571 15.5691 15.9981 13.0994 16.2739C13.4972 16.6176 13.8519 17.2967 13.8519 18.3347C13.8519 19.8232 13.8381 21.0234 13.8381 21.3879C13.8381 21.6858 14.0376 22.0323 14.6003 21.9228C19.0005 20.4482 22.1742 16.2781 22.1742 11.3623C22.1742 5.21451 17.21 0.23085 11.0857 0.23085Z"
                      fill="#5C6BC0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_cta">
                      <rect fill="white" height="22.1742" width="22.1742" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p
                className="text-sm sm:text-base whitespace-nowrap"
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  textAlign: "center",
                  color: "white",
                  letterSpacing: "-0.1599px",
                  margin: 0,
                }}
              >
                Start on GitHub
              </p>
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                border: "1.109px solid white",
                inset: 0,
                pointerEvents: "none",
                borderRadius: "33.261px",
                boxShadow: "0px 1.109px 2.217px 0px rgba(37,62,167,0.48), 0px 0px 0px 1.109px #375dfb",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
