import { site, absoluteUrl } from "@/lib/site";
import { projects, routableProjects } from "@/content/projects";
import { practices } from "@/content/practices";

// /llms.txt — a studio + structure summary for LLM agents (§6).
// Generated from the content schema so it never drifts from the site.

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `${site.name} is the portfolio of artist ${site.artist}, based in ${site.location}. ` +
      `The site has two navigation paths: an experiential bento navigation and an ` +
      `editorial section navigation — intentionally different cuts of the same work.`,
  );
  lines.push("");

  lines.push("## Editorial sections");
  lines.push("");
  for (const practice of practices) {
    lines.push(`- ${practice.title}: ${practice.summary}`);
  }
  lines.push("");

  lines.push("## Projects");
  lines.push("");
  for (const project of routableProjects()) {
    lines.push(
      `- [${project.title}](${absoluteUrl(`/work/${project.slug}`)}): ${project.shortDescription}`,
    );
  }
  lines.push("");

  const external = projects.filter((p) => p.external);
  if (external.length > 0) {
    lines.push("## External ventures");
    lines.push("");
    for (const venture of external) {
      lines.push(`- [${venture.title}](${venture.external})`);
    }
    lines.push("");
  }

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Location: ${site.location}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
