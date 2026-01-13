"use client";

import { Button } from "@/components/ui/Button";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const unicornRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    let scene: { destroy: () => void } | null = null;

    const initUnicorn = async () => {
      // Wait for the DOM element to be ready
      if (!unicornRef.current) return;

      // @ts-expect-error - UnicornStudio is loaded from external script
      if (!window.UnicornStudio?.addScene) {
        // Load the script if not already loaded
        await new Promise<void>((resolve) => {
          const existingScript = document.querySelector('script[src="/scripts/unicornStudio.umd.js"]');
          if (existingScript) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = "/scripts/unicornStudio.umd.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      // Small delay to ensure script is fully initialized
      await new Promise((resolve) => setTimeout(resolve, 100));

      // @ts-expect-error - UnicornStudio is loaded from external script
      if (window.UnicornStudio?.addScene) {
        // @ts-expect-error - UnicornStudio is loaded from external script
        scene = await window.UnicornStudio.addScene({
          elementId: unicornRef.current.id,
          fps: 60,
          scale: 1,
          dpi: 1.5,
          filePath: "/scenes/hero-background.json",
        });
      }
    };

    initUnicorn();

    return () => {
      if (scene) {
        scene.destroy();
      }
    };
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24"
    >
      {/* Unicorn Studio 3D Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={unicornRef}
          id="unicorn-hero-scene"
          className="absolute inset-0 w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background/80" />
      </div>

      {/* Static glow orbs - CSS animation instead of Framer */}
      <div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none animate-scale-pulse z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(69, 135, 244, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full pointer-events-none animate-scale-pulse z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Animated title with word-by-word reveal */}
        {/* <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight sm:whitespace-nowrap"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90"
          >
            Fuse
          </motion.span>
          {" "}
          <motion.span
            variants={wordVariants}
            className="inline-block font-light text-white/90"
          >
            Anything
          </motion.span>
          {" "}
          <motion.span
            variants={wordVariants}
            className="inline-block font-light text-white/60"
          >
            —
          </motion.span>
          {" "}
          <motion.span
            variants={wordVariants}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white"
          >
            No Code Needed
          </motion.span>
        </motion.h1> */}

        {/* Subtitle with fade up */}
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto font-light px-2 mt-6 sm:mt-30"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          Build powerful workflows visually in minutes
        </motion.p>

        {/* Buttons with stagger */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <GetStartedButton size="lg" className="text-sm sm:text-base w-full sm:w-auto" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto"
          >
            <Button variant="glass" size="lg" className="px-6 sm:px-8 text-sm sm:text-base gap-2 sm:gap-3 w-full sm:w-auto">
              <svg
                className="size-4 sm:size-5"
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

        {/* Scroll indicator - CSS animation */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-sm tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}

