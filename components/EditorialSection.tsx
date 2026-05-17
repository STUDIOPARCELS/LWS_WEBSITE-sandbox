import type { Practice } from "@/content/types";
import ProjectThumb from "./ProjectThumb";
import Reveal from "./Reveal";

// Editorial section — Path Two destination (§4). Content-driven and NOT a
// mirror image of its siblings: the layout varies by `variant`. All text is
// server-rendered into the HTML for AI discoverability (§6).

type Variant = "split" | "grid" | "feature";

const VARIANT: Record<string, Variant> = {
  photographs: "grid",
  writing: "grid",
  "surface-surveys": "split",
  luxuriate: "feature",
  installation: "grid",
};

function Header({ practice }: { practice: Practice }) {
  return (
    <div className="max-w-2xl">
      <p className="kicker">{practice.kicker}</p>
      <h2
        className="headline-serif mt-4 text-[clamp(28px,4vw,46px)]"
        dangerouslySetInnerHTML={{ __html: practice.headline }}
      />
      <p className="mt-6 text-[15px] leading-relaxed text-muted">
        {practice.summary}
      </p>
      {practice.status === "placeholder" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-soft">
          TODO(Lisa) — final section copy pending
        </p>
      )}
    </div>
  );
}

export default function EditorialSection({ practice }: { practice: Practice }) {
  const variant = VARIANT[practice.anchor] ?? "grid";

  return (
    <section
      id={practice.anchor}
      aria-labelledby={`${practice.anchor}-title`}
      className="border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <span id={`${practice.anchor}-title`} className="sr-only">
          {practice.title}
        </span>

        {variant === "split" && (
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[42%_58%] lg:items-center">
              <Header practice={practice} />
              {practice.heroImage && (
                <figure className="overflow-hidden bg-line/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={practice.heroImage.src}
                    alt={practice.heroImage.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </figure>
              )}
            </div>
          </Reveal>
        )}

        {variant === "feature" && (
          <Reveal>
            {practice.heroImage && (
              <figure className="mb-12 aspect-[16/7] w-full overflow-hidden bg-line/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={practice.heroImage.src}
                  alt={practice.heroImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </figure>
            )}
            <Header practice={practice} />
          </Reveal>
        )}

        {variant === "grid" && (
          <Reveal>
            <Header practice={practice} />
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
            {practice.projects.map((slug) => (
              <li key={slug}>
                <ProjectThumb slug={slug} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
