import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { getTranslations } from "next-intl/server";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { ApeBlinker } from "@/components/brand/ApeBlinker";
import { ContactDialog } from "@/components/contact/ContactDialog";
import { getContactFormProps } from "@/components/contact/strings";
import { PointerEffects } from "@/components/layout/PointerEffects";
import { ScrollDirection } from "@/components/layout/ScrollDirection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/config/site";
import { PIXEL_ID } from "@/lib/analytics";
import "./globals.css";

// Headings: one static Bricolage Grotesque instance (optical size 96, weight 800), the exact cut
// used by the logo wordmark. 22KB, versus 77KB for the full variable font with optical sizing.
// Body text uses the system font stack, so the largest text on first load needs no font download.
const bricolage = localFont({
  src: "../assets/fonts/BricolageGrotesque-96pt-ExtraBold-latin.woff2",
  weight: "800",
  style: "normal",
  variable: "--font-bricolage",
  display: "swap",
  adjustFontFallback: "Arial",
});

// Only used for small labels, so it shouldn't compete with the main font on slow connections.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL(site.url),
    title: { default: t("homeTitle"), template: t("titleTemplate") },
    description: t("homeDescription"),
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: "/",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    twitter: { card: "summary_large_image", title: t("homeTitle"), description: t("homeDescription") },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const t = await getTranslations("common");
  const contactForm = await getContactFormProps();

  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      {/* Extensions like Grammarly add attributes to <body> before React loads; don't warn about those. */}
      <body className="min-h-dvh" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-charcoal px-5 py-3 font-bold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t("skipToContent")}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <ScrollDirection />
        <PointerEffects />
        <ApeBlinker />
        <ContactDialog strings={contactForm.strings} options={contactForm.options} />
        {PIXEL_ID && <MetaPixel />}
      </body>
    </html>
  );
}
