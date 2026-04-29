"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

const rule = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number], delay: 0.1 },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-3 pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,180,255,0.08),transparent)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-xs tracking-[0.3em] uppercase text-cyan-400/70 mb-6 font-mono"
        >
          Artemis Mission Dashboard
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={rule}
          className="h-px w-24 mx-auto bg-cyan-500/30 mb-8"
        />

        {/* Headline */}
        <motion.h1
          variants={item}
          className="w-full font-display font-black text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight mb-6 text-center"
        >
          <span className="block text-slate-100">The Artemis program</span>
          <span className="block text-slate-100">is building the team</span>
          <span className="block text-amber-400">returning humanity</span>
          <span className="block text-amber-400">to the Moon.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Track the mission live. Meet the crew. Discover your path to space.
        </motion.p>

        {/* CTAs — z-20 ensures nothing overlaps them */}
        <motion.div
          variants={item}
          className="relative z-20 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#story"
            className="group px-8 py-3.5 rounded-full border border-white/20 text-white/80 text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Explore the mission
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </Link>
          <Link
            href="/pathfinder"
            className="group px-8 py-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm tracking-wide hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
          >
            Find your path →
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue — centered at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}
        />
      </motion.div>
    </section>
  );
}