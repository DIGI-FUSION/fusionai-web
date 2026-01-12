import { Hero } from "@/components/sections/home/Hero";
import { Clients } from "@/components/sections/home/Clients";
import { AboutABA } from "@/components/sections/home/AboutABA";
import { Features } from "@/components/sections/home/Features";
import { KeyFeatures } from "@/components/sections/home/KeyFeatures";
import { ChoosePath } from "@/components/sections/home/ChoosePath";
import { Integrations } from "@/components/sections/home/Integrations";
import { UseCases } from "@/components/sections/home/UseCases";
import { Pricing } from "@/components/sections/home/Pricing";
import { CTA } from "@/components/sections/home/CTA";
import { Footer } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <AboutABA />
      <Features />
      <KeyFeatures />
      <ChoosePath />
      <Integrations />
      <UseCases />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
