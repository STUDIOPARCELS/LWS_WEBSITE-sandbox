"use client";

import { useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { site } from "@/lib/site";

// Homepage header — wordmark top-left (serif), the five category labels
// top-right (Reference Wireframe screen 01). A nav label opens that
// category's bento pop-out; it does not scroll to a separate section.

export const OPEN_BENTO_EVENT = "lws:openbento";
export const CLOSE_BENTO_EVENT = "lws:closebento";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function openCategory(e: React.MouseEvent, id: string) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(OPEN_BENTO_EVENT, { detail: id }));
    setMenuOpen(false);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] border-b border-line/50 bg-paper/85 backdrop-blur-xl"
      style={{ minHeight: "var(--nav-h)" }}
    >
      <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-[22px] font-light tracking-[0.02em] text-ink"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Categories"
          className="hidden items-center gap-7 md:flex"
        >
          {bentoNav.map((node) => (
            <a
              key={node.id}
              href={`#${node.id}`}
              onClick={(e) => openCategory(e, node.id)}
              className="font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {node.label}
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
          aria-label="Categories"
          className="container-page flex flex-col gap-4 border-t border-line/50 py-6 md:hidden"
        >
          {bentoNav.map((node) => (
            <a
              key={node.id}
              href={`#${node.id}`}
              onClick={(e) => openCategory(e, node.id)}
              className="font-mono text-[12px] uppercase tracking-wide text-muted"
            >
              {node.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
