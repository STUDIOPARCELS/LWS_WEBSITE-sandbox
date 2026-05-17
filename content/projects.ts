import type { Project, ContentStatus } from "./types";
import { bucketUrl } from "@/lib/supabase";

// content/projects.ts — Master Build Prompt §9, build step 1.
//
// All imagery is sourced from the public Supabase Storage bucket
// "LISA WOOD STUDIO WEBSITE" (project SURFACE SURVEYS). `img()` takes an
// in-bucket path and returns its public URL. Where a folder provides a
// `web-2000px` set, those web-optimized exports are used for display.
//
// Content marked `status: "placeholder"` is a TODO(Lisa) scaffold: routing
// and schema are real; final copy is pending. Verbatim copy (Surface Surveys,
// the six field sites, Luxuriate in Discomfort, Winterblue) is taken from the
// live Observatory presentation per §8 — do not paraphrase.

const img = bucketUrl;

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
      src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006196.jpg"),
      alt: "Aerial panorama of the parallel dunes of the Simpson Desert, from Lisa Wood Studio's Surface Surveys.",
    },
    galleryImages: [
      {
        src: img("CRATERS/web-2000px/L1008508.webp"),
        alt: "Aerial study of volcanic terrain at Craters of the Moon from Surface Surveys by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1009887-LWS.webp"),
        alt: "Aerial study of the White Sands gypsum dunefield from Surface Surveys by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/CITY/web-2000px/L1009421.webp"),
        alt: "Aerial study of the granite formations of City of Rocks from Surface Surveys by Lisa Wood Studio.",
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
      src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1001406.webp"),
      alt: "Aerial photograph of the Greenland Ice Sheet by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1000364.webp"),
        alt: "Aerial study of the Greenland Ice Sheet by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1001017.webp"),
        alt: "Layered glacial ice of Greenland photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1000264 copy.webp"),
        alt: "Western edge of the Greenland Ice Sheet near the Ilulissat Icefjord by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1001442.webp"),
        alt: "Glacial terrain of Greenland photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/GREENLAND/PHOTOGRAPHS/web-2000px/L1001867.webp"),
        alt: "Sermeq Kujalleq glacier region, Greenland, photographed by Lisa Wood Studio.",
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
      src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1009887-LWS.webp"),
      alt: "Aerial photograph of the White Sands gypsum dunefield, New Mexico, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1000059-LWS.webp"),
        alt: "Gypsum dunes of White Sands National Park photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1001382-LWS.webp"),
        alt: "White mineral sand of the Tularosa Basin, White Sands, by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1000412.2.webp"),
        alt: "Aerial study of the White Sands gypsum dunefield by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1000950.webp"),
        alt: "Wind-shaped gypsum dunes at White Sands National Park by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WHITE SANDS/phots/web-2000px/L1009922-LWS.webp"),
        alt: "Aerial study of white gypsum sand at White Sands by Lisa Wood Studio.",
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
      src: img("CRATERS/craters-env-web-2000px/Untitled_Panorama-1.webp"),
      alt: "Aerial panorama of the Craters of the Moon lava field, Idaho, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("CRATERS/web-2000px/L1008508.webp"),
        alt: "Volcanic surface of Craters of the Moon photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("CRATERS/web-2000px/L1002394 copy.webp"),
        alt: "Lava flows and cinder cones at Craters of the Moon by Lisa Wood Studio.",
      },
      {
        src: img("CRATERS/web-2000px/L1002351.jpg.002.webp"),
        alt: "Aerial study of the Craters of the Moon Holocene lava field by Lisa Wood Studio.",
      },
      {
        src: img("CRATERS/web-2000px/craters_L1001948.webp"),
        alt: "Sagebrush plains and volcanic terrain at Craters of the Moon by Lisa Wood Studio.",
      },
      {
        src: img("CRATERS/web-2000px/L1008263-e_1.webp"),
        alt: "Aerial study of recent volcanic terrain at Craters of the Moon by Lisa Wood Studio.",
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
      src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006196.jpg"),
      alt: "Aerial photograph of the parallel dunes of the Simpson Desert, Australia, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006208.jpg"),
        alt: "Parallel sand dunes of the Simpson Desert photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006198.jpg"),
        alt: "Big Sandhill Country, Munga-Thirri, photographed by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006213.jpg"),
        alt: "Aerial study of the Simpson Desert parallel dune field by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/SIMPSON DESERT/web-2000px/L1006217.jpg"),
        alt: "Dune ridges of the Simpson Desert, Australia, by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/SIMPSON DESERT/photographs/web-2000px/L1006201.webp"),
        alt: "Parallel dunes of the Simpson Desert photographed from the air by Lisa Wood Studio.",
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
      src: img("SURFACE SURVEYS/WAHIBA OMAN/photos/web-2000px/L1007047.jpg.001.webp"),
      alt: "Aerial photograph of the Wahiba Sands, Oman, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("SURFACE SURVEYS/WAHIBA OMAN/photos/web-2000px/L1007191.jpg.001.webp"),
        alt: "Dunes of the Wahiba sand sea photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img(
          "SURFACE SURVEYS/WAHIBA OMAN/photos/web-2000px/L1007219 north wall wahiba.jpg.001.webp",
        ),
        alt: "Wind-shaped sand of the Wahiba Sands, eastern Oman, by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/WAHIBA OMAN/L1006654.jpg"),
        alt: "Aerial study of the Wahiba sand sea by Lisa Wood Studio.",
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
      src: img("SURFACE SURVEYS/CITY/web-2000px/L1009421.webp"),
      alt: "Aerial photograph of the granite formations of City of Rocks, Idaho, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("SURFACE SURVEYS/CITY/web-2000px/L1007813.webp"),
        alt: "Granite spires of City of Rocks National Reserve photographed from the air by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/CITY/web-2000px/L1007870.webp"),
        alt: "Granite domes and monoliths at City of Rocks, Idaho, by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/CITY/web-2000pxNEW/2pano.webp"),
        alt: "Aerial panorama of the granite formations of City of Rocks by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/CITY/web-2000px/L1009470.webp"),
        alt: "Sagebrush and granite fins of City of Rocks, Idaho, by Lisa Wood Studio.",
      },
      {
        src: img("SURFACE SURVEYS/CITY/web-2000px/L1008102 copy.webp"),
        alt: "Aerial study of the granite formations of City of Rocks by Lisa Wood Studio.",
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
      src: img("WINTERBLUE/photos/web-2000px/v.webp"),
      alt: "Pre-dawn winter expanse of the Camas Prairie, Idaho, from Lisa Wood Studio's Winterblue.",
    },
    galleryImages: [
      {
        src: img("WINTERBLUE/photos/web-2000px/IMG_0822.webp"),
        alt: "Sub-zero winter field on the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: img("WINTERBLUE/photos/web-2000px/IMG_5951.webp"),
        alt: "Winter darkness over the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: img("WINTERBLUE/photos/web-2000px/IMG_5974.webp"),
        alt: "Snow field of the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: img("WINTERBLUE/photos/web-2000px/IMG_6363.webp"),
        alt: "Cold winter atmosphere on the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
      {
        src: img("WINTERBLUE/photos/web-2000px/IMG_8313.webp"),
        alt: "Frozen terrain of the Camas Prairie from Winterblue by Lisa Wood Studio.",
      },
    ],
    details: [
      {
        label: "Format",
        value: "Large-scale contact sheet, 125 photographs — 138\" x 85\"",
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
  {
    title: "Totems & Sentinels",
    slug: "totems-and-sentinels",
    practice: "Photographs",
    bentoCategory: "photographs",
    editorialCategory: "photographs",
    parent: null,
    children: null,
    dualHomed: false,
    shortDescription: "A photographic series of upright forms in the landscape.",
    // TODO(Lisa) §9 — final Totems & Sentinels copy pending. Imagery is live.
    longDescription:
      "TODO(Lisa): full description for Totems & Sentinels. Imagery is wired from the studio media library.",
    fieldNotes: null,
    heroImage: {
      src: img("TOTEMS & SENTINELS/2T.jpg.002.jpg"),
      alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("TOTEMS & SENTINELS/3T.jpg.002.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
      {
        src: img("TOTEMS & SENTINELS/4T.jpg.001.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
      {
        src: img("TOTEMS & SENTINELS/5T.jpg.001.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
      {
        src: img("TOTEMS & SENTINELS/6T.jpg.001.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
      {
        src: img("TOTEMS & SENTINELS/7T.jpg.001.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
      {
        src: img("TOTEMS & SENTINELS/8T.jpg.001.jpg"),
        alt: "Work from the Totems & Sentinels photographic series by Lisa Wood Studio.",
      },
    ],
    details: [],
    relatedProjects: ["flipped", "omani-landscapes"],
    external: null,
    seoTitle: "Totems & Sentinels — Lisa Wood Studio",
    seoDescription:
      "Totems & Sentinels, a photographic series by Lisa Wood Studio.",
    jsonLdType: "VisualArtwork",
    status: "placeholder",
  },
  {
    title: "Flipped",
    slug: "flipped",
    practice: "Photographs",
    bentoCategory: "photographs",
    editorialCategory: "photographs",
    parent: null,
    children: null,
    dualHomed: false,
    shortDescription: "A photographic series of solitary icebergs.",
    // TODO(Lisa) §9 — final Flipped copy pending. Imagery is live.
    longDescription:
      "TODO(Lisa): full description for Flipped. Imagery is wired from the studio media library.",
    fieldNotes: null,
    heroImage: {
      src: img("FLIPPED/iceberg9.jpg"),
      alt: "A solitary iceberg from the Flipped photographic series by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("FLIPPED/iceberg10.jpg"),
        alt: "A luminous iceberg from the Flipped photographic series by Lisa Wood Studio.",
      },
      {
        src: img("FLIPPED/DSC7251 64X43.jpg"),
        alt: "Work from the Flipped photographic series by Lisa Wood Studio.",
      },
      {
        src: img("FLIPPED/DSC7694 OG DARKER.jpg"),
        alt: "A dark study from the Flipped photographic series by Lisa Wood Studio.",
      },
    ],
    details: [],
    relatedProjects: ["omani-landscapes", "totems-and-sentinels"],
    external: null,
    seoTitle: "Flipped — Lisa Wood Studio",
    seoDescription: "Flipped, a photographic series by Lisa Wood Studio.",
    jsonLdType: "VisualArtwork",
    status: "placeholder",
  },
  {
    title: "Omani Landscapes",
    slug: "omani-landscapes",
    practice: "Photographs",
    bentoCategory: "photographs",
    editorialCategory: "photographs",
    parent: null,
    children: null,
    dualHomed: false,
    shortDescription: "A photographic series of the desert landscapes of Oman.",
    // TODO(Lisa) §9 — final Omani Landscapes copy pending. Imagery is live.
    longDescription:
      "TODO(Lisa): full description for Omani Landscapes. Imagery is wired from the studio media library.",
    fieldNotes: null,
    heroImage: {
      src: img("OMANI LANDSCAPES/Desert Pano 1 copy 2_1.jpg"),
      alt: "Desert panorama from the Omani Landscapes series by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("OMANI LANDSCAPES/7532 FINAL_1.jpg"),
        alt: "Work from the Omani Landscapes photographic series by Lisa Wood Studio.",
      },
      {
        src: img("OMANI LANDSCAPES/BLUE_1.jpg"),
        alt: "A blue-toned study from the Omani Landscapes series by Lisa Wood Studio.",
      },
      {
        src: img("OMANI LANDSCAPES/L1006922 DUNES copy.jpg"),
        alt: "Desert dunes from the Omani Landscapes series by Lisa Wood Studio.",
      },
      {
        src: img("OMANI LANDSCAPES/L1007471 PANO black pink.jpg"),
        alt: "A panoramic study from the Omani Landscapes series by Lisa Wood Studio.",
      },
      {
        src: img("OMANI LANDSCAPES/L1007481 FINAL.jpg"),
        alt: "Work from the Omani Landscapes photographic series by Lisa Wood Studio.",
      },
    ],
    details: [],
    relatedProjects: ["flipped", "totems-and-sentinels"],
    external: null,
    seoTitle: "Omani Landscapes — Lisa Wood Studio",
    seoDescription:
      "Omani Landscapes, a photographic series of the desert landscapes of Oman by Lisa Wood Studio.",
    jsonLdType: "VisualArtwork",
    status: "placeholder",
  },
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
      src: img("LUXURIATE IN DISCOMFORT/L1009938 book in mirrorRE copy.jpg"),
      alt: "The Luxuriate In Discomfort book reflected in a mirror, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("LUXURIATE IN DISCOMFORT/jp.jpg"),
        alt: "Work from the Luxuriate in Discomfort practice by Lisa Wood Studio.",
      },
      {
        src: img("LUXURIATE IN DISCOMFORT/L1009933 RESIZE.jpg"),
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
      src: img("LUXURIATE IN DISCOMFORT/L1009938 book in mirrorRE copy.jpg"),
      alt: "The Luxuriate In Discomfort book by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("LUXURIATE IN DISCOMFORT/L1009893.jpg"),
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
      src: img("LUXURIATE IN DISCOMFORT/L1009866 owning.jpg"),
      alt: "The one-night installation December, Sun Valley, by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("LUXURIATE IN DISCOMFORT/COLD POEM.jpg"),
        alt: "Cold poem from the one-night installation December, Sun Valley, by Lisa Wood Studio.",
      },
      {
        src: img("LUXURIATE IN DISCOMFORT/HEAT POEM.jpg"),
        alt: "Heat poem from the one-night installation December, Sun Valley, by Lisa Wood Studio.",
      },
      {
        src: img("LUXURIATE IN DISCOMFORT/L1009933 RESIZE.jpg"),
        alt: "Works on view at the one-night installation December, Sun Valley, by Lisa Wood Studio.",
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
      src: img("LUXURIATE IN DISCOMFORT/jp.jpg"),
      alt: "Concept imagery for LUX, a public art installation by Lisa Wood Studio.",
    },
    galleryImages: [
      {
        src: img("LUXURIATE IN DISCOMFORT/lisa quoote.png"),
        alt: "Quotation from the LUX public art concept by Lisa Wood Studio.",
      },
    ],
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
