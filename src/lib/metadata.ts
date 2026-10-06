import type { Metadata } from "next";
import { site } from "@/config/site";

type Options = {
  title?: string;
  description: string;
  path: string;
  /**
   * Explicit OG image path. Leave empty for routes that have their own opengraph-image file,
   * since file-based images take priority. Pages without one should pass "/opengraph-image".
   */
  image?: string;
  noIndex?: boolean;
};

/**
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the parent's whole object.
 * So this always returns the complete set of fields.
 */
export function buildMetadata({ title, description, path, image, noIndex }: Options): Metadata {
  const url = path === "/" ? "/" : path.replace(/\/$/, "");
  const ogTitle = title ? `${title} · ${site.name}` : site.name;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title: ogTitle,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: ogTitle }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
