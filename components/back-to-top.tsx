import { ArrowUp } from "./icons";

export function BackToTop({ label }: { label: string }) {
  return (
    <a
      href="#top"
      className="fixed right-4 bottom-4 z-40 hidden size-11 place-items-center rounded-control border border-stroke/60 bg-base/70 text-bright backdrop-blur-md transition-colors duration-150 hover:bg-base-raised sm:right-6 sm:bottom-6 sm:grid"
      aria-label={label}
    >
      <ArrowUp size={18} />
    </a>
  );
}
