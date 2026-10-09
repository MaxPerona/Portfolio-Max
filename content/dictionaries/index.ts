import type { Locale } from "../locales";
import en, { type Dictionary } from "./en";
import es from "./es";
import it from "./it";

const dictionaries: Record<Locale, Dictionary> = { en, it, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
