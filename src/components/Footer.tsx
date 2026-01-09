"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";

const FOOTER_LINKS = {
  explore: [
    { label: "About", href: "#" },
    { label: "Explore Dev", href: "#" },
    { label: "Create Designs", href: "#" },
    { label: "Playoffs", href: "#" },
  ],
  innovate: [
    { label: "Tags", href: "#" },
    { label: "API", href: "#" },
    { label: "Places", href: "#" },
    { label: "Creative Markets", href: "#" },
  ],
  about: [
    { label: "Community", href: "#" },
    { label: "Development", href: "#" },
    { label: "Support", href: "#" },
    { label: "Docs", href: "#" },
  ],
};

const SOCIAL_ICONS = [
  {
    name: "GitHub",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3C8.82 3 3 8.82 3 16C3 21.74 6.87 26.57 12.17 28.17C12.82 28.28 13.05 27.89 13.05 27.55C13.05 27.24 13.04 26.39 13.04 25.49C9.5 26.26 8.77 24.17 8.57 23.08C8.46 22.52 7.82 21.56 7.25 21.25C6.78 21.02 6.13 20.25 7.24 20.24C8.29 20.23 9.05 21.33 9.24 21.72C10.37 23.67 12.17 23.15 13.09 22.81C13.2 22.08 13.5 21.55 13.83 21.22C10.87 20.89 7.78 19.74 7.78 14.74C7.78 13.39 8.26 12.27 9.26 11.41C9.14 11.08 8.73 9.73 9.38 7.92C9.38 7.92 10.43 7.58 13.05 9.35C14.05 9.05 15.11 8.9 16.17 8.9C17.23 8.9 18.29 9.05 19.29 9.35C21.91 7.57 22.96 7.92 22.96 7.92C23.61 9.73 23.2 11.08 23.08 11.41C24.08 12.27 24.56 13.38 24.56 14.74C24.56 19.75 21.46 20.89 18.5 21.22C18.92 21.58 19.28 22.28 19.28 23.39C19.28 24.99 19.27 26.28 19.27 27.55C19.27 27.89 19.5 28.29 20.15 28.17C25.43 26.57 29 21.73 29 16C29 8.82 23.18 3 16 3Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM21.73 11.35L19.62 21.08C19.47 21.73 19.09 21.89 18.57 21.6L15.55 19.35L14.1 20.75C13.93 20.92 13.79 21.06 13.46 21.06L13.68 17.99L19.23 12.98C19.48 12.76 19.18 12.64 18.85 12.86L12.03 17.15L9.05 16.19C8.42 16 8.41 15.57 9.2 15.28L20.93 10.78C21.45 10.6 21.91 10.93 21.73 11.35Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M26.5 4H5.5C4.67 4 4 4.67 4 5.5V26.5C4 27.33 4.67 28 5.5 28H26.5C27.33 28 28 27.33 28 26.5V5.5C28 4.67 27.33 4 26.5 4ZM11.5 24.5H8V13H11.5V24.5ZM9.75 11.48C8.51 11.48 7.51 10.47 7.51 9.24C7.51 8.01 8.52 7 9.75 7C10.98 7 11.99 8.01 11.99 9.24C11.99 10.47 10.98 11.48 9.75 11.48ZM24.5 24.5H21V18.88C21 17.55 21 15.85 19.18 15.85C17.34 15.85 17.06 17.28 17.06 18.79V24.5H13.56V13H16.91V14.56H16.96C17.44 13.66 18.63 12.71 20.43 12.71C23.97 12.71 24.5 15.16 24.5 18.29V24.5Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Discord",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M22.5 7.72C21.07 7.08 19.54 6.64 17.94 6.42C17.73 6.79 17.48 7.28 17.31 7.67C15.6 7.46 13.9 7.46 12.22 7.67C12.05 7.28 11.79 6.79 11.58 6.42C9.98 6.64 8.45 7.09 7.02 7.73C4.28 11.67 3.53 15.5 3.88 19.27C5.84 20.69 7.74 21.54 9.61 22.1C10.07 21.47 10.48 20.8 10.84 20.09C10.16 19.84 9.51 19.53 8.88 19.17C9.05 19.05 9.21 18.92 9.37 18.78C12.64 20.26 16.23 20.26 19.46 18.78C19.62 18.92 19.78 19.05 19.95 19.17C19.31 19.54 18.66 19.84 17.98 20.09C18.34 20.8 18.75 21.47 19.21 22.1C21.09 21.54 22.99 20.69 24.95 19.27C25.36 14.92 24.24 11.13 22.5 7.72ZM11.73 17.13C10.74 17.13 9.93 16.19 9.93 15.05C9.93 13.91 10.73 12.96 11.73 12.96C12.73 12.96 13.55 13.91 13.54 15.05C13.54 16.19 12.73 17.13 11.73 17.13ZM17.1 17.13C16.11 17.13 15.3 16.19 15.3 15.05C15.3 13.91 16.1 12.96 17.1 12.96C18.1 12.96 18.92 13.91 18.91 15.05C18.91 16.19 18.1 17.13 17.1 17.13Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        height: "386px",
        background: "#05091C",
        position: "relative",
      }}
    >
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
    </footer>
  );
}
