"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { GradientCard } from "@/components/ui/GradientCard";
import { USE_CASES } from "@/constants";

// Interactive 3D Card with magnetic effect
function UseCaseCard({
  useCase,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  useCase: typeof USE_CASES[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  // Fixed particle positions - no randomness
  const particlePositions = [15, 25, 40, 55, 70, 85, 30, 60];
  const particleDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.15, 0.25, 0.35];
  const particleDurations = [1.5, 1.7, 1.9, 2.1, 2.3, 1.6, 1.8, 2.0];

  function handleMouse(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    onLeave();
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <GradientCard
          width="100%"
          height="220px"
          padding="28px"
          className={`relative overflow-hidden transition-all duration-300 ${
            isHovered ? "z-10" : "z-0"
          }`}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating particles on hover */}
          {isHovered && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particlePositions.map((position, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: useCase.color,
                    left: `${position}%`,
                    bottom: "0%",
                  }}
                  animate={{
                    y: [0, -150],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: particleDurations[i],
                    repeat: Infinity,
                    delay: particleDelays[i],
                  }}
                />
              ))}
            </div>
          )}

          {/* Glowing border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered 
                ? `0 0 40px ${useCase.color}40, inset 0 0 30px ${useCase.color}10` 
                : "none",
              border: isHovered ? `1px solid ${useCase.color}50` : "1px solid transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header with icon and category */}
            <div className="flex items-center gap-3 mb-4">
              {/* Animated icon */}
              <motion.div
                className="text-3xl"
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {useCase.icon}
              </motion.div>
              
              {/* Category badge */}
              <motion.span
                className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider"
                style={{
                  background: `${useCase.color}20`,
                  color: useCase.color,
                  border: `1px solid ${useCase.color}30`,
                }}
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              >
                {useCase.category}
              </motion.span>
            </div>

            {/* Title with underline animation */}
            <div className="relative mb-3">
              <motion.h3
                className="text-xl font-bold text-white"
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {useCase.title}
              </motion.h3>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                style={{ background: useCase.color }}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "60%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Description */}
            <motion.p
              className="text-white/70 text-sm leading-relaxed flex-1"
              animate={isHovered ? { opacity: 1, x: 5 } : { opacity: 0.7, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {useCase.description}
            </motion.p>

            {/* Arrow indicator */}
            <motion.div
              className="absolute bottom-6 right-6 flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs" style={{ color: useCase.color }}>Explore</span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={useCase.color}
                strokeWidth="2"
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.div>
          </div>
        </GradientCard>
      </motion.div>
    </motion.div>
  );
}

export function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fixed shape dimensions - no randomness
  const shapes = Array.from({ length: 6 }, (_, i) => ({
    width: 25 + (i % 3) * 10,
    height: 25 + ((i + 1) % 3) * 10,
    left: `${10 + i * 15}%`,
    top: `${20 + (i % 3) * 30}%`,
    borderRadius: i % 2 === 0 ? "50%" : "4px",
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 bg-background/95 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Moving gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            left: "-10%",
            top: "20%",
            y: backgroundY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            right: "-5%",
            bottom: "10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating geometric shapes */}
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: shape.borderRadius,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with parallax */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity: headerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            
          </motion.div>
          
          <motion.h2
            className="text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Use Cases
          </motion.h2>
          
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real flows for real teams — from support to marketing.
            <br />
            <span className="text-white/40">Discover how Fusion AI transforms industries.</span>
          </motion.p>
        </motion.div>

        {/* Cards Grid - Bento style layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1: 3 cards */}
          {USE_CASES.slice(0, 3).map((useCase, index) => (
            <UseCaseCard
              key={useCase.title}
              useCase={useCase}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
          
          {/* Row 2: 2 wider cards */}
          <div className="lg:col-span-2">
            <UseCaseCard
              useCase={USE_CASES[3]}
              index={3}
              isHovered={hoveredIndex === 3}
              onHover={() => setHoveredIndex(3)}
              onLeave={() => setHoveredIndex(null)}
            />
          </div>
          <UseCaseCard
            useCase={USE_CASES[4]}
            index={4}
            isHovered={hoveredIndex === 4}
            onHover={() => setHoveredIndex(4)}
            onLeave={() => setHoveredIndex(null)}
          />
          
          {/* Row 3: 3 cards */}
          {USE_CASES.slice(5, 8).map((useCase, index) => (
            <UseCaseCard
              key={useCase.title}
              useCase={useCase}
              index={index + 5}
              isHovered={hoveredIndex === index + 5}
              onHover={() => setHoveredIndex(index + 5)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
