"use client";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative grid size-10 place-items-center rounded-control text-bright transition-colors duration-150 hover:bg-base-raised active:scale-95"
      aria-label={label}
      title={label}
    >
      <SunIcon className="absolute transition-all duration-300 ease-out-soft light:scale-50 light:-rotate-90 light:opacity-0" />
      <MoonIcon className="absolute transition-all duration-300 ease-out-soft dark:scale-50 dark:rotate-90 dark:opacity-0" />
    </button>
  );
}
