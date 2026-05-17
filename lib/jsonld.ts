// JSON-LD builders — Master Build Prompt §6.
// Real values only; structured data mirrors the visible content.

import { site, absoluteUrl } from "./site";
import type { Practice, Project } from "@/content/types";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.artist,
    url: site.url,
    jobTitle: "Artist",
    email: `mailto:${site.email}`,
    homeLocation: { "@type": "Place", name: site.location },
    worksFor: { "@type": "Organization", name: site.name },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    founder: { "@type": "Person", name: site.artist },
    location: { "@type": "Place", name: site.location },
    email: `mailto:${site.email}`,
    logo: absoluteUrl(site.ogImage),
  };
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: Project) {
  const type =
    project.jsonLdType === "Collection"
      ? "Collection"
      : project.jsonLdType === "Book"
        ? "Book"
        : project.jsonLdType === "VisualArtwork"
          ? "VisualArtwork"
          : "CreativeWork";
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: project.title,
    url: absoluteUrl(`/work/${project.slug}`),
    description: project.shortDescription,
    creator: { "@type": "Person", name: site.artist },
    ...(project.heroImage
      ? { image: absoluteUrl(project.heroImage.src) }
      : {}),
    ...(project.years ? { dateCreated: project.years } : {}),
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };
}

export function practiceCollectionJsonLd(practice: Practice) {
  return {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: practice.title,
    url: absoluteUrl(`/#${practice.anchor}`),
    description: practice.summary,
    creator: { "@type": "Person", name: site.artist },
  };
}
