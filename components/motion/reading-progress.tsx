"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin bar under the header that tracks how far through a case study the reader is. */
export function ReadingProgress({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      role="presentation"
      aria-label={label}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-bright"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
