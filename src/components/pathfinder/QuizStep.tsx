"use client";

import { AnimatePresence, motion } from "framer-motion";

interface QuizStepProps {
  stepKey: string | number;  
  direction: 1 | -1;         // 1 = forward, -1 = backward
  children: React.ReactNode;
  className?: string;
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
    filter: "blur(3px)",
    transition: {
      duration: 0.28,
      ease: [0.55, 0, 1, 0.45] as [number, number, number, number]
    },
  }),
};

export default function QuizStep({
  stepKey,
  direction,
  children,
  className = "",
}: QuizStepProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={stepKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}