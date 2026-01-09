"use client";

import { useState } from "react";

import { GetStartedButton } from "@/components/ui/GetStartedButton";

const PRICING_PLANS = [
  {
    title: "Free Trial",
    price: "$0",
    description: "Unlimited number of workflows",
    feature: "For individuals testing automation",
    hasButtons: true,
    highlighted: true,
  },
  {
    title: "Business",
    price: "$29/mo",
    subtitle: "/per 1 month",
    description: "/per 1 month",
    feature: "For teams and professionals",
    hasButtons: false,
    highlighted: false,
  },
  {
    title: "Enterprise",
    price: "Contact us",
    subtitle: "/per 1 month",
    description: "/per 1 month",
    feature: "For organizations with custom needs",
    hasButtons: false,
    highlighted: false,
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="relative py-20 px-6 bg-background/95 backdrop-blur-sm">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "62px 24px",
          gap: "24px",
          flex: "none",
          order: 11,
          flexGrow: 0,
          zIndex: 11,
        }}
      >
        {PRICING_PLANS.map((plan, index) => {
        const isHovered = hoveredIndex === index;
        const shouldShowButtons = plan.hasButtons || isHovered;
        const shouldHighlight = plan.highlighted || isHovered;
        const shouldShowBorder = plan.highlighted || isHovered;
        
        return (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            padding: shouldShowBorder ? "1px" : "0px",
            borderRadius: "30px",
            background: shouldShowBorder 
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)" 
              : "transparent",
            flex: "none",
            order: index,
            flexGrow: 0,
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: shouldShowBorder ? "34px 32px" : "35px 33px",
              gap: "48px",
              width: "384px",
              height: "422px",
              backgroundColor: "#0a0f1e",
              backgroundImage: shouldHighlight
                ? "linear-gradient(180deg, rgba(21, 19, 23, 0.6) 1.44%, rgba(25, 22, 28, 0.6) 19.71%, rgba(7, 32, 50, 0.6) 65.38%, rgba(0, 36, 59, 0.6) 99.52%)"
                : "linear-gradient(180deg, rgba(21, 19, 23, 0.3) 1.44%, rgba(25, 22, 28, 0.3) 19.71%, rgba(7, 32, 50, 0.3) 65.38%, rgba(0, 36, 59, 0.3) 99.52%)",
              backdropFilter: "blur(12.5px)",
              borderRadius: shouldShowBorder ? "29px" : "30px",
              transition: "all 0.3s ease",
            }}
          >
          {/* Title Section */}
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "12px 0px 24px",
              gap: "10px",
              width: "320px",
              height: "57px",
              borderBottom: shouldHighlight ? "1px solid #D2D2D2" : "1px solid #514B4B",
              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 0,
              transition: "border-color 0.3s ease",
            }}
          >
            <h3
              style={{
                width: "320px",
                height: "21px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "20px",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                flexGrow: 1,
                margin: 0,
              }}
            >
              {plan.title}
            </h3>
          </div>

          {/* Price Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0px",
              gap: "12px",
              width: index === 0 ? "317px" : "318px",
              height: "83px",
              flex: "none",
              order: 1,
              flexGrow: 0,
            }}
          >
            <div
              style={{
                width: index === 0 ? "317px" : "318px",
                height: "45px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
                flex: "none",
                order: 0,
                flexGrow: 0,
              }}
            >
              {plan.price}
            </div>
            <div
              style={{
                width: index === 0 ? "242px" : "98px",
                height: "26px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#FFFFFF",
                flex: "none",
                order: 1,
                flexGrow: 0,
              }}
            >
              {plan.description}
            </div>
          </div>

          {/* Feature Section with Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0px",
              gap: "24px",
              width: index === 0 ? "308px" : index === 1 ? "262px" : "328px",
              height: "26px",
              flex: "none",
              order: 2,
              flexGrow: 0,
            }}
          >
            {/* Fire Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                flex: "none",
                order: 0,
                flexGrow: 0,
              }}
            >
              <g>
                <ellipse cx="9" cy="17.1" rx="1.44" ry="0.45" fill="url(#fire-gradient1)" />
                <path
                  d="M3.54 15.75C3.54 15.75 5.4 13.5 5.4 10.8C5.4 9.45 4.86 8.55 4.86 8.55C4.86 8.55 6.75 9 7.65 6.75C7.65 6.75 9 9 9 11.25C9 13.5 7.65 15.75 7.65 15.75H3.54Z"
                  fill="url(#fire-gradient2)"
                />
                <path
                  d="M12.6 7.2C12.6 7.2 13.05 8.55 11.7 9.9C11.7 9.9 10.8 7.65 9.9 6.75C9.9 6.75 11.25 6.3 12.6 7.2Z"
                  fill="url(#fire-gradient3)"
                />
                <path
                  d="M5.85 4.95C5.85 4.95 7.65 2.7 10.35 3.15C10.35 3.15 9.45 4.5 9.9 6.75C9.9 6.75 7.65 5.85 5.85 4.95Z"
                  fill="url(#fire-gradient4)"
                />
                <path
                  d="M1.48 8.77C1.48 8.77 2.39 5.85 5.4 5.4C5.4 5.4 4.95 7.65 4.86 11.61C4.86 11.61 2.39 10.8 1.48 8.77Z"
                  fill="url(#fire-gradient5)"
                />
                <path
                  d="M4.18 4.05C4.18 4.05 6.75 0.9 10.8 0.9C14.85 0.9 15.75 3.15 15.75 3.15C15.75 3.15 13.05 2.25 10.8 5.4C10.8 5.4 8.55 3.6 4.18 4.05Z"
                  fill="url(#fire-gradient6)"
                />
                <path
                  d="M4.5 9.9C4.5 9.9 6.3 7.65 9.9 8.55C9.9 8.55 8.55 10.35 8.55 13.5C8.55 13.5 5.85 12.6 4.5 9.9Z"
                  fill="url(#fire-gradient7)"
                />
                <path
                  d="M9.45 11.7C9.45 11.7 10.35 10.35 12.15 10.8C12.15 10.8 11.7 12.6 11.25 14.4C11.25 14.4 9.9 13.5 9.45 11.7Z"
                  fill="url(#fire-gradient8)"
                />
                <path
                  d="M5.4 9.9C5.4 9.9 7.65 7.2 11.25 9C11.25 9 10.35 10.8 9.9 13.5C9.9 13.5 6.75 12.15 5.4 9.9Z"
                  fill="url(#fire-gradient9)"
                />
              </g>
              <defs>
                <radialGradient id="fire-gradient1">
                  <stop offset="0%" stopColor="rgba(255, 220, 189, 0.8)" />
                  <stop offset="51.19%" stopColor="rgba(255, 235, 216, 0.2)" />
                  <stop offset="97.55%" stopColor="rgba(255, 255, 255, 0)" />
                </radialGradient>
                <radialGradient id="fire-gradient2">
                  <stop offset="0%" stopColor="#FFCB9B" />
                  <stop offset="51.8%" stopColor="#FFBA7C" />
                  <stop offset="74.95%" stopColor="#FFA850" />
                  <stop offset="97.55%" stopColor="#FF982A" />
                </radialGradient>
                <radialGradient id="fire-gradient3">
                  <stop offset="0%" stopColor="#FFCB9B" />
                  <stop offset="51.8%" stopColor="#FFBA7C" />
                  <stop offset="74.95%" stopColor="#FFA850" />
                  <stop offset="97.55%" stopColor="#FF982A" />
                </radialGradient>
                <radialGradient id="fire-gradient4">
                  <stop offset="0%" stopColor="#FFF9E2" />
                  <stop offset="53.54%" stopColor="#FFE4CB" />
                  <stop offset="62.29%" stopColor="#FFDFC1" />
                  <stop offset="97.29%" stopColor="#FFCB9B" />
                </radialGradient>
                <radialGradient id="fire-gradient5">
                  <stop offset="0%" stopColor="#FFF9E2" />
                  <stop offset="53.54%" stopColor="#FFE4CB" />
                  <stop offset="62.29%" stopColor="#FFDFC1" />
                  <stop offset="97.29%" stopColor="#FFCB9B" />
                </radialGradient>
                <radialGradient id="fire-gradient6">
                  <stop offset="0%" stopColor="#FFAB56" />
                  <stop offset="51.19%" stopColor="#FF982A" />
                  <stop offset="59.78%" stopColor="#FF8F2A" />
                  <stop offset="97.55%" stopColor="#FF6927" />
                </radialGradient>
                <radialGradient id="fire-gradient7">
                  <stop offset="0%" stopColor="#FFCB9B" />
                  <stop offset="51.8%" stopColor="#FFBA7C" />
                  <stop offset="74.95%" stopColor="#FFA850" />
                  <stop offset="97.55%" stopColor="#FF982A" />
                </radialGradient>
                <radialGradient id="fire-gradient8">
                  <stop offset="0%" stopColor="#FFCB9B" />
                  <stop offset="51.8%" stopColor="#FFBA7C" />
                  <stop offset="74.95%" stopColor="#FFA850" />
                  <stop offset="97.55%" stopColor="#FF982A" />
                </radialGradient>
                <radialGradient id="fire-gradient9">
                  <stop offset="0%" stopColor="#FF8700" />
                  <stop offset="51.19%" stopColor="#FF6700" />
                  <stop offset="57.86%" stopColor="#FE6004" />
                  <stop offset="97.55%" stopColor="#F93A1D" />
                </radialGradient>
              </defs>
            </svg>

            {/* Feature Text */}
            <span
              style={{
                width: index === 0 ? "266px" : index === 1 ? "220px" : "286px",
                height: "26px",
                fontFamily: "'Be Vietnam Pro'",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#7996AA",
                flex: "none",
                order: 1,
                flexGrow: 0,
              }}
            >
              {plan.feature}
            </span>
          </div>

          {/* Buttons Section */}
          {shouldShowButtons && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "0px",
                gap: "14px",
                width: "320px",
                height: "44px",
                flex: "none",
                order: 3,
                alignSelf: "stretch",
                flexGrow: 0,
              }}
            >
              <GetStartedButton size="md" className="flex-1" />

              {/* Start on GitHub Button */}
              <button
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "12px",
                  gap: "12px",
                  width: "162px",
                  height: "44px",
                  background:
                    "linear-gradient(262.84deg, rgba(255, 255, 255, 0.12) 2.51%, rgba(255, 255, 255, 0) 64.94%)",
                  boxShadow: "0px 0px 0px 1px #375DFB",
                  filter: "drop-shadow(0px 1px 2px rgba(37, 62, 167, 0.48))",
                  borderRadius: "30px",
                  border: "none",
                  cursor: "pointer",
                  flex: "none",
                  order: 1,
                  flexGrow: 0,
                }}
              >
                {/* GitHub Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0.208008C4.477 0.208008 0 4.68501 0 10.208C0 14.653 2.865 18.428 6.839 19.748C7.339 19.838 7.521 19.528 7.521 19.258C7.521 19.018 7.512 18.378 7.508 17.538C4.726 18.138 4.139 16.208 4.139 16.208C3.685 15.048 3.029 14.738 3.029 14.738C2.121 14.118 3.098 14.128 3.098 14.128C4.101 14.198 4.629 15.158 4.629 15.158C5.521 16.708 6.97 16.268 7.539 16.008C7.631 15.368 7.889 14.928 8.175 14.678C5.955 14.428 3.62 13.568 3.62 9.74801C3.62 8.65801 4.01 7.76801 4.649 7.07801C4.546 6.82801 4.203 5.81801 4.747 4.42801C4.747 4.42801 5.586 4.15801 7.497 5.40801C8.31397 5.18601 9.15497 5.07401 9.997 5.07401C10.839 5.07401 11.68 5.18601 12.497 5.40801C14.407 4.15801 15.247 4.42801 15.247 4.42801C15.791 5.81801 15.448 6.82801 15.345 7.07801C15.985 7.76801 16.373 8.65801 16.373 9.74801C16.373 13.578 14.035 14.428 11.811 14.678C12.172 14.988 12.486 15.598 12.486 16.528C12.486 17.858 12.476 18.928 12.476 19.258C12.476 19.528 12.656 19.838 13.165 19.748C17.138 18.428 20 14.653 20 10.208C20 4.68501 15.522 0.208008 10 0.208008Z"
                    fill="#5C6BC0"
                  />
                </svg>

                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro'",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "140%",
                    textAlign: "center",
                    letterSpacing: "-0.01em",
                    color: "#FFFFFF",
                  }}
                >
                  Start on GitHub
                </span>
              </button>
            </div>
          )}
        </div>
        </div>
        );
      })}
      </div>
    </section>
  );
}
