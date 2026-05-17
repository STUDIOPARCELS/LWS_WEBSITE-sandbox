import { site } from "@/lib/site";
import Reveal from "./Reveal";

// About / Contact — closing block of the homepage (§2).
// Biography copy is verbatim from the Observatory presentation (§8).

export default function AboutContact() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <Reveal>
          <p className="kicker">About</p>
          <h2
            id="about-title"
            className="headline-serif mt-4 text-[clamp(28px,4vw,46px)]"
          >
            Lisa <em>Wood</em>
          </h2>

          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <div>
              <p className="kicker">Practice</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Over the past decade, Lisa has produced 17 projects and more
                than 200 works across photography, mixed media, public
                installation, text, and essay. The work is built through
                immersion — repetition, duration, and close observation in
                remote terrain, often alone and under physically demanding
                conditions.
              </p>
            </div>
            <div>
              <p className="kicker">Place</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Born in Naples, Italy. Raised in Pittsburgh. BA in English
                Literature, College of William &amp; Mary. Mother of two sons.
                Sun Valley resident since 1992.
              </p>
            </div>
            <div id="contact">
              <p className="kicker">Contact</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                <a
                  href={`mailto:${site.email}`}
                  className="border-b border-line pb-0.5 text-ink"
                >
                  {site.email}
                </a>
                <br />
                <span className="mt-2 inline-block">{site.phone}</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
