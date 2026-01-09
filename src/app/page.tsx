import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { AboutABA } from "@/components/AboutABA";
import { Features } from "@/components/Features";
import { KeyFeatures } from "@/components/KeyFeatures";
import { ChoosePath } from "@/components/ChoosePath";
import { Integrations } from "@/components/Integrations";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

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
