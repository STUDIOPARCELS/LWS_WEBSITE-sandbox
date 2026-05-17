import type { Metadata } from "next";
import "./globals.css";
import { site, absoluteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { personJsonLd, organizationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Field-Based Photography, Writing & Installation`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    images: [{ url: absoluteUrl(site.ogImage), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [absoluteUrl(site.ogImage)],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Newsreader (serif) + IBM Plex Mono (mono) — §9 stand-in faces.
            Loaded as a stylesheet so a build never depends on a font fetch. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <JsonLd data={[personJsonLd(), organizationJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
