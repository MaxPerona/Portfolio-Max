import { getDictionary } from "./dictionaries";
import type { Locale } from "./locales";
import { educationBase, labBase, projectsBase, rolesBase, skillsBase } from "./shared";
import type { LabItem, Project, Role, SkillGroup } from "./types";

const span = (from: number | null, to: number | null, present: string) =>
  from === null ? "" : to === null ? `${from} — ${present}` : from === to ? `${from}` : `${from} — ${to}`;

export function getProjects(lang: Locale): Project[] {
  const t = getDictionary(lang);
  return projectsBase.map((p) => ({
    ...t.projects.items[p.slug],
    slug: p.slug,
    period: span(p.from, p.to, t.common.present),
    stack: [...p.stack],
    visibility: p.visibility,
  }));
}

export function getProject(lang: Locale, slug: string) {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getLab(lang: Locale): LabItem[] {
  const t = getDictionary(lang);
  return labBase.map((l) => ({ ...t.projects.lab[l.key], year: l.year, stack: [...l.stack], href: "href" in l ? l.href : undefined }));
}

export function getSkills(lang: Locale): SkillGroup[] {
  const t = getDictionary(lang);
  return skillsBase.map((g) => ({ ...t.skills.groups[g.key], items: g.items }));
}

export function getRoles(lang: Locale): Role[] {
  const t = getDictionary(lang);
  return rolesBase.map((r) => {
    const text = t.experience.roles[r.key];
    return {
      period: span(r.from, r.to, t.common.present),
      title: text.title,
      company: r.company,
      location: text.location || undefined,
      points: text.points,
      stack: "stack" in r ? [...r.stack] : undefined,
    };
  });
}

export function getEducation(lang: Locale) {
  const t = getDictionary(lang);
  return educationBase.map((e) => ({ period: span(e.from, e.to, t.common.present), title: t.experience.education[e.key].title, school: e.school }));
}

export { getDictionary };
