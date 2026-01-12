"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { GradientCard } from "@/components/ui/GradientCard";
import { USE_CASES } from "@/constants/useCases";

// 3D Card with mouse-following tilt effect (optimized)
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
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Reduced particle count from 8 to 4
  const particlePositions = [20, 45, 65, 85];

  // Optimized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    onLeave();
  }, [onLeave]);

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GradientCard
        width="100%"
        height="220px"
        padding="28px"
        className={`relative overflow-hidden transition-all duration-200 ${
          isHovered ? "z-10" : "z-0"
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-5px)`
            : "rotateX(0deg) rotateY(0deg) translateY(0px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Gradient background on hover - CSS transition */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} transition-opacity duration-300`}
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Particles on hover - CSS animation */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.map((position, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float-particle"
                style={{
                  background: useCase.color,
                  left: `${position}%`,
                  bottom: "0%",
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Glowing border on hover - CSS transition */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
          style={{
            boxShadow: isHovered
              ? `0 0 40px ${useCase.color}40, inset 0 0 30px ${useCase.color}10`
              : "none",
            border: isHovered ? `1px solid ${useCase.color}50` : "1px solid transparent",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header with icon and category */}
          <div className="flex items-center gap-3 mb-4">
            {/* Icon - CSS transition 
            <div
              className="text-3xl transition-transform duration-300"
              style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
            >
              {useCase.icon}
            </div>
*/}
            {/* Category badge */}
            <span
              className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-transform duration-300"
              style={{
                background: `${useCase.color}20`,
                color: useCase.color,
                border: `1px solid ${useCase.color}30`,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              {useCase.category}
            </span>
          </div>

          {/* Title with underline animation */}
          <div className="relative mb-3">
            <h3
              className="text-xl font-bold text-white transition-transform duration-200"
              style={{ transform: isHovered ? "translateX(5px)" : "translateX(0)" }}
            >
              {useCase.title}
            </h3>
            <div
              className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: useCase.color,
                width: isHovered ? "60%" : "0%",
              }}
            />
          </div>

          {/* Description */}
          <p
            className="text-white/70 text-sm leading-relaxed flex-1 transition-all duration-200"
            style={{
              opacity: isHovered ? 1 : 0.7,
              transform: isHovered ? "translateX(5px)" : "translateX(0)",
            }}
          >
            {useCase.description}
          </p>

          {/* Arrow indicator */}
          <div
            className="absolute bottom-6 right-6 flex items-center gap-2 transition-all duration-200"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(-10px)",
            }}
          >
            <span className="text-xs" style={{ color: useCase.color }}>Explore</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={useCase.color}
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </GradientCard>
    </motion.div>
  );
}

export function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-6 bg-background/95 backdrop-blur-sm overflow-hidden"
    >
      {/* Static background - CSS animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs - CSS animation */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-scale-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            left: "-10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-scale-pulse"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            right: "-5%",
            bottom: "10%",
            animationDelay: "3s",
          }}
        />

        {/* Static geometric shapes - reduced from 6 to 3, CSS animation */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              width: 25 + (i % 3) * 10,
              height: 25 + ((i + 1) % 3) * 10,
              left: `${20 + i * 30}%`,
              top: `${25 + (i % 3) * 25}%`,
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: i % 2 === 0 ? "50%" : "4px",
              animationDelay: `${i * 1.5}s`,
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Use Cases
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real flows for real teams — from support to marketing.
            <br />
            <span className="text-white/40">Discover how Fusion AI transforms industries.</span>
          </p>
        </motion.div>

        {/* Cards Grid */}
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
