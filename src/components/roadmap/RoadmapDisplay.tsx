"use client"; 

import { motion } from "framer-motion";
import { Roadmap } from "@/lib/generateRoadmap";
import RecommendationCard from "./RecommendationCard";
import ProgramsList from "./ProgramsList";

type Props = {
  roadmap: Roadmap;
  roadmapId: string;
};

const PHASE_ACCENTS = [
  { border: "border-sky-500/30", dot: "bg-sky-400", label: "text-sky-400" },
  { border: "border-violet-500/30", dot: "bg-violet-400", label: "text-violet-400" },
  { border: "border-emerald-500/30", dot: "bg-emerald-400", label: "text-emerald-400" },
];

export default function RoadmapDisplay({ roadmap, roadmapId }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-sky-400">
          Your Space Career Roadmap
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {roadmap.headline}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/60">
          {roadmap.summary}
        </p>

        {/* Career track reveal */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-white/30">
            Your career destination
          </p>
          <div className="relative flex items-center justify-center">
            {/* Glow behind */}
            <div className="absolute h-16 w-72 rounded-full bg-sky-500/20 blur-2xl" />
            {/* Main pill */}
            <div className="relative rounded-2xl border border-sky-400/40 bg-linear-to-br from-sky-500/20 to-violet-500/10 px-8 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {roadmap.career_track}
              </p>
            </div>
          </div>
          {/* Connector line down to phases */}
          <div className="mt-2 h-8 w-px bg-linear-to-b from-sky-400/40 to-transparent" />
          <p className="text-sm text-white/30">Here‘s how to get there</p>
          <div className="h-6 w-px bg-linear-to-b from-white/10 to-transparent" />
        </div>
      </div>

      {/* Phases */}
      <motion.div
        className="space-y-16"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
        }}
      >
        {roadmap.phases.map((phase, phaseIndex) => {
          const accent = PHASE_ACCENTS[phaseIndex % PHASE_ACCENTS.length]; 
          return (
            <motion.div
              key={phase.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.55,
                    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
                  },
                },
              }}
            >
              {/* Phase header */}
              <div
                className={`mb-6 flex items-center gap-4 border-l-2 pl-4 ${accent.border}`}
              >
                <div>
                  <p
                    className={`text-xs font-medium uppercase tracking-widest ${accent.label}`}
                  >
                    Phase {phaseIndex + 1}
                  </p>
                  <h2 className="text-xl font-bold text-white">{phase.title}</h2>
                  <p className="mt-1 text-sm text-white/50">{phase.summary}</p>
                </div>
              </div>

              {/* Milestone cards */}
              <motion.div
                className="grid gap-4 sm:grid-cols-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {phase.milestones.map((milestone, milestoneIndex) => (
                  <motion.div
                    key={milestone.id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                  >
                    <RecommendationCard
                      key={milestone.id}
                      milestone={milestone}
                      phaseIndex={phaseIndex}
                      milestoneIndex={milestoneIndex}
                      roadmapId={roadmapId}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          );  
          })}
        </motion.div>

      {/* Recommended Programs */}
      <ProgramsList programs={roadmap.recommended_programs} />

      {/* Encouragement */}
      <div className="mt-16 mb-8 rounded-2xl border border-white/10 bg-linear-to-br from-sky-500/10 to-violet-500/10 p-8 text-center">
        <p className="text-lg font-medium italic text-white/80">
          &ldquo;{roadmap.encouragement}&rdquo;
        </p>
      </div>
    </div>
  );
}