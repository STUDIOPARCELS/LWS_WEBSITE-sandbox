import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/shots";
const BASE = "http://localhost:3000";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--force-color-profile=srgb",
    "--hide-scrollbars",
  ],
});

async function shot(name, path, opts = {}) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setViewport({
    width: opts.w || 1680,
    height: opts.h || 940,
    deviceScaleFactor: 2,
  });
  // Hide images that fail to load (Supabase host is blocked in this sandbox)
  // so broken-image glyphs don't litter the screenshots.
  await page.evaluateOnNewDocument(() => {
    document.addEventListener(
      "error",
      (e) => {
        const t = e.target;
        if (t && t.tagName === "IMG") t.style.visibility = "hidden";
      },
      true,
    );
  });
  await page
    .goto(BASE + path, { waitUntil: "networkidle2", timeout: 35000 })
    .catch(() => {});
  await new Promise((r) => setTimeout(r, 1400));
  if (opts.click) {
    await page.click(opts.click).catch(() => {});
    await new Promise((r) => setTimeout(r, 1000));
  }
  await page.screenshot({
    path: `${OUT}/${name}.png`,
    fullPage: !!opts.full,
  });
  await page.close();
  console.log("captured", name);
}

await shot("01-home-desktop", "/");
await shot("02-home-popout", "/", { click: "#photographs button", h: 1150 });
await shot("03-home-full", "/", { full: true });
await shot("04-work-surface-surveys", "/work/surface-surveys", { full: true });
await shot("05-work-craters", "/work/craters", { full: true });
await shot("06-home-mobile", "/", { w: 390, h: 844 });

await browser.close();
console.log("done");
