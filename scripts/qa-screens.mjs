// QA helper: screenshots pages at mobile and desktop sizes using the locally installed Chrome.
// Usage: node scripts/qa-screens.mjs <outDir> <baseUrl> <path> [path...] [--full] [--reduced] [--scroll=600]
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const [outDir, baseUrl, ...paths] = args.filter((a) => !a.startsWith("--"));
const scrollFlag = [...flags].find((f) => f.startsWith("--scroll="));
const scrollY = scrollFlag ? Number(scrollFlag.split("=")[1]) : 0;

if (!outDir || !baseUrl || paths.length === 0) {
  console.error("Usage: node scripts/qa-screens.mjs <outDir> <baseUrl> <path...> [--full] [--reduced] [--scroll=N]");
  process.exit(1);
}

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "desktop", width: 1440, height: 900, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: vp.deviceScaleFactor,
      reducedMotion: flags.has("--reduced") ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    for (const p of paths) {
      await page.goto(new URL(p, baseUrl).toString(), { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(1800); // let entrance animations settle
      const base = `${p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_")}-${vp.name}`;
      const stepsFlag = [...flags].find((f) => f.startsWith("--steps="));
      if (stepsFlag) {
        // Scroll like a visitor and capture the viewport at regular intervals.
        const steps = Number(stepsFlag.split("=")[1]);
        const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
        for (let s = 0; s <= steps; s++) {
          const y = Math.round((total * s) / steps);
          await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
          await page.waitForTimeout(700);
          const name = `${base}-step${String(s).padStart(2, "0")}.png`;
          await page.screenshot({ path: join(outDir, name) });
        }
        console.log(`saved ${steps + 1} steps for ${base}`);
        continue;
      }
      if (scrollY) {
        await page.mouse.wheel(0, scrollY);
        await page.waitForTimeout(900);
      }
      const name = `${base}${scrollY ? `-s${scrollY}` : ""}.png`;
      await page.screenshot({ path: join(outDir, name), fullPage: flags.has("--full") });
      console.log("saved", name);
    }
    if (errors.length) console.log(`[${vp.name}] console errors:\n  ` + errors.join("\n  "));
    await context.close();
  }
} finally {
  await browser.close();
}
