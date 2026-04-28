"use client";

import { motion } from "framer-motion";

const INTERESTS = [
  "Human Spaceflight",
  "Satellite Technology",
  "Mars Exploration",
  "Lunar Missions",
  "Space Telescopes",
  "Rocket Propulsion",
  "Space Medicine",
  "Astrobiology",
  "Space Policy & Law",
  "Commercial Space",
  "Space Habitats",
  "Earth Observation",
  "Deep Space Science",
  "Space Education",
];

type Props = {
  selected: string[];
  onToggle: (interest: string) => void;
};

export default function InterestsStep({ selected, onToggle }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Which areas excite you most?
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          Pick as many as you like. Your interests guide where we point you.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {INTERESTS.map((interest, i) => {
          const isSelected = selected.includes(interest);
          return (
            <motion.button
              key={interest}
              onClick={() => onToggle(interest)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035, duration: 0.25 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-violet-500/20 border-violet-400 text-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.15)]"
                  : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
              }`}
            >
              {interest}
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