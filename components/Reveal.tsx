"use client";

import { useEffect, useRef } from "react";

// GSAP ScrollTrigger reveal — Master Build Prompt §6 & §10.7.
// Visual only: opacity/transform animate; the content is always in the DOM
// (never display:none or conditional render) so AI crawlers read it from the
// raw HTML. Reduced-motion users see content immediately.

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let killed = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });
      } catch {
        // If GSAP fails to load, content simply stays visible.
      }
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
