"use client";

import { Button } from "@/components/ui/Button";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleField, GlowOrb } from "@/components/animations";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -60,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24"
    >
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home_title_bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </motion.div>

      {/* Animated particles */}
      <ParticleField count={30} className="z-[1]" />
      
      {/* Animated glow orbs */}
      <GlowOrb 
        className="top-1/4 left-1/4" 
        size={400} 
        color="rgba(69, 135, 244, 0.2)" 
        duration={10}
      />
      <GlowOrb 
        className="bottom-1/4 right-1/4" 
        size={350} 
        color="rgba(147, 51, 234, 0.15)" 
        duration={12}
        delay={2}
      />

      {/* Content with scale and opacity on scroll */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Animated title with word-by-word reveal */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight whitespace-nowrap"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: 1000 }}
        >
          <motion.span 
            variants={wordVariants}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90"
            style={{ transformStyle: "preserve-3d" }}
          >
            Fuse
          </motion.span>
          {" "}
          <motion.span 
            variants={wordVariants}
            className="inline-block font-light text-white/90"
            style={{ transformStyle: "preserve-3d" }}
          >
            Anything
          </motion.span>
          {" "}
          <motion.span 
            variants={wordVariants}
            className="inline-block font-light text-white/60"
            style={{ transformStyle: "preserve-3d" }}
          >
            —
          </motion.span>
          {" "}
          <motion.span 
            variants={wordVariants}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white"
            style={{ transformStyle: "preserve-3d" }}
          >
            No Code Needed
          </motion.span>
        </motion.h1>

        {/* Subtitle with fade up */}
        <motion.p 
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          Build powerful workflows visually in minutes
        </motion.p>

        {/* Buttons with stagger */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GetStartedButton size="lg" className="text-base" />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="glass" size="lg" className="px-8 text-base gap-3">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              Start on GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-sm tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
