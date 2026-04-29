"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LOADING_STAGES = [
  { label: "Analysing your profile…", duration: 1400 },
  { label: "Mapping career trajectories…", duration: 1600 },
  { label: "Consulting mission data…", duration: 1200 },
  { label: "Building your roadmap…", duration: 1000 },
];

interface RoadmapLoadingScreenProps {
  isVisible: boolean;
}

export default function RoadmapLoadingScreen({
  isVisible,
}: RoadmapLoadingScreenProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    LOADING_STAGES.forEach((stage, i) => {
      const t = setTimeout(() => {
        setStageIndex(i);
      }, elapsed);
      timeouts.push(t);
      elapsed += stage.duration;
    });

    // Animate progress bar
    const totalDuration = LOADING_STAGES.reduce((s, st) => s + st.duration, 0);
    const interval = 80;
    let tick = 0;
    const progressInterval = setInterval(() => {
      tick += interval;
      setProgress(Math.min((tick / totalDuration) * 100, 95)); // cap at 95 — real completion resets
    }, interval);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="roadmap-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center px-6"
        >
          {/* Orbital ring animation */}
          <div className="relative w-32 h-32 mb-10">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle ring with dot */}
            <motion.div
              className="absolute inset-3 rounded-full border border-cyan-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            >
              {/* Orbiting dot */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.5)]" />
            </motion.div>
            {/* Inner ring */}
            <motion.div
              className="absolute inset-6 rounded-full border border-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-white/80"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Stage label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-white/70 text-sm font-mono tracking-wide mb-8 text-center"
            >
              {LOADING_STAGES[stageIndex]?.label}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-64 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-cyan-500 to-cyan-300"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>

          {/* Stage dots */}
          <div className="flex gap-3 mt-6">
            {LOADING_STAGES.map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i <= stageIndex ? "bg-cyan-400" : "bg-white/15"
                }`}
                animate={i === stageIndex ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}