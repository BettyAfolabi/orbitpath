"use client";

import { motion } from "framer-motion";

const EDUCATION_LEVELS = [
  {
    value: "high_school",
    label: "High School",
    description: "Currently enrolled or recently graduated",
  },
  {
    value: "undergraduate",
    label: "Undergraduate",
    description: "Working toward a bachelor's degree",
  },
  {
    value: "graduate",
    label: "Graduate",
    description: "Master's or PhD student or candidate",
  },
  {
    value: "early_career",
    label: "Early Career",
    description: "Graduated and in the first 1–3 years of work",
  },
  {
    value: "career_changer",
    label: "Career Changer",
    description: "Experienced professional pivoting to space",
  },
];

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export default function EducationStep({ selected, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Where are you in your journey?
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          This helps us recommend programs and timelines that are actually reachable.
        </p>
      </div>

      <div className="space-y-2.5">
        {EDUCATION_LEVELS.map((level, i) => {
          const isSelected = selected === level.value;
          return (
            <motion.button
              key={level.value}
              onClick={() => onSelect(level.value)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? "bg-sky-500/10 border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.08)]"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60"
              }`}
            >
              <div>
                <div className={`font-medium text-sm ${isSelected ? "text-sky-300" : "text-slate-200"}`}>
                  {level.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{level.description}</div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 shrink-0 ml-4 transition-all duration-200 ${
                  isSelected ? "border-sky-400 bg-sky-400" : "border-slate-600"
                }`}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}