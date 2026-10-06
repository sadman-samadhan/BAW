import { OG_CONTENT_TYPE, OG_SIZE, publicImageDataUrl, renderOg } from "@/lib/og";
import { getFeaturedProjects } from "@/lib/projects";

export const alt = "Work by Big Ape Web";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const lead = getFeaturedProjects().find((p) => p.images.og);
  return renderOg({
    eyebrow: "Our work",
    title: "Stores, apps and sites we've built.",
    screenshot: await publicImageDataUrl(lead?.images.og),
  });
}
