import type { MetadataRoute } from "next";

import { locales } from "@/content/locales";
import { projectsBase } from "@/content/shared";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = (path: string) => ({ languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) });
  return locales.flatMap((lang) => [
    { url: `${site.url}/${lang}`, changeFrequency: "monthly" as const, priority: 1, alternates: alternates("") },
    ...projectsBase.map((p) => ({
      url: `${site.url}/${lang}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: alternates(`/projects/${p.slug}`),
    })),
  ]);
}
