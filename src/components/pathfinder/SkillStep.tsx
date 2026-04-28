"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Engineering",
  "Mathematics",
  "Physics",
  "Biology / Life Sciences",
  "Computer Science",
  "Robotics",
  "Geology / Planetary Science",
  "Medicine",
  "Communication",
  "Project Management",
  "Data Analysis",
  "Electronics / Hardware",
];

type Props = {
  selected: string[];
  onToggle: (skill: string) => void;
};

export default function SkillsStep({ selected, onToggle }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          What are your strongest skills?
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          Select all that apply. Be honest — this shapes your roadmap.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {SKILLS.map((skill, i) => {
          const isSelected = selected.includes(skill);
          return (
            <motion.button
              key={skill}
              onClick={() => onToggle(skill)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                  : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
              }`}
            >
              {skill}
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-xs text-slate-500">
          {selected.length} selected
        </p>
      )}
    </div>
  );
}