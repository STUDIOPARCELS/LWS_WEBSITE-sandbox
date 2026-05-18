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

// Index entries the wireframe sets in italic.
const ITALIC = new Set<BentoCategory>(["writing", "conceptual"]);

// Shared card geometry — portrait tiles that scale with viewport height.
const CARD_HEIGHT = "clamp(150px, 21vh, 248px)";
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
    "font-serif text-[18px] font-light leading-snug text-muted transition-colors hover:text-ink",
    ITALIC.has(entry.id) ? "italic" : "",
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

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-12 px-8 lg:flex-row lg:gap-[clamp(40px,7vw,120px)]"
      style={{ minHeight: "calc(100vh - var(--nav-h))" }}
    >
      {/* Staggered two-column card cluster. */}
      <div className="flex" style={{ gap: CARD_GAP }}>
        <div className="flex flex-col" style={{ gap: CARD_GAP }}>
          {left.map((entry) => (
            <Card key={entry.id} entry={entry} />
          ))}
        </div>
        <div
          className="flex flex-col"
          style={{
            gap: CARD_GAP,
            marginTop: `calc((${CARD_HEIGHT} + ${CARD_GAP}) / 2)`,
          }}
        >
          {right.map((entry) => (
            <Card key={entry.id} entry={entry} />
          ))}
        </div>
      </div>

      {/* Serif category index. */}
      <nav aria-label="Browse by category">
        <ul className="flex flex-col gap-2.5">
          {entries.map((entry) => (
            <li key={entry.id}>
              <IndexLink entry={entry} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
