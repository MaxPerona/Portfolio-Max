import type { Level } from "./types";

/** Language-independent data. Text lives in dictionaries/<locale>.ts, keyed by the ids below. */

export const projectsBase = [
  { slug: "apis-and-platforms", from: 2025, to: null, visibility: "private", stack: ["NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Prisma", "BullMQ", "OpenAPI", "Vitest"] },
  { slug: "real-time-data", from: 2025, to: null, visibility: "private", stack: ["Debezium", "Maxwell", "MongoDB Change Streams", "RabbitMQ", "NestJS", "PostgreSQL", "DragonflyDB"] },
  { slug: "integrations-and-automation", from: 2024, to: 2025, visibility: "private", stack: ["Laravel", "Node.js", "Python", "REST APIs", "Webhooks", "Zapier", "Make", "Notion"] },
  { slug: "client-web-apps", from: 2022, to: 2024, visibility: "private", stack: ["Laravel", "PHP", "Node.js", "React", "MariaDB", "Docker", "GitHub Actions"] },
] as const satisfies readonly { slug: string; from: number; to: number | null; visibility: "private" | "public"; stack: readonly string[]; repo?: string; demo?: string }[];

export type ProjectSlug = (typeof projectsBase)[number]["slug"];

export const labBase = [
  { key: "hazard", year: "2026", stack: ["NestJS", "Prisma", "PostgreSQL", "RabbitMQ", "Docker"] },
  { key: "socketio", year: "2026", stack: ["TypeScript", "Socket.IO", "PostgreSQL"] },
  { key: "portfolio", year: "2026", stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion"], href: "https://github.com/MaxPerona/Portfolio-Max" },
] as const;

export type LabKey = (typeof labBase)[number]["key"];

export type SkillKey = "build" | "data" | "deliver" | "quality" | "observe" | "frontend";

/** Grouped by stage of the software lifecycle. */
export const skillsBase: { key: SkillKey; items: { name: string; level: Level }[] }[] = [
  {
    key: "build",
    items: [
      { name: "TypeScript", level: "Daily" },
      { name: "Node.js", level: "Daily" },
      { name: "NestJS", level: "Daily" },
      { name: "REST · OpenAPI", level: "Daily" },
      { name: "AsyncAPI", level: "Daily" },
      { name: "Microservices", level: "Daily" },
      { name: "PHP · Laravel", level: "Production" },
      { name: "Express", level: "Production" },
      { name: "Python", level: "Production" },
      { name: "Agile · Scrum", level: "Daily" },
      { name: "Jira · Confluence", level: "Daily" },
      { name: "Technical docs", level: "Daily" },
    ],
  },
  {
    key: "data",
    items: [
      { name: "PostgreSQL", level: "Daily" },
      { name: "MongoDB", level: "Daily" },
      { name: "MySQL · MariaDB", level: "Daily" },
      { name: "Prisma · Kysely", level: "Daily" },
      { name: "Redis", level: "Daily" },
      { name: "RabbitMQ", level: "Daily" },
      { name: "BullMQ", level: "Daily" },
      { name: "Debezium · Maxwell", level: "Daily" },
    ],
  },
  {
    key: "deliver",
    items: [
      { name: "Git · GitHub · GitLab", level: "Daily" },
      { name: "GitLab CI/CD", level: "Daily" },
      { name: "Docker", level: "Daily" },
      { name: "Kubernetes", level: "Daily" },
      { name: "Helm · GitOps", level: "Daily" },
      { name: "GitHub Actions", level: "Production" },
      { name: "Jenkins", level: "Production" },
      { name: "NGINX · Apache", level: "Production" },
      { name: "Linux", level: "Production" },
      { name: "AWS · Azure", level: "Production" },
    ],
  },
  {
    key: "quality",
    items: [
      { name: "Vitest · Jest", level: "Daily" },
      { name: "TDD", level: "Daily" },
      { name: "e2e tests", level: "Daily" },
      { name: "CI quality gates", level: "Daily" },
      { name: "Code review", level: "Daily" },
    ],
  },
  {
    key: "observe",
    items: [
      { name: "OpenTelemetry", level: "Daily" },
      { name: "Prometheus", level: "Daily" },
      { name: "Grafana", level: "Daily" },
      { name: "Loki", level: "Production" },
      { name: "Datadog", level: "Production" },
    ],
  },
  {
    key: "frontend",
    items: [
      { name: "React", level: "Production" },
      { name: "Angular", level: "Production" },
      { name: "JavaScript", level: "Production" },
      { name: "Tailwind CSS", level: "Production" },
      { name: "Bootstrap", level: "Production" },
    ],
  },
];

export const rolesBase = [
  { key: "wizteam", from: 2025, to: null, company: "Wiz-Team", stack: ["TypeScript", "NestJS", "PostgreSQL", "MongoDB", "MySQL", "Redis", "RabbitMQ", "BullMQ", "Kubernetes", "Helm", "GitLab CI"] },
  { key: "etsolutions", from: 2024, to: 2025, company: "ET Solutions", stack: ["Laravel", "Node.js", "Python", "TypeScript", "REST APIs", "Webhooks", "Zapier", "Make", "Notion"] },
  { key: "parentesikuadra", from: 2022, to: 2024, company: "Parentesikuadra", stack: ["Laravel", "PHP", "Node.js", "React", "MariaDB", "GitHub Actions", "Docker"] },
  { key: "gdf", from: 2022, to: 2022, company: "Guardia di Finanza" },
  { key: "lanservice", from: 2019, to: 2020, company: "Lan Service" },
] as const satisfies readonly { key: string; from: number; to: number | null; company: string; stack?: readonly string[] }[];

export type RoleKey = (typeof rolesBase)[number]["key"];

export const educationBase = [
  { key: "diploma", from: 2019, to: 2019, school: "ITIS A. Sobrero, Casale Monferrato" },
  { key: "upo", from: null, to: null, school: "Università del Piemonte Orientale" },
] as const satisfies readonly { key: string; from: number | null; to: number | null; school: string }[];
