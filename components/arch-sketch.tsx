import type { ReactNode } from "react";

/**
 * Abstract architecture sketches for the project cards and case-study headers.
 * Generic shapes only — no internal names, no real topology. Colours come from the theme tokens.
 */

const ink = "var(--color-medium)";
const strong = "var(--color-bright)";
const edge = "var(--color-stroke-strong)";
const fill = "var(--color-base-tint)";

function Node({ x, y, w, h, label, accent = false, r = 6 }: { x: number; y: number; w: number; h: number; label?: string; accent?: boolean; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={accent ? strong : edge} strokeWidth={accent ? 1.5 : 1} />
      {label ? (
        <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontSize="10" fill={accent ? strong : ink}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Cylinder({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const ry = 6;
  return (
    <g>
      <path d={`M${x} ${y + ry} V${y + h - ry} A${w / 2} ${ry} 0 0 0 ${x + w} ${y + h - ry} V${y + ry}`} fill={fill} stroke={edge} />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill={fill} stroke={edge} />
      <text x={x + w / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize="10" fill={ink}>
        {label}
      </text>
    </g>
  );
}

function Link({ d }: { d: string }) {
  return <path className="sketch-link" d={d} fill="none" stroke={edge} strokeWidth="1.25" strokeDasharray="3 4" />;
}

function Dot({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="2.2" fill={edge} />;
}

const sketches: Record<string, ReactNode> = {
  // Change Data Capture: one source, a change log, consumers with their own projections
  "real-time-data": (
    <>
      <Link d="M72 90 H96" />
      <Link d="M200 90 C213 90 213 36 226 36" />
      <Link d="M200 90 H226" />
      <Link d="M200 90 C213 90 213 144 226 144" />
      <Cylinder x={16} y={66} w={56} h={48} label="source" />
      <text x={148} y={70} textAnchor="middle" fontSize="10" fill={ink}>
        change log
      </text>
      <rect x={96} y={78} width={104} height={24} rx={12} fill={fill} stroke={strong} strokeWidth="1.5" />
      {[110, 122, 134, 146, 158, 170, 182].map((x) => (
        <line key={x} x1={x} x2={x} y1={85} y2={95} stroke={strong} strokeWidth="1.5" strokeLinecap="round" opacity={0.35 + (x - 110) / 120} />
      ))}
      <Node x={226} y={20} w={78} h={32} label="service A" />
      <Node x={226} y={74} w={78} h={32} label="service B" />
      <Node x={226} y={128} w={78} h={32} label="service C" />
      <Dot x={96} y={90} />
    </>
  ),
  // APIs and platforms: one API, consistent search and bulk work, reports and exports
  "apis-and-platforms": (
    <>
      <Link d="M124 80 C110 80 110 38 96 38" />
      <Link d="M196 80 C210 80 210 38 224 38" />
      <Link d="M124 100 C110 100 110 142 96 142" />
      <Link d="M196 100 C210 100 210 142 224 142" />
      <Node x={24} y={22} w={72} h={32} label="search" />
      <Node x={224} y={22} w={72} h={32} label="bulk ops" />
      <Node x={124} y={64} w={72} h={52} label="API" accent r={10} />
      <Node x={24} y={126} w={72} h={32} label="reports" />
      <Node x={224} y={126} w={72} h={32} label="exports" />
    </>
  ),
  // Integrations: business tools ⇄ webhooks/APIs ⇄ automation ⇄ CRM
  "integrations-and-automation": (
    <>
      <Link d="M86 36 C102 36 102 90 118 90" />
      <Link d="M86 90 H118" />
      <Link d="M86 144 C102 144 102 90 118 90" />
      <Link d="M196 90 H222" />
      <Node x={16} y={20} w={70} h={32} label="CRM" />
      <Node x={16} y={74} w={70} h={32} label="forms" />
      <Node x={16} y={128} w={70} h={32} label="email" />
      <Node x={118} y={68} w={78} h={44} label="webhooks" accent />
      <rect x={222} y={40} width={84} height={100} rx={8} fill={fill} stroke={edge} />
      <text x={264} y={58} textAnchor="middle" fontSize="10" fill={ink}>
        workflow
      </text>
      {[72, 96, 120].map((y) => (
        <rect key={y} x={234} y={y - 8} width={60} height={14} rx={4} fill="none" stroke={edge} />
      ))}
      <Dot x={118} y={90} />
      <Dot x={222} y={90} />
    </>
  ),
  // Client web apps: database → API → interface, released by CI
  "client-web-apps": (
    <>
      <Link d="M72 66 H100" />
      <Link d="M156 66 H184" />
      <Link d="M128 88 V122" />
      <Cylinder x={16} y={42} w={56} h={48} label="DB" />
      <Node x={100} y={46} w={56} h={40} label="API" />
      <rect x={184} y={30} width={122} height={76} rx={8} fill={fill} stroke={strong} strokeWidth="1.5" />
      <line x1={184} x2={306} y1={46} y2={46} stroke={strong} strokeWidth="1" />
      <circle cx={194} cy={38} r={2.2} fill={strong} />
      <circle cx={202} cy={38} r={2.2} fill={strong} />
      <rect x={196} y={56} width={44} height={38} rx={4} fill="none" stroke={edge} />
      <rect x={248} y={56} width={46} height={10} rx={3} fill="none" stroke={edge} />
      <rect x={248} y={72} width={46} height={10} rx={3} fill="none" stroke={edge} />
      <text x={245} y={117} textAnchor="middle" fontSize="10" fill={ink}>
        React UI
      </text>
      <rect x={16} y={122} width={290} height={34} rx={6} fill="none" stroke={edge} strokeDasharray="2 3" />
      <text x={161} y={143} textAnchor="middle" fontSize="10" fill={ink}>
        commit → CI → build → deploy
      </text>
    </>
  ),
};

export function ArchSketch({ slug, className }: { slug: string; className?: string }) {
  const sketch = sketches[slug];
  if (!sketch) return null;
  return (
    <svg viewBox="0 0 320 180" className={className} aria-hidden="true" focusable="false" fontFamily="var(--font-mono)">
      {sketch}
    </svg>
  );
}
