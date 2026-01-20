"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { FOOTER_LINKS, SOCIAL_ICONS } from "@/constants/social";

export function Footer() {
  return (
    <footer
      className="w-full relative"
      style={{
        background: "#05091C",
      }}
    >
      {/* Desktop Layout - hidden on mobile */}
      <div className="hidden md:block" style={{ height: "386px", position: "relative" }}>
        {/* Left Section - Logo, Description, Social Icons */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            gap: "44px",
            width: "431px",
            height: "228px",
            left: "89px",
            top: "51px",
          }}
        >
          {/* Logo and Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "14px",
              width: "431px",
              height: "146px",
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: "146px",
                height: "40px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "7.4%",
                  right: "78.91%",
                  top: "25.01%",
                  bottom: "25.01%",
                  width: "20px",
                  height: "20px",
                  background: "#33B1FF",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "29.38%",
                  top: "22.38%",
                  fontFamily: "'Be Vietnam Pro'",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "19px",
                  lineHeight: "120%",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                FUSION AI
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                width: "433px",
                height: "92px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 200,
                fontSize: "18px",
                lineHeight: "23px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              AutoFlow is a no-code automation platform that empowers individuals and teams to build powerful workflows easily. Save time, boost productivity, and connect your favorite tools — all in one place.
            </p>
          </div>

          {/* Social Icons with animations */}
          <StaggerContainer
            staggerDelay={0.1}
            delayStart={0.3}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "0px",
              gap: "21px",
              width: "215px",
              height: "38px",
            }}
          >
            {SOCIAL_ICONS.map((social) => (
              <StaggerItem key={social.name}>
                <motion.div
                  style={{
                    width: "38px",
                    height: "38px",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {social.icon}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right Section - Three Columns of Links */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "118px",
            width: "682px",
            height: "246px",
            left: "625px",
            top: "51px",
          }}
        >
          {/* Column 1 - Explore */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "14px",
              width: "149px",
              height: "246px",
            }}
          >
            <h3
              style={{
                width: "94px",
                height: "30px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "30px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Explore
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "14px",
              }}
            >
              {FOOTER_LINKS.explore.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "10px 0px",
                    gap: "10px",
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Innovate */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "14px",
              width: "164px",
              height: "246px",
            }}
          >
            <h3
              style={{
                width: "106px",
                height: "30px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "30px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Innovate
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "14px",
              }}
            >
              {FOOTER_LINKS.innovate.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "10px 0px",
                    gap: "10px",
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 - About */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "14px",
              width: "133px",
              height: "246px",
            }}
          >
            <h3
              style={{
                width: "75px",
                height: "30px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "30px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              About
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0px",
                gap: "14px",
              }}
            >
              {FOOTER_LINKS.about.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "10px 0px",
                    gap: "10px",
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#FFFFFF",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "10px 100px",
            gap: "10px",
            width: "100%",
            height: "39px",
            left: "0px",
            top: "347px",
            background: "#FFFFFF",
          }}
        >
          <p
            style={{
              width: "287px",
              height: "19px",
              fontFamily: "'Be Vietnam Pro'",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "18px",
              color: "#131313",
              margin: 0,
            }}
          >
            © 2026 Fusion AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile Layout - shown only on mobile */}
      <div className="block md:hidden px-4 py-8">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Logo */}
          <div className="flex items-center gap-3 h-10">
            <div
              className="w-5 h-5 rounded-full"
              style={{ background: "#33B1FF" }}
            />
            <span
              className="text-base font-semibold uppercase"
              style={{
                fontFamily: "'Be Vietnam Pro'",
                lineHeight: "120%",
                color: "#FFFFFF",
              }}
            >
              FUSION AI
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Be Vietnam Pro'",
              fontWeight: 200,
              lineHeight: "20px",
              color: "#FFFFFF",
            }}
          >
            AutoFlow is a no-code automation platform that empowers individuals and teams to build powerful workflows easily. Save time, boost productivity, and connect your favorite tools — all in one place.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mb-8">
          {SOCIAL_ICONS.map((social) => (
            <motion.div
              key={social.name}
              className="w-9 h-9 cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {social.icon}
            </motion.div>
          ))}
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-lg font-bold text-white"
              style={{
                fontFamily: "'Be Vietnam Pro'",
                lineHeight: "24px",
              }}
            >
              Explore
            </h3>
            <div className="flex flex-col gap-2">
              {FOOTER_LINKS.explore.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center py-1 gap-2 no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-sm text-white"
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontWeight: 500,
                      lineHeight: "18px",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Innovate */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-lg font-bold text-white"
              style={{
                fontFamily: "'Be Vietnam Pro'",
                lineHeight: "24px",
              }}
            >
              Innovate
            </h3>
            <div className="flex flex-col gap-2">
              {FOOTER_LINKS.innovate.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center py-1 gap-2 no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-sm text-white"
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontWeight: 500,
                      lineHeight: "18px",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-lg font-bold text-white"
              style={{
                fontFamily: "'Be Vietnam Pro'",
                lineHeight: "24px",
              }}
            >
              About
            </h3>
            <div className="flex flex-col gap-2">
              {FOOTER_LINKS.about.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center py-1 gap-2 no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M6.375 3.75L10.125 9L6.375 14.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-sm text-white"
                    style={{
                      fontFamily: "'Be Vietnam Pro'",
                      fontWeight: 500,
                      lineHeight: "18px",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="w-full bg-white -mx-4 px-4 py-3">
          <p
            className="text-xs text-[#131313] m-0"
            style={{
              fontFamily: "'Be Vietnam Pro'",
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            © 2026 Fusion AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
