"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";

import { drift } from "@/lib/motion";
import { useMediaQuery, useMotionAllowed } from "./use-motion-allowed";

type Offset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>;

/**
 * Scroll-linked drift: moves (and optionally settles the scale of) its content while it crosses the
 * viewport. Off under reduced motion, when motion is paused, and below `minWidth`.
 * For photos, make this element taller than its overflow-hidden frame (e.g. -top-[6%] h-[112%]).
 */
export function Parallax({
  children,
  className,
  y = [-drift.photo, drift.photo],
  unit = "%",
  scale,
  offset = ["start end", "end start"],
  minWidth,
}: {
  children: ReactNode;
  className?: string;
  y?: [number, number];
  unit?: "%" | "px";
  scale?: [number, number];
  offset?: Offset;
  minWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const ty = useTransform(scrollYProgress, [0, 1], [`${y[0]}${unit}`, `${y[1]}${unit}`]);
  const ts = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);
  const allowed = useMotionAllowed();
  const wide = useMediaQuery(minWidth ? `(min-width: ${minWidth}px)` : "all");
  const on = allowed && (minWidth ? wide : true);
  return (
    <motion.div ref={ref} className={className} style={on ? { y: ty, scale: ts } : { y: 0, scale: 1 }}>
      {children}
    </motion.div>
  );
}

/** Section that rises a few pixels into place as it enters (rounded panel over the previous one). */
export function RisingPanel({ children, ...rest }: Omit<ComponentProps<typeof motion.section>, "style" | "ref">) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const y = useTransform(scrollYProgress, [0, 1], [drift.panel, 0]);
  const allowed = useMotionAllowed();
  return (
    <motion.section ref={ref} {...rest} style={{ y: allowed ? y : 0 }}>
      {children}
    </motion.section>
  );
}

/** A thin rule beside a list that draws downwards as the list scrolls through (desktop only). */
export function ScrollRule({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const allowed = useMotionAllowed();
  return (
    <div ref={ref} className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 -left-8 hidden w-px bg-stroke lg:block" />
      <motion.span aria-hidden="true" className="absolute inset-y-0 -left-8 hidden w-px origin-top bg-bright lg:block" style={{ scaleY: allowed ? scrollYProgress : 1 }} />
      {children}
    </div>
  );
}

/** Follows the pointer by a few pixels while it moves over the enclosing card (fine pointers only). */
export function HoverDepth({ children, className, range = 6 }: { children: ReactNode; className?: string; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 160, damping: 22, mass: 0.4 });
  const y = useSpring(0, { stiffness: 160, damping: 22, mass: 0.4 });
  const allowed = useMotionAllowed();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  useEffect(() => {
    const card = ref.current?.closest("article");
    if (!card || !allowed || !fine) return;
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * range);
      y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * range);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      leave();
    };
  }, [allowed, fine, range, x, y]);
  return (
    <motion.div ref={ref} className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
