import type { ReactNode } from "react";

import type { Title } from "@/content/types";
import { beat } from "@/lib/motion";
import { ArrowDownRight } from "./icons";
import { RevealItem, RevealScope } from "./motion/reveal";
import { RevealTitle } from "./motion/reveal-title";
import { RisingPanel } from "./motion/scroll-motion";

type SectionProps = {
  id: string;
  label: string;
  title?: Title;
  intro?: ReactNode;
  children: ReactNode;
  /** "panel": rounded panel in the opposite theme that rises over the previous section. */
  tone?: "default" | "panel";
  /** Rounded top edge that slides over the section above (use after a panel). */
  overlap?: boolean;
};

/** Two-column section shell: sticky label on the left, content on the right. */
export function Section({ id, label, title, intro, children, tone = "default", overlap = false }: SectionProps) {
  const inner = (
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[180px_1fr] lg:gap-16">
      <div>
        <p className="flex items-center gap-2 text-[15px] text-bright lg:sticky lg:top-28">
          {label}
          <ArrowDownRight size={18} />
        </p>
      </div>
      <div className="min-w-0">
        {title || intro ? (
          // One trigger for the header: title lines first, then the intro one beat later.
          <RevealScope>
            {title ? <RevealTitle id={`${id}-title`} title={title} className="max-w-4xl text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.04]" /> : null}
            {intro ? (
              <RevealItem className="mt-8 max-w-2xl text-lg text-medium" delay={title ? beat * 2 : 0}>
                {intro}
              </RevealItem>
            ) : null}
          </RevealScope>
        ) : null}
        <div className={title || intro ? "mt-16" : ""}>{children}</div>
      </div>
    </div>
  );
  const labelledBy = title ? `${id}-title` : undefined;
  if (tone === "panel") {
    return (
      <RisingPanel id={id} aria-labelledby={labelledBy} className="panel-invert relative z-10 rounded-t-[2rem] px-4 pt-24 pb-36 sm:px-6 md:rounded-t-[3rem] md:pt-32 md:pb-48">
        {inner}
      </RisingPanel>
    );
  }
  const overlapClass = overlap ? "relative z-20 -mt-16 rounded-t-[2rem] bg-base md:-mt-20 md:rounded-t-[3rem]" : "";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`px-4 py-24 sm:px-6 md:py-32 ${overlapClass}`}>
      {inner}
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
