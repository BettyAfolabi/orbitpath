"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Astronaut.", "Engineer.", "Scientist.", "Explorer."];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ToolReveal() {
  const { ref, inView } = useInView();
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Only start cycling once section is in view
  useEffect(() => {
    if (!inView) return;
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(cycle);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6 md:px-14 lg:px-24"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.02) 50%, transparent 100%)",
      }}
    >
      {/* Subtle glow behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section label ── */}
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-slate-700" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600">
              The Tool
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy + CTA */}
          <div>
            {/* Cycling headline */}
            <div
              className={`transition-all duration-700 mb-6 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "100ms" }}
            >
              {/* Ghost span to hold layout width */}
              <div className="relative">
                <h2 className="font-display font-black leading-tight invisible pointer-events-none select-none" aria-hidden>
                  <span className="block text-[clamp(1.8rem,4vw,3.2rem)] text-slate-100">Your path to</span>
                  <span className="block text-[clamp(1.8rem,4vw,3.2rem)] text-slate-100">becoming an</span>
                  <span className="block text-[clamp(1.8rem,4vw,3.2rem)]">Scientist.</span>
                </h2>
                <h2 className="font-display font-black leading-tight absolute top-0 left-0">
                  <span className="block text-[clamp(1.8rem,4vw,3.2rem)] text-slate-100">Your path to</span>
                  <span className="block text-[clamp(1.8rem,4vw,3.2rem)] text-slate-100">becoming an</span>
                  <span
                    className={`block text-[clamp(1.8rem,4vw,3.2rem)] text-cyan-400 transition-all duration-400 ${
                      wordVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                    style={{ textShadow: "0 0 40px rgba(0,229,255,0.3)" }}
                  >
                    {WORDS[wordIndex]}
                  </span>
                </h2>
              </div>
            </div>

            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "250ms" }}
            >
              <p className="font-body text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                OrbitPath maps your skills, interests, and goals to a real career path
                into space exploration. Powered by Groq AI, grounded in actual Artemis
                mission data.
              </p>
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "380ms" }}
            >
              <Link
                href="/pathfinder"
                className="group relative inline-flex items-center gap-2.5 bg-cyan-400 text-black font-mono font-bold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-sm overflow-hidden hover:bg-cyan-300 transition-colors duration-200"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Find your path</span>
                <svg
                  className="relative w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-600 mt-3">
                Free · Takes 3 minutes
              </p>
            </div>
          </div>

          {/* Right — roadmap preview */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative rounded-sm overflow-hidden border border-white/10 group">
              {/* Preview image */}
              <div className="relative w-full aspect-4/3 md:aspect-16/10">
                <Image
                  src="/roadmap-preview.png"
                  alt="Example AI-generated space career roadmap"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Blur overlay — bottom 40% */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 30%, rgba(5,8,16,0.85) 70%, rgba(5,8,16,0.97) 100%)",
                  }}
                />
                {/* Side vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, rgba(5,8,16,0.3) 0%, transparent 20%, transparent 80%, rgba(5,8,16,0.3) 100%)",
                  }}
                />
              </div>

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-slate-500 mb-1">
                      Your output
                    </p>
                    <p className="font-display font-bold text-base md:text-lg text-slate-200">
                      A personalized space career roadmap
                    </p>
                  </div>
                  {/* Glow dot */}
                  <div className="shrink-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)] animate-pulse" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-sm border border-cyan-400/0 group-hover:border-cyan-400/20 transition-colors duration-500 pointer-events-none" />
            </div>

            {/* Caption */}
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-600 mt-3 text-center">
              Real output · AI-generated · Based on your answers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}