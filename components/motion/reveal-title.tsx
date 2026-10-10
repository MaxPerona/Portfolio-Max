"use client";

import { motion } from "motion/react";

import type { Title } from "@/content/types";
import { duration, ease, stagger } from "@/lib/motion";
import { KeepWords } from "../keep-words";

/**
 * Section heading in two lines — `lead`, then `rest` in a quieter tone — each rising out of its own
 * mask. Driven by the parent trigger (<RevealScope> in <Section>).
 */
export function RevealTitle({ title, id, className }: { title: Title; id?: string; className?: string }) {
  const lines = [
    { text: title.lead, muted: false },
    { text: title.rest, muted: true },
  ];
  return (
    <motion.h2 id={id} className={className} variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.lines } } }}>
      {lines.map(({ text, muted }, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className={`block ${muted ? "text-muted" : ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: duration.line, ease: ease.line } },
            }}
          >
            <KeepWords text={text} />
            {i === 0 ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
