/**
 * Motion tokens — see docs/motion.md. Durations in seconds (Motion's unit).
 *
 * Choreography (inspired by quakerschool.org, "brisk" preset): a block fires once when its top
 * crosses 90% of the viewport, then its parts play in beats — heading lines, media, copy,
 * actions — `beat` seconds apart. Entrances stay within ~500 ms each.
 */
type Bezier = [number, number, number, number];

export const duration = { micro: 0.15, ui: 0.25, enter: 0.45, hero: 0.5, line: 0.5, wipe: 0.5 } as const;
export const ease = {
  out: [0.22, 1, 0.36, 1] as Bezier,
  inOut: [0.65, 0, 0.35, 1] as Bezier,
  /** Slow start, long tail: image wipes. */
  reveal: [0.65, 0.05, 0, 1] as Bezier,
  /** Heading lines rising out of their mask. */
  line: [0.43, 0.195, 0.02, 1] as Bezier,
};
export const stagger = { list: 0.06, words: 0.04, lines: 0.06, cards: 0.08, chips: 0.02 } as const;
/** Gap between beats inside one block. */
export const beat = 0.1;
export const distance = 24;
/** A block counts as visible once it has passed the line 10% above the bottom of the viewport. */
export const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;
/** Scroll-linked ranges: photo drift (% of its frame), offset column (px), rising panel (px). */
export const drift = { photo: 5, column: 32, panel: 48 } as const;
