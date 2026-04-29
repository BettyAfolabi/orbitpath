"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;          
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;       
  once?: boolean;          // only animate on first enter (default: true)
  className?: string;
}

const directionMap = {
  up:    { y: 1 },
  down:  { y: -1 },
  left:  { x: 1 },
  right: { x: -1 },
  none:  {},
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 24,
  once = true,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -60px 0px" });

  const axis = directionMap[direction];
  const initialTransform: { x?: number; y?: number } = {};
  if ("x" in axis) initialTransform.x = (axis.x as number) * distance;
  if ("y" in axis) initialTransform.y = (axis.y as number) * distance;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialTransform }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}