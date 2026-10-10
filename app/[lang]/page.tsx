import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/footer";
import { ArrowDownRight, ArrowRight, ArrowUpRight, LinkedInIcon, MailIcon } from "@/components/icons";
import { KeepWords } from "@/components/keep-words";
import { MotionToggle } from "@/components/motion-toggle";
import { MediaReveal } from "@/components/motion/media-reveal";
import { Reveal, RevealGroup, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Parallax, ScrollRule } from "@/components/motion/scroll-motion";
import { NetworkCanvas } from "@/components/network-canvas";
import { ProjectCard } from "@/components/project-card";
import { Eyebrow, Section, Tag } from "@/components/section";
import { getDictionary, getEducation, getLab, getProjects, getRoles, getSkills } from "@/content";
import type { Dictionary } from "@/content/dictionaries";
import { hasLocale, type Locale } from "@/content/locales";
import { recommendations } from "@/content/recommendations";
import { site } from "@/content/site";
import type { Level } from "@/content/types";
import { beat, drift, stagger } from "@/lib/motion";

/** Fully prerendered; links prefetch the whole page. See note in app/[lang]/layout.tsx. */
export const instant = false;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <Hero t={t} />
      <About t={t} />
      <Projects t={t} lang={lang} />
      <Experience t={t} lang={lang} />
      <Skills t={t} lang={lang} />
      <Recommendations t={t} />
      <Contact t={t} lang={lang} />
    </>
  );
}

/**
 * Hero load sequence is CSS-driven (starts before hydration): greeting, heading lines, photo wipe,
 * then copy and actions one beat apart. Delays follow lib/motion.ts.
 */
function Hero({ t }: { t: Dictionary }) {
  const { portrait } = site.photos;
  const alt = portrait.placeholder ? "" : t.about.photo.alt;
  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate flex min-h-dvh items-end overflow-hidden px-4 pt-32 pb-16 sm:px-6 md:pb-20">
      <NetworkCanvas className="absolute inset-0 -z-10 size-full text-bright opacity-30 [mask-image:radial-gradient(ellipse_at_85%_15%,#000_5%,transparent_60%)] md:opacity-50 md:[mask-image:radial-gradient(ellipse_at_80%_30%,#000_10%,transparent_65%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="hero-in flex items-center gap-4">
            <Image src={portrait.src} alt={alt} width={56} height={56} priority className="size-14 rounded-full object-cover lg:hidden" />
            <p className="flex flex-col gap-1">
              <span className="text-[clamp(1.5rem,2.6vw,2rem)] font-light text-bright">{t.hero.greeting}</span>
              <span className="font-mono text-xs tracking-wide text-muted uppercase">{t.hero.role}</span>
            </p>
          </div>
          <h1 id="home-title" className="mt-8 max-w-4xl text-[clamp(2.4rem,5.4vw,4.75rem)] leading-[1.06]">
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
              <span className="hero-line" style={{ animationDelay: "120ms" }}>
                <KeepWords text={t.hero.lead} />{" "}
              </span>
            </span>
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
              <span className="hero-line text-muted" style={{ animationDelay: "180ms" }}>
                <KeepWords text={t.hero.rest} />
              </span>
            </span>
          </h1>
          <p className="hero-in mt-8 max-w-2xl text-lg text-medium" style={{ animationDelay: "380ms" }}>
            {t.hero.bio}
          </p>
          <p className="hero-in mt-6 inline-flex items-center gap-2 rounded-full border border-stroke px-3 py-1.5 text-sm text-medium" style={{ animationDelay: "440ms" }}>
            <span className="size-1.5 rounded-full bg-bright" aria-hidden="true" />
            {t.hero.availability}
          </p>
          <div className="hero-in mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "500ms" }}>
            <a href="#projects" className="group inline-flex items-center gap-4 rounded-full bg-control py-2 pr-2 pl-7 text-on-control transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97]">
              {t.hero.viewProjects}
              <span className="grid size-11 place-items-center rounded-full bg-on-control text-control transition-transform duration-150 ease-out-soft group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                <ArrowRight size={18} />
              </span>
            </a>
            <a href="#contact" className="inline-flex items-center rounded-full border border-stroke-strong px-7 py-2 text-bright transition-[border-color,transform] duration-150 hover:border-bright active:scale-[0.97]">
              {t.hero.getInTouch}
            </a>
            <span className="ml-1">
              <SocialLinks />
            </span>
          </div>
          <div className="hero-in mt-14 flex flex-wrap items-center gap-6" style={{ animationDelay: "580ms" }}>
            <a href="#about" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-bright">
              {t.hero.scroll} <ArrowDownRight size={16} />
            </a>
            <MotionToggle pauseLabel={t.nav.pauseMotion} resumeLabel={t.nav.resumeMotion} />
          </div>
        </div>
        {/* Photo: wipes open after the heading, then drifts and settles as you scroll away. */}
        <div className="hero-wipe relative hidden aspect-[4/5] w-[min(28vw,360px)] overflow-hidden rounded-card border border-stroke lg:block" style={{ animationDelay: "280ms" }}>
          <Parallax className="absolute inset-x-0 -top-[6%] h-[112%]" y={[0, drift.photo]} scale={[1.06, 1]} offset={["start start", "end start"]}>
            <Image src={portrait.src} alt={alt} fill priority sizes="360px" className="object-cover" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function About({ t }: { t: Dictionary }) {
  const a = t.about;
  const { workspace } = site.photos;
  return (
    <Section id="about" label={a.label} title={a.title} tone="panel">
      <RevealGroup className="max-w-3xl space-y-6 text-lg text-medium" gap={beat}>
        {a.paragraphs.map((p) => (
          <RevealItem as="p" key={p}>
            {p}
          </RevealItem>
        ))}
      </RevealGroup>

      <MediaReveal className="relative mt-14 aspect-[16/9] overflow-hidden rounded-card md:aspect-[21/9]">
        <Parallax className="absolute inset-x-0 -top-[6%] h-[112%]" scale={[1.06, 1]}>
          <Image src={workspace.src} alt={workspace.placeholder ? "" : a.photo.workspaceAlt} fill sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 75vw, 100vw" className="object-cover" />
        </Parallax>
      </MediaReveal>

      <RevealGroup as="ul" className="mt-6 grid gap-px overflow-hidden rounded-card border border-stroke bg-stroke sm:grid-cols-2" gap={stagger.cards}>
        {a.pillars.map((p, i) => (
          <RevealItem as="li" key={p.title} className="bg-base p-7 sm:p-9">
            <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-6 text-2xl">{p.title}</h3>
            <p className="mt-3 text-medium">{p.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="dl" className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-stroke bg-stroke md:grid-cols-4">
        {a.facts.map((f) => (
          <div key={f.label} className="flex flex-col-reverse gap-2 bg-base p-6 sm:p-8">
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="text-[clamp(2rem,3.4vw,2.75rem)] leading-none font-extralight text-bright">{f.value}</dd>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <Eyebrow>{a.languagesTitle}</Eyebrow>
        {a.languages.map((l) => (
          <p key={l.name} className="text-bright">
            {l.name} <span className="text-sm text-muted">· {l.level}</span>
          </p>
        ))}
      </Reveal>

      {site.cv ? (
        <Reveal className="mt-10">
          <a href={site.cv} download className="inline-flex items-center gap-2 rounded-full border border-stroke-strong px-6 py-3 text-bright transition-colors duration-150 hover:border-bright">
            {a.cv.label} <ArrowDownRight size={16} />
          </a>
        </Reveal>
      ) : null}
    </Section>
  );
}

function Recommendations({ t }: { t: Dictionary }) {
  if (recommendations.length === 0) return null;
  const r = t.recommendations;
  return (
    <Section id="recommendations" label={r.label} title={r.title}>
      <RevealGroup as="ul" className="grid gap-6 md:grid-cols-2">
        {recommendations.map((rec) => (
          <RevealItem as="li" key={rec.name} className="flex h-full flex-col justify-between gap-8 rounded-card border border-stroke p-7 sm:p-9">
            <blockquote className="text-xl leading-relaxed text-bright">&ldquo;{rec.quote}&rdquo;</blockquote>
            <p className="text-sm">
              {rec.url ? (
                <a href={rec.url} target="_blank" rel="noopener noreferrer" className="text-bright hover:underline">
                  {rec.name}
                </a>
              ) : (
                <span className="text-bright">{rec.name}</span>
              )}
              <span className="block text-muted">{rec.role}</span>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function Projects({ t, lang }: { t: Dictionary; lang: Locale }) {
  const p = t.projects;
  const projects = getProjects(lang);
  const lab = getLab(lang);
  return (
    <Section id="projects" label={p.label} title={p.title} intro={<p>{p.intro}</p>} overlap>
      <RevealGroup as="ul" className="grid gap-6 md:grid-cols-2" gap={stagger.cards}>
        {projects.map((project, i) => (
          <RevealItem as="li" key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
            {i % 2 === 1 ? (
              // The offset column drifts against the scroll so the grid reads as two layers.
              <Parallax className="h-full" y={[drift.column, -drift.column]} unit="px" minWidth={768}>
                <ProjectCard project={project} index={i} href={`/${lang}/projects/${project.slug}`} labels={p} />
              </Parallax>
            ) : (
              <ProjectCard project={project} index={i} href={`/${lang}/projects/${project.slug}`} labels={p} />
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-24">
        <Eyebrow>{p.labTitle}</Eyebrow>
        <RevealGroup as="ul" className="mt-6 border-t border-stroke">
          {lab.map((item) => (
            <RevealItem as="li" key={item.title} className="grid gap-3 border-b border-stroke py-8 md:grid-cols-[120px_1fr_1.4fr] md:gap-8">
              <span className="font-mono text-sm text-muted">{item.year}</span>
              <h3 className="text-2xl">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline hover:underline-offset-4">
                    {item.title} <ArrowUpRight size={18} />
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <div>
                <p className="text-medium">{item.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={p.stack}>
                  {item.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

const levelStyle: Record<Level, string> = {
  Daily: "bg-bright border-bright",
  Production: "bg-[linear-gradient(90deg,var(--color-bright)_50%,transparent_50%)] border-bright",
  Familiar: "bg-transparent border-stroke-strong",
};

function LevelDot({ level }: { level: Level }) {
  return <span aria-hidden="true" className={`size-2 shrink-0 rounded-full border ${levelStyle[level]}`} />;
}

function Skills({ t, lang }: { t: Dictionary; lang: Locale }) {
  const s = t.skills;
  const levels = Object.keys(s.levels) as Level[];
  return (
    <Section
      id="skills"
      label={s.label}
      title={s.title}
      intro={
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {levels.map((l) => (
            <span key={l} className="inline-flex items-center gap-2">
              <LevelDot level={l} />
              {s.levels[l]}
            </span>
          ))}
        </div>
      }
    >
      <RevealGroup className="grid gap-6 md:grid-cols-2" gap={stagger.cards}>
        {getSkills(lang).map((group) => (
          <RevealItem key={group.name} className="rounded-card border border-stroke p-7 sm:p-9">
            <Eyebrow>{group.name}</Eyebrow>
            <p className="mt-3 text-medium">{group.blurb}</p>
            <RevealStagger className="mt-8 flex flex-wrap gap-2" delay={beat}>
              {group.items.map((item) => (
                <RevealItem as="li" key={item.name} className="inline-flex items-center gap-2 rounded-tile bg-base-tint px-3.5 py-2 text-[15px] text-bright">
                  <LevelDot level={item.level} />
                  {item.name}
                  <span className="sr-only">({s.levels[item.level]})</span>
                </RevealItem>
              ))}
            </RevealStagger>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function Experience({ t, lang }: { t: Dictionary; lang: Locale }) {
  const e = t.experience;
  return (
    <Section id="experience" label={e.label} title={e.title}>
      <Eyebrow>{e.workTitle}</Eyebrow>
      <ScrollRule className="mt-6">
      <ol className="border-t border-stroke">
        {getRoles(lang).map((role) => (
          <RevealGroup as="li" key={`${role.company}-${role.period}`} className="grid gap-4 border-b border-stroke py-10 lg:grid-cols-[150px_1fr_1.3fr] lg:gap-10" gap={beat}>
            <RevealItem as="p" className="font-mono text-sm text-muted">{role.period}</RevealItem>
            <RevealItem>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{role.title}</h3>
              <p className="mt-2 text-medium">
                {role.company}
                {role.location ? <span className="text-muted"> · {role.location}</span> : null}
              </p>
            </RevealItem>
            <RevealItem>
              <ul className="space-y-3 text-medium">
                {role.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-stroke-strong" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {role.stack ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.projects.stack}>
                  {role.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </ul>
              ) : null}
            </RevealItem>
          </RevealGroup>
        ))}
      </ol>
      </ScrollRule>

      <Eyebrow className="mt-20">{e.educationTitle}</Eyebrow>
      <ol className="mt-6 border-t border-stroke">
        {getEducation(lang).map((ed) => (
          <Reveal as="li" key={ed.title} className="grid gap-4 border-b border-stroke py-10 lg:grid-cols-[150px_1fr_1.3fr] lg:gap-10">
            <p className="font-mono text-sm text-muted">{ed.period}</p>
            <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{ed.title}</h3>
            <p className="text-medium">{ed.school}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/** The form is shown only when email delivery is configured (see .env.example); otherwise, direct links. */
const contactFormEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

function Contact({ t, lang }: { t: Dictionary; lang: Locale }) {
  const c = t.contact;
  return (
    <Section id="contact" label={c.label} title={c.title} intro={<p>{c.intro}</p>}>
      <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
        {contactFormEnabled ? (
          <ContactForm email={site.email} lang={lang} t={c.form} />
        ) : (
          <div className="rounded-card border border-stroke bg-base-tint p-8 sm:p-10">
            <h3 className="text-2xl">{c.direct.title}</h3>
            <p className="mt-3 max-w-lg text-medium">{c.direct.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 rounded-full bg-control py-3 pr-6 pl-5 text-on-control transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97]">
                <MailIcon size={18} /> {c.direct.emailMe}
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-stroke-strong py-3 pr-6 pl-5 text-bright transition-[border-color,transform] duration-150 hover:border-bright active:scale-[0.97]">
                <LinkedInIcon size={16} /> {c.direct.linkedin}
              </a>
            </div>
          </div>
        )}
        <aside className="space-y-10">
          <div>
            <Eyebrow>{c.emailLabel}</Eyebrow>
            <a href={`mailto:${site.email}`} className="mt-3 inline-block text-xl break-all text-bright underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
          <div>
            <Eyebrow>{c.basedIn}</Eyebrow>
            <p className="mt-3 text-xl text-bright">{t.common.location}</p>
            <p className="mt-1 text-muted">{t.hero.availability}</p>
          </div>
          <div>
            <Eyebrow>{c.elsewhere}</Eyebrow>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </div>
          <a href="#projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-bright">
            {c.backToProjects} <ArrowUpRight size={16} />
          </a>
        </aside>
      </div>
    </Section>
  );
}
