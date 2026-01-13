"use client";

import { useEffect, useRef, useState, useMemo, useId } from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  surfaceType?: "squircle" | "convex" | "concave" | "lip";
  refractiveIndex?: number;
  maxDisplacement?: number;
}

export function LiquidGlass({
  children,
  className = "",
  surfaceType = "squircle",
  refractiveIndex = 1.5, // Glass refractive index
  maxDisplacement = 60,
}: LiquidGlassProps) {
  const [dimensions, setDimensions] = useState({ width: 1400, height: 80 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const filterId = `liquid-glass-${id}`;

  // Set mounted flag on client only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update dimensions on mount and resize
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      setDimensions({ width: Math.ceil(rect.width), height: Math.ceil(rect.height) });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Generate displacement map based on surface function (client-side only)
  const displacementMapUrl = useMemo(() => {
    if (!isMounted) return "";
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return "";

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    // Surface profile functions (normalized 0-1)
    const surfaceProfile = (t: number): number => {
      switch (surfaceType) {
        case "convex":
          // Spherical dome
          return Math.sqrt(1 - Math.pow(1 - t, 2));
        case "squircle":
          // Smooth flat-to-curve (Apple-style)
          return Math.pow(1 - Math.pow(1 - t, 4), 0.25);
        case "concave":
          // Bowl shape
          return 1 - Math.sqrt(1 - Math.pow(1 - t, 2));
        case "lip":
          // Raised rim with shallow center
          if (t < 0.5) {
            return Math.sqrt(1 - Math.pow(1 - t * 2, 2)) * 0.3;
          } else {
            return 0.3 + (1 - 0.3) * Math.sqrt(1 - Math.pow(1 - (t - 0.5) * 2, 2));
          }
        default:
          return Math.pow(1 - Math.pow(1 - t, 4), 0.25);
      }
    };

    // Pre-calculate refraction at 127 samples along radius
    const samples = 127;
    const refractionData: { dx: number; dy: number }[] = [];

    for (let i = 0; i <= samples; i++) {
      const t = i / samples; // 0 to 1 (center to edge)
      const surfaceHeight = surfaceProfile(t);

      // Calculate surface normal via derivative (approximate)
      const dt = 0.001;
      const dhdt = (surfaceProfile(t + dt) - surfaceProfile(t - dt)) / (2 * dt);

      // Normal angle
      const normalAngle = Math.atan2(dhdt, 1);

      // Snell's law: n1*sin(θ1) = n2*sin(θ2)
      // Assume incident ray is perpendicular from viewer
      const n1 = 1.0; // Air
      const n2 = refractiveIndex; // Glass

      const theta1 = normalAngle;
      const sinTheta2 = (n1 / n2) * Math.sin(theta1);

      // Check for total internal reflection
      if (Math.abs(sinTheta2) > 1) {
        refractionData.push({ dx: 0, dy: 0 });
        continue;
      }

      const theta2 = Math.asin(sinTheta2);
      const refractionAngle = theta2 - theta1;

      // Displacement magnitude based on refraction angle and surface height
      const displacementMag = Math.tan(refractionAngle) * surfaceHeight * 50;

      refractionData.push({
        dx: displacementMag,
        dy: displacementMag * 0.5, // Vertical component
      });
    }

    // Find max displacement for normalization
    let maxDx = 0;
    let maxDy = 0;
    refractionData.forEach(({ dx, dy }) => {
      maxDx = Math.max(maxDx, Math.abs(dx));
      maxDy = Math.max(maxDy, Math.abs(dy));
    });

    // iOS 26 Liquid Glass - with edge inversion effect on ALL sides
    // Reduced edge zones and inversion strength for cleaner borders
    const edgeZoneY = Math.min(height * 0.4, 50); // Vertical edge zone (reduced)
    const edgeZoneX = Math.min(height * 0.6, 60); // Horizontal edge zone (reduced)
    const inversionStrength = 60; // Softer inversion to avoid border artifacts

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const distFromTop = y;
        const distFromBottom = height - y;
        const distFromLeft = x;
        const distFromRight = width - x;

        let displaceX = 0;
        let displaceY = 0;

        // TOP EDGE - pulls content from ABOVE down into view (inverted)
        if (distFromTop < edgeZoneY) {
          const t = distFromTop / edgeZoneY;
          const strength = Math.pow(1 - t, 1.5);
          displaceY = -strength * inversionStrength;
        }

        // BOTTOM EDGE - pulls content from BELOW up into view (inverted)
        if (distFromBottom < edgeZoneY) {
          const t = distFromBottom / edgeZoneY;
          const strength = Math.pow(1 - t, 1.5);
          displaceY = strength * inversionStrength;
        }

        // LEFT EDGE - FULL horizontal inversion (same strength as top/bottom)
        if (distFromLeft < edgeZoneX) {
          const t = distFromLeft / edgeZoneX;
          const strength = Math.pow(1 - t, 1.5);
          displaceX = -strength * inversionStrength;
        }

        // RIGHT EDGE - FULL horizontal inversion (same strength as top/bottom)
        if (distFromRight < edgeZoneX) {
          const t = distFromRight / edgeZoneX;
          const strength = Math.pow(1 - t, 1.5);
          displaceX = strength * inversionStrength;
        }

        // Corner enhancement - softer for cleaner border appearance
        const cornerZone = 30;
        const isNearLeftTop = distFromLeft < cornerZone && distFromTop < cornerZone;
        const isNearRightTop = distFromRight < cornerZone && distFromTop < cornerZone;
        const isNearLeftBottom = distFromLeft < cornerZone && distFromBottom < cornerZone;
        const isNearRightBottom = distFromRight < cornerZone && distFromBottom < cornerZone;

        if (isNearLeftTop || isNearRightTop || isNearLeftBottom || isNearRightBottom) {
          const cornerX = Math.min(distFromLeft, distFromRight);
          const cornerY = Math.min(distFromTop, distFromBottom);
          const cornerDist = Math.sqrt(cornerX * cornerX + cornerY * cornerY);
          if (cornerDist < cornerZone) {
            const cornerStrength = Math.pow(1 - cornerDist / cornerZone, 2) * 20; // softer corner pull
            const dirX = distFromLeft < distFromRight ? -1 : 1;
            const dirY = distFromTop < distFromBottom ? -1 : 1;
            displaceX += dirX * cornerStrength;
            displaceY += dirY * cornerStrength;
          }
        }

        // Center zone - stronger lens distortion to create clearer patterned refraction
        const nx = x / width - 0.5;
        const ny = y / height - 0.5;
        const centerFactor = Math.max(0, 1 - (Math.abs(displaceX) + Math.abs(displaceY)) / 48);
        displaceX += nx * 18 * centerFactor;
        displaceY += ny * 28 * centerFactor;

        // Normalize to 0-255 (128 = no displacement)
        // Increase scale to amplify the visible displacement across the element
        const scale = 5.0;
        const normalizedX = Math.floor(128 + displaceX * scale);
        const normalizedY = Math.floor(128 + displaceY * scale);

        const idx = (y * width + x) * 4;
        data[idx] = Math.max(0, Math.min(255, normalizedX));
        data[idx + 1] = Math.max(0, Math.min(255, normalizedY));
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }, [dimensions, surfaceType, refractiveIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ borderRadius: "inherit", overflow: "hidden" }}>
      {/* SVG Filter Definition */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            {displacementMapUrl && (
              <>
                <feImage
                  href={displacementMapUrl}
                  x="0"
                  y="0"
                  width={dimensions.width}
                  height={dimensions.height}
                  result="displacement_map"
                  preserveAspectRatio="none"
                />

                {/* Chromatic Aberration - separate RGB channels with different displacement */}
                {/* Red channel - displaced more (longer wavelength refracts less) */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacement_map"
                  scale={maxDisplacement * 1.15}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced_r"
                />
                <feColorMatrix
                  in="displaced_r"
                  type="matrix"
                  values="1 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="red"
                />

                {/* Green channel - base displacement */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacement_map"
                  scale={maxDisplacement}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced_g"
                />
                <feColorMatrix
                  in="displaced_g"
                  type="matrix"
                  values="0 0 0 0 0
                          0 1 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0"
                  result="green"
                />

                {/* Blue channel - displaced less (shorter wavelength refracts more) */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacement_map"
                  scale={maxDisplacement * 0.85}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced_b"
                />
                <feColorMatrix
                  in="displaced_b"
                  type="matrix"
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 1 0 0
                          0 0 0 1 0"
                  result="blue"
                />

                {/* Combine RGB channels */}
                <feBlend in="red" in2="green" mode="screen" result="rg" />
                <feBlend in="rg" in2="blue" mode="screen" result="combined" />

                {/* Subtle blur for smooth glass look */}
                <feGaussianBlur in="combined" stdDeviation="0.3" result="blurred" />
              </>
            )}
          </filter>
        </defs>
      </svg>

      {/* Content with backdrop filter - clipped to match border-radius */}
      <div
        style={{
          backdropFilter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId})`,
          borderRadius: "inherit",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
