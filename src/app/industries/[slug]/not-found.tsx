"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function IndustryNotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4 text-white"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          Industry Not Found
        </h1>
        <p
          className="text-lg text-white/70 mb-8"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          The industry page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            Go Back Home
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
