"use client";

import { useState } from "react";
import Link from "next/link";
import { editorialNav } from "@/content/navigation";
import { site } from "@/lib/site";

// Homepage header — mono wordmark top-left, the six editorial categories
// top-right (Reference Wireframe). Anchor labels scroll to their editorial
// section on the homepage; About routes to its own page.

export const OPEN_BENTO_EVENT = "lws:openbento";
export const CLOSE_BENTO_EVENT = "lws:closebento";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] bg-paper/85 backdrop-blur-xl"
      style={{ minHeight: "var(--nav-h)" }}
    >
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between gap-6 px-16 sm:px-20">
        <Link
          href="/"
          className="font-mono text-[15px] font-light uppercase tracking-[0.3em] text-muted transition-colors hover:text-ink"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-7 md:flex"
        >
          {editorialNav.map((item) => {
            const className =
              "whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink";
            return item.href ? (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={`/#${item.anchor}`} className={className}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
          <span className="block h-px w-5 bg-ink" />
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Sections"
          className="flex w-full flex-col gap-4 border-t border-line/50 px-16 py-6 sm:px-20 md:hidden"
        >
          {editorialNav.map((item) => {
            const className =
              "font-mono text-[12px] uppercase tracking-[0.2em] text-muted";
            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={className}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={`/#${item.anchor}`}
                onClick={() => setMenuOpen(false)}
                className={className}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
