// Data schema for Lisa Wood Studio (Master Build Prompt §9).
// Everything in the site hangs off these types — build step 1.

export type BentoCategory =
  | "conceptual"
  | "writing"
  | "photographs"
  | "installation"
  | "apps";

export type EditorialCategory =
  | "photographs"
  | "writing"
  | "surface-surveys"
  | "luxuriate"
  | "installation";

export type BentoSize = "short" | "tall" | "tallest";

export type JsonLdType =
  | "VisualArtwork"
  | "CreativeWork"
  | "Book"
  | "Collection"
  | "WebPage";

// Content readiness. `placeholder` rows are TODO(Lisa) scaffolds (§9):
// swapping in real content must be a data change only.
export type ContentStatus = "complete" | "placeholder";

export interface GalleryImage {
  src: string;
  // Real, descriptive alt text — project / field-site name + context (§6).
  alt: string;
  caption?: string;
}

export interface ProjectDetail {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  slug: string;
  /** Discipline label, e.g. "Photographs", "Writing". */
  practice: string;
  /** Experiential bento home (Path One). Null when not surfaced in a bento. */
  bentoCategory: BentoCategory | null;
  /** Editorial section home (Path Two). Null when not in an editorial section. */
  editorialCategory: EditorialCategory | null;
  /** Parent slug for dual-homed children (§5). */
  parent: string | null;
  /** Child slugs for flagship parents (§5). */
  children: string[] | null;
  /** True when this project renders both standalone and nested from one row. */
  dualHomed: boolean;
  shortDescription: string;
  longDescription: string;
  fieldNotes: string | null;
  heroImage: GalleryImage | null;
  galleryImages: GalleryImage[];
  /** Labelled body rows — OVERVIEW / FIRSTS / MATERIALS, field-site meta, etc. */
  details: ProjectDetail[];
  relatedProjects: string[];
  /** External destination — opens in a new tab (e.g. Micron House, solokit). */
  external: string | null;
  seoTitle: string;
  seoDescription: string;
  jsonLdType: JsonLdType;
  status: ContentStatus;
  /** Field-site block header support (§7). */
  years?: string;
  region?: string;
  /** Display format for non-photograph projects, e.g. "Book", "White Paper". */
  format?: string;
}

export interface BentoChild {
  label: string;
  /** Internal /work/[slug] target. */
  slug?: string;
  /** External destination — opens in a new tab. */
  external?: string;
}

export interface BentoNode {
  id: BentoCategory;
  label: string;
  /** LOCKED count from §3A — do not derive from children length. */
  count: number;
  size: BentoSize;
  caption: string;
  children: BentoChild[];
}

export interface EditorialNavItem {
  label: string;
  /** Homepage anchor id (Path Two smooth-scroll target). */
  anchor?: string;
  /** Standalone route target — used instead of anchor for routed pages. */
  href?: string;
}

export interface Practice {
  title: string;
  /** Homepage anchor id. */
  anchor: string;
  kicker: string;
  /** Headline with one word wrapped in <em> for the italic accent. */
  headline: string;
  summary: string;
  heroImage: GalleryImage | null;
  /** Project slugs surfaced in this editorial section. */
  projects: string[];
  status: ContentStatus;
}
