import type { MetadataRoute } from "next";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { getVisibleProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: s.slug === "ecommerce" ? 0.95 : 0.9,
    })),
    { url: url("/work"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...getVisibleProjects().map((p) => ({
      url: url(`/work/${p.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: url("/about"), lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
