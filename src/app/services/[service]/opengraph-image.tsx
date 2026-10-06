import { getService, services } from "@/config/services";
import { localize } from "@/lib/i18n";
import { OG_CONTENT_TYPE, OG_SIZE, publicImageDataUrl, renderOg } from "@/lib/og";
import { getProjectsForService } from "@/lib/projects";

export const alt = "Big Ape Web service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return new Response("Not found", { status: 404 });
  const copy = localize(service.copy);
  const example = getProjectsForService(service).find((p) => p.images.og);
  return renderOg({
    eyebrow: copy.name,
    title: copy.heroTitle,
    subtitle: copy.benefits.slice(0, 2).join(" · "),
    screenshot: await publicImageDataUrl(example?.images.og),
  });
}
