import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type { BentoCategory } from "@/content/types";

// Homepage hero (Reference Wireframe) — five quiet portrait cards in a
// staggered two-column cluster with a serif category index alongside. Each
// card and its matching index entry lead to that category's flagship work.

// Reading order: left column (first three) then right column (last two).
const ORDER: BentoCategory[] = [
  "photographs",
  "writing",
  "installation",
  "conceptual",
  "apps",
];

// Per-entry typographic tone — the index reads as a quiet hierarchy rather
// than one flat block of grey (weight + shade + italic all vary).
const TONE: Record<BentoCategory, string> = {
  photographs: "font-normal text-ink",
  writing: "font-light italic text-muted",
  installation: "font-light text-muted",
  conceptual: "font-light italic text-soft",
  apps: "font-light text-soft",
};

// Shared card geometry — portrait tiles that scale with viewport height.
const CARD_HEIGHT = "clamp(140px, 21vh, 248px)";
const CARD_GAP = "clamp(18px, 2vh, 30px)";

type Entry = {
  id: BentoCategory;
  label: string;
  href: string;
  external: boolean;
};

function entryFor(id: BentoCategory): Entry {
  const node = bentoNav.find((n) => n.id === id)!;
  const flagship = node.children[0];
  if (flagship?.external) {
    return { id, label: node.label, href: flagship.external, external: true };
  }
  const project = flagship?.slug ? getProject(flagship.slug) : undefined;
  return {
    id,
    label: node.label,
    href: project ? `/work/${project.slug}` : "/",
    external: false,
  };
}

// A quiet empty portrait tile with a hairline border (Reference Wireframe).
function Card({ entry }: { entry: Entry }) {
  const className =
    "block rounded-[26px] border border-line/70 bg-paper shadow-[0_14px_38px_rgba(17,17,17,0.055)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_26px_52px_rgba(17,17,17,0.10)]";
  const style = { height: CARD_HEIGHT, aspectRatio: "4 / 5" };
  return entry.external ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={entry.label}
      className={className}
      style={style}
    />
  ) : (
    <Link
      href={entry.href}
      aria-label={entry.label}
      className={className}
      style={style}
    />
  );
}

function IndexLink({ entry }: { entry: Entry }) {
  const className = [
    "font-serif text-[18px] leading-snug transition-colors hover:text-ink",
    TONE[entry.id],
  ].join(" ");
  return entry.external ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {entry.label}
    </a>
  ) : (
    <Link href={entry.href} className={className}>
      {entry.label}
    </Link>
  );
}

export default function HomeHero() {
  const entries = ORDER.map(entryFor);
  const left = entries.slice(0, 3);
  const right = entries.slice(3);
  // The right column drops half a card to stagger the skyline.
  const stagger = `calc((${CARD_HEIGHT} + ${CARD_GAP}) / 2)`;

  return (
    <div
      className="flex w-full items-center justify-center px-8"
      style={{ minHeight: "calc(100vh - var(--nav-h))" }}
    >
      {/* Staggered cluster — a left column of three, then a right group that
          carries the right column of two plus the serif index, dropped down
          together so the index sits beside the lower right card. */}
      <div className="flex items-start gap-[clamp(24px,6vw,110px)]">
        <div className="flex flex-col" style={{ gap: CARD_GAP }}>
          {left.map((entry) => (
            <Card key={entry.id} entry={entry} />
          ))}
        </div>

        <div
          className="flex items-end gap-[clamp(24px,6vw,110px)]"
          style={{ marginTop: stagger }}
        >
          <div className="flex flex-col" style={{ gap: CARD_GAP }}>
            {right.map((entry) => (
              <Card key={entry.id} entry={entry} />
            ))}
          </div>

          {/* Serif index — bottom-aligned just above the lower right card. */}
          <nav aria-label="Browse by category" className="mb-11">
            <ul className="flex flex-col gap-2.5">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <IndexLink entry={entry} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
