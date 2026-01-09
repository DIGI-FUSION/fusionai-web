import { ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  gap?: string | number;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "gradient-bg"; // "default" = border gradient, "gradient-bg" = background gradient only
}

export function GradientCard({
  children,
  width = "384px",
  height = "305px",
  padding = "24px",
  gap = "24px",
  className = "",
  style = {},
  variant = "default",
}: GradientCardProps) {
  if (variant === "gradient-bg") {
    // Variant without the border gradient, just the background gradient
    return (
      <div
        className={`relative flex flex-col items-center rounded-[35px] ${className}`}
        style={{
          width,
          height,
          padding,
          gap,
          background: "linear-gradient(180deg, rgba(21, 19, 23, 0.6) 1.44%, rgba(25, 22, 28, 0.6) 19.71%, rgba(7, 32, 50, 0.6) 65.38%, rgba(0, 36, 59, 0.6) 99.52%)",
          backdropFilter: "blur(10px)",
          boxSizing: "border-box",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // Default variant with border gradient
  return (
    <div
      style={{
        padding: "1px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(85, 190, 255, 0.4) 0%, rgba(126, 118, 255, 0.4) 100%)",
        ...style,
      }}
    >
      <div
        className={`relative flex flex-col items-center rounded-[11px] ${className}`}
        style={{
          width,
          height,
          padding,
          gap,
          backgroundColor: "#0a0f1e",
          backgroundImage: "linear-gradient(180deg, rgba(21, 19, 23, 0.4) 1.44%, rgba(25, 22, 28, 0.4) 19.71%, rgba(0, 36, 59, 0.4) 100%)",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
