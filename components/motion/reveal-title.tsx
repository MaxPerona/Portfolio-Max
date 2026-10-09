"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

import type { Title } from "@/content/types";
import { intro } from "@/lib/intro";
import { duration, ease, stagger, viewport } from "@/lib/motion";

/** Section heading: words rise out of a mask, once, when the heading enters the viewport. */
export function RevealTitle({ title, id, className }: { title: Title; id?: string; className?: string }) {
  const words = [
    ...title.lead.split(" ").map((w) => ({ w, muted: false })),
    ...title.rest.split(" ").map((w) => ({ w, muted: true })),
  ];
  return (
    <motion.h2
      id={id}
      className={className}
      initial={intro.skip ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.words } } }}
      aria-label={`${title.lead} ${title.rest}`}
    >
      {words.map(({ w, muted }, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${muted ? "text-muted" : ""}`}
              variants={{
                hidden: { y: "105%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: duration.enter, ease: ease.out } },
              }}
            >
              {w}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.h2>
  );
}
