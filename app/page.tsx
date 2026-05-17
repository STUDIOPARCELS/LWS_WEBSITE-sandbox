import SiteHeader from "@/components/SiteHeader";
import BentoSystem from "@/components/BentoSystem";
import EditorialSection from "@/components/EditorialSection";
import AboutContact from "@/components/AboutContact";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { practices } from "@/content/practices";
import { practiceCollectionJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export default function HomePage() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
  };

  return (
    <>
      <JsonLd
        data={[websiteJsonLd, ...practices.map(practiceCollectionJsonLd)]}
      />
      <SiteHeader />

      <main id="top" className="pt-[var(--nav-h)]">
        {/* HOME HERO */}
        <section
          aria-label="Introduction"
          className="container-page pb-16 pt-20 sm:pt-28"
        >
          <Reveal>
            <p className="kicker">Lisa Wood Studio</p>
            <h1 className="headline-serif mt-6 text-[clamp(40px,8vw,86px)]">
              Landscape at the
              <br />
              edge of <em>attention</em>
            </h1>
            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted">
              A field-based practice across photography, writing, installation,
              and conceptual work — made in remote terrain through exposure,
              duration, and sustained attention. Two ways in: explore by feel,
              or read by discipline.
            </p>
          </Reveal>
        </section>

        {/* BENTO SYSTEM — Path One */}
        <section
          aria-label="Browse the work"
          className="container-page pb-24 sm:pb-32"
        >
          <BentoSystem />
        </section>

        {/* EDITORIAL SECTIONS — Path Two destinations */}
        {practices.map((practice) => (
          <EditorialSection key={practice.anchor} practice={practice} />
        ))}

        {/* ABOUT / CONTACT */}
        <AboutContact />
      </main>

      <SiteFooter />
    </>
  );
}
