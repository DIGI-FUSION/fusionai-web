"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the Spline component on client only to avoid async SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline").then((mod) => mod.default), {
  ssr: false,
});

export default function SplineClient({ scene }: { scene: string }) {
  return <Spline scene={scene} />;
}
