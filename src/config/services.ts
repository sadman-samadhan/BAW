/**
 * Everything we offer. Each service gets a landing page at /services/<slug>
 * (Facebook-ad destinations, so each has a clear offer, examples, pricing, FAQ and CTAs).
 * Prices, timelines and similar business details are placeholders until decided.
 * Tier names and inclusions are a draft for review.
 */
import type { ProjectCategory } from "@/config/projects";
import type { Localized } from "@/lib/i18n";

export type ServiceSlug = "ecommerce" | "web-apps" | "business" | "wordpress" | "portfolio" | "wedding";
export type ServiceIcon = "bag" | "app" | "building" | "cap" | "camera" | "rings";

export type PricingTier = {
  name: string;
  price: string; // shown after the ৳ sign
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

export type ServiceCopy = {
  /** Short name used in nav, cards and labels */
  name: string;
  /** One-line card description */
  cardBlurb: string;
  heroTitle: string;
  heroSubtitle: string;
  benefits: string[];
  audience: { title: string; body: string }[];
  includes: { title: string; body: string }[];
  tiers: PricingTier[];
  faqs: { q: string; a: string }[];
  /** Prefilled WhatsApp message so we know which page the chat came from */
  whatsappMessage: string;
  ctaTitle: string;
};

export type Service = {
  slug: ServiceSlug;
  /** Project categories that supply the example projects */
  exampleCategories: ProjectCategory[];
  icon: ServiceIcon;
  /** Shown first and highlighted (our main offer) */
  primary?: boolean;
  copy: Localized<ServiceCopy>;
};

export const services: Service[] = [
  {
    slug: "ecommerce",
    exampleCategories: ["ecommerce"],
    icon: "bag",
    primary: true,
    copy: {
      en: {
        name: "Ecommerce websites",
        cardBlurb:
          "Your own online store with payment gateway, cash on delivery, courier booking and a dashboard to run it all.",
        heroTitle: "An online store that sells while you sleep.",
        heroSubtitle:
          "Stop taking orders one inbox message at a time. We build your own online store with bKash, cash on delivery and courier booking built in, and a dashboard you can run from your phone.",
        benefits: [
          "bKash payment gateway and cash on delivery",
          "Pathao and Steadfast courier booking",
          "Bangla and English storefront",
        ],
        audience: [
          {
            title: "Facebook and Instagram sellers",
            body: "You already have customers. Give them a store where they can browse, order and pay without waiting for a reply.",
          },
          {
            title: "Shops going online",
            body: "Bring your shop's products online and deliver anywhere in Bangladesh.",
          },
          {
            title: "Growing brands",
            body: "Outgrown a template? Get custom features, staff accounts and proper sales stats.",
          },
        ],
        includes: [
          { title: "Mobile-first store", body: "Fast product pages, search, categories and a smooth cart, built for phones first." },
          { title: "Payment gateway", body: "bKash checkout and cash on delivery, the way your customers already pay." },
          { title: "Courier booking", body: "Send orders to Pathao or Steadfast from your dashboard and track delivery status." },
          { title: "Your dashboard", body: "Manage products, stock, orders, customers and promo codes without calling a developer." },
          { title: "Bangla and English", body: "Let customers switch language with one tap." },
          { title: "Order tracking and invoices", body: "Customers track orders themselves, and you print invoices in a click." },
        ],
        tiers: [
          {
            name: "Starter",
            price: "[PRICE]",
            blurb: "Everything you need to start selling online.",
            features: [
              "Product catalogue, cart and checkout",
              "bKash and cash on delivery",
              "Order management dashboard",
              "Mobile-first design",
            ],
          },
          {
            name: "Growth",
            price: "[PRICE]",
            blurb: "For shops shipping orders every day.",
            highlighted: true,
            features: [
              "Everything in Starter",
              "Pathao and Steadfast courier booking",
              "Promo codes and banners",
              "Bangla and English storefront",
              "Customer accounts and order tracking",
            ],
          },
          {
            name: "Custom",
            price: "[PRICE]",
            blurb: "Built around how your business works.",
            features: [
              "Everything in Growth",
              "Staff accounts with permissions",
              "Sales and profit stats",
              "Custom features on request",
            ],
          },
        ],
        faqs: [
          {
            q: "Can customers pay with bKash?",
            a: "Yes. Our client stores Verdant Aquatics and Bags & Fashion both take bKash payments and cash on delivery. Your store can do the same.",
          },
          {
            q: "Can you connect Pathao or Steadfast?",
            a: "Yes. Our client stores book Pathao and Steadfast deliveries straight from their dashboard and update delivery status automatically.",
          },
          {
            q: "Can we update products ourselves?",
            a: "Yes. You get a dashboard to add products, change prices and stock, manage orders and create promo codes.",
          },
          { q: "Can the store be in Bangla?", a: "Yes. Customers can switch between Bangla and English." },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Packages start from ৳[PRICE]. Message us on WhatsApp for a quote that fits your shop." },
        ],
        whatsappMessage: "Hi Big Ape Web! We want an ecommerce website for our business.",
        ctaTitle: "Ready to open your online store?",
      },
    },
  },
  {
    slug: "web-apps",
    exampleCategories: ["webapp"],
    icon: "app",
    copy: {
      en: {
        name: "Custom web apps",
        cardBlurb: "Booking systems, community platforms, dashboards and other tools, built around how you work.",
        heroTitle: "Your idea, built into a working web app.",
        heroSubtitle:
          "From slot booking to community platforms, we turn ideas into fast web apps that work on every phone, with logins, payments, notifications and an admin dashboard.",
        benefits: ["Works on any phone, no app store needed", "Logins, payments and notifications", "An admin dashboard to manage it all"],
        audience: [
          { title: "Founders with an idea", body: "Get a real, working product in front of users, not just a slide deck." },
          { title: "Businesses running on spreadsheets", body: "Replace manual bookings, records and messages with one system." },
          { title: "Clubs and communities", body: "Give your members one place to sign up, organise and stay in touch." },
        ],
        includes: [
          { title: "Accounts and logins", body: "Sign-up, login, roles and permissions for users and staff." },
          { title: "Booking and scheduling", body: "Calendars, time slots, RSVPs and reminders." },
          { title: "Payments", body: "bKash checkout built into your flow." },
          { title: "Notifications", body: "Push notifications and email reminders that bring people back." },
          { title: "Maps and location", body: "Show nearby results and let users pick a spot on a map." },
          { title: "Admin dashboards", body: "Manage users, content and reports from one place." },
        ],
        tiers: [
          {
            name: "MVP",
            price: "[PRICE]",
            blurb: "A first version to test your idea with real users.",
            features: ["Core features only", "User accounts", "Mobile-first web app", "Basic admin"],
          },
          {
            name: "Product",
            price: "[PRICE]",
            blurb: "A complete app, ready for launch.",
            highlighted: true,
            features: ["Everything in MVP", "Payments", "Notifications", "Full admin dashboard", "Installable as an app (PWA)"],
          },
          {
            name: "Custom",
            price: "[PRICE]",
            blurb: "Complex systems and integrations.",
            features: ["Everything in Product", "Third-party integrations", "Custom features on request"],
          },
        ],
        faqs: [
          {
            q: "Do we need an app on the Play Store?",
            a: "Not necessarily. We build installable web apps (PWAs) that people add to their home screen straight from the browser, like our products KhelaHobe and QurbaniSathi.",
          },
          {
            q: "Can the app take payments?",
            a: "Yes. We've built bKash checkout into ecommerce stores and booking flows.",
          },
          {
            q: "Can it work in Bangla?",
            a: "Yes. QurbaniSathi, one of our products, runs fully in Bangla and English.",
          },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Every app is different. Tell us your idea on WhatsApp or through the form and we'll get back to you with a quote." },
        ],
        whatsappMessage: "Hi Big Ape Web! We have an idea for a web app.",
        ctaTitle: "Got an idea? Let's build it.",
      },
    },
  },
  {
    slug: "business",
    exampleCategories: ["business"],
    icon: "building",
    copy: {
      en: {
        name: "Business websites",
        cardBlurb: "Company websites that explain what you do, show your work and turn visitors into enquiries.",
        heroTitle: "A business website that brings in enquiries.",
        heroSubtitle:
          "Look established online. We build company websites that present your services and projects clearly, and make it easy for customers to call, message or ask for a quote.",
        benefits: ["Services and projects, clearly presented", "Quote and enquiry forms", "Content you can edit yourself"],
        audience: [
          { title: "Service companies", body: "Construction, interiors, repairs, consulting: show what you do and win the job." },
          { title: "Local businesses", body: "Restaurants, clinics, venues and shops that want to be found and contacted." },
          { title: "Growing companies", body: "Replace an outdated site with one that matches the quality of your work." },
        ],
        includes: [
          { title: "Service pages", body: "Each service explained clearly, with a way to enquire on every page." },
          { title: "Project showcase", body: "Galleries and case studies that prove what you can do." },
          { title: "Enquiry and quote forms", body: "Forms that land in your inbox, plus WhatsApp and call buttons." },
          { title: "Easy editing", body: "A content management system so your team can update text, services and projects." },
          { title: "Share-ready", body: "Proper titles, descriptions and preview images for Google, Facebook and WhatsApp." },
          { title: "Mobile-first", body: "Fast on every phone, because that's where your customers are." },
        ],
        tiers: [
          {
            name: "Starter",
            price: "[PRICE]",
            blurb: "A sharp one-page company website.",
            features: ["One-page site", "Services and contact sections", "WhatsApp and call buttons", "Mobile-first design"],
          },
          {
            name: "Business",
            price: "[PRICE]",
            blurb: "The full company website.",
            highlighted: true,
            features: ["Everything in Starter", "Multiple pages", "Project showcase", "Enquiry and quote forms", "Content editing"],
          },
          {
            name: "Custom",
            price: "[PRICE]",
            blurb: "Bookings, portals and more.",
            features: ["Everything in Business", "Booking or customer portal", "Custom features on request"],
          },
        ],
        faqs: [
          {
            q: "Can we update the content ourselves?",
            a: "Yes. We can set up a content management system so your team edits services, projects and text without touching code.",
          },
          {
            q: "Will it show up on Google?",
            a: "Every site we build has clean page titles, descriptions and a sitemap so search engines understand it. Rankings depend on more than the website, and we're happy to advise.",
          },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Packages start from ৳[PRICE]. Message us on WhatsApp for a quote." },
        ],
        whatsappMessage: "Hi Big Ape Web! We need a website for our business.",
        ctaTitle: "Ready to look the part online?",
      },
    },
  },
  {
    slug: "wordpress",
    exampleCategories: [],
    icon: "cap",
    copy: {
      en: {
        name: "WordPress & LMS",
        cardBlurb: "WordPress websites your team can edit, and online course platforms (LMS) for teaching and training.",
        heroTitle: "WordPress sites and online course platforms.",
        heroSubtitle:
          "Need a website your team can update without a developer, or a place to run online courses? We build WordPress websites and learning management systems that are easy to manage.",
        benefits: ["Edit pages yourself from a dashboard", "Courses, lessons and student accounts", "Mobile-first and easy to use"],
        audience: [
          { title: "Teachers and coaching centres", body: "Put your courses online and manage students in one place." },
          { title: "Training teams and institutes", body: "Run staff training or certificate courses on your own platform." },
          { title: "Teams that want control", body: "Update pages, posts and images yourself, whenever you need to." },
        ],
        includes: [
          { title: "WordPress website", body: "A clean, fast site on the platform your team can learn quickly." },
          { title: "Course platform (LMS)", body: "Courses, lessons, quizzes and student enrolment." },
          { title: "Easy editing", body: "Update pages, posts and media from the WordPress dashboard." },
          { title: "Mobile-first", body: "Students and customers use it comfortably on their phones." },
          { title: "Forms and enquiries", body: "Contact and enrolment forms that reach your inbox." },
          { title: "Handover", body: "We show your team how to manage the site and courses." },
        ],
        tiers: [
          {
            name: "WordPress site",
            price: "[PRICE]",
            blurb: "A website your team can manage.",
            features: ["Custom WordPress website", "Easy page editing", "Contact forms", "Mobile-first design"],
          },
          {
            name: "LMS",
            price: "[PRICE]",
            blurb: "Run your courses online.",
            highlighted: true,
            features: ["Everything in WordPress site", "Courses and lessons", "Quizzes", "Student enrolment"],
          },
          {
            name: "Custom",
            price: "[PRICE]",
            blurb: "Tailored to your programme.",
            features: ["Everything in LMS", "Custom features on request"],
          },
        ],
        faqs: [
          {
            q: "Can we edit the site ourselves?",
            a: "Yes. WordPress lets your team update pages, posts and images from a simple dashboard, and we show you how.",
          },
          {
            q: "Can we sell courses online?",
            a: "Tell us how you want to sell and run your courses, and we'll recommend the right setup.",
          },
          {
            q: "Should we choose WordPress or a custom build?",
            a: "WordPress suits content-heavy sites your team edits often. Custom builds suit stores and apps with special features. We'll recommend what fits.",
          },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Packages start from ৳[PRICE]. Message us on WhatsApp for a quote." },
        ],
        whatsappMessage: "Hi Big Ape Web! We're interested in a WordPress site or LMS.",
        ctaTitle: "Ready to take your courses online?",
      },
    },
  },
  {
    slug: "portfolio",
    exampleCategories: ["portfolio"],
    icon: "camera",
    copy: {
      en: {
        name: "Portfolio websites",
        cardBlurb: "Personal websites that show your work, your story and your CV, and make people want to hire you.",
        heroTitle: "A portfolio that gets you hired.",
        heroSubtitle:
          "A personal website that tells your story, shows your best work and makes it easy for recruiters, clients and collaborators to reach you.",
        benefits: ["Your story, work and CV in one link", "Looks great on every phone", "Easy to share on LinkedIn and Facebook"],
        audience: [
          { title: "Job seekers and graduates", body: "Stand out from a stack of PDFs with a site that shows what you can do." },
          { title: "Freelancers and creatives", body: "Show your projects properly and turn visitors into clients." },
          { title: "Researchers and professionals", body: "Publications, experience and talks, organised and easy to read." },
        ],
        includes: [
          { title: "Your story", body: "A clear about section and timeline that reads like you, not like a template." },
          { title: "Work showcase", body: "Projects, case studies or a gallery, presented the way your field expects." },
          { title: "Resume page", body: "Your CV online, with a download button." },
          { title: "Light and dark mode", body: "Looks sharp in any setting." },
          { title: "Smooth animations", body: "Tasteful motion that makes the site feel alive without slowing it down." },
          { title: "Share-ready", body: "Proper previews when you share your link on Facebook, LinkedIn or WhatsApp." },
        ],
        tiers: [
          {
            name: "Essential",
            price: "[PRICE]",
            blurb: "A clean one-page portfolio.",
            features: ["One-page site", "About, work and contact sections", "Mobile-first design", "Share previews"],
          },
          {
            name: "Professional",
            price: "[PRICE]",
            blurb: "The full story, done properly.",
            highlighted: true,
            features: [
              "Everything in Essential",
              "Multiple sections or pages",
              "Project case studies",
              "Resume page with download",
              "Light and dark mode",
            ],
          },
          {
            name: "Signature",
            price: "[PRICE]",
            blurb: "A one-of-a-kind personal site.",
            features: ["Everything in Professional", "Custom design and animations", "Custom features on request"],
          },
        ],
        faqs: [
          {
            q: "What do we need from you?",
            a: "Your photos, a bit about yourself and links to your work. If you have a CV, that's a great starting point.",
          },
          { q: "Can people download my CV?", a: "Yes. Your resume gets its own page with a download button." },
          { q: "Will it look good when I share the link?", a: "Yes. Every page gets a proper preview image and title for Facebook, LinkedIn and WhatsApp." },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Packages start from ৳[PRICE]. Message us on WhatsApp and tell us what you need." },
        ],
        whatsappMessage: "Hi Big Ape Web! I want a portfolio website.",
        ctaTitle: "Ready to make your first impression count?",
      },
    },
  },
  {
    slug: "wedding",
    exampleCategories: ["wedding"],
    icon: "rings",
    copy: {
      en: {
        name: "Wedding websites",
        cardBlurb: "A live website for your wedding: your journey, every ceremony and all your photos in one beautiful place.",
        heroTitle: "Your love story, live on the web.",
        heroSubtitle:
          "One beautiful website for your journey together, every ceremony from Gaye Holud to Bou Bhat, and all the photos your family keeps asking for.",
        benefits: ["Every ceremony in one place", "Bangla and English", "A link your guests will actually open"],
        audience: [
          { title: "Couples getting married", body: "Share the details and the story before the big day, and the photos after." },
          { title: "Families abroad", body: "Let relatives who can't attend feel part of every ceremony." },
          { title: "Anniversary surprises", body: "A gift that tells your story better than any album." },
        ],
        includes: [
          { title: "Cinematic hero", body: "Open with your wedding video or your favourite photo." },
          { title: "Our Journey", body: "A timeline of how you met and every milestone since." },
          { title: "Every ceremony", body: "Sections for each event, with Muslim and Hindu traditions in Bangla and English." },
          { title: "Photo gallery", body: "All your photos, organised by ceremony, with a full-screen viewer." },
          { title: "Blessing board", body: "Guests leave duas, wishes and messages for you to keep." },
          { title: "Your colours", body: "A colour palette matched to your own photo, plus a custom monogram." },
        ],
        tiers: [
          {
            name: "Classic",
            price: "[PRICE]",
            blurb: "Your story and photos, beautifully told.",
            features: ["Our Journey timeline", "Ceremony sections", "Photo gallery", "Bangla and English"],
          },
          {
            name: "Cinematic",
            price: "[PRICE]",
            blurb: "The full MakeMyWeddingLive experience.",
            highlighted: true,
            features: ["Everything in Classic", "Video hero", "Colours matched to your photo", "Custom monogram", "Guest blessing board"],
          },
          {
            name: "Custom",
            price: "[PRICE]",
            blurb: "Designed entirely around you.",
            features: ["Everything in Cinematic", "Custom design", "Custom features on request"],
          },
        ],
        faqs: [
          { q: "When can we get one?", a: "MakeMyWeddingLive is launching soon. Message us on WhatsApp to get early access." },
          {
            q: "Can it cover Gaye Holud, the Akht, the Wedding and Bou Bhat?",
            a: "Yes. Each ceremony gets its own section, with Muslim and Hindu traditions available in Bangla and English.",
          },
          { q: "Can guests leave messages?", a: "Yes. There's a blessing board where guests leave duas and wishes." },
          { q: "Can we use our wedding video?", a: "Yes. Your video can play right at the top of the site." },
          { q: "How long does it take?", a: "[TIMELINE]" },
          { q: "How much does it cost?", a: "Packages start from ৳[PRICE]. Message us on WhatsApp for details." },
        ],
        whatsappMessage: "Hi Big Ape Web! We're interested in a wedding website.",
        ctaTitle: "Ready to put your story online?",
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
