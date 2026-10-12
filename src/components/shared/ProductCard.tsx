"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import Link from "next/link";
import { motion } from "framer-motion";
import { GradientCard } from "@/components/ui";

interface ProductCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export function ProductCard({ id, title, description, image, href }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <GradientCard className="w-full" style={{ padding: 0 }}>
        <div className="relative w-full p-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                <Image src={assetPath(image)} alt={title} width={44} height={44} className="object-contain" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-white/70 text-sm leading-6">{description}</p>
            </div>

            <div className="flex-shrink-0">
              <Link href={href || "#"} className="inline-flex items-center gap-2 bg-white/5 text-white/90 px-4 py-2 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <span>Learn more</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </GradientCard>
    </motion.div>
  );
}
