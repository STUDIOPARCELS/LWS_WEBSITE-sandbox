"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type { BentoCategory, BentoChild } from "@/content/types";
import { OPEN_BENTO_EVENT, CLOSE_BENTO_EVENT } from "./SiteHeader";

// Path One — vellum sleeve navigation.
//
// Five translucent vellum sleeves rest at the bottom of the homepage; most of
// the page is open white above them. Clicking a sleeve fans its contents — the
// project thumbnails held inside — out across the middle of the screen.

// ── The vellum sleeve: a frosted pocket with a notched front panel. ──────────
function VellumSleeve({
  label,
  count,
  active,
  dimmed,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      aria-controls="bento-fan"
      className={[
        "bento-box group relative block w-[clamp(104px,13vw,150px)]",
        "transition-[transform,opacity] duration-500 ease-out",
        "hover:-translate-y-2",
        active ? "-translate-y-2" : "",
        dimmed ? "opacity-25" : "opacity-100",
      ].join(" ")}
      style={{ aspectRatio: "100 / 124" }}
    >
      <svg
        viewBox="0 0 100 124"
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 14px 22px rgba(17,17,17,0.10))" }}
      >
        {/* Back panel — translucent vellum. */}
        <rect
          x="3"
          y="3"
          width="94"
          height="118"
          rx="13"
          fill="rgba(255,255,255,0.72)"
          stroke="rgba(17,17,17,0.07)"
        />
        {/* Front pocket panel — notched top edge. */}
        <path
          d="M5 64 L39 64 Q50 85 61 64 L95 64 L95 107 Q95 121 81 121 L19 121 Q5 121 5 107 Z"
          fill="rgba(255,255,255,0.95)"
          stroke="rgba(17,17,17,0.08)"
        />
      </svg>
      {/* Category label, set into the open upper part of the sleeve. */}
      <span className="pointer-events-none absolute inset-x-0 top-[24%] flex flex-col items-center">
        <span className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
          {label}
        </span>
        <span className="mt-1 font-mono text-[10px] text-muted">{count}</span>
      </span>
    </button>
  );
}

// ── A single fanned-out project thumbnail. ──────────────────────────────────
function FanCard({
  child,
  index,
  total,
  fanned,
  onNavigate,
}: {
  child: BentoChild;
  index: number;
  total: number;
  fanned: boolean;
  onNavigate: () => void;
}) {
  const project = child.slug ? getProject(child.slug) : undefined;
  const hero = project?.heroImage;

  const off = index - (total - 1) / 2;
  const stepX = "clamp(78px, 11vw, 158px)";
  const ty = Math.abs(off) * 20 - 8;
  const rot = off * 7;

  const fannedT = `translate(calc(-50% + (${off}) * ${stepX}), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(1)`;
  const stackedT = "translate(-50%, calc(-50% + 240px)) rotate(0deg) scale(0.5)";

  const inner = (
    <>
      <span className="block aspect-square w-full overflow-hidden rounded-[6px] bg-line/35">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : null}
      </span>
      <span className="mt-2 block text-center font-mono text-[9px] uppercase tracking-[0.1em] text-ink">
        {child.label}
      </span>
      {child.external && (
        <span className="mt-0.5 block text-center font-mono text-[8px] uppercase tracking-wide text-soft">
          New tab ↗
        </span>
      )}
    </>
  );

  const cls =
    "fan-card absolute left-1/2 top-1/2 block w-[clamp(118px,14vw,168px)] rounded-[9px] border border-line/70 bg-paper p-2.5 shadow-[0_18px_34px_rgba(17,17,17,0.13)]";
  const style: React.CSSProperties = {
    transform: fanned ? fannedT : stackedT,
    opacity: fanned ? 1 : 0,
    transitionDelay: `${index * 55}ms`,
    zIndex: 10 + index,
  };

  return child.external ? (
    <a
      href={child.external}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <Link href={`/work/${child.slug}`} className={cls} style={style} onClick={onNavigate}>
      {inner}
    </Link>
  );
}

export default function BentoSystem() {
  const [openId, setOpenId] = useState<BentoCategory | null>(null);
  const [fanned, setFanned] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setFanned(false);
    setOpenId(null);
  }, []);

  const open = useCallback((id: BentoCategory) => {
    setOpenId(id);
    setFanned(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setFanned(true)),
    );
  }, []);

  // Open from the top-right nav.
  useEffect(() => {
    function onOpen(e: Event) {
      const id = (e as CustomEvent<string>).detail as BentoCategory;
      if (!bentoNav.some((n) => n.id === id)) return;
      open(id);
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
  }, [open, close]);

  // Close on Escape or a click outside.
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
    <div
      ref={rootRef}
      className="relative flex min-h-[calc(100vh-var(--nav-h))] w-full flex-col items-center justify-end pb-20 pt-24"
    >
      {/* Fan — the project thumbnails held inside the open sleeve, spread
          across the middle of the screen. */}
      {openNode && (
        <div
          id="bento-fan"
          role="region"
          aria-label={`${openNode.label} works`}
          className="pointer-events-none absolute inset-0"
        >
          {openNode.children.map((child, i) => (
            <span key={`${child.label}-${i}`} className="pointer-events-auto">
              <FanCard
                child={child}
                index={i}
                total={openNode.children.length}
                fanned={fanned}
                onNavigate={close}
              />
            </span>
          ))}
        </div>
      )}

      {/* The vellum sleeves, resting along the bottom. */}
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {bentoNav.map((node, i) => (
          <div
            key={node.id}
            id={node.id}
            className="bento-box"
            style={{ animationDelay: `${i * 90}ms`, scrollMarginTop: "var(--nav-h)" }}
          >
            <VellumSleeve
              label={node.label}
              count={node.count}
              active={openId === node.id}
              dimmed={openId !== null && openId !== node.id}
              onClick={() => (openId === node.id ? close() : open(node.id))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
