"use client";

import { useLayoutEffect } from "react";

import { restoreLocaleAnchor, takeLocaleAnchor } from "@/lib/intro";

/** Keeps <html lang> in sync after client-side language switches and restores the reading position. */
export function HtmlLang({ lang }: { lang: string }) {
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    const anchor = takeLocaleAnchor();
    restoreLocaleAnchor(lang, anchor);
    // Run again after paint in case late layout shifted things.
    const id = requestAnimationFrame(() => restoreLocaleAnchor(lang, anchor));
    return () => cancelAnimationFrame(id);
  }, [lang]);
  return null;
}
