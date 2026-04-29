"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "01",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Answer 4 questions",
    description: "Tell us your skills, interests, education level, and career goals. No right or wrong answers, just where you are.",
    accent: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
  },
  {
    number: "02",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI builds your roadmap",
    description: "Groq AI generates a personalized career track with phases, milestones, and recommended programs matched to your profile.",
    accent: "text-cyan-400",
    border: "border-cyan-400/20",
    bg: "bg-cyan-400/5",
  },
  {
    number: "03",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.729c.144.245.266.499.364.764A4.501 4.501 0 017.5 21H6a.75.75 0 01-.75-.75v-3.977c0-.284.193-.527.472-.54 1.165-.056 2.147-.695 2.682-1.504z" />
      </svg>
    ),
    title: "Rate the results",
    description: "Your feedback trains the system. Rate recommendations to help future explorers get even better roadmaps. You're part of the dataset.",
    accent: "text-violet-400",
    border: "border-violet-400/20",
    bg: "bg-violet-400/5",
  },
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

export default function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6 md:px-14 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Section label ── */}
      <div
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-slate-700" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600">
            How it works
          </span>
        </div>
      </div>

      {/* ── Heading ── */}
      <div
        className={`transition-all duration-700 mb-14 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: "80ms" }}
      >
        <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.6rem)] text-slate-100 leading-tight max-w-lg">
          From zero to roadmap{" "}
          <span className="text-slate-500">in three steps.</span>
        </h2>
      </div>

      {/* ── Step cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className={`relative border ${step.border} ${step.bg} rounded-sm p-6 md:p-7 backdrop-blur-sm transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${160 + i * 120}ms` }}
          >
            {/* Step number — large background */}
            <div
              className="absolute top-4 right-5 font-display font-black text-5xl leading-none select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.03)" }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div className={`${step.accent} mb-5`}>
              {step.icon}
            </div>

            {/* Step number badge */}
            <div className={`font-mono text-[9px] tracking-[0.25em] uppercase ${step.accent} opacity-70 mb-2`}>
              Step {step.number}
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg text-slate-100 mb-3 leading-tight">
              {step.title}
            </h3>

            {/* Description */}
            <p className="font-body text-slate-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* ── Connector line between steps (desktop only) ── */}
      {/* Visual handled by card layout — keeping clean */}

      {/* ── Final CTA ── */}
      <div
        className={`transition-all duration-700 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "560ms" }}
      >
        <Link
          href="/pathfinder"
          className="group relative inline-flex items-center gap-2.5 bg-cyan-400 text-black font-mono font-bold text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-sm overflow-hidden hover:bg-cyan-300 transition-colors duration-200"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative">Start Pathfinder</span>
          <svg
            className="relative w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        <div className="h-px w-12 bg-slate-800 hidden sm:block" />

        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-600 leading-relaxed">
          Free · No account required · 3 minutes
        </p>
      </div>
    </section>
  );
}