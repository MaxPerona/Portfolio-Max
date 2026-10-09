import Link from "next/link";

import type { Project } from "@/content/types";
import { ArrowUpRight, LockIcon } from "./icons";
import { Tag } from "./section";

const glyphs = ["◇", "≋", "⇄", "⎈"];

type Labels = { private: string; caseStudy: string; liveDemo: string; source: string; stack: string };

export function ProjectCard({ project, index, href, labels }: { project: Project; index: number; href: string; labels: Labels }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-stroke bg-base-tint p-7 transition-[transform,border-color] duration-150 ease-out-soft hover:-translate-y-1 hover:border-stroke-strong motion-reduce:hover:translate-y-0 sm:p-9">
      <div className="flex items-start justify-between gap-6">
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </span>
        <span aria-hidden="true" className="text-4xl leading-none font-extralight text-muted transition-transform duration-700 ease-out-soft group-hover:rotate-12 motion-reduce:group-hover:rotate-0">
          {glyphs[index % glyphs.length]}
        </span>
      </div>

      <h3 className="mt-14 text-[clamp(1.75rem,3vw,2.25rem)] leading-tight">
        <Link href={href} prefetch={true} className="after:absolute after:inset-0 after:content-['']">
          {project.title}
        </Link>
      </h3>
      <p className="mt-4 text-medium">{project.summary}</p>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label={labels.stack}>
        {project.stack.slice(0, 6).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10 text-sm">
        {project.visibility === "private" ? (
          <span className="inline-flex items-center gap-2 text-muted">
            <LockIcon size={16} /> {labels.private}
          </span>
        ) : (
          <span className="flex gap-4">
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="relative z-10 text-bright underline-offset-4 hover:underline">
                {labels.liveDemo}
              </a>
            ) : null}
            {project.repo ? (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="relative z-10 text-bright underline-offset-4 hover:underline">
                {labels.source}
              </a>
            ) : null}
          </span>
        )}
        <span className="inline-flex items-center gap-2 text-bright">
          {labels.caseStudy}
          <span className="grid size-9 place-items-center rounded-full border border-stroke transition-colors duration-150 group-hover:bg-control group-hover:text-on-control">
            <ArrowUpRight size={16} />
          </span>
        </span>
      </div>
    </article>
  );
}
