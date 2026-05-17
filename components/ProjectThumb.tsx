import Link from "next/link";
import { getProject } from "@/content/projects";

// A single project thumbnail card → its canonical /work/[slug] route.
// Placeholder projects show a plain rectangle and a pending tag (§9).

export default function ProjectThumb({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return null;

  const hero = project.heroImage;

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="aspect-[4/3] w-full overflow-hidden bg-line/35">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            data-skin="placeholder"
            className="flex h-full w-full items-center justify-center"
          >
            <span className="font-mono text-[9px] uppercase tracking-wide text-soft">
              Content pending
            </span>
          </div>
        )}
      </div>
      <h3 className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink">
        {project.title}
      </h3>
      <p className="mt-1 font-serif text-[13px] font-light italic leading-snug text-muted">
        {project.shortDescription}
      </p>
    </Link>
  );
}
