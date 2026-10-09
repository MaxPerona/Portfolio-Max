export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-[clamp(1.75rem,4vw,3.25rem)] font-extralight text-bright">{item}</span>
          <span className="text-muted" aria-hidden="true">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden border-y border-stroke py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <p className="sr-only">Core stack: {items.join(", ")}</p>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
