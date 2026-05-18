import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import AboutContact from "@/components/AboutContact";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.artist} — field-based photography, writing, installation, and conceptual work made from ${site.location}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="pt-[var(--nav-h)]">
        <AboutContact />
      </main>
      <SiteFooter />
    </>
  );
}
