/**
 * Every portfolio project lives here. To hide one, set `hidden: true`.
 * To hide all concept demos at once, set `showConcepts: false` in config/site.ts.
 *
 * Copy describes only features verified in each project's code or live site.
 * Never add numbers that aren't real: use [CLIENT RESULT] until there are real results.
 */
import type { Localized } from "@/lib/i18n";

export type ProjectCategory = "ecommerce" | "webapp" | "business" | "portfolio" | "wedding";
export type ProjectStatus = "live" | "concept" | "coming-soon";
/** client: built for a paying client. product: our own product. personal: a personal site. */
export type ProjectKind = "client" | "product" | "personal";

export type ProjectCopy = {
  title: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  kind: ProjectKind;
  hidden?: boolean;
  featured?: boolean;
  order: number;
  year: number;
  categories: ProjectCategory[];
  links: { live?: string };
  stack: string[];
  /** Brand colour of the project itself, used behind its mockups. */
  accent?: string;
  /** Client logo under /public, shown in the clients strip. */
  logo?: string;
  /** Paths under /public. Missing images fall back to a branded placeholder. */
  images: {
    desktop?: string;
    desktopFull?: string;
    mobile?: string;
    og?: string;
  };
  copy: Localized<ProjectCopy>;
  result?: Localized<string>;
  testimonial?: Localized<string>;
};

const shots = (slug: string) => ({
  desktop: `/work/${slug}/desktop.webp`,
  desktopFull: `/work/${slug}/desktop-full.webp`,
  mobile: `/work/${slug}/mobile.webp`,
  og: `/work/${slug}/og.jpg`,
});

export const projects: Project[] = [
  {
    slug: "verdant-aquatics",
    status: "live",
    kind: "client",
    featured: true,
    order: 1,
    year: 2026,
    categories: ["ecommerce"],
    links: { live: "https://verdantaquatic.com" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "bKash", "Pathao", "Steadfast", "Resend"],
    accent: "#059669",
    logo: "/clients/verdant-aquatics.webp",
    images: shots("verdant-aquatics"),
    copy: {
      en: {
        title: "Verdant Aquatics",
        tagline: "An online aquarium and aquascaping store delivering across Bangladesh",
        summary:
          "A full ecommerce store for a Khulna-based aquarium, aquascaping and live-plant shop. Customers browse, pay with bKash or cash on delivery, and track their orders. The owner runs everything, from stock to couriers, from one dashboard.",
        challenge:
          "The shop needed to sell live plants and equipment across the country, take payments the way local customers actually pay, and get parcels out through local couriers without hours of manual work.",
        solution:
          "We built a custom Next.js store on Supabase with bKash built into checkout, Pathao and Steadfast courier booking from the dashboard, an English and Bangla storefront, and an admin panel where the owner and staff get separate permissions.",
        features: [
          "bKash checkout (merchant and send-money) plus cash on delivery",
          "Courier booking with Pathao and Steadfast, with automatic delivery status sync",
          "English and Bangla storefront with a language switcher",
          "Product variations with their own price, stock and photo",
          "Promo codes, banners and email campaigns",
          "Order tracking by order ID or phone, and printable invoices",
          "Owner and staff roles, with sales and profit stats for the owner",
          "Prices and stock re-checked on the server at checkout",
        ],
      },
    },
    result: { en: "[CLIENT RESULT]" },
    testimonial: { en: "[TESTIMONIAL]" },
  },
  {
    slug: "bags-fashion",
    status: "live",
    kind: "client",
    featured: true,
    order: 2,
    year: 2026,
    categories: ["ecommerce"],
    links: { live: "https://www.bagsfashionbd.com" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "bKash", "Pathao", "Steadfast"],
    accent: "#E11D48",
    logo: "/clients/bags-fashion.webp",
    images: shots("bags-fashion"),
    copy: {
      en: {
        title: "Bags & Fashion",
        tagline: "An online fashion store for imported bags and accessories in Dhaka",
        summary:
          "An ecommerce store for a Dhaka fashion brand selling imported bags, organisers and accessories. Shoppers browse by category, pay at checkout or on delivery, and get their order delivered door to door anywhere in Bangladesh.",
        challenge:
          "Selling through social media meant answering the same questions all day and taking orders by hand. The brand needed a proper store that customers trust and the team can run day to day.",
        solution:
          "We built a fast, mobile-first store with bKash checkout and cash on delivery, courier booking with Pathao and Steadfast, a Bangla and English storefront, and an admin dashboard for products, orders, staff and sales.",
        features: [
          "bKash checkout plus cash on delivery",
          "Courier booking with Pathao and Steadfast, with delivery status sync",
          "English and Bangla storefront",
          "Featured, trending and best-seller collections",
          "Order tracking and printable invoices",
          "Wishlist and a WhatsApp chat button",
          "Admin dashboard with staff accounts and sales stats",
        ],
      },
    },
    result: { en: "[CLIENT RESULT]" },
    testimonial: { en: "[TESTIMONIAL]" },
  },
  {
    slug: "khelahobe",
    status: "live",
    kind: "product",
    featured: true,
    order: 3,
    year: 2026,
    categories: ["webapp"],
    links: { live: "https://khelahbe.vercel.app" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PWA", "Web Push", "Resend"],
    accent: "#16A34A",
    images: shots("khelahobe"),
    copy: {
      en: {
        title: "KhelaHobe",
        tagline: "Football match manager for weekend squads",
        summary:
          "KhelaHobe (Bengali for \"the game is on\") helps recreational football groups organise matches, collect RSVPs, split teams and track every goal and stat.",
        challenge:
          "Weekend football groups run on chaotic chat threads: who's in, who scored, who's top of the table.",
        solution:
          "We built an installable web app with groups, match scheduling and RSVPs, score and goal entry, leaderboards, tournaments and shareable match cards, plus push and email reminders.",
        features: [
          "Groups with chat and leaderboards",
          "Match scheduling with RSVPs",
          "Goal and player stat tracking",
          "Tournaments with knockout brackets",
          "Shareable matchday and stats cards",
          "Forums and direct messages",
          "Push notifications and email reminders",
          "Installs on your phone like an app (PWA)",
        ],
      },
    },
  },
  {
    slug: "makemyweddinglive",
    status: "coming-soon",
    kind: "product",
    featured: true,
    order: 4,
    year: 2026,
    categories: ["wedding"],
    links: {},
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion", "Gemini API"],
    accent: "#6B2C3E",
    images: {},
    copy: {
      en: {
        title: "MakeMyWeddingLive",
        tagline: "Cinematic wedding websites for Bangladeshi and South Asian couples",
        summary:
          "A wedding website platform that turns a couple's photos and story into a live site their guests can visit, with every ceremony, a journey timeline and a blessing board.",
        challenge:
          "Wedding photos end up scattered across phones and Facebook albums. Couples want one beautiful place to tell their story and share every ceremony.",
        solution:
          "Each couple gets a site with a cinematic video hero, an \"Our Journey\" timeline, ceremony sections for Muslim and Hindu traditions in Bangla and English, a gallery and a guest blessing board. Colours are matched to the couple's own photo.",
        features: [
          "Cinematic video hero",
          "\"Our Journey\" story timeline",
          "Ceremony sections for Muslim and Hindu traditions, in Bangla and English",
          "Photo gallery with categories and a lightbox",
          "Blessing board for guests",
          "Colour palette matched to the couple's photo, with a readability check",
          "Custom monogram",
        ],
      },
    },
  },
  {
    slug: "qurbanisathi",
    status: "live",
    kind: "product",
    order: 5,
    year: 2026,
    categories: ["webapp"],
    links: { live: "https://qurbani-sathi.vercel.app" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostGIS", "Leaflet", "next-intl"],
    accent: "#15803D",
    images: shots("qurbanisathi"),
    copy: {
      en: {
        title: "QurbaniSathi",
        tagline: "Find Qurbani share partners in your neighbourhood",
        summary:
          "A bilingual web app that helps people in Bangladesh find neighbours to share a Qurbani animal with, then talk to them in the app or on WhatsApp.",
        challenge:
          "Finding share partners for Qurbani usually means asking around and hoping. People need someone nearby with a similar budget, quickly, before Eid.",
        solution:
          "Set your location, post what you need, and see nearby requests on a map. Chats happen in the app or on WhatsApp, and old listings expire on their own.",
        features: [
          "Bangla and English interface",
          "Location by GPS, area search or a map pin",
          "Nearby requests on a map",
          "In-app chat plus WhatsApp contact",
          "Post, edit and mark requests as filled",
          "Listings expire automatically every day",
          "Admin tools with a demand heatmap",
          "Installs on your phone like an app (PWA)",
        ],
      },
    },
  },
  {
    slug: "ratemymarriage",
    status: "live",
    kind: "product",
    order: 6,
    year: 2026,
    categories: ["webapp"],
    links: { live: "https://ratemymarriage.xyz" },
    stack: ["React", "Firebase", "Firestore", "Recharts", "Google Analytics"],
    accent: "#9F1239",
    images: shots("ratemymarriage"),
    copy: {
      en: {
        title: "RateMyMarriage",
        tagline: "Anonymous marriage ratings and statistics",
        summary:
          "A web app where married people rate their marriage anonymously and everyone can explore the results, including how love and arranged marriages compare.",
        challenge:
          "People are curious about how marriages really go, but almost nobody answers honestly with their name attached.",
        solution:
          "A no-sign-up anonymous survey feeding live statistics and charts, with community stories, a love vs arranged comparison and a quiz.",
        features: [
          "Anonymous survey, no registration",
          "Live statistics and charts",
          "Love vs arranged marriage comparison",
          "Community experiences you can filter and sort",
          "Relationship quiz",
          "Blog and FAQ",
        ],
      },
    },
  },
  {
    slug: "sadman-sakib-portfolio",
    status: "live",
    kind: "personal",
    order: 7,
    year: 2026,
    categories: ["portfolio"],
    links: { live: "https://sakibbye.vercel.app" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#C2410C",
    images: shots("sakib-portfolio"),
    copy: {
      en: {
        title: "Sadman Sakib",
        tagline: "Portfolio for a software engineer and researcher",
        summary:
          "A personal portfolio that brings engineering work, research and a career story together, with a timeline, a publication, a photo carousel and a resume page.",
        challenge:
          "Show both sides of a career, engineering and academic research, without the page feeling like two CVs glued together.",
        solution:
          "One combined timeline, focused sections for research and skills, a playful polaroid-style photo carousel, light and dark themes, and a resume page.",
        features: [
          "Combined academic and professional timeline",
          "Research and publication section",
          "Polaroid-style photo carousel",
          "Light and dark theme",
          "Resume page with an embedded PDF",
          "Smooth animations with Framer Motion",
        ],
      },
    },
  },
  {
    slug: "khulna-turf",
    status: "concept",
    kind: "client",
    order: 8,
    year: 2026,
    categories: ["webapp", "business"],
    links: { live: "[DEMO LINK]" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "bKash"],
    accent: "#10B981",
    images: shots("khulna-turf"),
    copy: {
      en: {
        title: "Khulna Turf",
        tagline: "Online slot booking for a sports turf",
        summary:
          "A concept booking site for a football, badminton and swimming venue in Khulna. Players pick a slot on a calendar and pay with bKash. The venue manages everything from an admin panel.",
        challenge:
          "Turf bookings usually happen over phone calls and Facebook messages, which leads to double bookings and no-shows.",
        solution:
          "A live slot calendar with off-peak, peak and weekend pricing, combo packages, bKash payment, and an admin panel for bookings, customers, coupons, reports and slot generation.",
        features: [
          "Calendar with live slot availability",
          "Off-peak, peak and weekend pricing",
          "Combo packages, like a match plus a pool session",
          "bKash payment or cash on arrival",
          "Admin for bookings, customers, coupons and reports",
          "Bulk time-slot generator",
        ],
      },
    },
  },
  {
    slug: "construction-company",
    status: "concept",
    kind: "client",
    order: 9,
    year: 2026,
    categories: ["business"],
    links: { live: "[DEMO LINK]" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity"],
    accent: "#1B2A4A",
    images: shots("construction-company"),
    copy: {
      en: {
        title: "Construction company site",
        tagline: "A company website built to bring in estimate requests",
        summary:
          "A concept website for a construction, renovation and home-services company in Dhaka, built so visitors find the right service and request an estimate in a couple of taps.",
        challenge:
          "A company offering a dozen services needs each one to be easy to find, and every page to lead toward a quote.",
        solution:
          "A service grid, a filterable project showcase, and an estimate form that opens with the chosen service already selected. The client edits services in Sanity without touching code.",
        features: [
          "12 service categories",
          "Estimate request form, pre-filled with the chosen service",
          "Filterable project showcase",
          "Process, FAQ and testimonial sections",
          "Content editing in Sanity Studio",
        ],
      },
    },
  },
];
