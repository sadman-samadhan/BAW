/**
 * Captures project screenshots for the portfolio from each project's live URL.
 *
 *   node --experimental-strip-types scripts/capture-screenshots.ts
 *   node --experimental-strip-types scripts/capture-screenshots.ts --only=khelahobe
 *   node --experimental-strip-types scripts/capture-screenshots.ts --url=khulna-turf=http://localhost:3201
 *
 * Writes to public/work/<slug>/:
 *   desktop.webp       1440x900 first screen
 *   desktop-full.webp  full page (capped), 960px wide, for the hover-scroll preview
 *   mobile.webp        390x844 at 2x
 *   og.jpg             small crop for Open Graph images
 *
 * Uses the locally installed Chrome (Playwright's own Chromium can't be downloaded here).
 */
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "../src/config/projects.ts";

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1]?.split(",");
const overrides = new Map(
  args
    .filter((a) => a.startsWith("--url="))
    .map((a) => {
      const [slug, ...rest] = a.slice("--url=".length).split("=");
      return [slug, rest.join("=")] as const;
    }),
);

const isPlaceholder = (url?: string) => !url || /^\[.*\]$/.test(url);

const targets = projects
  .map((p) => ({ slug: p.slug, url: overrides.get(p.slug) ?? p.links.live }))
  .filter((t): t is { slug: string; url: string } => !isPlaceholder(t.url))
  .filter((t) => !only || only.includes(t.slug));

if (targets.length === 0) {
  console.log("Nothing to capture.");
  process.exit(0);
}

const FULL_PAGE_MAX_HEIGHT = 5400;

async function settle(page: Page) {
  // Hide Next.js dev-mode badges (when capturing a local dev server) and disable smooth scrolling,
  // which would otherwise leave the page mid-scroll when the screenshot is taken.
  await page.addStyleTag({
    content: "nextjs-portal{display:none!important} html,body{scroll-behavior:auto!important}",
  });
  await page.waitForTimeout(2500);
  // Scroll through the page so lazy images and scroll animations load, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1500);
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  for (const { slug, url } of targets) {
    const dir = join("public", "work", slug);
    await mkdir(dir, { recursive: true });
    console.log(`\n${slug}  ${url}`);

    // Desktop
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const dp = await desktop.newPage();
    try {
      await dp.goto(url, { waitUntil: "load", timeout: 60000 });
      await settle(dp);
      const first = await dp.screenshot({ type: "png" });
      await sharp(first).webp({ quality: 80 }).toFile(join(dir, "desktop.webp"));
      await sharp(first).resize(824, 515).jpeg({ quality: 82, mozjpeg: true }).toFile(join(dir, "og.jpg"));

      const full = await dp.screenshot({ type: "png", fullPage: true });
      const meta = await sharp(full).metadata();
      const height = Math.min(meta.height ?? 900, FULL_PAGE_MAX_HEIGHT);
      await sharp(full)
        .extract({ left: 0, top: 0, width: meta.width ?? 1440, height })
        .resize({ width: 960 })
        .webp({ quality: 72 })
        .toFile(join(dir, "desktop-full.webp"));
      console.log(`  desktop ok (full page ${meta.height}px, kept ${height}px)`);
    } catch (e) {
      console.error(`  desktop FAILED: ${(e as Error).message}`);
    } finally {
      await desktop.close();
    }

    // Mobile
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36",
    });
    const mp = await mobile.newPage();
    try {
      await mp.goto(url, { waitUntil: "load", timeout: 60000 });
      await settle(mp);
      const shot = await mp.screenshot({ type: "png" });
      await sharp(shot).webp({ quality: 78 }).toFile(join(dir, "mobile.webp"));
      console.log("  mobile ok");
    } catch (e) {
      console.error(`  mobile FAILED: ${(e as Error).message}`);
    } finally {
      await mobile.close();
    }
  }
} finally {
  await browser.close();
}
