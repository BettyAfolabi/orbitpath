"use client";

import { motion } from "framer-motion";

const GOALS = [
  {
    value: "astronaut",
    label: "Become an Astronaut",
    description: "Train and qualify for spaceflight missions",
    icon: "🚀",
  },
  {
    value: "engineer",
    label: "Work as a Space Engineer",
    description: "Design rockets, satellites, or life-support systems",
    icon: "⚙️",
  },
  {
    value: "scientist",
    label: "Conduct Space Research",
    description: "Study planets, exoplanets, astrobiology, or astrophysics",
    icon: "🔭",
  },
  {
    value: "mission_ops",
    label: "Join Mission Operations",
    description: "Flight control, mission planning, ground systems",
    icon: "🛰️",
  },
  {
    value: "entrepreneur",
    label: "Build a Space Company",
    description: "Start or join a commercial space venture",
    icon: "🌐",
  },
  {
    value: "policy",
    label: "Shape Space Policy",
    description: "Work in government, law, or international space affairs",
    icon: "🏛️",
  },
];

type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export default function GoalsStep({ selected, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          What‘s your north star?
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          Pick the goal that resonates most. Your roadmap will be built around this.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GOALS.map((goal, i) => {
          const isSelected = selected === goal.value;
          return (
            <motion.button
              key={goal.value}
              onClick={() => onSelect(goal.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-violet-500/10 border-violet-500/60 shadow-[0_0_20px_rgba(167,139,250,0.08)]"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60"
              }`}
            >
              <div className="text-2xl mb-2">{goal.icon}</div>
              <div className={`font-medium text-sm ${isSelected ? "text-violet-300" : "text-slate-200"}`}>
                {goal.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">{goal.description}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}