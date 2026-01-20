import { Footer } from "@/components/layout";
import { CTA } from "@/components/sections/home/CTA";
import { CompanyHero } from "@/components/sections/company/CompanyHero";
import { TrustedBy } from "@/components/sections/company/TrustedBy";
import { ABAGalaxies } from "@/components/sections/company/ABAGalaxies";

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
