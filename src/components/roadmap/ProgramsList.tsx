import { RecommendedProgram } from "@/lib/generateRoadmap";

type Props = {
  programs: RecommendedProgram[];
};

export default function ProgramsList({ programs }: Props) {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Recommended Programs</h2>
        <p className="mt-1 text-sm text-white/50">
          Opportunities specifically matched to your profile
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, i) => (
          <a
            key={i}
            href={program.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-white/8"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
                  {program.organization}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  {program.name}
                </h3>
              </div>
              <span className="shrink-0 text-white/20 transition-colors group-hover:text-violet-400">
                ↗
              </span>
            </div>

            <p className="flex-1 text-xs leading-relaxed text-white/50">
              {program.description}
            </p>

            {program.deadline && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-white/30">
                <span>⏰</span>
                <span>{program.deadline}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}