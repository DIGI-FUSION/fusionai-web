"use client";

import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { LiquidGlass } from "@/components/animations/LiquidGlass";
import { NAV_ITEMS, type NavItem } from "@/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpandedItem((prev) => (prev === label ? null : label));
  };

  const dropdownItem = NAV_ITEMS.find((item) => item.subItems && item.label === activeDropdown);

  return (
    <>
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 md:top-6">
      <div className="w-full max-w-[1400px] rounded-full overflow-hidden">
        <LiquidGlass
          className="pointer-events-auto w-full"
          surfaceType="squircle"
          refractiveIndex={1.5}
          maxDisplacement={50}
        >
          <nav
            ref={ref as any}
            className="ios-glass w-full px-3 sm:px-4"
            role="navigation"
            aria-label="Primary"
          >
        <div className="flex h-14 md:h-16 items-center justify-between gap-2 px-2">
          <Link href="/" className="flex items-center gap-2 pl-1 pr-1">
            <div className="relative h-8 md:h-10 w-40 md:w-48 rounded-2xl overflow-hidden">
              <Image
                src={assetPath("/navbarlogo.svg")}
                alt="AbaFusion"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center gap-12">
            {NAV_ITEMS.map((item) =>
              item.subItems ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-[20px] text-white/85 tracking-wide hover:text-white transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      className={`size-4 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[20px] text-white/85 tracking-wide hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
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
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
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
      </nav>
      </LiquidGlass>
    </div>
    </div>

    {/* Mobile menu panel - rendered outside LiquidGlass */}
    {open && (
      <div className="pointer-events-auto fixed inset-x-0 top-[72px] z-[60] flex md:hidden justify-center px-3">
        <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#0a0a12]/95 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) =>
              item.subItems ? (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => toggleMobileExpanded(item.label)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] text-white/85 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {item.label}
                    <svg
                      className={`size-4 transition-transform duration-200 ${mobileExpandedItem === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpandedItem === item.label && (
                    <div className="ml-4 flex flex-col gap-1 border-l border-white/10 pl-4 py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] text-white/85 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
              <Button variant="glass" size="md" className="w-full justify-center">
                Login
              </Button>
              <GetStartedButton size="md" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Desktop dropdown panel - rendered outside LiquidGlass to avoid clipping */}
    {activeDropdown && dropdownItem && (
      <div
        className="pointer-events-auto fixed inset-x-0 top-[120px] z-[60] hidden md:flex justify-center px-3"
        onMouseEnter={() => handleDropdownEnter(activeDropdown)}
        onMouseLeave={handleDropdownLeave}
      >
        <div className="w-full max-w-[1400px] rounded-2xl border border-white/15 p-6 bg-[#0a0a12]/90 backdrop-blur-xl shadow-2xl shadow-black/50">
          <h3 className="text-white/60 text-sm font-medium tracking-wider uppercase mb-4 px-2">
            {dropdownItem.label}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {dropdownItem.subItems?.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={() => setActiveDropdown(null)}
                className="rounded-lg px-4 py-3 text-[15px] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
