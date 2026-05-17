"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type { BentoCategory } from "@/content/types";
import { OPEN_BENTO_EVENT, CLOSE_BENTO_EVENT } from "./SiteHeader";

// Path One — the floating bento navigation (Reference Wireframe 01 + 02).
//
// Boxes are pure hairline shapes floating in white: outline only, no fill, no
// baseline rule, no shading, no caption. Centred skyline, Photographs tallest.
// Hover lifts a box and thickens its hairline. Clicking opens a pop-out: the
// other categories dim and the children resolve as a centred floating row.

// Skyline proportions from the wireframe (widths 92·118·150·118·92).
const SIZE: Record<BentoCategory, { w: string; ratio: string }> = {
  conceptual: { w: "clamp(72px, 9vw, 96px)", ratio: "92 / 92" },
  writing: { w: "clamp(92px, 12vw, 122px)", ratio: "118 / 164" },
  photographs: { w: "clamp(116px, 15vw, 156px)", ratio: "150 / 224" },
  installation: { w: "clamp(92px, 12vw, 122px)", ratio: "118 / 164" },
  apps: { w: "clamp(72px, 9vw, 96px)", ratio: "92 / 92" },
};

export default function BentoSystem() {
  const [openId, setOpenId] = useState<BentoCategory | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenId(null), []);

  // Open a category from the top-right nav, scrolling the bento into view.
  useEffect(() => {
    function onOpen(e: Event) {
      const id = (e as CustomEvent<string>).detail as BentoCategory;
      if (!bentoNav.some((n) => n.id === id)) return;
      setOpenId(id);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rootRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    }
    window.addEventListener(OPEN_BENTO_EVENT, onOpen);
    window.addEventListener(CLOSE_BENTO_EVENT, close);
    return () => {
      window.removeEventListener(OPEN_BENTO_EVENT, onOpen);
      window.removeEventListener(CLOSE_BENTO_EVENT, close);
    };
  }, [close]);

  // Close on Escape or a click outside the bento.
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
    <div ref={rootRef} className="flex w-full flex-col items-center">
      {/* Skyline — five hairline boxes floating in white, bottom-aligned. */}
      <div className="flex items-end justify-center gap-4 sm:gap-7">
        {bentoNav.map((node, i) => {
          const dimmed = openId !== null && openId !== node.id;
          const active = openId === node.id;
          return (
            <div
              key={node.id}
              id={node.id}
              className="bento-box"
              style={{ animationDelay: `${i * 90}ms`, scrollMarginTop: "var(--nav-h)" }}
            >
              <button
                type="button"
                aria-expanded={active}
                aria-controls="bento-children"
                onClick={() => setOpenId(active ? null : node.id)}
                className={[
                  "group flex flex-col items-center justify-center rounded-[7px]",
                  "border border-ink bg-transparent",
                  "transition-[transform,opacity,box-shadow] duration-500 ease-out",
                  "hover:-translate-y-2.5 hover:shadow-[inset_0_0_0_1px_#111111]",
                  active ? "shadow-[inset_0_0_0_1px_#111111]" : "",
                  dimmed ? "opacity-20" : "opacity-100",
                ].join(" ")}
                style={{ width: SIZE[node.id].w, aspectRatio: SIZE[node.id].ratio }}
              >
                <span className="px-1 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
                  {node.label}
                </span>
                <span className="mt-1.5 font-mono text-[10px] text-muted">
                  {node.count}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Pop-out — children resolve as a centred floating row. */}
      {openNode && (
        <div
          id="bento-children"
          role="region"
          aria-label={`${openNode.label} works`}
          className="bento-children mt-12 flex w-full max-w-3xl flex-wrap items-start justify-center gap-5"
        >
          {openNode.children.map((child, i) => {
            const project = child.slug ? getProject(child.slug) : undefined;
            const childCount = project?.children?.length ?? 0;
            const inner = (
              <>
                <span className="px-3 text-center font-serif text-[15px] font-light leading-snug text-ink">
                  {child.label}
                </span>
                {childCount > 0 && (
                  <span className="mt-2 font-mono text-[9px] uppercase tracking-wide text-muted">
                    {childCount} field sites →
                  </span>
                )}
                {child.external && (
                  <span className="mt-2 font-mono text-[9px] uppercase tracking-wide text-soft">
                    New tab ↗
                  </span>
                )}
              </>
            );
            const cls =
              "flex aspect-[158/120] w-[clamp(130px,20vw,176px)] flex-col items-center justify-center rounded-[7px] border border-ink bg-transparent transition-transform duration-300 ease-out hover:-translate-y-2";
            return child.external ? (
              <a
                key={`${child.label}-${i}`}
                href={child.external}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={`${child.label}-${i}`}
                href={`/work/${child.slug}`}
                className={cls}
                onClick={close}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
