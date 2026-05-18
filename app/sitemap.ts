import type { MetadataRoute } from "next";
import { routableProjects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

// Programmatic sitemap, including an image sitemap entry per project (§6).

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const work = routableProjects().map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: project.parent ? 0.6 : 0.8,
    images: [
      ...(project.heroImage ? [absoluteUrl(project.heroImage.src)] : []),
      ...project.galleryImages.map((g) => absoluteUrl(g.src)),
    ],
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...work,
  ];
}
