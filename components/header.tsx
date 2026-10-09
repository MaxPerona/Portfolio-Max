"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Dictionary } from "@/content/dictionaries";
import { locales, type Locale } from "@/content/locales";
import { site, type SectionId } from "@/content/site";
import { prepareLocaleSwitch } from "@/lib/intro";
import { duration, ease, stagger } from "@/lib/motion";
import { ThemeToggle } from "./theme-toggle";

export function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const onHome = pathname === `/${lang}`;
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!onHome) return;
    const sections = site.sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const href = (id: SectionId) => (onHome ? `#${id}` : `/${lang}#${id}`);
  const swapLocale = (l: Locale) => pathname.replace(/^\/(en|it|es)(?=\/|$)/, `/${l}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-control border border-stroke/60 bg-base/70 px-3 py-2 backdrop-blur-md">
        <Link href={`/${lang}`} className="flex items-center gap-3 rounded-control px-1 text-bright" aria-label={nav.homeLabel} onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-control bg-control font-mono text-sm font-semibold text-on-control">MP</span>
          <span className="hidden text-lg font-normal tracking-tight sm:inline">
            Max Perona<span className="text-muted">*</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.sections.map((id) => {
              const isActive = onHome && active === id;
              return (
                <li key={id}>
                  <Link
                    href={href(id)}
                    aria-current={isActive ? "true" : undefined}
                    className="relative block rounded-control px-3 py-2 text-[15px] text-medium transition-colors duration-150 hover:text-bright aria-[current=true]:text-bright"
                  >
                    {nav[id]}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 bottom-1 h-px bg-bright"
                        transition={{ duration: duration.ui, ease: ease.inOut }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher lang={lang} label={nav.language} hrefFor={swapLocale} className="hidden sm:flex" />
          <Link
            href={href("contact")}
            className="ml-1 hidden rounded-full bg-control px-4 py-2 text-sm font-medium text-on-control transition-[opacity,transform] duration-150 hover:opacity-85 active:scale-[0.97] md:inline-block"
          >
            {nav.letsTalk}
          </Link>
          <ThemeToggle label={nav.toggleTheme} />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-control text-bright hover:bg-base-raised lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-soft ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ease-out-soft ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mx-auto mt-2 max-w-7xl rounded-tile border border-stroke/60 bg-base/95 p-2 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.ui, ease: ease.out } }}
            exit={{ opacity: 0, y: -8, transition: { duration: duration.micro, ease: ease.inOut } }}
          >
            <motion.ul initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.words } } }}>
              {site.sections.map((id) => (
                <motion.li key={id} variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: duration.ui, ease: ease.out } } }}>
                  <Link href={href(id)} onClick={() => setOpen(false)} className="block rounded-control px-4 py-3 text-2xl font-light text-bright hover:bg-base-raised">
                    {nav[id]}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <LanguageSwitcher lang={lang} label={nav.language} hrefFor={swapLocale} className="mt-2 flex border-t border-stroke px-2 pt-3 pb-1 sm:hidden" />
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LanguageSwitcher({ lang, label, hrefFor, className = "" }: { lang: Locale; label: string; hrefFor: (l: Locale) => string; className?: string }) {
  return (
    <nav aria-label={label} className={`items-center gap-0.5 ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          prefetch={true}
          scroll={false}
          onClick={() => {
            if (l !== lang) prepareLocaleSwitch(lang);
          }}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className="rounded-control px-2 py-2 font-mono text-xs tracking-wide text-muted uppercase transition-colors duration-150 hover:text-bright aria-[current=true]:text-bright aria-[current=true]:underline aria-[current=true]:underline-offset-4"
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
