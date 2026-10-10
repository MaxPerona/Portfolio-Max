"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { intro } from "@/lib/intro";
import { duration, ease, viewport } from "@/lib/motion";

/**
 * Photo / visual that opens with a bottom-up wipe (clip-path), once.
 * `standalone` (default) has its own viewport trigger; otherwise it follows the parent trigger,
 * e.g. inside a staggered card.
 */
export function MediaReveal({
  children,
  className,
  delay,
  standalone = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  standalone?: boolean;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: reduced ? { duration: 0 } : { duration: duration.wipe, ease: ease.reveal, ...(delay === undefined ? {} : { delay }) },
    },
  };
  if (!standalone) {
    return (
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div className={className} initial={intro.skip ? false : "hidden"} whileInView="show" viewport={viewport} variants={variants}>
      {children}
    </motion.div>
  );
}
