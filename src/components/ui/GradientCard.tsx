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
  height = undefined,
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
          ...(width && !className.includes('w-') ? { width } : {}),
          ...(height && !className.includes('h-') && !className.includes('min-h-') ? { height } : {}),
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
  const hasCustomHeight = style.height || style.minHeight;
  const hasHeightClass = className.includes('h-') || className.includes('min-h-');

  return (
    <div
      className={`relative ${className.includes('w-') ? className.split(' ').filter(c => c.startsWith('w-')).join(' ') : ''}`}
      style={{
        borderRadius: "24px",
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 50%, rgba(5, 15, 35, 0.95) 100%)",
        border: "1px solid rgba(85, 190, 255, 0.15)",
        ...(width && !className.includes('w-') ? { width } : {}),
        ...style,
      }}
    >
      <div
        className={`relative flex flex-col items-center rounded-[23px] ${className.split(' ').filter(c => !c.startsWith('w-')).join(' ')}`}
        style={{
          ...(height && !hasCustomHeight && !hasHeightClass ? { height } : {}),
          padding,
          gap,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
