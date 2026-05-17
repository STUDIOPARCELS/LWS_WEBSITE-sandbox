"use client";

import { useState } from "react";
import { editorialNav } from "@/content/navigation";
import { site } from "@/lib/site";

// Homepage header — Path Two editorial navigation (§3B) and the no-trap rule
// (§3C). z-index 100: always above the expanded bento and always clickable.
// Clicking any editorial item closes an open bento, then smooth-scrolls.

export const CLOSE_BENTO_EVENT = "lws:closebento";

function smoothScrollTo(anchor: string) {
  const target = document.getElementById(anchor);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(e: React.MouseEvent, anchor: string) {
    e.preventDefault();
    // Close any open bento panel (§3C).
    window.dispatchEvent(new CustomEvent(CLOSE_BENTO_EVENT));
    setMenuOpen(false);
    smoothScrollTo(anchor);
    history.replaceState(null, "", `#${anchor}`);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] border-b border-line/60 bg-paper/85 backdrop-blur-xl"
      style={{ minHeight: "var(--nav-h)" }}
    >
      <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
        <a
          href="#top"
          onClick={(e) => handleNav(e, "top")}
          className="font-mono text-[13px] uppercase tracking-wide text-ink"
        >
          {site.name}
        </a>

        <nav
          aria-label="Editorial sections"
          className="hidden items-center gap-7 md:flex"
        >
          {editorialNav.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={(e) => handleNav(e, item.anchor)}
              className="font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
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
          aria-label="Editorial sections"
          className="container-page flex flex-col gap-4 border-t border-line/60 py-6 md:hidden"
        >
          {editorialNav.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={(e) => handleNav(e, item.anchor)}
              className="font-mono text-[12px] uppercase tracking-wide text-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
