"use client";

import Image from "next/image";
import { GradientCard } from "@/components/ui/GradientCard";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const KEY_FEATURES = [
  {
    title: "FUSION DATA PLATFORM",
    description: "FUSION DATA PLATFORM constitue la colonne vertébrale de la gouvernance des données de Fusion AI. Elle permet la collecte, la structuration, la sécurisation et la qualification des données provenant de sources multiples, tout en garantissant la traçabilité, la conformité et la cohérence.",
    image: "/keySections/data.png",
    icon: "/keySections/data_icon.svg",
    color: "#4587F4",
  },
  {
    title: "FUSION AUTOMATION",
    description: "FUSION AUTOMATION est le moteur d'orchestration intelligent des processus métier et techniques. Il permet de concevoir, d'automatiser et de superviser des flux de travail complexes intégrant systèmes d'information, API, événements et agents d'IA.",
    image: "/keySections/automation.png",
    icon: "/keySections/automation_icon.svg",
    color: "#8B5CF6",
  },
  {
    title: "FUSION AGENTIC",
    description: "FUSION AGENTIC introduit des agents d'IA spécialisés, conçus pour assister, conseiller et agir dans des domaines fonctionnels clairement définis, tout en restant sous contrôle humain et réglementaire.",
    image: "/keySections/agentic.png",
    icon: "/keySections/agentic_icon.svg",
    color: "#10B981",
  },
  {
    title: "FUSION FORGE",
    description: "FUSION FORGE est l'environnement dédié aux chercheurs, aux data scientists et aux ingénieurs en IA pour développer, expérimenter et industrialiser des modèles d'IA.",
    image: "/keySections/forge.png",
    icon: "/keySections/forge_icon.svg",
    color: "#F59E0B",
  },
  {
    title: "FUSION MIND",
    description: "FUSION MIND est la couche de gouvernance cognitive de Fusion AI. Elle permet l'audit des modèles et des agents, la supervision de leur comportement, l'évaluation des risques éthiques.",
    image: "/keySections/mind.png",
    icon: "/keySections/mind_icon.svg",
    color: "#EC4899",
  },
  {
    title: "FUSION ORBITE",
    description: "FUSION ORBIT est la boutique native de FUSION AI, conçue pour bâtir un véritable écosystème autour de la plateforme. Elle permet aux utilisateurs, partenaires et intégrateurs de publier et monétiser des composants.",
    image: "/keySections/orbite.png",
    icon: "/keySections/orbite_icon.svg",
    color: "#06B6D4",
  },
  {
    title: "FUSION MATE",
    description: "FUSION MATE est l'interface unifiée entre les utilisateurs et l'IA de Fusion AI. Elle permet de créer et d'opérer des compagnons IA métier contextualisés.",
    image: "/keySections/mate.png",
    icon: "/keySections/mate_icon.svg",
    color: "#EF4444",
  },
  {
    title: "FUSION QUICK IT",
    description: "FUSION QUICK DECISION est l'atelier low-code de Fusion AI pour concevoir rapidement des applications et des services augmentés par l'IA.",
    image: "/keySections/quickit.png",
    icon: "/keySections/quickit_icon.svg",
    color: "#84CC16",
  },
  {
    title: "FUSION PROCESSUS",
    description: "FUSION PROCESSUS permet aux équipes IT et métier d'assembler données, agents, automatisations et composants réutilisables issus de Fusion Orbit.",
    image: "/keySections/processus.png",
    icon: "/keySections/processus_icon_svg.svg",
    color: "#A855F7",
  },
];

// Animated feature card with 3D transforms
function FeatureCard({
  feature,
  index,
  isActive,
  onClick,
}: {
  feature: (typeof KEY_FEATURES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouse(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isActive ? 1 : 0.85,
        filter: isActive ? "none" : "brightness(0.6)",
      }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d",
          width: "100px",
          height: "100px",
          background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
          border: isActive ? `2px solid ${feature.color}` : "2px solid rgba(255,255,255,0.1)",
          boxShadow: isActive ? `0 0 30px ${feature.color}40` : "none",
        }}
        whileHover={{ scale: isActive ? 1.05 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 20% 20%, ${feature.color}30, transparent 50%)`,
              `radial-gradient(circle at 80% 80%, ${feature.color}30, transparent 50%)`,
              `radial-gradient(circle at 20% 20%, ${feature.color}30, transparent 50%)`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Icon - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-10 h-10 relative"
            animate={isActive ? {
              y: [0, -3, 0],
              rotate: [0, 5, 0, -5, 0],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Glowing ring effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              border: `2px solid ${feature.color}`,
              boxShadow: `inset 0 0 20px ${feature.color}40`,
            }}
          />
        )}
      </motion.div>
      
      {/* Mini title */}
      <motion.p
        className="text-center mt-2 text-[10px] font-medium"
        style={{ 
          color: isActive ? feature.color : "rgba(255,255,255,0.5)",
          maxWidth: "100px",
        }}
        animate={{ opacity: isActive ? 1 : 0.5 }}
      >
        {feature.title.replace("FUSION ", "")}
      </motion.p>
    </motion.div>
  );
}

// Main expanded card content
function ExpandedContent({ feature, index }: { feature: (typeof KEY_FEATURES)[0]; index: number }) {
  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="w-full h-full flex items-center"
    >
      <GradientCard
        variant="gradient-bg"
        width="100%"
        height="500px"
        padding="48px"
        className="flex flex-row items-center relative overflow-hidden"
      >
        {/* Animated icon - absolute top left of card */}
        <motion.div
          className="absolute top-6 left-6 z-20"
          style={{ width: "60px", height: "60px" }}
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${feature.color}, transparent, ${feature.color})`,
              filter: "blur(3px)",
            }}
          />
          <div
            className="absolute inset-1 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: feature.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Left side - Text content */}
        <div className="flex flex-col items-start justify-center flex-1 pr-8 relative z-10 pt-16">
          {/* Title with typewriter effect */}
          <motion.h3
            className="text-4xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description with staggered words */}
          <motion.p
            className="text-base text-white/80 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {feature.description}
          </motion.p>

          {/* Animated progress indicator */}
          <div className="mt-8 flex items-center gap-2">
            {KEY_FEATURES.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                style={{
                  width: i === index ? "40px" : "8px",
                  background: i === index ? feature.color : "rgba(255,255,255,0.2)",
                }}
                layoutId={`progress-${i}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ))}
          </div>
        </div>

        {/* Right side - Image with floating animation */}
        <motion.div
          className="relative"
          style={{ width: "400px", height: "400px" }}
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glowing backdrop */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${feature.color}40, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-contain relative z-10"
          />
        </motion.div>
      </GradientCard>
    </motion.div>
  );
}

export function KeyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KEY_FEATURES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 bg-background/95 backdrop-blur-sm overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(69, 135, 244, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(69, 135, 244, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="text-center mb-8 px-6"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.h2
          className="text-5xl font-medium text-white mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>
        <motion.p
          className="text-white/60 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tools to automate, connect, and simplify your work.
        </motion.p>
      </motion.div>

      {/* Features Grid - Radial layout */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Feature cards orbit */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {KEY_FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
              isActive={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>

        {/* Expanded content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <ExpandedContent
              key={activeIndex}
              feature={KEY_FEATURES[activeIndex]}
              index={activeIndex}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
