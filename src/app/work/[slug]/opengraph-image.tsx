import { OG_CONTENT_TYPE, OG_SIZE, publicImageDataUrl, renderOg } from "@/lib/og";
import { getProject, getVisibleProjects, projectCopy } from "@/lib/projects";

export const alt = "Case study by Big Ape Web";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });
  const copy = projectCopy(project);
  return renderOg({
    eyebrow: project.kind === "client" && project.status === "live" ? "Client project" : "Case study",
    title: copy.title,
    subtitle: copy.tagline,
    screenshot: await publicImageDataUrl(project.images.og),
  });
}
