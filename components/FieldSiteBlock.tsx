import Link from "next/link";
import type { Project } from "@/content/types";
import ProjectCarousel from "./ProjectCarousel";
import Reveal from "./Reveal";

// A nested block within a flagship parent page (§5, §7). Used for both the
// six Surface Surveys field sites and the three Luxuriate sub-projects — same
// template family, no special-casing. Each child is also linked to its own
// canonical /work/[slug] route.

export default function FieldSiteBlock({
  project,
  kind,
}: {
  project: Project;
  kind: "field-site" | "sub-project";
}) {
  const kicker =
    kind === "field-site"
      ? `Field Site — ${project.region ?? ""}${
          project.years ? ` (${project.years})` : ""
        }`
      : `${project.practice}${project.years ? ` (${project.years})` : ""}`;

  return (
    <Reveal>
      <article className="border-t border-line py-16">
        <p className="kicker">{kicker}</p>
        <h3 className="headline-serif mt-3 text-[clamp(24px,3.4vw,38px)]">
          {project.title}
        </h3>

        {project.details.length > 0 && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted">
            {project.details.map((d, i) => (
              <span key={d.label}>
                {i > 0 && <span className="text-soft"> | </span>}
                {d.label}: {d.value}
              </span>
            ))}
          </p>
        )}

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
          {project.longDescription}
        </p>

        {project.galleryImages.length > 0 && (
          <div className="mt-8">
            <ProjectCarousel
              images={project.galleryImages}
              label={`${project.title} images`}
            />
          </div>
        )}

        <Link
          href={`/work/${project.slug}`}
          className="mt-7 inline-block font-mono text-[11px] uppercase tracking-wide text-ink"
        >
          <span className="border-b border-ink pb-0.5">
            Open {project.title} →
          </span>
        </Link>
      </article>
    </Reveal>
  );
}
