"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artemisIICrew, artemisTimeline } from "@/data/crew";

const MISSION_STATS = [
  { label: "Mission", value: "Artemis II", sub: "Apr 1–10, 2026" },
  { label: "Crew", value: "4", sub: "International team" },
  { label: "Distance", value: "252,756 mi", sub: "New human distance record" },
  { label: "Next", value: "Artemis III", sub: "Moon landing · 2028" },
];

function useInView(threshold = 0.15) {
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

export default function StorySection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 md:px-14 lg:px-24 max-w-7xl mx-auto">

      {/* ── Section label ── */}
      <div
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-slate-700" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600">
            The Mission
          </span>
        </div>
      </div>

      {/* ── Two-column: copy + stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

        {/* Left — narrative */}
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <h2 className="font-display font-black text-[clamp(1.8rem,4vw,3rem)] leading-tight text-slate-100 mb-6">
            The most ambitious human spaceflight effort{" "}
            <span className="text-amber-400">in 50 years.</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-base md:text-lg leading-relaxed font-body">
            <p>
              NASA‘s Artemis program is returning humans to the Moon; crewed lunar orbit,
              surface landings, and eventually Mars. It needs engineers, scientists, pilots,
              mission specialists, and roles that don‘t exist yet.
            </p>
            <p>
              In April 2026, Artemis II launched four astronauts on the first crewed lunar
              flyby since Apollo 17, setting a new human distance record of 252,756 miles
              from Earth. The program is accelerating.
            </p>
            <p>
              Most people who want to work in space don‘t know where to start.{" "}
              <span className="text-cyan-400">OrbitPath changes that.</span>
            </p>
          </div>
        </div>

        {/* Right — stat cards */}
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid grid-cols-2 gap-3">
            {MISSION_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`border border-white/8 bg-white/3 rounded-sm p-4 md:p-5 backdrop-blur-sm transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${300 + i * 70}ms` }}
              >
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-slate-600 mb-2">
                  {stat.label}
                </div>
                <div className="font-display font-black text-xl md:text-2xl text-slate-100 leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-slate-500 leading-snug">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Crew divider ── */}
      <div
        className={`transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600 whitespace-nowrap">
            These four are already going
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        </div>
      </div>

      {/* ── Crew portrait row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 mb-8">
        {artemisIICrew.map((member, i) => (
          <Link
            key={member.slug}
            href={`/crew/${member.slug}`}
            className={`group transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${580 + i * 70}ms` }}
          >
            {/* Portrait */}
            <div className="relative aspect-3/4 rounded-sm overflow-hidden border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-300 mb-3">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#050810] via-[#050810]/20 to-transparent" />
              {/* Agency tag */}
              <div className="absolute top-2 right-2">
                <span className="font-mono text-[8px] tracking-widest uppercase bg-black/60 border border-white/10 px-1.5 py-0.5 text-slate-400 rounded-sm backdrop-blur-sm">
                  {member.agency}
                </span>
              </div>
            </div>
            <p className="font-display font-bold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors duration-200 leading-tight">
              {member.name}
            </p>
            <p className="font-mono text-[10px] tracking-wide text-slate-500 mt-0.5">
              {member.role}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Full crew link ── */}
      <div
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "870ms" }}
      >
        <Link
          href="/crew"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-slate-500 hover:text-cyan-400 transition-colors duration-200"
        >
          <span>Full crew profiles</span>
          <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      {/* ── Mission timeline ── */}
      <div
        className={`mt-24 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: "950ms" }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600 whitespace-nowrap">
            Mission Sequence
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-slate-800 to-transparent md:-translate-x-px" />

          <div className="space-y-8">
            {artemisTimeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex items-start md:gap-0 gap-8 transition-all duration-700 ${
                    inView ? "opacity-100 translate-x-0" : isLeft ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"
                  } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{ transitionDelay: `${1000 + i * 120}ms` }}
                >
                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 top-5 w-2.5 h-2.5 rounded-full border-2 -translate-x-1/2 z-10"
                    style={{ borderColor: item.color, backgroundColor: item.color + "33" }}
                  />

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div
                      className="rounded-xl border border-white/6 bg-white/2 p-5 hover:border-white/10 transition-colors duration-300"
                      style={{ boxShadow: `0 0 30px -15px ${item.color}40` }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color: item.color }}>
                            {item.date}
                          </p>
                          <h3 className="text-base font-medium text-white">{item.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                        </div>
                        <span className={`shrink-0 text-[9px] tracking-widest px-2 py-0.5 rounded-full border font-mono uppercase ${
                          item.status === "complete" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                          item.status === "planned" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                          "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.description}</p>
                      <div
                        className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg border font-mono"
                        style={{ color: item.color, borderColor: item.color + "40", backgroundColor: item.color + "10" }}
                      >
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {item.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}