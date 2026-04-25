import type { Metadata } from "next";
import Link from "next/link";
import { artemisIICrew } from "@/data/crew";
import CrewImage from "@/components/crew/CrewImage";

export const metadata: Metadata = {
  title: "Artemis II Crew — Launchpad",
  description:
    "Meet the four astronauts flying on NASA's Artemis II mission — the first crewed lunar flyby since Apollo 17.",
};

// Generated once at module load — stable across renders
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
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            ← Home
          </Link>
          <span className="text-xs font-mono tracking-widest text-slate-600 uppercase">Artemis II</span>
        </div>
      </div>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* Star field — deterministic positions */}
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
          <p className="text-xs tracking-[0.35em] text-blue-400 uppercase font-mono mb-5">
            Artemis II — 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            The{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-violet-400 to-blue-400">
              Crew
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Four astronauts. A free-return trajectory around the Moon. The first
            humans at lunar distance in more than half a century — and the most
            diverse deep-space crew ever assembled.
          </p>
          <div className="mt-12 inline-flex flex-wrap justify-center gap-6 md:gap-10 text-center">
            {[
              { label: "Mission Duration", value: "~10 days" },
              { label: "Crew Size", value: "4 astronauts" },
              { label: "Lunar Distance", value: "~238,855 mi" },
              { label: "Launch Vehicle", value: "SLS Block 1B" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl font-light text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono tracking-widest uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artemisIICrew.map((member) => (
            <Link key={member.slug} href={`/crew/${member.slug}`}>
              <article className="group relative rounded-2xl overflow-hidden border border-white/6 bg-white/2 hover:border-white/12 transition-all duration-500 hover:-translate-y-0.5 cursor-pointer">
                <div className="flex gap-0">
                  <div className="relative w-44 shrink-0 bg-slate-900 overflow-hidden">
                    <CrewImage
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                      sizes="176px"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/60" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[10px] tracking-[0.25em] text-blue-400 uppercase font-mono mb-1">
                          {member.role} · {member.agency}
                        </p>
                        <h2 className="text-xl font-medium text-white group-hover:text-blue-200 transition-colors">
                          {member.name}
                        </h2>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/10">
                        {member.nationality}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {member.shortBio}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {member.stats.slice(0, 2).map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="text-sm font-medium text-white">{s.value}</div>
                          <div className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 via-violet-600/5 to-blue-600/5 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl border border-white/6 bg-white/2 p-10">
            <p className="text-xs tracking-[0.3em] text-blue-400 uppercase font-mono mb-4">Your Turn</p>
            <h3 className="text-2xl md:text-3xl font-light text-white mb-3">
              What&apos;s your path to space?
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
              These four astronauts each had a unique journey. Discover the programs, degrees, and skills
              that could launch your own career in the space industry.
            </p>
            <Link
              href="/pathfinder"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start the Pathfinder Quiz <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}