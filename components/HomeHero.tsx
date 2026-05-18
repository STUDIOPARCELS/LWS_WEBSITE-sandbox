import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type { BentoCategory } from "@/content/types";

// Homepage hero (Reference Wireframe) — five category cards in a staggered
// two-column grid with a textual category index alongside. Each card and its
// matching index entry lead to that category's flagship work.

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

type Entry = {
  id: BentoCategory;
  label: string;
  href: string;
  external: boolean;
  image: { src: string; alt: string } | null;
};

function entryFor(id: BentoCategory): Entry {
  const node = bentoNav.find((n) => n.id === id)!;
  const flagship = node.children[0];
  if (flagship?.external) {
    return {
      id,
      label: node.label,
      href: flagship.external,
      external: true,
      image: null,
    };
  }
  const project = flagship?.slug ? getProject(flagship.slug) : undefined;
  return {
    id,
    label: node.label,
    href: project ? `/work/${project.slug}` : "/",
    external: false,
    image: project?.heroImage
      ? { src: project.heroImage.src, alt: project.heroImage.alt }
      : null,
  };
}

function Card({ entry, priority }: { entry: Entry; priority: boolean }) {
  const className =
    "group block w-full overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_18px_40px_rgba(17,17,17,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_56px_rgba(17,17,17,0.12)]";
  const body = (
    <span className="block aspect-[6/5] w-full">
      {entry.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.image.src}
          alt={entry.image.alt}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-line/20">
          <span className="font-serif text-[15px] font-light italic tracking-wide text-muted">
            {entry.label}
          </span>
        </span>
      )}
    </span>
  );
  return entry.external ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={entry.label}
      className={className}
    >
      {body}
    </a>
  ) : (
    <Link href={entry.href} aria-label={entry.label} className={className}>
      {body}
    </Link>
  );
}

function IndexLink({ entry }: { entry: Entry }) {
  const className = [
    "font-serif text-[16px] font-light text-muted transition-colors hover:text-ink",
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
    <div className="relative flex min-h-[calc(100vh-var(--nav-h))] w-full items-start">
      <div className="container-page grid w-full grid-cols-1 gap-x-12 gap-y-16 pb-32 pt-16 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        {/* Card grid — two columns, the right one dropped to stagger. */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="flex flex-col gap-5 sm:gap-6">
            {left.map((entry, i) => (
              <Card key={entry.id} entry={entry} priority={i === 0} />
            ))}
          </div>
          <div className="flex flex-col gap-5 sm:mt-[clamp(40px,9vw,150px)] sm:gap-6">
            {right.map((entry) => (
              <Card key={entry.id} entry={entry} priority={false} />
            ))}
          </div>
        </div>

        {/* Textual category index. */}
        <nav
          aria-label="Browse by category"
          className="lg:self-end lg:pb-[clamp(80px,13vw,200px)]"
        >
          <ul className="space-y-2.5">
            {entries.map((entry) => (
              <li key={entry.id}>
                <IndexLink entry={entry} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
