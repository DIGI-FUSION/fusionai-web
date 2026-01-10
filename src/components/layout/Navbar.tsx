"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { LiquidGlass } from "@/components/animations/LiquidGlass";
import { NAV_ITEMS } from "@/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  // iOS 26-like liquid glass highlight follows scroll subtly
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0 as number | 0;
    let lastY = window.scrollY;
    let velocity = 0;

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;

      if (raf) return;
      raf = requestAnimationFrame(() => {
        const clampedY = Math.min(Math.max(y, 0), 700);
        const t = clampedY / 700; // 0..1

        // Liquid glass highlight movement
        const glossX = 62 + 22 * t; // horizontal drift
        const glossY = 18 + 14 * Math.sin(t * Math.PI); // vertical arc

        // Scroll energy → glass intensity
        const energy = Math.min(Math.abs(velocity) / 60, 1);
        const opacity = 0.18 + energy * 0.18;
        const scale = 1 + energy * 0.08;

        el.style.setProperty("--gloss-x", `${glossX}%`);
        el.style.setProperty("--gloss-y", `${glossY}%`);
        el.style.setProperty("--gloss-opacity", opacity.toString());
        el.style.setProperty("--gloss-scale", scale.toString());

        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf as number);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 md:top-6">
      <LiquidGlass
        className="pointer-events-auto w-full max-w-[1400px]"
        surfaceType="squircle"
        refractiveIndex={1.5}
        maxDisplacement={25}
      >
        <nav
          ref={ref as any}
          className="ios-glass w-full px-3 sm:px-4"
          role="navigation"
          aria-label="Primary"
        >
        <div className="flex h-16 md:h-20 items-center justify-between gap-2 px-2">
          <Link href="/" className="flex items-center gap-2 pl-1 pr-1">
            <div className="relative h-10 md:h-12 w-44 md:w-56 rounded-2xl overflow-hidden">
              <Image
                src="/navbarlogo.svg"
                alt="AbaFusion"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center gap-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[20px] text-white/85 tracking-wide hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="glass" size="lg" className="px-7">
              Login
            </Button>
            <GetStartedButton size="lg" />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4.5 6.75A.75.75 0 0 1 5.25 6h13.5a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 6.75Zm0 5.25a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden border-t border-white/10 px-4 py-4">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <Button variant="glass" size="md" className="flex-1">
                  Login
                </Button>
                <GetStartedButton size="md" className="flex-1" />
              </div>
            </div>
          </div>
        )}
      </nav>
      </LiquidGlass>
    </div>
  );
}
