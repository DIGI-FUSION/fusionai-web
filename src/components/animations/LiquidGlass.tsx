"use client";

import { useEffect, useRef, useState, useMemo } from "react";

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
  maxDisplacement = 20,
}: LiquidGlassProps) {
  const [dimensions, setDimensions] = useState({ width: 1400, height: 80 });
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = useRef(`liquid-glass-${Math.random().toString(36).slice(2, 9)}`);

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

  // Generate displacement map based on surface function
  const displacementMapUrl = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return "";

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

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

    // Generate displacement map
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Normalized distance from center
        const t = Math.min(radius / maxRadius, 1);

        // Get refraction from pre-calculated data
        const sampleIndex = Math.floor(t * samples);
        const refraction = refractionData[sampleIndex] || { dx: 0, dy: 0 };

        // Rotate displacement vector by angle
        const displaceX = refraction.dx * Math.cos(angle) - refraction.dy * Math.sin(angle);
        const displaceY = refraction.dx * Math.sin(angle) + refraction.dy * Math.cos(angle);

        // Normalize to 0-255 (128 = no displacement)
        const normalizedX = Math.floor(128 + (displaceX / (maxDx || 1)) * 127);
        const normalizedY = Math.floor(128 + (displaceY / (maxDy || 1)) * 127);

        const idx = (y * width + x) * 4;
        data[idx] = Math.max(0, Math.min(255, normalizedX)); // R = X displacement
        data[idx + 1] = Math.max(0, Math.min(255, normalizedY)); // G = Y displacement
        data[idx + 2] = 128; // B = unused
        data[idx + 3] = 255; // A = full opacity
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }, [dimensions, surfaceType, refractiveIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* SVG Filter Definition */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId.current}
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
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacement_map"
                  scale={maxDisplacement}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />
                {/* Add subtle blur for realism */}
                <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
              </>
            )}
          </filter>
        </defs>
      </svg>

      {/* Content with backdrop filter */}
      <div
        style={{
          backdropFilter: `url(#${filterId.current})`,
          WebkitBackdropFilter: `url(#${filterId.current})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
