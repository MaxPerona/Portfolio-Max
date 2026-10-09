/**
 * Language switching without a "reload" feel (see docs/motion.md):
 * - skip entrance animations on the swapped-in page,
 * - keep the reader at the same section, at the same offset from the top of the viewport.
 */
export const intro: { skip: boolean; anchor: { id: string | null; offset: number; y: number } | null } = {
  skip: false,
  anchor: null,
};

export function prepareLocaleSwitch(fromLang: string) {
  intro.skip = true;
  document.documentElement.classList.add("skip-intro");
  const scope = document.querySelector(`[data-locale-root="${fromLang}"]`) ?? document;
  const sections = [...scope.querySelectorAll<HTMLElement>("main section[id]")];
  const current = sections.filter((s) => s.getBoundingClientRect().top <= 120).pop();
  intro.anchor = { id: current?.id ?? null, offset: current ? current.getBoundingClientRect().top : 0, y: window.scrollY };
}

export type Anchor = NonNullable<(typeof intro)["anchor"]>;

export function takeLocaleAnchor() {
  const anchor = intro.anchor;
  intro.anchor = null;
  return anchor;
}

export function restoreLocaleAnchor(toLang: string, anchor: Anchor | null) {
  if (!anchor) return;
  const scope = document.querySelector(`[data-locale-root="${toLang}"]`);
  const target = anchor.id && scope ? scope.querySelector<HTMLElement>(`[id="${anchor.id}"], [data-parked-id="${anchor.id}"]`) : null;
  const y = target ? window.scrollY + target.getBoundingClientRect().top - anchor.offset : anchor.y;
  window.scrollTo({ top: y, behavior: "instant" });
}
