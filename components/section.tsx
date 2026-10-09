import type { ReactNode } from "react";

import type { Title } from "@/content/types";
import { ArrowDownRight } from "./icons";
import { Reveal } from "./motion/reveal";
import { RevealTitle } from "./motion/reveal-title";

type SectionProps = {
  id: string;
  label: string;
  title?: Title;
  intro?: ReactNode;
  children: ReactNode;
};

/** Two-column section shell: sticky label on the left, content on the right. */
export function Section({ id, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined} className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[180px_1fr] lg:gap-16">
        <div>
          <p className="flex items-center gap-2 text-[15px] text-bright lg:sticky lg:top-28">
            {label}
            <ArrowDownRight size={18} />
          </p>
        </div>
        <div className="min-w-0">
          {title ? (
            <RevealTitle id={`${id}-title`} title={title} className="max-w-4xl text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.04]" />
          ) : null}
          {intro ? (
            <Reveal className="mt-8 max-w-2xl text-lg text-medium" delay={0.15}>
              {intro}
            </Reveal>
          ) : null}
          <div className={title || intro ? "mt-16" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow font-mono text-xs tracking-wide text-muted uppercase ${className}`}>{children}</p>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-stroke px-3 py-1 font-mono text-[11px] tracking-wide text-medium">{children}</li>
  );
}
