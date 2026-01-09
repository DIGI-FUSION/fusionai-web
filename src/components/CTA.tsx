"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GetStartedButton } from "@/components/ui/GetStartedButton";
import { GlowOrb } from "@/components/animations";

export function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="bg-background/95 backdrop-blur-sm overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "64px 0px",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          backdropFilter: "blur(3.65px)",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          alignItems: "center",
          justifyContent: "center",
          padding: "89px 0px",
          position: "relative",
          borderRadius: "30px",
          width: "1200px",
          backgroundImage: "linear-gradient(-67.7715deg, rgba(5, 0, 74, 0.1) 6.5965%, rgba(100, 72, 255, 0.1) 100.84%)",
          margin: "0 auto",
        }}
      >
        {/* Animated border */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            border: "1px solid #043d88",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "30px",
          }}
          animate={{
            borderColor: ["#043d88", "#4587F4", "#043d88"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated glow orbs */}
        <GlowOrb 
          className="right-[100px] top-[50px]" 
          size={180} 
          color="rgba(240, 135, 255, 0.3)" 
          duration={6}
        />
        <GlowOrb 
          className="left-[100px] top-[70px]" 
          size={180} 
          color="rgba(51, 177, 255, 0.3)" 
          duration={8}
          delay={1}
        />

        {/* Text Section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            alignItems: "center",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: 500,
            textWrap: "nowrap",
            width: "100%",
          }}
        >
          <motion.h2
            style={{
              fontSize: "48px",
              lineHeight: "42px",
              color: "white",
              letterSpacing: "0.68px",
              margin: 0,
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Ready to Automate Your Work?
          </motion.h2>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "27.3px",
              color: "#c4c4c4",
              margin: 0,
            }}
          >
            Sign up now and start saving time today.
          </p>
        </motion.div>

        {/* Buttons Section with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            gap: "15.522px",
            alignItems: "flex-start",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <GetStartedButton size="md" />
          </motion.div>

          {/* Start on GitHub Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              position: "relative",
              borderRadius: "33.261px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "13.305px",
                alignItems: "center",
                justifyContent: "center",
                overflow: "clip",
                padding: "13.305px",
                borderRadius: "inherit",
                backgroundImage: "linear-gradient(244.75deg, rgba(255, 255, 255, 0.12) 2.51%, rgba(255, 255, 255, 0) 64.942%)",
              }}
            >
              {/* GitHub Icon */}
              <div style={{ width: "22.174px", height: "22.174px" }}>
                <svg
                  style={{ display: "block", width: "100%", height: "100%" }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 22.1742 22.1742"
                >
                  <g clipPath="url(#clip0_cta)">
                    <path
                      d="M11.0857 0.23085C4.96422 0.23085 -3.59748e-05 5.21451 -3.59748e-05 11.3623C-3.59748e-05 16.2795 3.17643 20.451 7.58356 21.9242C8.13791 22.0267 8.34025 21.683 8.34025 21.3879C8.34025 21.1231 8.33055 20.4233 8.32501 19.4947C5.2414 20.1669 4.59003 18.0021 4.59003 18.0021C4.08696 16.716 3.35936 16.3737 3.35936 16.3737C2.35182 15.6835 3.4342 15.6974 3.4342 15.6974C4.54707 15.7764 5.13192 16.8449 5.13192 16.8449C6.12144 18.5454 7.72769 18.0548 8.35966 17.7693C8.45944 17.05 8.74632 16.5594 9.06369 16.2808C6.60235 15.9995 4.0135 15.0446 4.0135 10.7802C4.0135 9.56482 4.4459 8.57114 5.15548 7.79227C5.04045 7.51093 4.66071 6.37866 5.26358 4.84725C5.26358 4.84725 6.1949 4.5479 8.31254 5.98784C9.19673 5.74115 10.1447 5.61781 11.0885 5.61365C12.0295 5.61919 12.9788 5.74115 13.8644 5.98923C15.9807 4.54928 16.9106 4.84864 16.9106 4.84864C17.5148 6.38143 17.1351 7.51232 17.0215 7.79365C17.7324 8.57253 18.1607 9.56621 18.1607 10.7816C18.1607 15.0571 15.5691 15.9981 13.0994 16.2739C13.4972 16.6176 13.8519 17.2967 13.8519 18.3347C13.8519 19.8232 13.8381 21.0234 13.8381 21.3879C13.8381 21.6858 14.0376 22.0323 14.6003 21.9228C19.0005 20.4482 22.1742 16.2781 22.1742 11.3623C22.1742 5.21451 17.21 0.23085 11.0857 0.23085Z"
                      fill="#5C6BC0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_cta">
                      <rect fill="white" height="22.1742" width="22.1742" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  fontSize: "15.988px",
                  textAlign: "center",
                  color: "white",
                  letterSpacing: "-0.1599px",
                  margin: 0,
                }}
              >
                Start on GitHub
              </p>
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                border: "1.109px solid white",
                inset: 0,
                pointerEvents: "none",
                borderRadius: "33.261px",
                boxShadow: "0px 1.109px 2.217px 0px rgba(37,62,167,0.48), 0px 0px 0px 1.109px #375dfb",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
