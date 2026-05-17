import type { Project, ContentStatus } from "./types";

// content/projects.ts — Master Build Prompt §9, build step 1.
//
// Content marked `status: "placeholder"` is a TODO(Lisa) scaffold: the
// architecture, routing, and schema around it are real; only the copy and
// imagery are pending. Swapping in final content must be a data change only.
//
// Verbatim copy (Surface Surveys, the six field sites, Luxuriate in Discomfort
// and its three sub-projects, Winterblue) is taken from the live Observatory
// presentation per §8 — do not paraphrase.

const IMG = "/assets/gallery/1200";

// TODO(Lisa) scaffold: a routable, schema-valid project with no final content.
function placeholder(
  slug: string,
  title: string,
  practice: string,
  opts: Partial<Project> = {},
): Project {
  return {
    title,
    slug,
    practice,
    bentoCategory: null,
    editorialCategory: null,
    parent: null,
    children: null,
    dualHomed: false,
    shortDescription: `TODO(Lisa): short description for ${title}.`,
    longDescription: `TODO(Lisa): full description for ${title}.`,
    fieldNotes: null,
    heroImage: null,
    galleryImages: [],
    details: [],
    relatedProjects: [],
    external: null,
    seoTitle: `${title} — Lisa Wood Studio`,
    seoDescription: `${title}, a project by Lisa Wood Studio. Description pending.`,
    jsonLdType: "CreativeWork",
    status: "placeholder" as ContentStatus,
    ...opts,
  };
}

export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────
  // FLAGSHIP PARENT — Surface Surveys (§5)
  // ──────────────────────────────────────────────────────────────────────
  {
    title: "Surface Surveys",
    slug: "surface-surveys",
    practice: "Photographs",
    bentoCategory: "photographs",
    editorialCategory: "surface-surveys",
    parent: null,
    children: [
      "greenland",
      "white-sands",
      "craters",
      "simpson-desert",
      "wahiba",
      "city-of-rocks",
    ],
    dualHomed: false,
    shortDescription:
      "A six-part aerial study of remote terrain across three continents.",
    longDescription:
      "A field-based body of work documenting six remote and geologically significant landscapes across three continents. Created between 2015 and 2019 with a medium-format Leica S007, Surface Surveys moves across sand, ice, lava, gypsum, and granite — terrains shaped by wind, ice, volcanic activity, erosion, and mineral deposit.",
    fieldNotes:
      "Three of the six surveys are the first aerial photographic studies of their kind.",
    heroImage: {
      src: `${IMG}/surveys/04-simpson-desert-l1006196-pano-ec4aff03.webp`,
      alt: "Aerial panorama of the parallel dunes of the Simpson Desert, from Lisa Wood Studio's Surface Surveys.",
    },
    galleryImages: [
      {
        src: `${IMG}/surveys/01-l1001363-1-ce5e5b1e.webp`,
        alt: "Aerial study of remote terrain from Surface Surveys by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/surveys/03-l1008450-match-option-1-ew-1-50284ac7.webp`,
        alt: "Aerial study of volcanic surface from Surface Surveys by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/surveys/05-l1006654-01596aea.webp`,
        alt: "Aerial study of desert sand from Surface Surveys by Lisa Wood Studio.",
      },
    ],
    details: [
      {
        label: "Overview",
        value:
          "A field-based body of work documenting six remote and geologically significant landscapes across three continents. Created between 2015 and 2019 with a medium-format Leica S007, Surface Surveys moves across sand, ice, lava, gypsum, and granite.",
      },
      {
        label: "Firsts",
        value:
          "Three of the six surveys are the first aerial photographic studies of their kind.",
      },
    ],
    relatedProjects: ["winterblue"],
    external: null,
    seoTitle: "Surface Surveys — Aerial Studies of Remote Terrain | Lisa Wood Studio",
    seoDescription:
      "Surface Surveys: a six-part aerial study of remote and geologically significant landscapes across three continents, created 2015–2019 by Lisa Wood Studio.",
    jsonLdType: "Collection",
    status: "complete",
    years: "2015 — 2019",
  },

  // Field sites — dual-homed children of Surface Surveys (§5), fixed order.
  {
    title: "Greenland",
    slug: "greenland",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "The largest ice sheet outside Antarctica, surveyed from the air.",
    longDescription:
      "The largest ice sheet outside Antarctica, covering 1.7 million square kilometers and reaching more than three kilometers thick. The ice holds a layered archive of past atmospheres, snowfall, volcanic events, and climate shifts. At its western edge, the Ilulissat Icefjord — a UNESCO World Heritage Site since 2004 — is fed by Sermeq Kujalleq, one of the world's fastest-moving glaciers.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-greenland/07-ilulissat-greenland-1-443d7581.webp`,
      alt: "Aerial photograph of the Ilulissat Icefjord, Greenland, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-greenland/01-l1000364-b215d3a9.webp`,
        alt: "Aerial study of the Greenland Ice Sheet by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-greenland/03-l1001406-12be130b.webp`,
        alt: "Layered glacial ice of Greenland photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-greenland/06-l1001867-6cb5b899.webp`,
        alt: "Western edge of the Greenland Ice Sheet near the Ilulissat Icefjord, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-greenland/08-ilulissat-greenland-2-copy-1-af0ab55d.webp`,
        alt: "Sermeq Kujalleq glacier at Ilulissat, Greenland, photographed by Lisa Wood Studio.",
      },
    ],
    details: [
      { label: "Latitude", value: "68°N" },
      {
        label: "Status",
        value: "Ilulissat Icefjord — UNESCO World Heritage Site: 2004",
      },
    ],
    relatedProjects: ["white-sands", "craters"],
    external: null,
    seoTitle: "Greenland — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "Greenland field site from Lisa Wood Studio's Surface Surveys — an aerial study of the largest ice sheet outside Antarctica and the Ilulissat Icefjord.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2015, 2017",
    region: "Greenland",
  },
  {
    title: "White Sands",
    slug: "white-sands",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "The world's largest gypsum dunefield, surveyed from restricted airspace.",
    longDescription:
      "The world's largest gypsum dunefield, a 275-square-mile expanse of white mineral sand in the Tularosa Basin. Airspace above the park is restricted from ground to space — surrounded by White Sands Missile Range to the north and Holloman Air Force Base to the east. On July 16, 1945, the world's first atomic bomb was detonated at Trinity Site, sixty miles north of the park.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-white-sands/06-l1009887-lws-1e7d75b2.webp`,
      alt: "Aerial photograph of the White Sands gypsum dunefield, New Mexico, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-white-sands/01-l1000059-lws-ba3017a3.webp`,
        alt: "Gypsum dunes of White Sands National Park photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-white-sands/02-l1001382-lws-95b5a24e.webp`,
        alt: "White mineral sand of the Tularosa Basin, White Sands, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-white-sands/04-l1000950-86841d33.webp`,
        alt: "Aerial study of the White Sands gypsum dunefield by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-white-sands/07-l1009922-lws-33b9be57.webp`,
        alt: "Wind-shaped gypsum dunes at White Sands National Park by Lisa Wood Studio.",
      },
    ],
    details: [
      { label: "Latitude", value: "32°N" },
      {
        label: "Status",
        value:
          "U.S. National Monument: 1933 — Redesignated U.S. National Park: 2019",
      },
      {
        label: "Distinction",
        value:
          "First known photographic aerial survey of the world's largest gypsum dunefield (2018).",
      },
    ],
    relatedProjects: ["greenland", "craters"],
    external: null,
    seoTitle: "White Sands — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "White Sands field site from Lisa Wood Studio's Surface Surveys — the first known photographic aerial survey of the world's largest gypsum dunefield.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2018",
    region: "New Mexico, USA",
  },
  {
    title: "Craters",
    slug: "craters",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "A vast volcanic landscape on Idaho's Snake River Plain, surveyed from the air.",
    longDescription:
      "A vast volcanic landscape on Idaho's Snake River Plain. Lava flows, cinder cones, spatter cones, fissures, and sagebrush plains form one of the best-preserved recent volcanic terrains in the continental United States — 620 square miles, the largest predominantly Holocene lava field in the contiguous U.S. The present surface formed through eight major eruptive periods over the last 15,000 years. In 1969, Apollo 14 astronauts trained here before traveling to the Moon.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-craters/13-untitled-panorama-1-9d4b1f5e.webp`,
      alt: "Aerial panorama of the Craters of the Moon lava field, Idaho, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-craters/01-l1008508-19981dd3.webp`,
        alt: "Volcanic surface of Craters of the Moon photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-craters/05-l1002394-copy-e5d2e8bf.webp`,
        alt: "Lava flows and cinder cones at Craters of the Moon by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-craters/09-gm-wall-279762f3.webp`,
        alt: "Aerial study of the Craters of the Moon Holocene lava field by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-craters/02-l1002351-jpg-002-91fcf095.webp`,
        alt: "Sagebrush plains and volcanic terrain at Craters of the Moon by Lisa Wood Studio.",
      },
    ],
    details: [
      { label: "Latitude", value: "43°N" },
      {
        label: "Status",
        value: "U.S. National Monument: 1924 — International Dark Sky Park: 2017",
      },
      {
        label: "Distinction",
        value:
          "First known photographic aerial survey of Craters of the Moon National Monument (2018).",
      },
    ],
    relatedProjects: ["winterblue", "greenland"],
    external: null,
    seoTitle: "Craters — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "Craters field site from Lisa Wood Studio's Surface Surveys — the first known photographic aerial survey of Craters of the Moon National Monument, Idaho.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2018",
    region: "Idaho, USA",
  },
  {
    title: "Simpson Desert",
    slug: "simpson-desert",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "The world's longest parallel sand dunes, surveyed from the air.",
    longDescription:
      "176,500 square kilometers of parallel-dune landscape across South Australia, Queensland, and the Northern Territory — the world's longest parallel sand dunes, with individual ridges extending more than 150 kilometers, some reaching 200. Munga-Thirri means Big Sandhill Country. The desert is the traditional Country of the Wangkangurru Yarluyandi people, whose songlines and navigation systems are inseparable from the landforms themselves.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-simpson/01-l1006196-4c3ae92a.webp`,
      alt: "Aerial photograph of the parallel dunes of the Simpson Desert, Australia, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-simpson/03-l1006208-04b2a516.webp`,
        alt: "Parallel sand dunes of the Simpson Desert photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-simpson/09-img-6066-c486e4a9.webp`,
        alt: "Big Sandhill Country, Munga-Thirri, photographed by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-simpson/12-img-5910-7960ef92.webp`,
        alt: "Aerial study of the Simpson Desert parallel dune field by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-simpson/16-img-6006-0aff51d3.webp`,
        alt: "Dune ridges of the Simpson Desert, Australia, by Lisa Wood Studio.",
      },
    ],
    details: [
      { label: "Latitude", value: "25°S" },
      {
        label: "Status",
        value:
          "Protected within the Munga-Thirri–Simpson Desert protected areas",
      },
      {
        label: "Distinction",
        value:
          "First known photographic aerial survey of the Simpson Desert's parallel dune field (2019).",
      },
    ],
    relatedProjects: ["wahiba", "white-sands"],
    external: null,
    seoTitle: "Simpson Desert — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "Simpson Desert field site from Lisa Wood Studio's Surface Surveys — the first known photographic aerial survey of the world's longest parallel sand dunes.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2019",
    region: "Australia",
  },
  {
    title: "Wahiba",
    slug: "wahiba",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "A vast sand sea in eastern Oman, surveyed from the air.",
    longDescription:
      "A vast sand sea in eastern Oman, named for the Bani Wahiba tribe. The dunes run roughly 180 kilometers north to south and 80 kilometers east to west, covering about 12,500 square kilometers — a record of wind, monsoon cycles, and late Quaternary shifts in sea level held in motion across hundreds of thousands of years. Bedouin villages, camel routes, temporary camps, and open night skies give the Wahiba Sands their human scale.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-wahiba/01-l1007047-jpg-001-0257046c.webp`,
      alt: "Aerial photograph of the Wahiba Sands, Oman, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-wahiba/03-l1006654-01596aea.webp`,
        alt: "Dunes of the Wahiba sand sea photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-wahiba/06-img-0286-37b5e6c7.webp`,
        alt: "Wind-shaped sand of the Wahiba Sands, eastern Oman, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-wahiba/09-img-0103-95b7942d.webp`,
        alt: "Aerial study of the Wahiba sand sea by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-wahiba/11-img-0187-78501821.webp`,
        alt: "Bedouin terrain of the Wahiba Sands, Oman, photographed by Lisa Wood Studio.",
      },
    ],
    details: [{ label: "Latitude", value: "22°N" }],
    relatedProjects: ["simpson-desert", "white-sands"],
    external: null,
    seoTitle: "Wahiba — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "Wahiba field site from Lisa Wood Studio's Surface Surveys — an aerial study of the vast sand sea of eastern Oman.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2017",
    region: "Oman",
  },
  {
    title: "City of Rocks",
    slug: "city-of-rocks",
    practice: "Photographs",
    bentoCategory: null,
    editorialCategory: "surface-surveys",
    parent: "surface-surveys",
    children: null,
    dualHomed: true,
    shortDescription:
      "Granite spires and monoliths at the southern end of Idaho's Albion Mountains.",
    longDescription:
      "14,407 acres at the southern end of Idaho's Albion Mountains. Granite spires, fins, domes, and monoliths rise from the sagebrush, with some formations reaching the height of a 60-story building. The Almo Pluton granite is roughly 28 million years old; nearby Green Creek Complex rocks are more than 2.5 billion years old — among the oldest exposed rocks in the United States. Emigrants of the California Trail described the formations as \"a city of tall spires,\" \"steeple rocks,\" and \"the silent city.\"",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/survey-city/11-2pano-308a052c.webp`,
      alt: "Aerial panorama of the granite formations of City of Rocks, Idaho, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/survey-city/01-l1008069-copy-c1a22640.webp`,
        alt: "Granite spires of City of Rocks National Reserve photographed from the air by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-city/04-l1007969-copy-b50d8e62.webp`,
        alt: "Granite domes and monoliths at City of Rocks, Idaho, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-city/09-l1009421-2d7ae7e2.webp`,
        alt: "Aerial study of the granite formations of City of Rocks by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/survey-city/15-l1007739-ccac3936.webp`,
        alt: "Sagebrush and granite fins of City of Rocks, Idaho, by Lisa Wood Studio.",
      },
    ],
    details: [
      { label: "Latitude", value: "42°N" },
      { label: "Status", value: "National Reserve: 1988" },
    ],
    relatedProjects: ["craters", "wahiba"],
    external: null,
    seoTitle: "City of Rocks — Surface Surveys Field Site | Lisa Wood Studio",
    seoDescription:
      "City of Rocks field site from Lisa Wood Studio's Surface Surveys — an aerial study of the granite spires and monoliths of Idaho's Albion Mountains.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2017",
    region: "Idaho, USA",
  },

  // ──────────────────────────────────────────────────────────────────────
  // Photographs series
  // ──────────────────────────────────────────────────────────────────────
  {
    title: "Winterblue",
    slug: "winterblue",
    practice: "Photographs",
    bentoCategory: "photographs",
    editorialCategory: "photographs",
    parent: null,
    children: null,
    dualHomed: false,
    shortDescription:
      "A large-scale contact sheet of 125 photographs from the pre-dawn Camas Prairie.",
    longDescription:
      "Winterblue I is presented as a large-scale contact sheet — a grid of 125 individual photographs, one set of frames for each day spent on the Camas Prairie. 17 trips between January and April to the Camas Prairie under sub-zero conditions turned darkness, cold, isolation, and grief into a field of attention. The work demonstrates the practice — entering difficulty deliberately, staying long enough for perception to shift, and returning with images shaped by that exposure.",
    fieldNotes:
      "Winterblue was born from a winter search for Lisa's missing family dog. For 11 days she and her community searched. Sleeping in her car, searching in whiteouts, she met the full force of winter in the form of fear, isolation, temperature, and overwhelming discomfort. The dog was found unharmed.",
    heroImage: {
      src: `${IMG}/winterblue-site/05-v-72c5a3f3.webp`,
      alt: "Pre-dawn winter expanse of the Camas Prairie, Idaho, from Lisa Wood Studio's Winterblue.",
    },
    galleryImages: [
      {
        src: `${IMG}/winterblue-site/03-1-proxy-2-61017c6c.webp`,
        alt: "Sub-zero winter field on the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/winterblue-site/07-img-0822-459afc3d.webp`,
        alt: "Winter darkness over the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/winterblue-site/11-img-4051-e8261334.webp`,
        alt: "Snow field of the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/winterblue-site/tile-img-0584-copy-ef8c83da.webp`,
        alt: "Individual tile within the Winterblue I contact sheet by Lisa Wood Studio.",
      },
    ],
    details: [
      {
        label: "Format",
        value:
          "Large-scale contact sheet, 125 photographs — 138\" x 85\"",
      },
      { label: "Field Site", value: "Camas Prairie, Idaho, USA" },
      {
        label: "Materials + Fabrication",
        value:
          "Archival pigment print on Kodak Glossy, mounted on painted maple wood. Fabrication by Laumont Photographic, New York.",
      },
    ],
    relatedProjects: ["surface-surveys", "craters"],
    external: null,
    seoTitle: "Winterblue — Camas Prairie Contact Sheet | Lisa Wood Studio",
    seoDescription:
      "Winterblue: a large-scale contact sheet of 125 photographs from 17 sub-zero trips to the Camas Prairie, Idaho, by Lisa Wood Studio.",
    jsonLdType: "VisualArtwork",
    status: "complete",
    years: "2023",
    region: "Idaho, USA",
  },
  placeholder("totems-and-sentinels", "Totems & Sentinels", "Photographs", {
    bentoCategory: "photographs",
    editorialCategory: "photographs",
  }),
  placeholder("flipped", "Flipped", "Photographs", {
    bentoCategory: "photographs",
    editorialCategory: "photographs",
  }),
  placeholder("omani-landscapes", "Omani Landscapes", "Photographs", {
    bentoCategory: "photographs",
    editorialCategory: "photographs",
  }),
  // TODO(Lisa) §9.1 — 6th Photographs series title is not yet supplied.
  placeholder("photographs-series-six", "Photographs Series (Untitled)", "Photographs", {
    bentoCategory: "photographs",
    editorialCategory: "photographs",
  }),

  // ──────────────────────────────────────────────────────────────────────
  // FLAGSHIP PARENT — Luxuriate in Discomfort (§5)
  // ──────────────────────────────────────────────────────────────────────
  {
    title: "Luxuriate in Discomfort",
    slug: "luxuriate-in-discomfort",
    practice: "Conceptual",
    bentoCategory: null,
    editorialCategory: "luxuriate",
    parent: null,
    children: ["luxuriate-book", "luxuriate-installation", "lux"],
    dualHomed: false,
    shortDescription:
      "A studio philosophy carried across three projects — a book, a one-night installation, and a public art concept.",
    longDescription:
      "A studio philosophy carried across three projects — a book, a one-night installation, and a public art project concept to improve teenage mental health. Three modalities — sauna, cold plunge, and whole-body vibration — sequenced together and scientifically proven to improve mental health and long-term well-being.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/luxuriate/01-l1009938-book-in-mirrorre-copy-3f217939.webp`,
      alt: "The Luxuriate In Discomfort book reflected in a mirror, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/luxuriate/02-l1009933-resize-957f3711.webp`,
        alt: "Work from the Luxuriate in Discomfort practice by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/luxuriate/03-jp-ece31b85.webp`,
        alt: "Luxuriate in Discomfort studio philosophy work by Lisa Wood Studio.",
      },
    ],
    details: [
      {
        label: "Overview",
        value:
          "A studio philosophy carried across three projects — a book, a one-night installation, and a public art project concept to improve teenage mental health.",
      },
      {
        label: "The Practice",
        value:
          "Three modalities — sauna, cold plunge, and whole-body vibration — sequenced together and scientifically proven to improve mental health and long-term well-being.",
      },
    ],
    relatedProjects: ["winterblue"],
    external: null,
    seoTitle:
      "Luxuriate in Discomfort — An Eight-Year Practice | Lisa Wood Studio",
    seoDescription:
      "Luxuriate in Discomfort: a studio philosophy by Lisa Wood Studio carried across a book, a one-night installation, and the LUX public art concept.",
    jsonLdType: "Collection",
    status: "complete",
    years: "2020 — 2024",
  },
  {
    title: "Luxuriate In Discomfort (Book)",
    slug: "luxuriate-book",
    practice: "Writing",
    bentoCategory: "writing",
    editorialCategory: "luxuriate",
    parent: "luxuriate-in-discomfort",
    children: null,
    dualHomed: true,
    shortDescription:
      "A 30-page digest on how regular engagement with discomfort leads to long-term contentment.",
    longDescription:
      "A 30-page digest that explores how regular engagement with discomfort can lead to long-term contentment, written by the artist in 2020 for her son graduating from college into a pandemic-induced lockdown.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/luxuriate/01-l1009938-book-in-mirrorre-copy-3f217939.webp`,
      alt: "The Luxuriate In Discomfort book by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/installation/03-l1009938-book-in-mirrorre-copy-22884a1e.webp`,
        alt: "Pages of the Luxuriate In Discomfort book by Lisa Wood Studio.",
      },
    ],
    details: [{ label: "Year", value: "2020" }],
    relatedProjects: ["luxuriate-installation", "lux"],
    external: null,
    seoTitle: "Luxuriate In Discomfort — Book (2020) | Lisa Wood Studio",
    seoDescription:
      "Luxuriate In Discomfort: a 30-page digest written in 2020 by Lisa Wood on how engagement with discomfort leads to long-term contentment.",
    jsonLdType: "Book",
    status: "complete",
    years: "2020",
  },
  {
    title: "December, Sun Valley",
    slug: "luxuriate-installation",
    practice: "Installation",
    bentoCategory: "installation",
    editorialCategory: "luxuriate",
    parent: "luxuriate-in-discomfort",
    children: null,
    dualHomed: true,
    shortDescription:
      "A one-night-only exhibition staged inside the artist's bedroom during the pandemic.",
    longDescription:
      "A one-night-only exhibition staged inside the artist's bedroom at the height of the pandemic, opened to a small masked, distanced audience. The works on view — a book, poetry, a large-scale painting, and a video clip — presented as a culmination of grief and transformation.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/installation/01-l1009866-owning-6b3836fc.webp`,
      alt: "The one-night installation December, Sun Valley, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: `${IMG}/installation/02-l1009933-resize-d3a26792.webp`,
        alt: "Works on view at the one-night installation December, Sun Valley, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/installation/05-cold-poem-d7792bd1.webp`,
        alt: "Cold poem from the one-night installation December, Sun Valley, by Lisa Wood Studio.",
      },
      {
        src: `${IMG}/installation/06-heat-poem-5b2cb3ed.webp`,
        alt: "Heat poem from the one-night installation December, Sun Valley, by Lisa Wood Studio.",
      },
    ],
    details: [{ label: "Year", value: "2020" }],
    relatedProjects: ["luxuriate-book", "lux"],
    external: null,
    seoTitle: "December, Sun Valley — One-Night Installation | Lisa Wood Studio",
    seoDescription:
      "December, Sun Valley: a one-night-only pandemic installation by Lisa Wood Studio, presenting a book, poetry, painting, and video as grief and transformation.",
    jsonLdType: "CreativeWork",
    status: "complete",
    years: "2020",
  },
  {
    title: "LUX",
    slug: "lux",
    practice: "Conceptual",
    bentoCategory: "conceptual",
    editorialCategory: "luxuriate",
    parent: "luxuriate-in-discomfort",
    children: null,
    dualHomed: true,
    shortDescription:
      "A public art installation concept addressing teenage mental health.",
    longDescription:
      "LUX addresses the teenage mental health crisis through an intentional discomfort practice: cold plunge, sauna, and whole-body vibration. Built on the artist's own eight-year practice, LUX offers young adults a constructive, approachable framework for building a working relationship with adversity — pairing physical rejuvenation with the psychological reward that follows.",
    fieldNotes: null,
    heroImage: {
      src: `${IMG}/luxuriate/03-jp-ece31b85.webp`,
      alt: "Concept imagery for LUX, a public art installation by Lisa Wood Studio.",
    },
    galleryImages: [],
    details: [{ label: "Year", value: "2024" }],
    relatedProjects: ["luxuriate-book", "luxuriate-installation"],
    external: null,
    seoTitle: "LUX — Public Art Installation Concept | Lisa Wood Studio",
    seoDescription:
      "LUX: a public art installation concept by Lisa Wood Studio addressing teenage mental health through an intentional discomfort practice.",
    jsonLdType: "CreativeWork",
    status: "complete",
    years: "2024",
  },

  // ──────────────────────────────────────────────────────────────────────
  // Writing — TODO(Lisa) §9.2: titles below are known leads; copy pending.
  // ──────────────────────────────────────────────────────────────────────
  placeholder("a-veiled-sanctuary", "A Veiled Sanctuary", "Writing", {
    bentoCategory: "writing",
    editorialCategory: "writing",
  }),
  placeholder("lost-vibrations-white-paper", "Lost Vibrations White Paper", "Writing", {
    bentoCategory: "writing",
    editorialCategory: "writing",
  }),
  placeholder("time-of-becoming", "Time of Becoming", "Writing", {
    bentoCategory: "writing",
    editorialCategory: "writing",
  }),
  placeholder("how-to-fall", "How to Fall", "Writing", {
    bentoCategory: "writing",
    editorialCategory: "writing",
  }),
  placeholder("writing-six", "Writing (Untitled)", "Writing", {
    bentoCategory: "writing",
    editorialCategory: "writing",
  }),

  // ──────────────────────────────────────────────────────────────────────
  // Installation — TODO(Lisa) §9.2.
  // ──────────────────────────────────────────────────────────────────────
  placeholder("installation-two", "Installation (Untitled)", "Installation", {
    bentoCategory: "installation",
    editorialCategory: "installation",
  }),
  placeholder("installation-three", "Installation (Untitled)", "Installation", {
    bentoCategory: "installation",
    editorialCategory: "installation",
  }),
  placeholder("installation-four", "Installation (Untitled)", "Installation", {
    bentoCategory: "installation",
    editorialCategory: "installation",
  }),
  placeholder("installation-five", "Installation (Untitled)", "Installation", {
    bentoCategory: "installation",
    editorialCategory: "installation",
  }),
  placeholder("installation-six", "Installation (Untitled)", "Installation", {
    bentoCategory: "installation",
    editorialCategory: "installation",
  }),

  // ──────────────────────────────────────────────────────────────────────
  // Conceptual — TODO(Lisa) §9.2 (LUX is the other Conceptual bento child).
  // ──────────────────────────────────────────────────────────────────────
  placeholder("conceptual-two", "Conceptual (Untitled)", "Conceptual", {
    bentoCategory: "conceptual",
  }),

  // ──────────────────────────────────────────────────────────────────────
  // Apps — external ventures, open in a new tab (§3A).
  // ──────────────────────────────────────────────────────────────────────
  placeholder("micron-house", "Micron House", "Apps", {
    bentoCategory: "apps",
    external: "https://micron-house.vercel.app",
    shortDescription: "TODO(Lisa): confirm Micron House external destination.",
  }),
  placeholder("solokit", "Solokit", "Apps", {
    bentoCategory: "apps",
    external: "https://solokit.vercel.app",
    shortDescription: "TODO(Lisa): confirm Solokit external destination.",
  }),
];

export const projectsBySlug: Record<string, Project> = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
);

export function getProject(slug: string): Project | undefined {
  return projectsBySlug[slug];
}

// Routable internal projects — children of Apps are external and excluded.
export function routableProjects(): Project[] {
  return projects.filter((p) => !p.external);
}
