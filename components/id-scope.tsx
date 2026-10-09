"use client";

import { useEffect, useRef } from "react";

/**
 * With Cache Components, Next keeps the previous route mounted but hidden (React <Activity>).
 * After a language switch that means two copies of the page — and two of every id (#skills,
 * #name…), so anchors, labels and aria references could point at the hidden copy.
 * Effects are cleaned up when Activity hides a subtree, so: park ids while hidden, restore when visible.
 */
export function IdScope() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-parked-id]").forEach((el) => {
      el.id = el.dataset.parkedId!;
      delete el.dataset.parkedId;
    });
    return () => {
      root.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
        el.dataset.parkedId = el.id;
        el.removeAttribute("id");
      });
    };
  }, []);
  return <span ref={ref} hidden />;
}
