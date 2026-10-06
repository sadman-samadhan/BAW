import { projects, type Project, type ProjectCategory } from "@/config/projects";
import type { Service } from "@/config/services";
import { site } from "@/config/site";
import { localize, type Locale } from "@/lib/i18n";

const categoryOrder: ProjectCategory[] = ["ecommerce", "webapp", "business", "portfolio", "wedding"];

function isVisible(project: Project): boolean {
  if (project.hidden) return false;
  if (project.status === "concept" && !site.showConcepts) return false;
  return true;
}

/** The one visibility rule. Grid, home, services, sitemap, static params and OG images all use it. */
export function getVisibleProjects(): Project[] {
  return projects.filter(isVisible).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getVisibleProjects().filter((p) => p.featured);
}

/** Live client projects: the clients strip and "trusted by" sections. */
export function getClientProjects(): Project[] {
  return getVisibleProjects().filter((p) => p.kind === "client" && p.status === "live");
}

/** Categories that currently have at least one visible project, in display order. */
export function getActiveCategories(): ProjectCategory[] {
  const used = new Set(getVisibleProjects().flatMap((p) => p.categories));
  return categoryOrder.filter((c) => used.has(c));
}

export function getProjectsForService(service: Service): Project[] {
  return getVisibleProjects().filter((p) => p.categories.some((c) => service.exampleCategories.includes(c)));
}

export function getProject(slug: string): Project | undefined {
  return getVisibleProjects().find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const list = getVisibleProjects();
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1 || list.length < 2) return undefined;
  return list[(index + 1) % list.length];
}

export function projectCopy(project: Project, locale?: Locale) {
  return localize(project.copy, locale);
}

/** True when the project has a real, clickable live URL (not a placeholder). */
export function hasLiveLink(project: Project): project is Project & { links: { live: string } } {
  const url = project.links.live;
  return Boolean(url && !/^\[.*\]$/.test(url));
}
