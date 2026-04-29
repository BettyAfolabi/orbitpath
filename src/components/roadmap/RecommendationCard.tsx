import { Milestone } from "@/lib/generateRoadmap";

type Props = {
  milestone: Milestone;
  phaseIndex: number;
  milestoneIndex: number;
  roadmapId: string;
  onRate?: (milestoneId: string, rating: number) => void;
};

const RESOURCE_ICONS: Record<string, string> = {
  course: "▶",
  book: "📖",
  program: "🚀",
  community: "👥",
  certification: "🎓",
};

export default function RecommendationCard({
  milestone,
  phaseIndex,
  milestoneIndex,
}: Props) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/40 hover:bg-white/8">
      {/* Step number */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400 ring-1 ring-sky-500/30">
          {phaseIndex + 1}.{milestoneIndex + 1}
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-white/40">
          {milestone.timeframe}
        </span>
      </div>

      {/* Title + description */}
      <h4 className="mb-2 text-base font-semibold text-white">
        {milestone.title}
      </h4>
      <p className="mb-5 text-sm leading-relaxed text-white/60">
        {milestone.description}
      </p>

      {/* Resources */}
      {milestone.resources.length > 0 && (
        <div className="space-y-2">
          {milestone.resources.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70 transition-colors hover:bg-sky-500/10 hover:text-sky-300"
            >
              <span>{RESOURCE_ICONS[resource.type] ?? "🔗"}</span>
              <span className="flex-1 truncate">{resource.title}</span>
              <span className="shrink-0 text-white/30">↗</span>
            </a>
          ))}
        </div>
      )}

      {/* Day 6 labeling hook — placeholder */}
      <div className="mt-4 border-t border-white/5 pt-4">
        <p className="text-xs text-white/20">Rating coming Day 6</p>
      </div>
    </div>
  );
}