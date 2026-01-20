import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "ABA Fusion — Intelligent Orchestration Platform",
  description:
    "FusionAI is an intelligent orchestration platform that seamlessly integrates AI capabilities into your applications, enhancing productivity and innovation.",
    icons: {
      icon: "/abafusion.svg",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beVietnamPro.variable} antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        <ScrollProgress />
        <Background />
        <Navbar />
        <main className="min-h-screen pt-24">{children}</main>
      </body>
    </html>
  );
}
