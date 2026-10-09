"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeft } from "@/components/icons";

const copy = {
  en: { title: "Nothing here.", text: "That page doesn't exist — or it moved.", back: "Back home" },
  it: { title: "Qui non c'è niente.", text: "Questa pagina non esiste — o è stata spostata.", back: "Torna alla home" },
  es: { title: "Aquí no hay nada.", text: "Esta página no existe — o se ha movido.", back: "Volver al inicio" },
} as const;

export default function NotFound() {
  const seg = usePathname()?.split("/")[1] ?? "en";
  const lang = seg === "it" || seg === "es" ? seg : "en";
  const t = copy[lang];
  return (
    <section className="grid min-h-[80dvh] place-items-center px-4 pt-32 pb-16 text-center">
      <div>
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none">{t.title}</h1>
        <p className="mt-6 text-lg text-medium">{t.text}</p>
        <Link href={`/${lang}`} className="mt-10 inline-flex items-center gap-2 rounded-full border border-stroke-strong px-6 py-3 text-bright hover:border-bright">
          <ArrowLeft size={16} /> {t.back}
        </Link>
      </div>
    </section>
  );
}
