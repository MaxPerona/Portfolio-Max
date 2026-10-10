import { Fragment } from "react";

/** Keeps hyphenated words ("back-end", "event-driven") on one line inside wrapping headings. */
export function KeepWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          {w.includes("-") ? <span className="whitespace-nowrap">{w}</span> : w}
        </Fragment>
      ))}
    </>
  );
}
