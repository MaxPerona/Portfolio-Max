import type { FlowStep } from "@/content/types";
import { ArrowRight } from "./icons";
import { RevealGroup, RevealItem } from "./motion/reveal";

/** High-level architecture as a left-to-right flow; steps stagger in reading order. */
export function Flow({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <RevealGroup as="ol" label={label} className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0" gap={0.08}>
      {steps.map((step, i) => (
        <RevealItem as="li" key={step.label} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-center">
          <div className="flex-1 rounded-tile border border-stroke bg-base-tint px-4 py-4">
            <p className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 text-bright">{step.label}</p>
            {step.detail ? <p className="mt-1 text-sm text-muted">{step.detail}</p> : null}
          </div>
          {i < steps.length - 1 ? (
            <span className="grid place-items-center py-1 text-muted md:px-2 md:py-0" aria-hidden="true">
              <ArrowRight size={16} className="rotate-90 md:rotate-0" />
            </span>
          ) : null}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
