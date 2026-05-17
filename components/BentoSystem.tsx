"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import type { BentoCategory, BentoSize } from "@/content/types";
import { CLOSE_BENTO_EVENT } from "./SiteHeader";

// Path One — experiential bento navigation (§3A) + no-trap rule (§3C).
//
// SCOPE NOTE (§0): the final frosted/vellum skin is OUT OF SCOPE. Bentos are
// plain placeholder rectangles rendered through a swappable skin seam
// (`data-skin`) so the skin can be replaced later without touching this logic.

const SKIN = "placeholder";

const HEIGHT: Record<BentoSize, string> = {
  short: "clamp(132px, 17vw, 188px)",
  tall: "clamp(176px, 22vw, 248px)",
  tallest: "clamp(220px, 28vw, 320px)",
};

export default function BentoSystem() {
  const [openId, setOpenId] = useState<BentoCategory | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenId(null), []);

  // Close on: any top-nav item (§3C), Escape, click outside.
  useEffect(() => {
    window.addEventListener(CLOSE_BENTO_EVENT, close);
    return () => window.removeEventListener(CLOSE_BENTO_EVENT, close);
  }, [close]);

  useEffect(() => {
    if (!openId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openId, close]);

  const openNode = bentoNav.find((b) => b.id === openId) ?? null;

  return (
    <div ref={rootRef} className="relative">
      {/* Bento skyline — centred group, symmetric short·tall·TALLEST·tall·short. */}
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {bentoNav.map((node, i) => {
          const isOpen = node.id === openId;
          return (
            <button
              key={node.id}
              type="button"
              data-skin={SKIN}
              aria-expanded={isOpen}
              aria-controls="bento-panel"
              onClick={() => setOpenId(isOpen ? null : node.id)}
              className="bento-box group flex w-full max-w-[210px] flex-col"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span
                className={`flex flex-1 items-end rounded-[2px] bg-line/40 p-3 transition-colors duration-300 group-hover:bg-line/70 ${
                  isOpen ? "bg-line/70" : ""
                }`}
                style={{ height: HEIGHT[node.size] }}
              >
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink">
                  {node.label}
                  <span className="text-muted"> ({node.count})</span>
                </span>
              </span>
              <span className="mt-2 px-1 text-left font-serif text-[12px] font-light italic leading-snug text-muted">
                {node.caption}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded panel — sits below the nav, never above it (§3C). */}
      {openNode && (
        <div
          id="bento-panel"
          role="region"
          aria-label={`${openNode.label} works`}
          className="fixed inset-x-0 z-50 overflow-y-auto border-b border-line bg-paper/97 backdrop-blur-xl"
          style={{
            top: "var(--nav-h)",
            maxHeight: "calc(100vh - var(--nav-h))",
          }}
        >
          <div className="container-page py-12">
            <div className="mb-8 flex items-baseline justify-between gap-6">
              <h2 className="font-mono text-[11px] uppercase tracking-wide text-muted">
                {openNode.label}
                <span className="text-soft"> ({openNode.count})</span>
              </h2>
              <button
                type="button"
                onClick={close}
                className="font-mono text-[11px] uppercase tracking-wide text-muted transition-colors hover:text-ink"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {openNode.children.map((child, i) => {
                const cardInner = (
                  <>
                    <span
                      data-skin={SKIN}
                      className="block aspect-[4/3] w-full rounded-[2px] bg-line/40 transition-colors duration-300 group-hover:bg-line/70"
                    />
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-wide text-ink">
                      {child.label}
                    </span>
                  </>
                );
                const cls =
                  "group block w-[min(260px,80vw)]";
                if (child.external) {
                  return (
                    <a
                      key={`${child.label}-${i}`}
                      href={child.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                    >
                      {cardInner}
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-wide text-soft">
                        Opens in new tab ↗
                      </span>
                    </a>
                  );
                }
                return (
                  <Link
                    key={`${child.label}-${i}`}
                    href={`/work/${child.slug}`}
                    className={cls}
                    onClick={close}
                  >
                    {cardInner}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
