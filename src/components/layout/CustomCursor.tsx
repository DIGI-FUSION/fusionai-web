"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Smooth cursor position with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trailing dots with different delays
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.8 });
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Only show on desktop
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Check for hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverableElement = !!(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.classList.contains("cursor-pointer") ||
        getComputedStyle(target).cursor === "pointer"
      );
      
      setIsHovering(isHoverableElement);
      
      // Check for custom cursor text
      const cursorTextElement = target.closest("[data-cursor-text]") as HTMLElement;
      if (cursorTextElement) {
        setCursorText(cursorTextElement.dataset.cursorText || "");
      } else {
        setCursorText("");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleElementHover);

    // Hide default cursor
    document.body.style.cursor = "none";
    
    // Also hide cursor on interactive elements
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleElementHover);
      document.body.style.cursor = "auto";
      style.remove();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Core dot */}
          <motion.div
            className="rounded-full bg-white"
            animate={{
              width: isHovering ? 12 : 8,
              height: isHovering ? 12 : 8,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          
          {/* Cursor text */}
          {cursorText && (
            <motion.span
              className="absolute left-6 whitespace-nowrap text-white text-xs font-medium bg-black/80 px-2 py-1 rounded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: isClicking ? 30 : isHovering ? 50 : 40,
            height: isClicking ? 30 : isHovering ? 50 : 40,
            borderColor: isHovering ? "rgba(69, 135, 244, 0.6)" : "rgba(255, 255, 255, 0.3)",
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            boxShadow: isHovering ? "0 0 20px rgba(69, 135, 244, 0.3)" : "none",
          }}
        />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          animate={{
            width: isHovering ? 60 : 50,
            height: isHovering ? 60 : 50,
            opacity: isHovering ? 0.5 : 0.3,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="rounded-full border-2 border-blue-400"
            initial={{ width: 10, height: 10, opacity: 1 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Magnetic particles when hovering */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              animate={{
                x: Math.cos((i / 6) * Math.PI * 2) * 30,
                y: Math.sin((i / 6) * Math.PI * 2) * 30,
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}
