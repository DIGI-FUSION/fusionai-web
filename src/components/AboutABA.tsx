"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { AnimatedSection, GlowOrb } from "@/components/animations";

export function AboutABA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden bg-background/95 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto">
        {/* Background glow effects - now animated */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <GlowOrb 
            className="top-1/4 left-[10%]" 
            size={400} 
            color="rgba(66, 133, 244, 0.3)" 
            duration={8}
          />
          <GlowOrb 
            className="top-1/3 right-[10%]" 
            size={350} 
            color="rgba(147, 51, 234, 0.25)" 
            duration={10}
            delay={2}
          />
        </div>

        {/* Decorative floating points with animation */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            { top: "10%", left: "5%", delay: 0 },
            { top: "15%", left: "8%", delay: 0.5 },
            { top: "12%", right: "6%", delay: 1 },
            { top: "18%", right: "10%", delay: 1.5 },
            { bottom: "20%", left: "8%", delay: 2 },
            { bottom: "25%", left: "12%", delay: 2.5 },
            { bottom: "18%", right: "7%", delay: 3 },
            { bottom: "24%", right: "11%", delay: 3.5 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/50"
              style={pos}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                delay: pos.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main card with reveal animation */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            width: "1200px",
            height: "655px",
            background: "radial-gradient(62.57% 43.74% at 50% 56.26%, rgba(0, 36, 59, 0.6) 0.48%, rgba(7, 32, 50, 0.6) 37.98%, rgba(21, 19, 23, 0.6) 98.56%)",
            backdropFilter: "blur(10px)",
            borderRadius: "35px",
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-[35px] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(69, 135, 244, 0.3) 0%, transparent 50%, rgba(147, 51, 234, 0.3) 100%)",
              padding: "1px",
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid dot pattern background */}
          <motion.div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              borderRadius: "35px",
            }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Title and subtitle with stagger */}
          <div className="relative text-center pt-16 z-10">
            <AnimatedSection delay={0.3}>
              <h2
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: "42px",
                  lineHeight: "120%",
                  letterSpacing: "0.02em",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                About ABA Fusion AI
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "rgba(237, 244, 255, 0.7)",
                }}
              >
                Tools to automate, connect, and simplify your work.
              </p>
            </AnimatedSection>
          </div>

          {/* SVG Container with scale animation */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10" 
            style={{ top: "50px" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src="/aboutABA.svg"
              alt="ABA Fusion AI platform diagram"
              width={1000}
              height={500}
              className="w-full max-w-[1000px] h-auto object-contain"
              priority
              style={{
                filter: "drop-shadow(0 0 20px rgba(66, 133, 244, 0.15))",
              }}
            />
          </motion.div>

          {/* Get Started button with hover effect */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{ top: "572px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <GetStartedButton size="md" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
