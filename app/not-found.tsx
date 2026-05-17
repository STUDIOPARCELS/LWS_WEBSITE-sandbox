import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col justify-center py-24">
      <p className="kicker">404</p>
      <h1 className="headline-serif mt-4 text-[clamp(32px,5vw,56px)]">
        Page <em>not found</em>
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
        The page you are looking for is not here.
      </p>
      <Link
        href="/"
        className="mt-8 font-mono text-[11px] uppercase tracking-wide text-ink"
      >
        <span className="border-b border-ink pb-0.5">
          ← Back to {site.name}
        </span>
      </Link>
    </main>
  );
}
