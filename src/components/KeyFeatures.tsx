"use client";

import Image from "next/image";
import { GradientCard } from "@/components/ui/GradientCard";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const KEY_FEATURES = [
  {
    title: "FUSION DATA PLATFORM",
    description: "FUSION DATA PLATFORM constitue la colonne vertébrale de la gouvernance des données de Fusion AI. Elle permet la collecte, la structuration, la sécurisation et la qualification des données provenant de sources multiples, tout en garantissant la traçabilité, la conformité et la cohérence. En fournissant un contexte de données unifié et fiable, ce module assure que les modèles d'IA, les agents et les automatisations s'appuient sur des données contrôlées, auditables et adaptées à l'environnement d'entreprise.",
    image: "/keySections/data.png",
    icon: "/keySections/data_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION AUTOMATION",
    description: "FUSION AUTOMATION est le moteur d'orchestration intelligent des processus métier et techniques. Il permet de concevoir, d'automatiser et de superviser des flux de travail complexes intégrant systèmes d'information, API, événements et agents d'IA. Grâce à une approche low-code/no-code et à une orchestration pilotée par l'IA, ce module transforme les analyses et les décisions en actions concrètes, mesurables et traçables.",
    image: "/keySections/automation.png",
    icon: "/keySections/automation_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION AGENTIC",
    description: "FUSION AGENTIC introduit des agents d'IA spécialisés, conçus pour assister, conseiller et agir dans des domaines fonctionnels clairement définis, tout en restant sous contrôle humain et réglementaire. Ces agents interagissent en langage naturel, exploitent l'intelligence contextuelle de la plateforme et exécutent des tâches complexes dans des limites réglementées. Le module permet une intelligence opérationnelle continue, collaborative et contrôlée.",
    image: "/keySections/agentic.png",
    icon: "/keySections/agentic_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION FORGE",
    description: "FUSION FORGE est l'environnement dédié aux chercheurs, aux data scientists et aux ingénieurs en IA pour développer, expérimenter et industrialiser des modèles d'IA. Il centralise les activités d'optimisation, d'évaluation des performances, de gestion des versions et d'exploitation du MLOps au sein d'un cadre structuré et reproductible. Ce module garantit une continuité parfaite entre la recherche, le prototypage et la production, tout en assurant une traçabilité complète des expériences.",
    image: "/keySections/forge.png",
    icon: "/keySections/forge_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION MIND",
    description: "FUSION MIND est la couche de gouvernance cognitive de Fusion AI. Elle permet l'audit des modèles et des agents, la supervision de leur comportement, l'évaluation des risques éthiques et la mesure de la dette cognitive liée à l'IA. En assurant transparence, explicabilité et contrôle, ce module garantit une utilisation responsable, conforme et durable de l'intelligence artificielle au sein de l'organisation.",

    image: "/keySections/mind.png",
    icon: "/keySections/mind_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION ORBITE",
    description: "FUSION ORBIT est la boutique native de FUSION AI, conçue pour bâtir un véritable écosystème autour de la plateforme. Elle permet aux utilisateurs, partenaires et intégrateurs de publier, partager et monétiser des composants réutilisables tels que des agents d'IA, des workflows préconfigurés et des modules fonctionnels. En favorisant la réutilisation, l'innovation collaborative et un déploiement accéléré, Fusion Orbit transforme Fusion AI en une plateforme vivante, évolutive et axée sur la valeur.",
    image: "/keySections/orbite.png",
    icon: "/keySections/orbite_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION MATE",
    description: "FUSION MATE est l’interface unifiée entre les utilisateurs et l’IA de Fusion AI. Elle permet de créer et d’opérer des compagnons IA métier contextualisés, accessibles en chat, dans les applications ou les outils collaboratifs. En s’appuyant sur les données gouvernées, les agents et les automatisations de la plateforme, Fusion Mate délivre des recommandations, génère du contenu et exécute des actions en temps réel, tout en restant sous contrôle humain et dans un cadre sécurisé.",
    image: "/keySections/mate.png",
    icon: "/keySections/mate_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION QUICK IT",
    description: "FUSION QUICK DECISION est l’atelier low-code de Fusion AI pour concevoir rapidement des applications et des services augmentés par l’IA. Grâce à une interface visuelle, il permet aux équipes IT et métier d’assembler données, agents, automatisations et composants réutilisables issus de Fusion Orbit, sans développements complexes. Ce module accélère le prototypage, l’industrialisation et le déploiement d’applications fiables, sécurisées et parfaitement intégrées à l’écosystème de l’entreprise.",
    image: "/keySections/quickit.png",
    icon: "/keySections/quickit_icon.svg",
    color: "#4285F4",
  },
  {
    title: "FUSION PROCESSUS",
    description: "FUSION QUICK DECISION est l’atelier low-code de Fusion AI pour concevoir rapidement des applications et des services augmentés par l’IA. Grâce à une interface visuelle, il permet aux équipes IT et métier d’assembler données, agents, automatisations et composants réutilisables issus de Fusion Orbit, sans développements complexes. Ce module accélère le prototypage, l’industrialisation et le déploiement d’applications fiables, sécurisées et parfaitement intégrées à l’écosystème de l’entreprise.",
    image: "/keySections/processus.png",
    icon: "/keySections/processus_icon_svg.svg",
    color: "#4285F4",
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
          width: "clamp(72px, 8vw, 100px)",
          height: "clamp(72px, 8vw, 100px)",
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
            className="relative"
            style={{ width: "clamp(24px, 3vw, 40px)", height: "clamp(24px, 3vw, 40px)" }}
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
          maxWidth: "clamp(72px, 8vw, 100px)",
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
        height="clamp(360px, 50vh, 500px)"
        padding="clamp(20px, 5vw, 48px)"
        className="flex flex-row items-center relative overflow-hidden"
      >
        {/* Animated ring with static icon - absolute top left of card */}
        <div
          className="absolute top-6 left-6 z-20"
          style={{ width: "clamp(40px, 6vw, 60px)", height: "clamp(40px, 6vw, 60px)" }}
        >
          {/* Rotate only the conic gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${feature.color}, transparent, ${feature.color})`,
              filter: "blur(3px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Keep the icon static */}
          <div
            className="absolute inset-1 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)" }}
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>

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
            className="font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(20px, 3.2vw, 36px)",
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
            style={{ textAlign: "justify" }}
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
          style={{ width: "clamp(240px, 35vw, 400px)", height: "clamp(240px, 35vw, 400px)" }}
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
