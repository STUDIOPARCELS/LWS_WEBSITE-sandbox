"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bentoNav } from "@/content/navigation";
import { getProject } from "@/content/projects";
import type {
  BentoCategory,
  BentoChild,
  BentoNode,
  GalleryImage,
} from "@/content/types";
import { OPEN_BENTO_EVENT, CLOSE_BENTO_EVENT } from "./SiteHeader";

// Path One — staggered card navigation (Reference Wireframe screen 01).
//
// Five large rounded cards rest in a staggered two-column cluster; a serif
// category index sits to their right. Clicking a card — or an index entry —
// fans that category's project thumbnails up across the centre of the screen.

// Right-hand index — explicit wireframe order, top to bottom.
const INDEX_ORDER: BentoCategory[] = [
  "photographs",
  "writing",
  "installation",
  "conceptual",
  "apps",
];

// First child project carrying a hero image — the card's cover.
function categoryHero(node: BentoNode): GalleryImage | null {
  for (const child of node.children) {
    if (!child.slug) continue;
    const project = getProject(child.slug);
    if (project?.heroImage) return project.heroImage;
  }
  return null;
}

// ── A resting category card — a large rounded cover with a liquid-glass
//    label along its lower edge. ────────────────────────────────────────────
function CategoryCard({
  node,
  active,
  dimmed,
  aspect,
  onClick,
}: {
  node: BentoNode;
  active: boolean;
  dimmed: boolean;
  aspect: string;
  onClick: () => void;
}) {
  const hero = categoryHero(node);
  const [imgFailed, setImgFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The cover image may fail before React hydrates, so the onError handler
  // never fires — re-check the natural size once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setImgFailed(true);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      aria-controls="bento-fan"
      className={[
        "group relative block w-full overflow-hidden rounded-[14px] border border-line",
        "transition-[transform,opacity,box-shadow] duration-500 ease-out hover:-translate-y-1.5",
        "hover:shadow-[0_26px_52px_rgba(17,17,17,0.14)]",
        active
          ? "-translate-y-1.5 shadow-[0_26px_52px_rgba(17,17,17,0.14)]"
          : "shadow-[0_10px_30px_rgba(17,17,17,0.06)]",
        dimmed ? "opacity-30" : "opacity-100",
      ].join(" ")}
      style={{ aspectRatio: aspect }}
    >
      {/* Neutral vellum surface — always present, shows through if the
          cover image is unavailable. */}
      <span className="absolute inset-0 bg-gradient-to-b from-[#fbfbfa] to-[#ededea]" />
      {hero && !imgFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={hero.src}
          alt={hero.alt}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      {/* Quiet category mark for image-less cards. */}
      <span
        className={[
          "absolute inset-0 flex items-center justify-center font-serif text-[clamp(20px,2vw,30px)] text-soft",
          "transition-opacity duration-300",
          hero && !imgFailed ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {node.label}
      </span>
      <span className="liquid-glass absolute inset-x-0 bottom-0 flex items-baseline justify-between px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
          {node.label}
        </span>
        <span className="font-mono text-[10px] text-muted">{node.count}</span>
      </span>
    </button>
  );
}

// ── The drilled-into parent, rendered as a small bento sleeve the field
//    sites have fanned out of. ─────────────────────────────────────────────
function DrillSleeve({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted shadow-[0_8px_20px_rgba(17,17,17,0.08)] transition-colors hover:text-ink"
    >
      <span aria-hidden>←</span>
      {label}
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
}: {
  child: BentoChild;
  index: number;
  fanned: boolean;
  onNavigate: () => void;
  onDrill: (slug: string) => void;
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
  // Large, uniform, perfectly square tiles.
  const cls =
    "fan-card pointer-events-auto relative block aspect-square w-[clamp(158px,13.5vw,242px)] overflow-hidden rounded-[10px] shadow-[0_20px_38px_rgba(17,17,17,0.17)]";

  const inner = (
    <>
      {/* Square image fills the whole tile. */}
      <span className="absolute inset-0 bg-line/30">
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </span>
      {/* Liquid-glass label — overlaid along the bottom of the square tile. */}
      <span className="liquid-glass absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-3 py-2.5">
        <span className="line-clamp-2 break-words font-sans text-[10px] font-medium uppercase leading-[1.3] tracking-[0.04em] text-ink">
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

  // Resting cluster — left column holds three cards, the right column two,
  // dropped down to read as a staggered skyline (Reference Wireframe 01).
  const byId = (id: BentoCategory) => bentoNav.find((n) => n.id === id)!;
  const leftColumn: BentoCategory[] = ["photographs", "writing", "conceptual"];
  const rightColumn: BentoCategory[] = ["installation", "apps"];

  return (
    <div
      ref={rootRef}
      className="relative min-h-[calc(100vh-var(--nav-h))] w-full"
    >
      {/* Centred row fan — the open category's (or drilled project's) works. */}
      {openNode && (
        <div
          id="bento-fan"
          role="region"
          aria-label={`${fanLabel} works`}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-8"
        >
          <div className="flex flex-col items-center gap-[clamp(18px,2.2vw,38px)]">
            <div
              className="grid justify-items-center gap-x-[clamp(14px,1.8vw,34px)] gap-y-[clamp(16px,2vw,30px)]"
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
            {drillProject && (
              <div className="pointer-events-auto">
                <DrillSleeve
                  label={`Back to ${drillProject.title}`}
                  onClick={() => openId && open(openId)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resting state — staggered card cluster + serif category index. */}
      <div
        className={[
          "container-page grid items-center gap-x-12 gap-y-14 py-16 lg:py-24",
          "lg:grid-cols-[minmax(0,1fr)_clamp(150px,15vw,210px)]",
          "transition-opacity duration-300",
          openNode ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
        style={{ minHeight: "calc(100vh - var(--nav-h))" }}
      >
        {/* The five cards — a two-column staggered cluster. */}
        <div className="grid grid-cols-2 gap-5 sm:gap-7">
          <div className="flex flex-col gap-5 sm:gap-7">
            {leftColumn.map((id, i) => (
              <div
                key={id}
                id={id}
                className="bento-box"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <CategoryCard
                  node={byId(id)}
                  active={openId === id}
                  dimmed={false}
                  aspect="5 / 4"
                  onClick={() => open(id)}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-5 sm:mt-16 sm:gap-7">
            {rightColumn.map((id, i) => (
              <div
                key={id}
                id={id}
                className="bento-box"
                style={{ animationDelay: `${(i + 1) * 90}ms` }}
              >
                <CategoryCard
                  node={byId(id)}
                  active={openId === id}
                  dimmed={false}
                  aspect="4 / 5"
                  onClick={() => open(id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Serif category index — the wireframe's right-hand list. */}
        <nav aria-label="Categories" className="lg:pl-2">
          <ul className="flex flex-col gap-2.5">
            {INDEX_ORDER.map((id) => {
              const node = byId(id);
              const italic = id === "writing" || id === "conceptual";
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => open(id)}
                    className={[
                      "font-serif text-[17px] leading-snug text-muted",
                      "transition-colors hover:text-ink",
                      italic ? "italic" : "",
                    ].join(" ")}
                  >
                    {node.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <span className="mt-5 block h-px w-7 bg-line" />
        </nav>
      </div>
    </div>
  );
}
