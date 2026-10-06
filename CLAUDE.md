@AGENTS.md

# BigApeWeb (bigapeweb.com)

Company website for Big Ape Web, a web design and development agency in Dhaka (founded by Sakib).
Services: ecommerce websites (main offer, Facebook ads), custom web apps, business websites,
WordPress & LMS, portfolio websites, wedding websites. Audience is mostly on mid-range Android
phones in Bangladesh, plus some international clients.
Full plan: `C:\Users\ASUS\.claude\plans\project-bigapeweb-baw-sequential-quilt.md`.

## Hard rules
- This is a company site. Write as "we" (the agency), never "I". Don't centre the copy on Sakib;
  the founder is mentioned only in the About story. Don't invent team members either.
- Every section ends with a way to get in touch: `SectionCta` (form dialog + WhatsApp) or `CtaBand`.
  "Let's talk" buttons use `<ButtonLink contact>` which opens the site-wide form dialog.
- Never invent stats, client quotes, prices or timelines. Use placeholders: `[PRICE]`,
  `[TESTIMONIAL]`, `[CLIENT RESULT]`, `[TIMELINE]`, `[WHATSAPP_NUMBER]`, `[MESSENGER_USERNAME]`,
  `[DEMO LINK]`, `[PHOTO]`.
- Project copy describes only features verified in each project's code or live site.
- ku-ride is cancelled and must never appear.
- Clients (live, kind "client"): Verdant Aquatics (verdantaquatic.com) and Bags & Fashion
  (bagsfashionbd.com). KhelaHobe, QurbaniSathi, RateMyMarriage and MakeMyWeddingLive are our products.
- Wedding product is called **MakeMyWeddingLive** on this site (its repo calls it AmarBiye).
  Use placeholders, never the real couple's photos from that repo.
- Concept projects (Khulna Turf, construction site) always show a "Concept" badge and must stay
  hideable: per-project `hidden`, or `showConcepts: false` in `src/config/site.ts`.

## Where things live
- `src/config/projects.ts`: every portfolio project (one file to add, hide or reorder).
- `src/config/services.ts`: every service, pricing tiers, FAQs, WhatsApp prefill messages.
- `src/config/site.ts`: contact details, socials, `showConcepts`.
- `messages/en.json`: all UI strings (next-intl, single locale for now).
- `src/lib/projects.ts`: `getVisibleProjects()` is the one visibility rule used everywhere.
- `logo/`: original brand mockups. Excluded from Tailwind, ESLint and TypeScript. Don't edit.

## Conventions
- Next.js 16 App Router, every route static. No `headers()`, `cookies()` or `searchParams` in pages.
  Dynamic segments use `generateStaticParams` with `dynamicParams = false`.
- Pages and most components are server components. Client components get translated strings as
  props, so no message bundle ships to the browser.
- Animation: CSS first. Reveals and parallax use CSS scroll-driven animations (`data-reveal`,
  `data-parallax`), visible by default. Motion is only used in lazily loaded islands (desktop
  mascot tracking, Work grid reflow). Only animate transform and opacity. Respect reduced motion.
- Never animate or hide the hero headline (LCP).
- Fonts: headings use one self-hosted static Bricolage instance (optical size 96, weight 800,
  `src/assets/fonts/*-latin.woff2`, 22KB) via the `font-display` utility / h1–h2 / `.text-*`
  classes. Body text is the system font stack (no download). JetBrains Mono 700 for labels only.
  The full variable Bricolage with optical sizing is 77KB and cost LCP on mobile.
- Below-the-fold sections that are layout-heavy get `cv-auto` (content-visibility: auto); it cut
  home-page layout time by more than half. Don't put it on text-only sections (axe then misreads
  their background colour).
- No infinite CSS animations on SVG (they run on the main thread every frame). Ape blinking is
  done by `ApeBlinker` toggling `.is-blinking` on visible `.ape-blink` groups.
- `experimental.inlineCss` was tried and rejected: it embedded the CSS three times in the HTML.
- Meta Pixel events go through `data-track` attributes or `track()` in `src/lib/analytics.ts`.
- Bangla later: content fields are `{ en, bn? }`; typography uses CSS variables overridden under
  `:lang(bn)`.

## Commands
- `npm run dev`, `npm run build`, `npx tsc --noEmit`, `npx eslint .`
- `node scripts/qa-screens.mjs <outDir> http://localhost:3000 / /work --full` for QA screenshots
  (uses the installed Chrome).
- `node --experimental-strip-types scripts/capture-screenshots.ts` refreshes project screenshots.
