import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Flow } from "@/components/flow";
import { ArrowLeft, ArrowRight, LockIcon } from "@/components/icons";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, Tag } from "@/components/section";
import { getDictionary, getProject, getProjects } from "@/content";
import { hasLocale, locales } from "@/content/locales";
import { projectsBase } from "@/content/shared";

/** Fully prerendered; links prefetch the whole page. See note in app/[lang]/layout.tsx. */
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projectsBase.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(lang, slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/projects/${slug}`])),
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(lang, slug);
  if (!project) notFound();

  const t = getDictionary(lang).caseStudy;
  const projects = getProjects(lang);
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const meta = [
    { label: t.type, value: project.category },
    { label: t.period, value: project.period },
    { label: t.role, value: project.role },
    { label: t.context, value: project.context },
  ];

  return (
    <article className="px-4 pt-36 pb-24 sm:px-6">
      <ReadingProgress label={t.progress} />
      <div className="mx-auto max-w-5xl">
        <Link href={`/${lang}#projects`} prefetch={true} className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-bright">
          <ArrowLeft size={16} className="transition-transform duration-150 ease-out-soft group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0" /> {t.all}
        </Link>

        <p className="hero-in mt-12 font-mono text-xs text-muted">
          {t.counter} {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
        <h1 className="hero-in mt-4 text-[clamp(2.75rem,7vw,5.5rem)] leading-[1]" style={{ animationDelay: "80ms" }}>
          {project.title}
        </h1>
        <p className="hero-in mt-8 max-w-3xl text-xl text-medium" style={{ animationDelay: "160ms" }}>
          {project.summary}
        </p>

        <dl className="hero-in mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-tile border border-stroke bg-stroke md:grid-cols-4" style={{ animationDelay: "240ms" }}>
          {meta.map((m) => (
            <div key={m.label} className="bg-base p-5">
              <dt className="text-xs text-muted">{m.label}</dt>
              <dd className="mt-1 text-bright">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.visibility === "private" ? (
          <p className="mt-6 inline-flex items-start gap-2 text-sm text-muted">
            <LockIcon size={16} className="mt-0.5 shrink-0" />
            {t.privateNote}
          </p>
        ) : null}

        <Reveal as="section" className="mt-24 grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <h2 className="text-2xl">{t.challenge}</h2>
          <p className="text-lg text-medium">{project.challenge}</p>
        </Reveal>

        <section className="mt-20 grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <Reveal>
            <h2 className="text-2xl">{t.engineering}</h2>
          </Reveal>
          <RevealGroup as="ol" className="border-t border-stroke">
            {project.engineering.map((e, i) => (
              <RevealItem as="li" key={e.title} className="grid gap-2 border-b border-stroke py-7 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl">{e.title}</h3>
                  <p className="mt-2 text-medium">{e.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section className="mt-20">
          <Eyebrow>{t.architecture}</Eyebrow>
          <div className="mt-6">
            <Flow steps={project.flow} label={t.architecture} />
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <Reveal>
            <h2 className="text-2xl">{t.tradeoffs}</h2>
          </Reveal>
          <RevealGroup as="ul" className="border-t border-stroke">
            {project.tradeoffs.map((x) => (
              <RevealItem as="li" key={x} className="border-b border-stroke py-6 text-medium">
                {x}
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <Reveal as="section" className="mt-20 grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <h2 className="text-2xl">{t.learned}</h2>
          <p className="text-xl leading-relaxed text-bright">{project.learned}</p>
        </Reveal>

        <section className="mt-20 grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow>{t.outcomes}</Eyebrow>
            <ul className="mt-6 space-y-4 text-lg text-medium">
              {project.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-[0.75em] h-px w-3 shrink-0 bg-stroke-strong" aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <Eyebrow>{t.stack}</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </ul>
          </Reveal>
        </section>

        <nav aria-label={t.next} className="mt-28 border-t border-stroke pt-10">
          <Link href={`/${lang}/projects/${next.slug}`} prefetch={true} className="group flex items-end justify-between gap-6">
            <span>
              <span className="block text-sm text-muted">{t.next}</span>
              <span className="mt-2 block text-[clamp(1.75rem,4vw,3rem)] leading-tight font-light text-bright">{next.title}</span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-stroke text-bright transition-colors duration-150 group-hover:bg-control group-hover:text-on-control">
              <ArrowRight size={20} className="transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5" />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
