"use client";

import { PauseIcon, PlayIcon } from "./icons";

/**
 * WCAG 2.2.2 (Pause, Stop, Hide): the marquee and hero network move on their own for more than
 * five seconds, so visitors get an on-page control. The choice persists across visits.
 */
export function MotionToggle({ pauseLabel, resumeLabel }: { pauseLabel: string; resumeLabel: string }) {
  function toggle() {
    const root = document.documentElement;
    const paused = root.dataset.motion === "paused";
    if (paused) delete root.dataset.motion;
    else root.dataset.motion = "paused";
    try {
      localStorage.setItem("motion", paused ? "on" : "paused");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="group inline-flex items-center gap-2 rounded-full border border-stroke px-3 py-1.5 text-xs text-muted transition-colors duration-150 hover:border-stroke-strong hover:text-bright"
    >
      <span className="motion-on-only inline-flex items-center gap-2">
        <PauseIcon size={14} /> {pauseLabel}
      </span>
      <span className="motion-off-only inline-flex items-center gap-2">
        <PlayIcon size={14} /> {resumeLabel}
      </span>
    </button>
  );
}
