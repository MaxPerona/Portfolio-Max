export const site = {
  name: "Max Perona",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "perona.max01@gmail.com",
  socials: {
    github: "https://github.com/MaxPerona",
    linkedin: "https://www.linkedin.com/in/max-perona/",
  },
  /** Portrait shown in the hero. Put the file in public/ (e.g. "/max-perona.jpg", 4:5) and set the path. */
  photo: null as string | null,
  /** Public CV (without phone number / address). Set a path in public/ to show the download button. */
  cv: null as string | null,
  // Recruiter-first order: work before biography (see docs/README.md).
  sections: ["home", "projects", "experience", "skills", "about", "contact"] as const,
  marquee: ["Node.js", "TypeScript", "NestJS", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "BullMQ", "Docker", "Kubernetes", "Helm", "GitLab CI"],
} as const;

export type SectionId = (typeof site.sections)[number];
