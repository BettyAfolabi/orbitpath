import Hero from "@/components/home/Hero";
import GlobeWrapper from "@/components/home/GlobeWrapper";
import StorySection from "@/components/home/StorySection";
import ToolReveal from "@/components/home/ToolReveal";
import HowItWorks from "@/components/home/HowItWorks";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <main className="relative bg-[#050810] overflow-hidden">

      {/* ── Fixed star field ── */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 85%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 45%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 65%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 25%, rgba(255,255,255,0.5) 0%, transparent 100%)
          `,
        }}
      />

      {/* ── Section 1: Hook — Hero + Globe ── */}
      <section className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 flex items-center lg:max-w-[50%]">
          <Hero />
        </div>
        <div
          className="flex-1 h-[50vh] lg:h-screen lg:max-w-[55%] relative"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
          }}
        >
          <GlobeWrapper />
        </div>
      </section>

      {/* Section 1 → 2 fade */}
      <div  id="story" className="relative z-10 h-22 -mt-22 bg-linear-to-b from-transparent to-[#050810] pointer-events-none" />
      <FadeIn className="relative z-10">
        <StorySection />
      </FadeIn>

      <FadeIn className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 lg:px-24" delay={0.1}>
        <div className="h-px bg-linear-to-r from-transparent via-slate-800/60 to-transparent" />
      </FadeIn>

      {/* ── Section 3 ── */}
      <FadeIn className="relative z-10">
        <ToolReveal />
      </FadeIn>

      <FadeIn className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 lg:px-24" delay={0.1}>
        <div className="h-px bg-linear-to-r from-transparent via-slate-800/60 to-transparent" />
      </FadeIn>

      {/* ── Section 4 ── */}
      <FadeIn className="relative z-10">
        <HowItWorks />
      </FadeIn>

      <div className="relative z-10 h-20 bg-linear-to-b from-transparent to-[#030712] pointer-events-none" />
    </main>
  );
}