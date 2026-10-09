export type Level = "Daily" | "Production" | "Familiar";
export type Title = { lead: string; rest: string };
export type FlowStep = { label: string; detail?: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  period: string;
  role: string;
  context: string;
  summary: string;
  challenge: string;
  engineering: { title: string; text: string }[];
  flow: FlowStep[];
  outcomes: string[];
  tradeoffs: string[];
  learned: string;
  stack: string[];
  visibility: "private" | "public";
  repo?: string;
  demo?: string;
};

export type LabItem = { title: string; year: string; text: string; stack: string[]; href?: string };
export type SkillGroup = { name: string; blurb: string; items: { name: string; level: Level }[] };
export type Role = { period: string; title: string; company: string; location?: string; points: string[]; stack?: string[] };
