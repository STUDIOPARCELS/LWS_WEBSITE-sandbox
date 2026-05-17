import puppeteer from "puppeteer";

const OUT = "/tmp/shots";
const BASE = "http://localhost:3000";

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

const hideBroken = () => {
  document.addEventListener(
    "error",
    (e) => {
      const t = e.target;
      if (t && t.tagName === "IMG") t.style.visibility = "hidden";
    },
    true,
  );
};

async function popout(id) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setViewport({ width: 1680, height: 950, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(hideBroken);
  await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 35000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1000));
  await page.click(`#${id} button`).catch(() => {});
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${OUT}/pop-${id}.png` });
  await page.close();
  console.log("popout", id);
}

async function fullpage(path, name) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setViewport({ width: 1680, height: 950, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(hideBroken);
  await page.goto(BASE + path, { waitUntil: "networkidle2", timeout: 35000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  await page.close();
  console.log("page", name);
}

for (const id of ["conceptual", "writing", "photographs", "installation", "apps"]) {
  await popout(id);
}
await fullpage("/work/surface-surveys", "work-surface-surveys");

await browser.close();
console.log("done");
