import Image from "next/image";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LaptopFrame, PhoneFrame, ScreenImage } from "@/components/mockups/Devices";
import { SectionCta } from "@/components/contact/SectionCta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge, Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { ProjectCard, stageBackground } from "@/components/work/ProjectCard";
import { getFeaturedProjects, hasLiveLink, projectCopy } from "@/lib/projects";

export async function FeaturedWork() {
  const t = await getTranslations("featured");
  const tAll = await getTranslations();
  const [lead, ...rest] = getFeaturedProjects();
  if (!lead) return null;
  const copy = projectCopy(lead);

  return (
    <section aria-labelledby="featured-title" className="on-dark relative overflow-hidden rounded-[2.5rem] py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel index="02" tone="dark">
                {t("label")}
              </SectionLabel>
            </Reveal>
            <Reveal as="h2" id="featured-title" className="text-h2 mt-4" i={1}>
              {t("title")}
            </Reveal>
            <Reveal as="p" className="text-lead mt-5 text-mist" i={2}>
              {t("subtitle")}
            </Reveal>
          </div>
          <Reveal i={2}>
            <ButtonLink href="/work" variant="ghost" icon="arrow">
              {tAll("common.seeAllWork")}
            </ButtonLink>
          </Reveal>
        </div>

        {/* Flagship project, large. */}
        <article className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            className="relative overflow-hidden rounded-[2rem] px-[6%] pt-[8%] pb-[12%] lg:order-2 lg:col-span-7"
            style={{ background: stageBackground(lead.accent) }}
          >
            <div data-settle>
              <LaptopFrame>
                {lead.images.desktop && (
                  <ScreenImage
                    src={lead.images.desktop}
                    alt={`${copy.title} homepage on a laptop`}
                    sizes="(min-width: 1024px) 50vw, 90vw"
                  />
                )}
              </LaptopFrame>
            </div>
            {lead.images.mobile && (
              <div data-parallax="fast" className="absolute right-[6%] bottom-[4%] w-[24%]">
                <PhoneFrame>
                  <Image
                    src={lead.images.mobile}
                    alt={`${copy.title} on a phone`}
                    fill
                    sizes="(min-width: 1024px) 12vw, 22vw"
                    className="object-cover object-top"
                  />
                </PhoneFrame>
              </div>
            )}
          </div>

          <div className="lg:order-1 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="concept">{tAll(`kind.${lead.kind}`)}</Badge>
              <Badge tone="neutral">{tAll(`categories.${lead.categories[0]}`)}</Badge>
              <Badge tone="neutral">{tAll(`status.${lead.status}`)}</Badge>
            </div>
            <h3 className="text-h2 mt-5 !text-[clamp(2rem,4.5vw,3.25rem)]" translate="no">
              {copy.title}
            </h3>
            <p className="text-lead mt-4 text-mist">{copy.summary}</p>
            <ul className="mt-7 space-y-3">
              {copy.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-banana" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/work/${lead.slug}`} icon="arrow">
                {tAll("common.viewCase")}
              </ButtonLink>
              {hasLiveLink(lead) && (
                <ButtonLink href={lead.links.live} variant="ghost" icon="external" newTabLabel={tAll("common.opensInNewTab")}>
                  {tAll("common.visitSite")}
                </ButtonLink>
              )}
            </div>
          </div>
        </article>

        {/* The rest of the featured work. */}
        <ul className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {rest.slice(0, 3).map((project, i) => (
            <Reveal as="li" key={project.slug} i={i}>
              <ProjectCard project={project} sizes="(min-width: 768px) 30vw, 90vw" tone="dark" />
            </Reveal>
          ))}
        </ul>

        <SectionCta tone="dark" />
      </Container>
    </section>
  );
}
