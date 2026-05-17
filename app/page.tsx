import SiteHeader from "@/components/SiteHeader";
import BentoSystem from "@/components/BentoSystem";
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
        {/* HOME — the floating bento, anchored low so the pop-out children
            have room to resolve above it (Wireframe 01 + 02). */}
        <section
          aria-label="Browse the work"
          className="relative flex min-h-[calc(100vh-var(--nav-h))] items-end justify-center px-6 pb-16 pt-20"
        >
          <h1 className="sr-only">
            {site.name} — field-based photography, writing, installation, and
            conceptual work by {site.artist}.
          </h1>
          <BentoSystem />
          <span className="pointer-events-none absolute bottom-8 right-7 font-mono text-[9px] uppercase tracking-wide text-muted sm:right-10 lg:right-16">
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
