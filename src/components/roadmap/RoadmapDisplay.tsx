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

        {/* Career track badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          <span className="text-sm font-medium text-sky-300">
            {roadmap.career_track}
          </span>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-16">
        {roadmap.phases.map((phase, phaseIndex) => {
          const accent = PHASE_ACCENTS[phaseIndex % PHASE_ACCENTS.length];
          return (
            <div key={phase.id}>
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
              <div className="grid gap-4 sm:grid-cols-2">
                {phase.milestones.map((milestone, milestoneIndex) => (
                  <RecommendationCard
                    key={milestone.id}
                    milestone={milestone}
                    phaseIndex={phaseIndex}
                    milestoneIndex={milestoneIndex}
                    roadmapId={roadmapId}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Programs */}
      <ProgramsList programs={roadmap.recommended_programs} />

      {/* Encouragement */}
      <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-8 text-center">
        <p className="text-lg font-medium italic text-white/80">
          &ldquo;{roadmap.encouragement}&rdquo;
        </p>
      </div>
    </div>
  );
}