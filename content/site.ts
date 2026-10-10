export type Photo = { src: string; width: number; height: number; placeholder: boolean };

export const site = {
  name: "Max Perona",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "perona.max01@gmail.com",
  socials: {
    github: "https://github.com/MaxPerona",
    linkedin: "https://www.linkedin.com/in/max-perona/",
  },
  /**
   * Photos. The placeholders are generated abstract images (no real person). To use your own,
   * put the file in public/images/, set `src`, `width`, `height` and `placeholder: false`.
   * portrait: hero, 4:5 · workspace: About panel, wide (16:9 or wider).
   */
  photos: {
    portrait: { src: "/images/placeholder-portrait.webp", width: 1200, height: 1500, placeholder: true },
    workspace: { src: "/images/placeholder-workspace.webp", width: 2400, height: 1350, placeholder: true },
  } as { portrait: Photo; workspace: Photo },
  /** Public CV (without phone number / address). Set a path in public/ to show the download button. */
  cv: null as string | null,
  // Meet the person first, then the work (decided Oct 2026, see the motion study).
  sections: ["home", "about", "projects", "experience", "skills", "contact"] as const,
} as const;

export type SectionId = (typeof site.sections)[number];
