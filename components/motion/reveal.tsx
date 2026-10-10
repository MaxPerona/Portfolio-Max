"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { intro } from "@/lib/intro";
import { distance, duration, ease, stagger, viewport } from "@/lib/motion";

/**
 * Item variant. A delay is set only when one is passed: a variant's own `delay` would override the
 * delay a parent's `staggerChildren` hands down.
 */
const item: Variants = {
  hidden: { opacity: 0, y: distance },
  show: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.enter, ease: ease.out, ...(delay === undefined ? {} : { delay }) },
  }),
};

type Tag = "div" | "li" | "section" | "article" | "p" | "ul" | "ol" | "dl";

/** Fades a block up once, when it enters the viewport. */
export function Reveal({ children, className, as = "div", delay = 0 }: { children: ReactNode; className?: string; as?: Tag; delay?: number }) {
  const M = motion[as];
  return (
    <M className={className} initial={intro.skip ? false : "hidden"} whileInView="show" viewport={viewport} variants={item} custom={delay}>
      {children}
    </M>
  );
}

/**
 * Trigger for a block: fires once when it enters the viewport and plays its children in order —
 * `gap` seconds apart, after `delay`. Children are <RevealItem>s or other variant-driven pieces.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  gap = stagger.list,
  delay = 0,
  label,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  label?: string;
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      aria-label={label}
      initial={intro.skip ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </M>
  );
}

/** A trigger whose children carry their own beat (`delay`) instead of a uniform stagger. */
export function RevealScope({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  return (
    <RevealGroup as={as} className={className} gap={0}>
      {children}
    </RevealGroup>
  );
}

/** Nested stagger that follows its parent's trigger (no trigger of its own). */
export function RevealStagger({
  children,
  className,
  as = "ul",
  gap = stagger.chips,
  delay = 0,
  label,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  label?: string;
}) {
  const M = motion[as];
  return (
    <M className={className} aria-label={label} variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}>
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div", delay }: { children: ReactNode; className?: string; as?: Tag; delay?: number }) {
  const M = motion[as];
  return (
    <M className={className} variants={item} custom={delay}>
      {children}
    </M>
  );
}
