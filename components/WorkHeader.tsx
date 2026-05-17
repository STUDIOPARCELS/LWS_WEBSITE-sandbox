import Link from "next/link";
import { site } from "@/lib/site";
import Breadcrumb, { type Crumb } from "./Breadcrumb";

// Project-page header (§7): wordmark top-left; INDEX / INFORMATION / CONTACT
// top-right; breadcrumb under the wordmark.

const links = [
  { label: "Index", href: "/" },
  { label: "Information", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function WorkHeader({ trail }: { trail: Crumb[] }) {
  return (
    <header className="border-b border-line">
      <div className="container-page flex items-start justify-between gap-6 py-7">
        <div>
          <Link
            href="/"
            className="font-mono text-[13px] uppercase tracking-wide text-ink"
          >
            {site.name}
          </Link>
          <div className="mt-3">
            <Breadcrumb trail={trail} />
          </div>
        </div>
        <nav aria-label="Site" className="flex gap-5 pt-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
