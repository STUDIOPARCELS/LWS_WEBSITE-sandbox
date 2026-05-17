import Link from "next/link";

export type Crumb = { name: string; path: string };

// Breadcrumb (§7) — each segment is a back-link.

export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-wide text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="transition-colors hover:text-ink">
                  {crumb.name}
                </Link>
              )}
              {!last && <span className="text-soft">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
