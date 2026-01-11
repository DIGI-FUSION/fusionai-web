import { Footer } from "@/components/layout";
import { CTA } from "@/components/sections/home";
import { CompanyHero, TrustedBy, ABAGalaxies } from "@/components/sections/company";

export const dynamic = "force-dynamic";

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <TrustedBy />
      <ABAGalaxies />
      <CTA />
      <Footer />
    </>
  );
}
