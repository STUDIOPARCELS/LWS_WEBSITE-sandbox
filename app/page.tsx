import SiteHeader from "@/components/SiteHeader";
import HomeHero from "@/components/HomeHero";
import EditorialSection from "@/components/EditorialSection";
import AboutContact from "@/components/AboutContact";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
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
        {/* HOME — five category cards in a staggered grid with a textual
            category index alongside (Reference Wireframe). */}
        <section aria-label="Browse the work" className="relative bg-paper">
          <h1 className="sr-only">
            {site.name} — field-based photography, writing, installation, and
            conceptual work by {site.artist}.
          </h1>
          <HomeHero />
          <span className="pointer-events-none absolute bottom-10 right-7 font-mono text-[10px] uppercase tracking-[0.2em] text-soft sm:right-10 lg:right-16">
            {site.location}
          </span>
        </section>

        {/* EDITORIAL SECTIONS — the work, read by discipline. */}
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
