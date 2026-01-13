import { Footer } from "@/components/layout";
import products from "@/constants/products";
import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { TiltCard, ScaleHover } from "@/components/animations/MagneticButton";
import { GradientCard } from "@/components/ui/GradientCard";

// Inline ArrowUpRight icon to avoid importing entire lucide-react library (~50KB)
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <>
      <main className="relative min-h-screen bg-background/95 backdrop-blur-sm text-white flex flex-col items-center pt-12 pb-20 sm:pt-[40px] sm:pb-[141px] px-4 lg:px-[120px]">
        {/* Background Image with Color Dodge effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/products/productsBg.png"
            alt=""
            width={1259}
            height={841}
            className="absolute hidden lg:block lg:left-[279px] lg:top-[86px] opacity-60 animate-pulse"
            style={{ mixBlendMode: 'color-dodge' }}
            priority={false}
            aria-hidden="true"
          />
        </div>

        <AnimatedSection className="w-full max-w-[1200px] flex flex-col items-center gap-8 sm:gap-[44px] relative z-10 ">
          <h1 className="text-3xl sm:text-[57px] leading-[120%] tracking-[0.05em] font-[400] text-white text-center">
            Products
          </h1>

          <section className="relative w-full">
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-[24px]">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <TiltCard maxTilt={3} glareOpacity={0.04}>
                    <GradientCard
                      className="w-full group hover:scale-[1.01] transition-all duration-300"
                      style={{
                        height: 'auto',
                        minHeight: '180px',
                        padding: '24px 28px',
                        gap: '10px',
                      }}
                    >
                      <div className="w-full h-full flex flex-col justify-between gap-4">
                        <div className="w-full flex flex-row justify-between items-center">
                          <div className="flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={56}
                              height={56}
                              className="object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          <ScaleHover>
                            <a
                              href={product.href}
                              className="inline-flex items-center justify-center gap-2 group/btn transition-all duration-300 hover:bg-white/10"
                              style={{
                                boxSizing: 'border-box',
                                width: '140px',
                                height: '48px',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '30px',
                                padding: '12px 16px',
                              }}
                            >
                              <span
                                className="font-[500] text-center tracking-[-0.01em] text-white"
                                style={{
                                  fontSize: '14px',
                                  lineHeight: '140%',
                                }}
                              >
                                Learn more
                              </span>
                              <ArrowUpRight className="w-[20px] h-[20px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                            </a>
                          </ScaleHover>
                        </div>

                        <div className="w-full flex flex-col gap-[16px]">
                          <h3
                            className="text-white group-hover:text-white transition-colors duration-300"
                            style={{
                              fontWeight: 600,
                              fontSize: '18px',
                              lineHeight: '28px',
                            }}
                          >
                            {product.title}
                          </h3>
                          <p
                            className="text-white/70 group-hover:text-white/80 transition-colors duration-300"
                            style={{
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '28px',
                            }}
                          >
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </GradientCard>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
