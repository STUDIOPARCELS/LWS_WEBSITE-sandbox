import type { BentoNode, EditorialNavItem } from "./types";

// content/navigation.ts — Master Build Prompt §3 & §9.
//
// bentoNav (Path One) and editorialNav (Path Two) are intentionally DIFFERENT
// cuts of the work. Conceptual & Apps are absent from the editorial nav by
// design; Surface Surveys & Luxuriate in Discomfort are promoted to top-level
// editorial sections though they also live within disciplines. Do not
// reconcile the two structures.

// Path One — experiential bento navigation.
// Counts and sizes are LOCKED (§3A). Skyline: short · tall · TALLEST · tall ·
// short, with Photographs at the centre and largest.
export const bentoNav: BentoNode[] = [
  {
    id: "conceptual",
    label: "Conceptual",
    count: 2,
    size: "short",
    caption: "Ideas staged as public propositions.",
    children: [
      { label: "LUX", slug: "lux" },
      { label: "21st Century", slug: "21st-century" },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    count: 6,
    size: "tall",
    caption: "Essays, digests, and long-form text.",
    children: [
      { label: "Luxuriate In Discomfort", slug: "luxuriate-book" },
      { label: "A Veiled Sanctuary", slug: "a-veiled-sanctuary" },
      { label: "Lost Vibrations White Paper", slug: "lost-vibrations-white-paper" },
      { label: "Time of Becoming", slug: "time-of-becoming" },
      { label: "How to Fall", slug: "how-to-fall" },
      { label: "Attention", slug: "attention" },
    ],
  },
  {
    id: "photographs",
    label: "Photographs",
    count: 6,
    size: "tallest",
    caption: "Field-based bodies of photographic work.",
    children: [
      { label: "Surface Surveys", slug: "surface-surveys" },
      { label: "Winterblue", slug: "winterblue" },
      { label: "Totems & Sentinels", slug: "totems-and-sentinels" },
      { label: "Flipped", slug: "flipped" },
      { label: "Omani Landscapes", slug: "omani-landscapes" },
      { label: "Observatory Commission", slug: "observatory-commission" },
    ],
  },
  {
    id: "installation",
    label: "Installation",
    count: 6,
    size: "tall",
    caption: "Works staged in space and time.",
    children: [
      { label: "December, Sun Valley", slug: "luxuriate-installation" },
      { label: "Mind the Gap", slug: "mind-the-gap" },
      { label: "Side Effects", slug: "side-effects" },
      { label: "ECS", slug: "ecs" },
      { label: "Installation (Untitled)", slug: "installation-five" },
      { label: "Installation (Untitled)", slug: "installation-six" },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    count: 2,
    size: "short",
    caption: "Standalone ventures, opened in a new tab.",
    children: [
      { label: "Micron House", external: "https://micron-house.vercel.app" },
      { label: "Solokit", external: "https://solokit.vercel.app" },
    ],
  },
];

// Path Two — editorial top-right navigation. EXACT order, left to right.
export const editorialNav: EditorialNavItem[] = [
  { label: "Photographs", anchor: "photographs" },
  { label: "Writing", anchor: "writing" },
  { label: "Luxuriate in Discomfort", anchor: "luxuriate" },
  { label: "Surface Surveys", anchor: "surface-surveys" },
  { label: "Installation", anchor: "installation" },
];
