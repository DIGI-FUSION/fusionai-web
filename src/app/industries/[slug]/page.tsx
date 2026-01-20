import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Footer } from "@/components/layout";
import { INDUSTRIES, getIndustryBySlug } from "@/constants/industries";
import {
  IndustryHero,
  IndustryFeatures,
  IndustryUseCases,
  IndustryCTA,
} from "@/components/sections/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Industry Not Found | Fusion AI",
    };
  }

  return {
    title: `${industry.heroTitle} | Fusion AI`,
    description: industry.heroDescription,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <IndustryHero industry={industry} />
      <IndustryFeatures industry={industry} />
      <IndustryUseCases industry={industry} />
      <IndustryCTA industry={industry} />
      <Footer />
    </>
  );
}
