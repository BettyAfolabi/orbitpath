"use client";
import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
  labels?: string[];
};

const defaultLabels = ["Skills", "Interests", "Education", "Goals"];

export default function ProgressBar({ current, total, labels = defaultLabels }: Props) {
  const percent = (current / (total - 1)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                backgroundColor:
                  i < current ? "rgb(56 189 248)" : i === current ? "rgb(255 255 255)" : "rgb(30 41 59)",
                borderColor: i <= current ? "rgb(56 189 248)" : "rgb(51 65 85)",
                color:
                  i < current ? "rgb(12 74 110)" : i === current ? "rgb(15 23 42)" : "rgb(100 116 139)",
                transform: i === current ? "scale(1.15)" : "scale(1)",
              }}
            >
              {i < current ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${
                i === current ? "text-sky-400" : i < current ? "text-sky-600" : "text-slate-600"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Track */}
      <div className="relative h-px bg-slate-800 mt-1">
        <motion.div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-sky-500 to-sky-300"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}