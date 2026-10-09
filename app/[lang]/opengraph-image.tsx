import { ImageResponse } from "next/og";

import { getDictionary } from "@/content";
import { defaultLocale, hasLocale, locales } from "@/content/locales";
import { site } from "@/content/site";

export const alt = `${site.name} · Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const t = getDictionary(hasLocale(raw) ? raw : defaultLocale);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#141414", color: "#f2f5fc" }}>
        <div style={{ display: "flex", fontSize: 28, color: "#8a8f99" }}>
          {site.name} · {t.meta.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>{t.hero.lead}</span>
          <span style={{ color: "#8a8f99" }}>{t.hero.rest}</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#aeb5c5" }}>Node.js · TypeScript · NestJS · PostgreSQL · RabbitMQ · Kubernetes</div>
      </div>
    ),
    size,
  );
}
