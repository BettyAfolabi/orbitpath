"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  stepKey: string | number;
  direction: 1 | -1;
  children: React.ReactNode;
};

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60px" : "-60px",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60px" : "60px",
    opacity: 0,
  }),
};

export default function QuizStep({ stepKey, direction, children }: Props) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}