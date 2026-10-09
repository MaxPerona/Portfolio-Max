"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { intro } from "@/lib/intro";
import { distance, duration, ease, stagger, viewport } from "@/lib/motion";

const item: Variants = {
  hidden: { opacity: 0, y: distance },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out, delay } }),
};

type Tag = "div" | "li" | "section" | "article" | "p" | "ul" | "ol" | "dl";

/** Fades a block up once, when it enters the viewport. */
export function Reveal({ children, className, as = "div", delay = 0 }: { children: ReactNode; className?: string; as?: Tag; delay?: number }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={intro.skip ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={item}
      custom={delay}
    >
      {children}
    </M>
  );
}

/** Container that staggers its <RevealItem> children in reading order. */
export function RevealGroup({ children, className, as = "div", gap = stagger.list, label }: { children: ReactNode; className?: string; as?: Tag; gap?: number; label?: string }) {
  const M = motion[as];
  return (
    <M
      className={className}
      aria-label={label}
      initial={intro.skip ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const M = motion[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
