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
  conceptual: "clamp(84px, 9.5vw, 114px)",
  writing: "clamp(102px, 12vw, 140px)",
  photographs: "clamp(124px, 15vw, 172px)",
  installation: "clamp(102px, 12vw, 140px)",
  apps: "clamp(84px, 9.5vw, 114px)",
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

// ── A fanned project card: thumbnail + liquid-glass label panel. ─────────────
function FanCard({
  child,
  frac,
  index,
  fanned,
  onNavigate,
}: {
  child: BentoChild;
  frac: number;
  index: number;
  fanned: boolean;
  onNavigate: () => void;
}) {
  const project = child.slug ? getProject(child.slug) : undefined;
  const hero = project?.heroImage;
  const name = project?.title ?? child.label;
  const year = project?.years ?? "";
  const isPhoto = project?.practice === "Photographs";
  const third = child.external
    ? "App"
    : isPhoto
      ? (project?.region ?? "Photographs")
      : (project?.format ?? project?.practice ?? "");

  // Evenly spread across a fixed span so the fan reads centred with air.
  const span = "clamp(360px, 60vw, 900px)";
  const ty = Math.abs(frac) * 42 - 14;
  const rot = frac * 9;
  const fannedT = `translate(calc(-50% + (${frac}) * (${span} / 2)), calc(-50% + ${ty}px)) rotate(${rot}deg) scale(1)`;
  const stackedT = "translate(-50%, calc(-50% + 230px)) rotate(0deg) scale(0.55)";

  const style: React.CSSProperties = {
    transform: fanned ? fannedT : stackedT,
    opacity: fanned ? 1 : 0,
    transitionDelay: `${index * 55}ms`,
    zIndex: 10 + index,
  };
  const cls =
    "fan-card pointer-events-auto absolute left-1/2 top-1/2 flex h-[clamp(116px,14.5vw,140px)] w-[clamp(196px,24vw,238px)] overflow-hidden rounded-[10px] shadow-[0_22px_40px_rgba(17,17,17,0.17)]";

  const inner = (
    <>
      <span className="relative block w-[44%] shrink-0 bg-line/35">
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
      <span className="liquid-glass flex w-[56%] flex-col justify-center gap-1 px-3">
        <span className="line-clamp-2 font-serif text-[13px] font-light leading-tight text-ink">
          {name}
        </span>
        {year && (
          <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
            {year}
          </span>
        )}
        {third && (
          <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
            {third}
          </span>
        )}
      </span>
    </>
  );

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

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[calc(100vh-var(--nav-h))] w-full flex-col items-center justify-end pb-20 pt-24"
    >
      {/* Fan — the project thumbnails held inside the open sleeve. */}
      {openNode && (
        <div
          id="bento-fan"
          role="region"
          aria-label={`${openNode.label} works`}
          className="pointer-events-none absolute inset-0"
        >
          {openNode.children.map((child, i) => {
            const n = openNode.children.length;
            const frac = n <= 1 ? 0 : (i - (n - 1) / 2) / ((n - 1) / 2);
            return (
              <FanCard
                key={`${child.label}-${i}`}
                child={child}
                frac={frac}
                index={i}
                fanned={fanned}
                onNavigate={close}
              />
            );
          })}
        </div>
      )}

      {/* The vellum sleeves, resting along the bottom as a skyline. */}
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {bentoNav.map((node, i) => (
          <div
            key={node.id}
            id={node.id}
            className="bento-box"
            style={{ animationDelay: `${i * 90}ms`, scrollMarginTop: "var(--nav-h)" }}
          >
            <VellumSleeve
              id={node.id}
              label={node.label}
              count={node.count}
              width={SLEEVE_W[node.id]}
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
