import puppeteer from "puppeteer";

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
const page = await browser.newPage();
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.setViewport({ width: 1680, height: 950, deviceScaleFactor: 2 });
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
  .goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 35000 })
  .catch(() => {});
await new Promise((r) => setTimeout(r, 1000));

// 1 — open Photographs.
await page.click("#photographs button").catch(() => {});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: "/tmp/shots/drill-1-photographs.png" });
console.log("captured drill-1");

// 2 — click the Surface Surveys card (the only parent → a <button>).
await page.click("#bento-fan button").catch(() => {});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: "/tmp/shots/drill-2-surface-surveys.png" });
console.log("captured drill-2");

await browser.close();
console.log("done");
