import {
  Hero,
  Clients,
  AboutABA,
  Features,
  KeyFeatures,
  ChoosePath,
  Integrations,
  UseCases,
  Pricing,
  CTA,
} from "@/components/sections/home";
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
