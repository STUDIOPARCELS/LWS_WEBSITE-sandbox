import { site } from "@/lib/site";

// Minimal footer (§7): LISA WOOD STUDIO · SUN VALLEY, IDAHO · year.

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-14">
      <div className="container-page flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          {site.name}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          {site.location}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          &copy; {year}
        </p>
      </div>
    </footer>
  );
}
