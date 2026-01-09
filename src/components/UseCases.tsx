"use client";

import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui/GradientCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";

const USE_CASES = [
  {
    category: "TOOL / LIBRARY",
    title: "Mining",
    description: "Pioneering at the edge of innovation",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Oil & Gas",
    description: "Automation is the new electricity with Fusion AI",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Supply Chain",
    description: "Fusion AI delivers unified, real-time visibility across suppliers",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Healthcare",
    description: "Fusion AI - Transforming the future of healthcare delivery",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Defense & Security",
    description: "Fusion AI delivers real-time threat intelligence by analyzing multiple sources",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Automotive",
    description: "Fusion AI streamlines development by providing data-driven insights",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Education",
    description: "Fusion AI tailors learning pathways by dynamic adjustment to each student",
  },
  {
    category: "TOOL / LIBRARY",
    title: "Mobility",
    description: "Fusion AI for mobility integrates real-time data from transports, traffic, etc.",
  },
];

// Helper component for use case card content
function UseCaseCardContent({ useCase }: { useCase: (typeof USE_CASES)[0] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "10px",
        width: "282.57px",
        height: "117px",
        flex: "none",
        order: 0,
        flexGrow: 0,
      }}
    >
      {/* Category */}
      <span
        style={{
          width: "117px",
          height: "20px",
          fontFamily: "'Be Vietnam Pro'",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "19px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "#C89AFF",
          flex: "none",
          order: 0,
          flexGrow: 0,
        }}
      >
        {useCase.category}
      </span>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",
          gap: "14px",
          width: "260.24px",
          height: "87px",
          flex: "none",
          order: 1,
          flexGrow: 0,
        }}
      >
        {/* Title */}
        <h3
          style={{
            height: "21px",
            fontFamily: "'Be Vietnam Pro'",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "19px",
            lineHeight: "20px",
            color: "#FFFFFF",
            flex: "none",
            order: 0,
            flexGrow: 0,
            margin: 0,
          }}
        >
          {useCase.title}
        </h3>

        {/* Description */}
        <p
          style={{
            width: "260.24px",
            height: "52px",
            fontFamily: "'Be Vietnam Pro'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "26px",
            color: "#FFFFFF",
            flex: "none",
            order: 1,
            flexGrow: 0,
            margin: 0,
          }}
        >
          {useCase.description}
        </p>
      </div>
    </div>
  );
}

export function UseCases() {
  return (
    <section className="relative py-20 px-6 bg-background/95 backdrop-blur-sm overflow-hidden">
      <div 
        className="mx-auto flex flex-col items-center"
        style={{
          padding: "62px 0px",
          gap: "24px",
          maxWidth: "1200px",
        }}
      >
      {/* Header with animation */}
      <AnimatedSection>
        <div className="text-center mb-16">
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 500,
              fontSize: "42px",
              lineHeight: "120%",
              letterSpacing: "0.02em",
              color: "#FFFFFF",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Use Cases
          </h2>
          <p
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "16px",
              lineHeight: "26px",
              color: "rgba(237, 244, 255, 0.7)",
              margin: 0,
            }}
          >
            Real flows for real teams — from support to marketing.
          </p>
        </div>
      </AnimatedSection>

      {/* Cards Container with staggered rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",
          gap: "24px",
          width: "1200px",
          height: "591px",
          flex: "none",
          order: 1,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      >
        {/* Row 1 - Three Cards */}
        <StaggerContainer
          staggerDelay={0.1}
          delayStart={0.2}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "24px",
            width: "1200px",
            height: "181px",
            flex: "none",
            order: 0,
            alignSelf: "stretch",
            flexGrow: 0,
          }}
        >
          {USE_CASES.slice(0, 3).map((useCase, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GradientCard
                  width="384px"
                  height="181px"
                  padding="32px"
                  gap="10px"
                  className="flex-col items-start"
                  style={{ flexGrow: 1 }}
                >
                  <UseCaseCardContent useCase={useCase} />
                </GradientCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Row 2 - Two Cards */}
        <StaggerContainer
          staggerDelay={0.1}
          delayStart={0.4}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "24px",
            width: "1200px",
            height: "181px",
            flex: "none",
            order: 1,
            alignSelf: "stretch",
            flexGrow: 0,
          }}
        >
          {USE_CASES.slice(3, 5).map((useCase, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GradientCard
                  width="588px"
                  height="181px"
                  padding="32px"
                  gap="10px"
                  className="flex-col items-start"
                  style={{ flexGrow: 1 }}
                >
                  <UseCaseCardContent useCase={useCase} />
                </GradientCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Row 3 - Three Cards */}
        <StaggerContainer
          staggerDelay={0.1}
          delayStart={0.6}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "24px",
            width: "1200px",
            height: "181px",
            flex: "none",
            order: 2,
            alignSelf: "stretch",
            flexGrow: 0,
          }}
        >
          {USE_CASES.slice(5, 8).map((useCase, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GradientCard
                  width="384px"
                  height="181px"
                  padding="32px"
                  gap="10px"
                  className="flex-col items-start"
                  style={{ flexGrow: 1 }}
                >
                  <UseCaseCardContent useCase={useCase} />
                </GradientCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      </div>
    </section>
  );
}
