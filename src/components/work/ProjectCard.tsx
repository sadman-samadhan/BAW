import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LaptopFrame, PhoneFrame, PlaceholderScreen, ScreenImage } from "@/components/mockups/Devices";
import { Badge } from "@/components/ui/primitives";
import type { Project } from "@/config/projects";
import { projectCopy } from "@/lib/projects";

type Props = {
  project: Project;
  /** Responsive sizes hint for the laptop screenshot. */
  sizes?: string;
  headingLevel?: "h2" | "h3";
  /** "dark" when the card sits on a charcoal section. */
  tone?: "light" | "dark";
  /** Preload the screenshot (first card above the fold). */
  preload?: boolean;
};

export function stageBackground(accent?: string) {
  return `color-mix(in srgb, ${accent ?? "#FFC83D"} 16%, #E9E5DA)`;
}

/**
 * Portfolio card with laptop + phone mockups. Server component.
 * Desktop hover (CSS + PointerEffects): full-page screenshot scrolls, phone slides out, card tilts,
 * a "View case" pill follows the cursor. On touch the whole card is simply one link.
 */
export async function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 30vw, 90vw",
  headingLevel = "h3",
  tone = "light",
  preload = false,
}: Props) {
  const t = await getTranslations();
  const copy = projectCopy(project);
  const Heading = headingLevel;
  const statusTone = project.status === "coming-soon" ? "coming-soon" : project.status;

  return (
    <article className="project-card group relative" data-tilt-root>
      <div
        data-tilt
        className="relative overflow-hidden rounded-[1.75rem] px-[8%] pt-[9%] pb-[12%]"
        style={{ background: stageBackground(project.accent) }}
      >
        <LaptopFrame>
          {project.images.desktop ? (
            <ScreenImage
              src={project.images.desktop}
              fullSrc={project.images.desktopFull}
              alt={`${copy.title} website on a laptop`}
              sizes={sizes}
              preload={preload}
            />
          ) : (
            <PlaceholderScreen title={copy.title} label={t(`status.${project.status}`)} accent={project.accent} />
          )}
        </LaptopFrame>

        {project.images.mobile && (
          <div className="phone-peek absolute right-[5%] bottom-[5%] w-[21%]">
            <PhoneFrame>
              <Image
                src={project.images.mobile}
                alt=""
                fill
                sizes="(min-width: 1024px) 7vw, 20vw"
                className="object-cover object-top"
                loading="lazy"
              />
            </PhoneFrame>
          </div>
        )}

        <Badge tone={statusTone} className="absolute top-4 left-4 z-[1]">
          {t(`status.${project.status}`)}
        </Badge>

        <span
          aria-hidden="true"
          className="cursor-pill inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-sm font-bold whitespace-nowrap text-paper"
        >
          {t("common.viewCase")} <ArrowRight size={16} />
        </span>
      </div>

      <div className="mt-5">
        <div>
          <Heading className="text-h3" translate="no">
            <Link href={`/work/${project.slug}`} className="stretched-link link-draw rounded-sm">
              {copy.title}
            </Link>
          </Heading>
          <p className={`mt-1.5 ${tone === "dark" ? "text-mist" : "text-stone"}`}>{copy.tagline}</p>
        </div>
      </div>
      <p className={`text-label mt-3 ${tone === "dark" ? "text-banana" : "text-banana-ink"}`}>
        {[t(`kind.${project.kind}`), ...project.categories.map((c) => t(`categories.${c}`))].join(" · ")}
      </p>
    </article>
  );
}
