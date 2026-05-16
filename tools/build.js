/* ------------------------------------------------------------------
   Build step for Lisa Wood Studio.

   Reads the single source of truth (content/site.json) and the HTML
   template (tools/template.html), then writes the static, deployable
   files:

     index.html      home page, with content + JSON-LD baked in
     llms.txt        plain-text site summary for AI agents
     sitemap.xml     crawler sitemap
     robots.txt      crawler directives

   Run with:  npm run build
   No dependencies — plain Node.
------------------------------------------------------------------- */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const site = JSON.parse(fs.readFileSync(path.join(ROOT, "content/site.json"), "utf8"));
const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

/* ---------- small helpers ---------- */
const escHtml = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
const escAttr = s => escHtml(s).replace(/"/g, "&quot;");
const stripTags = s => String(s == null ? "" : s).replace(/<[^>]+>/g, "");
// Safe for embedding JSON inside a <script> element.
const jsonForScript = obj => JSON.stringify(obj).replace(/</g, "\\u003c");

const absUrl = rel => site.site.url.replace(/\/$/, "/") + String(rel).replace(/^\//, "");

function projectCount(cat) {
  const total = cat.projects.length;
  if (total === 0) return "In preparation";
  const ready = cat.projects.filter(p => p.status === "ready").length;
  return ready + " of " + total + " open";
}

/* ---------- <head> meta ---------- */
function renderMeta() {
  const s = site.site, seo = site.seo;
  const shareImg = absUrl(s.shareImage);
  return [
    `<meta name="description" content="${escAttr(s.description)}">`,
    `<meta name="author" content="${escAttr(s.author)}">`,
    `<meta name="robots" content="index, follow">`,
    `<link rel="canonical" href="${escAttr(s.url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escAttr(s.name)}">`,
    `<meta property="og:title" content="${escAttr(seo.ogTitle)}">`,
    `<meta property="og:description" content="${escAttr(seo.ogDescription)}">`,
    `<meta property="og:url" content="${escAttr(s.url)}">`,
    `<meta property="og:image" content="${escAttr(shareImg)}">`,
    `<meta name="twitter:card" content="${escAttr(seo.twitterCard)}">`,
    `<meta name="twitter:title" content="${escAttr(seo.ogTitle)}">`,
    `<meta name="twitter:description" content="${escAttr(seo.ogDescription)}">`,
    `<meta name="twitter:image" content="${escAttr(shareImg)}">`
  ].join("\n");
}

/* ---------- JSON-LD structured data (machine-readable content) ---------- */
function renderJsonLd() {
  const s = site.site;
  const personId = s.url + "#person";
  const siteId = s.url + "#website";

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: site.person.name,
      jobTitle: site.person.jobTitle,
      description: site.person.description,
      url: s.url
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: s.url,
      name: s.name,
      description: s.description,
      inLanguage: s.locale,
      creator: { "@id": personId }
    }
  ];

  site.categories.forEach(cat => {
    cat.projects.forEach(p => {
      const node = {
        "@type": "CreativeWork",
        "@id": s.url + "#" + p.id,
        name: p.title,
        genre: cat.label + (p.eyebrow ? " — " + p.eyebrow : ""),
        creator: { "@id": personId },
        isPartOf: { "@id": siteId },
        creativeWorkStatus: p.status === "ready" ? "Published" : "Draft"
      };
      if (p.description) node.description = p.description;
      if (p.status === "ready" && p.cover) node.image = absUrl(site.media.basePath + "/2000/" + p.cover);
      graph.push(node);
    });
  });

  const data = { "@context": "https://schema.org", "@graph": graph };
  return `<script type="application/ld+json">\n${jsonForScript(data)}\n</script>`;
}

/* ---------- nav ---------- */
function renderNavLinks() {
  return site.nav.links.map(link => {
    if (link.type === "action") {
      return `      <button type="button" id="${escAttr(link.id)}">${escHtml(link.label)}</button>`;
    }
    return `      <a href="${escAttr(link.href)}">${escHtml(link.label)}</a>`;
  }).join("\n");
}

/* ---------- pre-rendered category list (works without JavaScript) ---------- */
function renderCatList() {
  return site.categories.map((cat, i) => {
    const index = String(i + 1).padStart(2, "0");
    return [
      `        <button type="button" class="cat-row" data-cat="${escAttr(cat.key)}">`,
      `          <span class="cat-index">${index}</span>`,
      `          <span class="cat-name">${escHtml(cat.label)}</span>`,
      `          <span class="cat-count">${escHtml(projectCount(cat))}</span>`,
      `        </button>`
    ].join("\n");
  }).join("\n");
}

/* ---------- llms.txt — plain-text summary for AI agents ---------- */
function renderLlmsTxt() {
  const s = site.site;
  const lines = [];
  lines.push(`# ${s.name}`, "");
  lines.push(`> ${s.description}`, "");
  lines.push(s.summary, "");
  lines.push("## Practice", "");
  lines.push(stripTags(site.practice.lead), "");
  lines.push(stripTags(site.practice.detail), "");
  lines.push("## Work", "");
  site.categories.forEach(cat => {
    lines.push(`### ${cat.label}`, "");
    if (cat.projects.length === 0) {
      lines.push("- This collection is in preparation.", "");
      return;
    }
    cat.projects.forEach(p => {
      const tags = [p.eyebrow, p.meta].filter(Boolean).join(", ");
      const head = tags ? `${p.title} (${tags})` : p.title;
      const body = p.description || (p.status === "wip" ? "In preparation." : "");
      lines.push(`- ${head}${body ? " — " + body : ""}`);
    });
    lines.push("");
  });
  lines.push("## Pages", "");
  site.pages.forEach(pg => {
    lines.push(`- [${pg.title}](${absUrl(pg.path)}): ${pg.description}`);
  });
  lines.push("");
  return lines.join("\n");
}

/* ---------- sitemap.xml + robots.txt ---------- */
function renderSitemap() {
  const urls = site.pages.map(pg =>
    `  <url><loc>${absUrl(pg.path)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
function renderRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absUrl("sitemap.xml")}`,
    ""
  ].join("\n");
}

/* ---------- assemble index.html ---------- */
const introHeading =
  `${escHtml(site.intro.headingLead)} <span class="soft">${escHtml(site.intro.headingSoft)}</span>`;

const tokens = {
  "{{LANG}}": escAttr(site.site.locale),
  "{{TITLE}}": escHtml(site.seo.title),
  "{{META}}": renderMeta(),
  "{{JSONLD}}": renderJsonLd(),
  "{{BRAND}}": escHtml(site.nav.brand),
  "{{NAV_LINKS}}": renderNavLinks(),
  "{{INTRO_EYEBROW}}": escHtml(site.intro.eyebrow),
  "{{INTRO_HEADING}}": introHeading,
  "{{INTRO_LEDE}}": escHtml(site.intro.lede),
  "{{CAT_LIST}}": renderCatList(),
  "{{PRACTICE_LEAD}}": site.practice.lead,
  "{{PRACTICE_DETAIL}}": site.practice.detail,
  "{{FOOTER_LEFT}}": escHtml(site.footer.left),
  "{{FOOTER_RIGHT}}": escHtml(site.footer.right),
  "{{SITE_DATA}}": jsonForScript(site)
};

let html = template;
for (const [token, value] of Object.entries(tokens)) {
  html = html.split(token).join(value);
}

const leftover = html.match(/\{\{[A-Z_]+\}\}/);
if (leftover) {
  throw new Error("Unreplaced template token: " + leftover[0]);
}

/* ---------- write output ---------- */
fs.writeFileSync(path.join(ROOT, "index.html"), html);
fs.writeFileSync(path.join(ROOT, "llms.txt"), renderLlmsTxt());
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), renderSitemap());
fs.writeFileSync(path.join(ROOT, "robots.txt"), renderRobots());

console.log("build: wrote index.html, llms.txt, sitemap.xml, robots.txt");
