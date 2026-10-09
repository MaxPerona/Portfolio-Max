import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale, locales } from "@/content/locales";
import { site } from "@/content/site";
import { HtmlLang } from "@/components/html-lang";
import { IdScope } from "@/components/id-scope";

/**
 * Every route under [lang] is fully prerendered (all locales and slugs come from generateStaticParams),
 * and in-app links prefetch the full page with prefetch={true}. Reading `params` therefore can't slow a
 * real navigation, so we opt this subtree out of the dev-only "instant shell" validation.
 * See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/instant.md
 */
export const instant = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} · ${t.meta.title}`, template: `%s · ${site.name}` },
    description: t.meta.description,
    authors: [{ name: site.name, url: site.socials.github }],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: { type: "website", siteName: site.name, locale: lang, title: `${site.name} · ${t.meta.title}`, description: t.meta.description },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
    { media: "(prefers-color-scheme: light)", color: "#c9cdd6" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: t.meta.title,
    address: { "@type": "PostalAddress", addressRegion: "Piedmont", addressCountry: "IT" },
    knowsLanguage: ["it", "es", "en"],
    sameAs: [site.socials.github, site.socials.linkedin],
  };

  return (
    <div lang={lang} data-locale-root={lang} className="contents">
      <HtmlLang lang={lang} />
      <IdScope />
      <MotionProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-control focus:bg-control focus:px-4 focus:py-2 focus:text-on-control"
        >
          {t.nav.skip}
        </a>
        <Header lang={lang} nav={t.nav} />
        <main id="main">{children}</main>
        <Footer location={t.common.location} />
        <BackToTop label={t.nav.backToTop} />
      </MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </div>
  );
}
