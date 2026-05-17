"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/types";

// Horizontal carousel — Master Build Prompt §7. A deliberate departure from
// the Observatory's vertical scroll: snap, swipe/drag, arrow keys, thin-line
// prev/next, a counter, and a caption under the active image. No vertical
// scroll through images.

export default function ProjectCarousel({
  images,
  label,
}: {
  images: GalleryImage[];
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(track!.children) as HTMLElement[];
        const center = track!.scrollLeft + track!.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
          const dist = Math.abs(slideCenter - center);
          if (dist < best) {
            best = dist;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function go(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  if (images.length === 0) return null;

  return (
    <div
      className="select-none"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      tabIndex={0}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="relative w-[min(86%,820px)] shrink-0 snap-center"
          >
            <div className="aspect-[3/2] w-full overflow-hidden bg-line/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading={i <= 1 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <p className="font-mono text-[11px] italic text-muted">
          {images[active]?.caption ?? images[active]?.alt}
        </p>
        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] tracking-wide text-soft">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              className="font-mono text-[13px] text-ink disabled:text-line"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(active + 1)}
              disabled={active === images.length - 1}
              className="font-mono text-[13px] text-ink disabled:text-line"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
