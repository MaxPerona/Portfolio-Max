/** Motion tokens — see docs/motion.md. Durations in seconds (Motion's unit). */
export const duration = { micro: 0.15, ui: 0.25, enter: 0.45, hero: 0.5 } as const;
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
export const stagger = { list: 0.06, words: 0.04 } as const;
export const distance = 24;
export const viewport = { once: true, amount: 0.2 } as const;
