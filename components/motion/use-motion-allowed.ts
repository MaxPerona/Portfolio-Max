"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

/** The on-page pause control sets data-motion="paused" on <html> (see motion-toggle.tsx). */
function subscribePaused(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}

export function useMotionPaused() {
  return useSyncExternalStore(
    subscribePaused,
    () => document.documentElement.dataset.motion === "paused",
    () => false,
  );
}

/** Scroll-linked and pointer-driven motion runs only when the visitor has not opted out. */
export function useMotionAllowed() {
  const reduced = useReducedMotion();
  const paused = useMotionPaused();
  return !reduced && !paused;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
