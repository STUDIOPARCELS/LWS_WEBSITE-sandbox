import type { Practice } from "./types";
import { bucketUrl } from "@/lib/supabase";

// content/practices.ts — Master Build Prompt §4 & §9.
//
// One entry per editorial section (Path Two destination). Anchors match
// editorialNav. Sections are NOT mirror images — the EditorialSection
// component varies its template from this content. Summary copy marked
// `placeholder` is TODO(Lisa) until final copy is supplied.

export const practices: Practice[] = [
  {
    title: "Photographs",
    anchor: "photographs",
    kicker: "Photographs",
    headline: "Field-based <em>studies</em> of remote terrain",
    summary:
      "Bodies of photographic work built through immersion — repetition, duration, and close observation in remote terrain, often alone and under physically demanding conditions.",
    heroImage: {
      src: bucketUrl("CRATERS/craters-env-web-2000px/Untitled_Panorama-1.webp"),
      alt: "Aerial panorama of the Craters of the Moon lava field by Lisa Wood Studio.",
    },
    projects: [
      "surface-surveys",
      "winterblue",
      "totems-and-sentinels",
      "flipped",
      "omani-landscapes",
      "photographs-series-six",
    ],
    status: "complete",
  },
  {
    title: "Writing",
    anchor: "writing",
    kicker: "Writing",
    headline: "Text shaped by <em>attention</em>",
    summary:
      "TODO(Lisa): editorial summary for the Writing section — essays, digests, white papers, and long-form text from the studio.",
    heroImage: null,
    projects: [
      "luxuriate-book",
      "a-veiled-sanctuary",
      "lost-vibrations-white-paper",
      "time-of-becoming",
      "how-to-fall",
      "writing-six",
    ],
    status: "placeholder",
  },
  {
    title: "Surface Surveys",
    anchor: "surface-surveys",
    kicker: "Surface Surveys",
    headline: "A six-part aerial <em>study</em>",
    summary:
      "A field-based body of work documenting six remote and geologically significant landscapes across three continents. Created between 2015 and 2019 with a medium-format Leica S007, Surface Surveys moves across sand, ice, lava, gypsum, and granite.",
    heroImage: {
      src: bucketUrl("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006196.jpg"),
      alt: "Aerial panorama of the parallel dunes of the Simpson Desert from Surface Surveys by Lisa Wood Studio.",
    },
    projects: [
      "greenland",
      "white-sands",
      "craters",
      "simpson-desert",
      "wahiba",
      "city-of-rocks",
    ],
    status: "complete",
  },
  {
    title: "Luxuriate in Discomfort",
    anchor: "luxuriate",
    kicker: "Luxuriate in Discomfort",
    headline: "An eight-year <em>practice</em>",
    summary:
      "A studio philosophy carried across three projects — a book, a one-night installation, and a public art project concept to improve teenage mental health.",
    heroImage: {
      src: bucketUrl("LUXURIATE IN DISCOMFORT/L1009938 book in mirrorRE copy.jpg"),
      alt: "The Luxuriate In Discomfort book reflected in a mirror by Lisa Wood Studio.",
    },
    projects: ["luxuriate-book", "luxuriate-installation", "lux"],
    status: "complete",
  },
  {
    title: "Installation",
    anchor: "installation",
    kicker: "Installation",
    headline: "Works staged in <em>space</em>",
    summary:
      "TODO(Lisa): editorial summary for the Installation section — works staged in space and time, beginning with the one-night installation December, Sun Valley.",
    heroImage: {
      src: bucketUrl("LUXURIATE IN DISCOMFORT/L1009866 owning.jpg"),
      alt: "The one-night installation December, Sun Valley, by Lisa Wood Studio.",
    },
    projects: [
      "luxuriate-installation",
      "installation-two",
      "installation-three",
      "installation-four",
      "installation-five",
      "installation-six",
    ],
    status: "placeholder",
  },
];

export const practiceByAnchor: Record<string, Practice> = Object.fromEntries(
  practices.map((p) => [p.anchor, p]),
);
