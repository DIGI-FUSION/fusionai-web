import { Footer } from "@/components/layout";
import { SectionHeader } from "@/components/shared";

export const dynamic = 'force-dynamic';

export default function CompanyPage() {
  return (
    <>
      <section className="relative py-24 px-6 bg-background/95 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Company"
            subtitle="Learn more about FusionAI and our mission"
          />

          <div className="text-center text-white/60 py-20">
            <p className="text-lg">Company page content coming soon...</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
