import { site } from "@/config/site";

/** Renders a JSON-LD script. Escapes "<" so content can never close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        description,
        email: site.contact.email,
        logo: `${site.url}/brand/ape-mark.svg`,
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "BD",
        },
        areaServed: ["Bangladesh", "Worldwide"],
        knowsAbout: [
          "Ecommerce websites",
          "Payment gateway integration",
          "Custom web applications",
          "Business websites",
          "WordPress",
          "Learning management systems",
          "Portfolio websites",
          "Wedding websites",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: { "@id": `${site.url}/#business` },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
