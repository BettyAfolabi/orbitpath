"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useISSPosition } from "@/hooks/useISSPosition";

// Floating particle — purely decorative
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
  }));
}

const WORDS = ["Astronaut.", "Engineer.", "Scientist.", "Explorer."];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [particles] = useState<Particle[]>(() => generateParticles(40));
  const { position } = useISSPosition(5000);

  // Staggered mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Word cycling with fade transition
  useEffect(() => {
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(cycle);
  }, []);


  return (
    <section className="relative w-full h-full flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 overflow-hidden">

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float-particle ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
            }}
          />
        ))}
      </div>

      {/* ── Radial glow behind headline ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-10%",
          top: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Artemis mission badge ── */}
      <div
        className={`transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 border border-amber-400/30 bg-amber-400/5 rounded-sm px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-amber-400">
              Artemis Program · Active
            </span>
          </div>
          <div className="h-px w-12 bg-linear-to-r from-amber-400/40 to-transparent" />
        </div>
      </div>

      {/* ── Main headline ── */}
      <div className="relative mb-3">
        {/* Ghost — holds space for the longest word, invisible */}
        <h1 className="font-display font-black leading-none tracking-tight invisible pointer-events-none select-none" aria-hidden>
            <span className="block text-[clamp(2.8rem,7vw,5.5rem)]">Become a</span>
            <span className="block text-[clamp(2.8rem,7vw,5.5rem)]">Scientist.</span>
        </h1>

        {/* Real headline — absolute on top, same size, no layout influence */}
        <h1 className="font-display font-black leading-none tracking-tight absolute top-0 left-0">
            <span
            className="block text-[clamp(2.8rem,7vw,5.5rem)] text-slate-100"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.08)" }}
            >
            Become a
            </span>
            <span
            className={`block text-[clamp(2.8rem,7vw,5.5rem)] text-amber-400 transition-all duration-400 ${
                wordVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ textShadow: "0 0 60px rgba(251,191,36,0.25)" }}
            >
            {WORDS[wordIndex]}
            </span>
        </h1>
      </div>

      {/* ── Subheadline ── */}
      <div
        className={`transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "450ms" }}
      >
        <p className="font-body text-slate-400 text-base md:text-lg max-w-sm leading-relaxed mb-10 mt-5">
          AI-powered career roadmaps for the next generation of space explorers.
          Guided by real Artemis mission data.
        </p>
      </div>

      {/* ── CTAs ── */}
      <div
        className={`transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/pathfinder"
            className="group relative inline-flex items-center gap-2.5 bg-cyan-400 text-black font-mono font-bold text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm overflow-hidden hover:bg-cyan-300 transition-colors duration-200"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">Start Pathfinder</span>
            <svg
              className="relative w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link
            href="/crew"
            className="group inline-flex items-center gap-2 border border-slate-700 text-slate-400 font-mono text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
          >
            Meet the Crew
          </Link>
        </div>
      </div>

      {/* ── Live ISS stat strip ── */}
      <div
        className={`transition-all duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="mt-12 flex items-center gap-6 font-mono text-[10px] tracking-widest text-slate-600 uppercase">
          {/* Pulse dot */}
          <div className="relative flex items-center gap-2 text-cyan-500">
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-cyan-400" />
            <span>ISS Live</span>
          </div>

          <div className="h-3 w-px bg-slate-800" />

          {position ? (
            <>
              <span className="text-slate-500">
                ALT{" "}
                <span className="text-slate-300">
                  {position.altitude.toFixed(0)}
                </span>{" "}
                km
              </span>
              <div className="h-3 w-px bg-slate-800" />
              <span className="text-slate-500">
                VEL{" "}
                <span className="text-slate-300">
                  {position.velocity.toFixed(0)}
                </span>{" "}
                km/h
              </span>
              <div className="h-3 w-px bg-slate-800" />
              <span className="text-slate-500">
                LAT{" "}
                <span className="text-slate-300">
                  {position.latitude.toFixed(2)}°
                </span>
              </span>
            </>
          ) : (
            <span className="animate-pulse">Acquiring signal…</span>
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={`mt-5 transition-all duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1100ms" }}
      >
        <div className="flex flex-col items-center gap-2 w-fit">
            <span className="font-mono text-[9px] tracking-[0.25em] text-slate-700 uppercase">
            Scroll
            </span>
            <div className="w-px h-10 bg-linear-to-b from-slate-700 to-transparent relative overflow-hidden">
            <div
                className="absolute top-0 left-0 w-full bg-cyan-400"
                style={{
                height: "40%",
                animation: "scroll-line 2s ease-in-out infinite",
                }}
            />
            </div>
        </div>
      </div>
    </section>
  );
}