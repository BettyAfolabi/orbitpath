import type { Metadata } from "next";
import Link from "next/link";
import CrewGrid from "@/components/crew/CrewGrid";

export const metadata: Metadata = {
  title: "Artemis II Crew — OrbitPath",
  description:
    "Meet the four astronauts flying on NASA's Artemis II mission — the first crewed lunar flyby since Apollo 17.",
};

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${((i * 137.508) % 100).toFixed(2)}%`,
  top: `${((i * 97.3) % 100).toFixed(2)}%`,
  opacity: (((i * 31) % 6) + 1) / 10,
}));

export default function CrewPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            ← Home
          </Link>
          <span className="text-xs font-mono tracking-widest text-slate-600 uppercase">Artemis II</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {STARS.map((s) => (
            <div
              key={s.id}
              className="absolute w-px h-px bg-white rounded-full"
              style={{ left: s.left, top: s.top, opacity: s.opacity }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] text-blue-400 uppercase font-mono mb-4 md:mb-5">
            Artemis II — 2026
          </p>
          <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-4 md:mb-6">
            The{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-violet-400 to-blue-400">
              Crew
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Four astronauts. A free-return trajectory around the Moon. The first
            humans at lunar distance in more than half a century and the most
            diverse deep-space crew ever assembled.
          </p>

          <div className="mt-10 md:mt-12 grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-6 md:gap-10 text-center">
            {[
              { label: "Mission Duration", value: "~10 days" },
              { label: "Crew Size", value: "4 astronauts" },
              { label: "Lunar Distance", value: "~238,855 mi" },
              { label: "Launch Vehicle", value: "SLS Block 1B" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xl md:text-2xl font-light text-white">{value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono tracking-widest uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crew cards */}
      <section className="px-4 md:px-6 pb-24 md:pb-28 max-w-6xl mx-auto">
        <CrewGrid />

        {/* CTA block */}
        <div className="mt-16 md:mt-20 text-center relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 via-violet-600/5 to-blue-600/5 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl border border-white/6 bg-white/2 p-8 md:p-10">
            <p className="text-xs tracking-[0.3em] text-blue-400 uppercase font-mono mb-4">Your Turn</p>
            <h3 className="text-xl md:text-3xl font-light text-white mb-3">
              What&apos;s your path to space?
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6 md:mb-8 leading-relaxed">
              These four astronauts each had a unique journey. Discover the programs, degrees, and skills
              that could launch your own career in the space industry.
            </p>
            <Link
              href="/pathfinder"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start the Pathfinder Quiz <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}