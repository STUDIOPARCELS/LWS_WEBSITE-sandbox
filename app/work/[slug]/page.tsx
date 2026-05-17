import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, routableProjects } from "@/content/projects";
import type { Project } from "@/content/types";
import { practiceByAnchor } from "@/content/practices";
import WorkHeader from "@/components/WorkHeader";
import SiteFooter from "@/components/SiteFooter";
import FieldSiteBlock from "@/components/FieldSiteBlock";
import EssayCallout from "@/components/EssayCallout";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectThumb from "@/components/ProjectThumb";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import type { Crumb } from "@/components/Breadcrumb";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

type Params = { slug: string };

// Static generation for every internal /work/[slug] route (§0, §10.4).
export function generateStaticParams(): Params[] {
  return routableProjects().map((p) => ({ slug: p.slug }));
}

function editorialLabel(project: Project): { name: string; path: string } | null {
  if (!project.editorialCategory) return null;
  const practice = practiceByAnchor[project.editorialCategory];
  if (!practice) return null;
  return { name: practice.title, path: `/#${practice.anchor}` };
}

function buildTrail(project: Project): Crumb[] {
  const trail: Crumb[] = [{ name: "Studio", path: "/" }];
  const parent = project.parent ? getProject(project.parent) : null;
  const editorial = editorialLabel(project);
  // Skip the editorial-section crumb when it names the same body of work as
  // the parent project (a field site whose editorial category *is* its
  // parent) — the parent crumb routes to the real page, so keep only that.
  const editorialDupesParent =
    parent != null && project.editorialCategory === parent.slug;
  if (
    editorial &&
    editorial.path !== `/#${project.slug}` &&
    !editorialDupesParent
  ) {
    trail.push(editorial);
  }
  if (parent) {
    trail.push({ name: parent.title, path: `/work/${parent.slug}` });
  }
  trail.push({ name: project.title, path: `/work/${project.slug}` });
  return trail;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.external) {
    return { title: "Not found" };
  }
  const url = `/work/${project.slug}`;
  return {
    title: { absolute: project.seoTitle },
    description: project.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.seoTitle,
      description: project.seoDescription,
      url,
      images: project.heroImage
        ? [{ url: project.heroImage.src, alt: project.heroImage.alt }]
        : [{ url: site.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.external) notFound();

  const trail = buildTrail(project);
  const children = (project.children ?? [])
    .map(getProject)
    .filter((p): p is Project => Boolean(p));
  const isParent = children.length > 0;
  const blockKind: "field-site" | "sub-project" =
    project.slug === "surface-surveys" ? "field-site" : "sub-project";
  const related = project.relatedProjects
    .map(getProject)
    .filter((p): p is Project => Boolean(p));

  const heroKicker =
    project.region && project.years
      ? `Field Site — ${project.region} (${project.years})`
      : project.years
        ? `${project.practice} — ${project.years}`
        : project.practice;

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd(trail),
        ]}
      />
      <WorkHeader trail={trail} />

      <main>
        {/* Split hero (§7): left ≈42% text, right ≈58% image. */}
        <section className="container-page py-16 sm:py-20">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[42%_58%] lg:items-center">
              <div>
                <p className="kicker">{heroKicker}</p>
                <h1 className="headline-serif mt-4 text-[clamp(34px,5vw,60px)]">
                  {project.title}
                </h1>
                <p className="mt-6 text-[15px] leading-relaxed text-muted">
                  {project.longDescription}
                </p>

                {project.fieldNotes && (
                  <div className="mt-6">
                    <p className="kicker">Firsts</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {project.fieldNotes}
                    </p>
                  </div>
                )}

                {project.details.length > 0 && (
                  <dl className="mt-8 space-y-4">
                    {project.details.map((d) => (
                      <div key={d.label}>
                        <dt className="kicker">{d.label}</dt>
                        <dd className="mt-1 text-[14px] leading-relaxed text-ink">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {project.status === "placeholder" && (
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-soft">
                    TODO(Lisa) — final content for this project is pending
                  </p>
                )}
              </div>

              {project.heroImage && (
                <figure className="overflow-hidden bg-line/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  {project.heroImage.caption && (
                    <figcaption className="mt-2 font-mono text-[10px] italic text-muted">
                      {project.heroImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </Reveal>
        </section>

        {/* Parent page: nested child blocks (§5, §7). */}
        {isParent && (
          <section className="container-page pb-8">
            {children.map((child) => (
              <div key={child.slug}>
                <FieldSiteBlock project={child} kind={blockKind} />
                {child.slug === "white-sands" && <EssayCallout />}
              </div>
            ))}
          </section>
        )}

        {/* Leaf page: a single carousel — the simple leaf gallery (§7). */}
        {!isParent && project.galleryImages.length > 0 && (
          <section className="container-page pb-16">
            <Reveal>
              <ProjectCarousel
                images={project.galleryImages}
                label={`${project.title} images`}
              />
            </Reveal>
          </section>
        )}

        {/* White Sands standalone page also carries the essay callout (§7). */}
        {!isParent && project.slug === "white-sands" && (
          <section className="container-page">
            <EssayCallout />
          </section>
        )}

        {related.length > 0 && (
          <section className="container-page border-t border-line py-16">
            <p className="kicker">Related work</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectThumb slug={r.slug} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="container-page border-t border-line py-12">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-ink"
          >
            ← Back to {site.name}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
