"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type { BentoCategory, BentoChild } from "@/content/types";
import { OPEN_BENTO_EVENT, CLOSE_BENTO_EVENT } from "./SiteHeader";

// Path One — vellum sleeve navigation.
//
// Five translucent vellum sleeves rest low on the homepage as quiet physical
// objects; the centre stays open white. Sleeve sizes form a skyline with
// Photographs largest at the centre. Clicking a sleeve fans its project
// thumbnails up across the middle of the screen — each a thumbnail with a
// liquid-glass label (name / year / location-or-format) attached to its right.

// Skyline widths: short · tall · TALLEST · tall · short. Aspect held at 100/124.
const SLEEVE_W: Record<BentoCategory, string> = {
  conceptual: "clamp(88px, 8.1vw, 132px)",
  writing: "clamp(110px, 10.1vw, 165px)",
  photographs: "clamp(134px, 12.5vw, 202px)",
  installation: "clamp(110px, 10.1vw, 165px)",
  apps: "clamp(88px, 8.1vw, 132px)",
};

// ── The vellum sleeve: a notched pocket, shaded to read as a real object
//    sitting on a white page — layered contact + ambient shadow, soft form
//    gradients, the front pocket lifting off the back panel. ────────────────
function VellumSleeve({
  id,
  label,
  count,
  width,
  active,
  dimmed,
  onClick,
}: {
  id: string;
  label: string;
  count: number;
  width: string;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const g = `vs-${id}`;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      aria-controls="bento-fan"
      className={[
        "group relative block",
        "transition-[transform,opacity] duration-500 ease-out hover:-translate-y-2",
        active ? "-translate-y-2" : "",
        dimmed ? "opacity-30" : "opacity-100",
      ].join(" ")}
      style={{ width, aspectRatio: "100 / 124" }}
    >
      <svg
        viewBox="0 0 100 124"
        className="h-full w-full"
        style={{
          overflow: "visible",
          // Layered contact + ambient shadow — a grounded physical object.
          filter:
            "drop-shadow(0 1px 1.5px rgba(17,17,17,0.13)) drop-shadow(0 5px 8px rgba(17,17,17,0.10)) drop-shadow(0 15px 22px rgba(17,17,17,0.10)) drop-shadow(0 30px 44px rgba(17,17,17,0.07))",
        }}
      >
        <defs>
          <linearGradient id={`${g}-back`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ededeb" />
          </linearGradient>
          <linearGradient id={`${g}-pocket`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e7e7e4" />
            <stop offset="0.17" stopColor="#f6f6f4" />
            <stop offset="1" stopColor="#e6e6e3" />
          </linearGradient>
          <filter
            id={`${g}-pocketShadow`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="1.8"
              stdDeviation="2.4"
              floodColor="#111111"
              floodOpacity="0.16"
            />
          </filter>
        </defs>
        {/* Back panel — soft top-lit form. */}
        <rect
          x="3"
          y="3"
          width="94"
          height="118"
          rx="13"
          fill={`url(#${g}-back)`}
          stroke="rgba(17,17,17,0.05)"
          strokeWidth="0.8"
        />
        {/* Front pocket — lifts off the back panel, dark at the notched mouth. */}
        <path
          d="M5 64 L39 64 Q50 85 61 64 L95 64 L95 107 Q95 121 81 121 L19 121 Q5 121 5 107 Z"
          fill={`url(#${g}-pocket)`}
          stroke="rgba(17,17,17,0.06)"
          strokeWidth="0.8"
          filter={`url(#${g}-pocketShadow)`}
        />
        {/* Lip highlight — the pocket rim catching light. */}
        <path
          d="M5 64 L39 64 Q50 85 61 64 L95 64"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="pointer-events-none absolute inset-x-0 top-[23%] flex flex-col items-center">
        <span className="text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
          {label}
        </span>
        <span className="mt-1 font-mono text-[10px] text-muted">{count}</span>
      </span>
    </button>
  );
}

// ── A fanned project card. A card whose project has its own children
//    drills into a nested fan instead of navigating. ───────────────────────
function FanCard({
  child,
  index,
  fanned,
  onNavigate,
  onDrill,
  large = false,
}: {
  child: BentoChild;
  index: number;
  fanned: boolean;
  onNavigate: () => void;
  onDrill: (slug: string) => void;
  large?: boolean;
}) {
  const project = child.slug ? getProject(child.slug) : undefined;
  const hero = project?.heroImage;
  const name = project?.title ?? child.label;
  const year = project?.years ?? "";
  const childCount = project?.children?.length ?? 0;
  const hasChildren = childCount > 0;

  // No curvature — cards sit in a straight grid, rising in on open.
  const style: React.CSSProperties = {
    transform: fanned ? "translateY(0)" : "translateY(42px)",
    opacity: fanned ? 1 : 0,
    transitionDelay: `${index * 55}ms`,
  };
  const cls = [
    "fan-card pointer-events-auto flex flex-col overflow-hidden rounded-[8px]",
    "shadow-[0_18px_34px_rgba(17,17,17,0.16)]",
    large ? "w-[clamp(118px,8.75vw,150px)]" : "w-[clamp(98px,7.4vw,134px)]",
  ].join(" ");

  const inner = (
    <>
      {/* Portrait thumbnail — the dominant element. */}
      <span
        className="block w-full shrink-0 bg-line/30"
        style={{ aspectRatio: "3 / 4" }}
      >
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </span>
      {/* Liquid-glass label — set below the tile. */}
      <span className="liquid-glass flex flex-col gap-1 px-2.5 py-2.5">
        <span className="line-clamp-2 break-words font-sans text-[9px] font-medium uppercase leading-[1.3] tracking-[0.04em] text-ink">
          {name}
        </span>
        {hasChildren ? (
          <span className="font-sans text-[8px] uppercase tracking-[0.08em] text-muted">
            {childCount} field sites →
          </span>
        ) : year ? (
          <span className="font-sans text-[8px] uppercase tracking-[0.08em] text-muted">
            {year}
          </span>
        ) : null}
      </span>
    </>
  );

  // Parent project — drill into a nested fan of its children.
  if (hasChildren && child.slug) {
    const slug = child.slug;
    return (
      <button type="button" className={cls} style={style} onClick={() => onDrill(slug)}>
        {inner}
      </button>
    );
  }

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
  // Slug of a parent project drilled into (its children fan in its place).
  const [drillSlug, setDrillSlug] = useState<string | null>(null);
  const [fanned, setFanned] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const reanimate = useCallback(() => {
    setFanned(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setFanned(true)),
    );
  }, []);

  const close = useCallback(() => {
    setFanned(false);
    setOpenId(null);
    setDrillSlug(null);
  }, []);

  const open = useCallback(
    (id: BentoCategory) => {
      setOpenId(id);
      setDrillSlug(null);
      reanimate();
    },
    [reanimate],
  );

  // Clicking a parent card swaps the fan for that project's children.
  const drill = useCallback(
    (slug: string) => {
      setDrillSlug(slug);
      reanimate();
    },
    [reanimate],
  );

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
  const drillProject = drillSlug ? getProject(drillSlug) : null;
  // What the centred fan shows: a drilled project's children, else the
  // open category's children.
  const fanItems: BentoChild[] = drillProject
    ? (drillProject.children ?? []).map((s) => ({
        label: getProject(s)?.title ?? s,
        slug: s,
      }))
    : (openNode?.children ?? []);
  const fanLabel = drillProject?.title ?? openNode?.label ?? "";
  const showCenteredFan =
    openNode !== null && (drillSlug !== null || openNode.children.length > 3);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[calc(100vh-var(--nav-h))] w-full flex-col items-center justify-end pb-10 pt-24"
    >
      {/* Centred row fan — large categories, and any drilled-into parent.
          When drilled, the parent itself becomes a larger bento sleeve and
          its children fan out from above it. */}
      {showCenteredFan && (
        <div
          id="bento-fan"
          role="region"
          aria-label={`${fanLabel} works`}
          className="pointer-events-none absolute inset-x-0 flex items-center justify-center px-8"
          style={{ top: "0px", bottom: "300px" }}
        >
          <div className="flex flex-col items-center gap-[clamp(30px,3.4vw,56px)]">
            <div
              className="grid justify-items-center gap-x-[clamp(28px,4vw,80px)] gap-y-[clamp(16px,2vw,30px)]"
              style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
            >
              {fanItems.map((child, i) => (
                <FanCard
                  key={`${child.label}-${i}`}
                  child={child}
                  index={i}
                  fanned={fanned}
                  onNavigate={close}
                  onDrill={drill}
                />
              ))}
            </div>
            {/* The drilled-into parent, shown as a larger bento sleeve that
                its field sites have fanned out of. */}
            {drillProject && (
              <div className="pointer-events-auto">
                <VellumSleeve
                  id={`drill-${drillProject.slug}`}
                  label={drillProject.title}
                  count={drillProject.children?.length ?? 0}
                  width="clamp(120px,10vw,160px)"
                  active
                  dimmed={false}
                  onClick={() => openId && open(openId)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* The vellum sleeves, resting along the bottom as a skyline. Small
          categories (≤3 works) resolve their cards directly above their own
          sleeve, left-justified. */}
      <div className="flex items-end justify-center gap-4 sm:gap-7">
        {bentoNav.map((node, i) => (
          <div
            key={node.id}
            id={node.id}
            className="bento-box relative"
            style={{ animationDelay: `${i * 90}ms`, scrollMarginTop: "var(--nav-h)" }}
          >
            {openId === node.id && node.children.length <= 3 && !drillSlug && (
              <div
                role="region"
                aria-label={`${node.label} works`}
                className="absolute bottom-[calc(100%+120px)] left-1/2 z-20 flex -translate-x-1/2 items-end gap-[clamp(30px,3.2vw,56px)]"
              >
                {node.children.map((child, ci) => (
                  <FanCard
                    key={`${child.label}-${ci}`}
                    child={child}
                    index={ci}
                    fanned={fanned}
                    onNavigate={close}
                    onDrill={drill}
                    large
                  />
                ))}
              </div>
            )}
            <VellumSleeve
              id={node.id}
              label={node.label}
              count={node.count}
              width={SLEEVE_W[node.id]}
              active={openId === node.id}
              dimmed={openId !== null && openId !== node.id}
              onClick={() => {
                if (openId === node.id && !drillSlug) close();
                else open(node.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
