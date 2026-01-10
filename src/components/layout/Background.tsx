export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark navy background - same as AboutABA */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(10, 15, 30, 1) 100%)",
        }}
      />

      {/* Dotted grid pattern - same as AboutABA */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle blue glow at top */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 40% at 50% 0%, rgba(59,130,246,0.08), transparent 60%)",
        }}
      />
    </div>
  );
}
