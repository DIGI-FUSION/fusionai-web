"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Industry } from "@/constants/industries";
import { TiltCard } from "@/components/animations/MagneticButton";

interface IndustryUseCasesProps {
  industry: Industry;
}

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: { title: string; description: string; image: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isImageRight = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="w-full"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <TiltCard maxTilt={6} glareOpacity={0.12}>
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(10, 15, 40, 0.95) 0%, rgba(20, 30, 60, 0.9) 100%)",
            border: "1px solid rgba(66, 133, 244, 0.2)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isImageRight
                ? "radial-gradient(circle at 80% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)"
                : "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)",
            }}
          />

          <div
            className={`flex flex-col ${
              isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-stretch`}
          >
            {/* Text Content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <motion.h3
                className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6"
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 600,
                  lineHeight: "1.3",
                  color: "#FFFFFF",
                }}
                initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {useCase.title}
              </motion.h3>
              <motion.p
                className="text-sm sm:text-base lg:text-lg"
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 400,
                  lineHeight: "1.7",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
                initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {useCase.description}
              </motion.p>
            </div>

            {/* Image */}
            <motion.div
              className="group flex-1 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] overflow-hidden rounded-xl lg:rounded-2xl m-4 lg:m-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image
                src={useCase.image}
                alt={useCase.title}
                fill
                className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A0F28]/60 via-transparent to-transparent"
              />
              {/* Side gradient for text blending */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isImageRight
                    ? "bg-gradient-to-r from-[#0A0F28]/40 via-transparent to-transparent"
                    : "bg-gradient-to-l from-[#0A0F28]/40 via-transparent to-transparent"
                }`}
              />
              {/* Blue tint overlay on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function IndustryUseCases({ industry }: IndustryUseCasesProps) {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-8 sm:gap-12">
          {industry.useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
