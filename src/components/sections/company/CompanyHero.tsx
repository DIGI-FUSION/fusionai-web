"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CompanyHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "#13161B",
      }}
    >
      {/* Background image - space galaxy */}
      <motion.div
        className="absolute inset-[-10%] z-0"
        style={{ y }}
      >
        <Image
          src={assetPath("/aba/herobg.webp")}
          alt="ABA Technology Background"
          fill
          className="object-cover"
          style={{
            objectPosition: "center 40%",
          }}
          priority
        />
      </motion.div>

      {/* Galaxy SVG - positioned on the right next to text */}
      <motion.div
        className="absolute z-[2] hidden lg:block"
        style={{
          right: "80px",
          top: "200px",
          width: "640px",
          height: "450px",
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Image
          src={assetPath("/aba/abagalaxy.svg")}
          alt="ABA Technology Galaxy"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[120px] pt-24 pb-20"
        style={{ opacity }}
      >
        <div className="flex flex-col max-w-[610px]">
          {/* Title */}
          <motion.h1
            className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[38px] leading-[120%] tracking-[0.05em] mb-6"
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
            }}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <span style={{ color: "#A4233B" }}>ABA</span>{" "}
            <span className="text-white">Technology</span>{" "}
            <span className="text-white">
              Subscribes to the Objectives of the United Nations Sustainable
              Development Charter
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-[16px] sm:text-[18px] leading-[140%] mb-10 text-white/80"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 300,
            }}
          >
            Our group positions itself as a co-builder of major disruptive
            transformations, differentiating itself through end-to-end integration of
            the technological value chain, sector-specific expertise, and a
            relentless focus on delivering exceptional service to our clients. The
            group has structured itself around four areas of activity to support its
            clients from design to the deployment of future business models.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            <motion.button
              className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-[30px] text-white text-sm font-medium"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), #4285F4",
                boxShadow: "0px 1px 2px rgba(37, 62, 167, 0.48), 0px 0px 0px 1px #375DFB",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              More About Aba Technology
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[5]"
        style={{
          background: "linear-gradient(to top, #13161B 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
