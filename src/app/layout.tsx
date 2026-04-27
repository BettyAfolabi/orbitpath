import type { Metadata } from "next";
import { Orbitron, Sora } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "900"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "OrbitPath — Space Career Pathfinder",
  description: "AI-powered career roadmaps for the next generation of space explorers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${sora.variable}`}>
      <body className="bg-[#050810] text-white antialiased font-body">
        {children}
      </body>
    </html>
  );
}