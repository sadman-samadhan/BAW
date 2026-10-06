import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/contact/SectionCta";
import { CtaBand } from "@/components/home/CtaBand";
import { LaptopFrame, PhoneFrame, PlaceholderScreen, ScreenImage } from "@/components/mockups/Devices";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge, Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { stageBackground } from "@/components/work/ProjectCard";
import type { ProjectCategory } from "@/config/projects";
import type { ServiceSlug } from "@/config/services";
import { localize } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getNextProject, getProject, getVisibleProjects, hasLiveLink, projectCopy } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

const serviceForCategory: Record<ProjectCategory, ServiceSlug> = {
  ecommerce: "ecommerce",
  webapp: "web-apps",
  business: "business",
  portfolio: "portfolio",
  wedding: "wedding",
};

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const copy = projectCopy(project);
  return buildMetadata({ title: copy.title, description: `${copy.tagline}. ${copy.summary}`, path: `/work/${slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const copy = projectCopy(project);
  const next = getNextProject(project.slug);
  const service = serviceForCategory[project.categories[0]];
  const isClient = project.kind === "client" && project.status === "live";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("workPage.label"), path: "/work" },
          { name: copy.title, path: `/work/${project.slug}` },
        ])}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-12 md:pt-[calc(var(--header-h)+4rem)]">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Link href="/work" className="link-draw text-label inline-flex items-center gap-2 text-stone">
            <ArrowLeft size={14} aria-hidden="true" /> {t("caseStudy.allWork")}
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone={project.status === "coming-soon" ? "coming-soon" : project.status}>{t(`status.${project.status}`)}</Badge>
            <Badge tone="neutral">{t(`kind.${project.kind}`)}</Badge>
            {project.categories.map((c) => (
              <Badge key={c} tone="neutral">
                {t(`categories.${c}`)}
              </Badge>
            ))}
          </div>
          <h1 className="text-display mt-5 max-w-5xl !text-[clamp(2.75rem,9vw,6.5rem)]" translate="no">
            {copy.title}
          </h1>
          <p className="text-lead mt-5 max-w-2xl text-stone">{copy.tagline}</p>
          {project.status === "concept" && <p className="mt-3 font-semibold text-banana-ink">{t("status.conceptNote")}</p>}
          {project.status === "coming-soon" && <p className="mt-3 font-semibold text-banana-ink">{t("caseStudy.comingSoonNote")}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {hasLiveLink(project) && (
              <ButtonLink href={project.links.live} icon="external" newTabLabel={t("common.opensInNewTab")}>
                {t("common.visitSite")}
              </ButtonLink>
            )}
            <ButtonLink contact={service} variant={hasLiveLink(project) ? "ghost" : "primary"} icon="arrow">
              {t("caseStudy.similar")}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ---------- Big mockup ---------- */}
      <div className="px-2 sm:px-4">
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-[6%] pt-[6%] pb-[9%] md:px-[12%]"
          style={{ background: stageBackground(project.accent) }}
        >
          <div data-settle className="relative mx-auto max-w-5xl">
            <LaptopFrame>
              {project.images.desktop ? (
                <ScreenImage src={project.images.desktop} alt={`${copy.title} on a laptop`} sizes="(min-width: 1024px) 64rem, 90vw" preload />
              ) : (
                <PlaceholderScreen title={copy.title} label={t(`status.${project.status}`)} accent={project.accent} />
              )}
            </LaptopFrame>
            {project.images.mobile && (
              <div data-parallax="fast" className="absolute right-[-4%] bottom-[-6%] w-[20%]">
                <PhoneFrame>
                  <Image src={project.images.mobile} alt={`${copy.title} on a phone`} fill sizes="(min-width: 1024px) 12rem, 20vw" className="object-cover object-top" />
                </PhoneFrame>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Overview + facts ---------- */}
      <section aria-labelledby="overview-title" className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel as="h2" id="overview-title">
              {t("caseStudy.overview")}
            </SectionLabel>
            <p className="mt-5 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] font-extrabold tracking-[-0.02em]">
              {copy.summary}
            </p>
          </div>
          <dl className="grid content-start gap-6 rounded-[1.75rem] bg-paper-deep p-7 ring-1 ring-paper-line lg:col-span-5">
            <div>
              <dt className="text-label text-banana-ink">{t("caseStudy.type")}</dt>
              <dd className="mt-1 font-semibold">{t(`kind.${project.kind}`)}</dd>
            </div>
            <div>
              <dt className="text-label text-banana-ink">{t("caseStudy.services")}</dt>
              <dd className="mt-1 font-semibold">{project.categories.map((c) => t(`categories.${c}`)).join(", ")}</dd>
            </div>
            <div>
              <dt className="text-label text-banana-ink">{t("caseStudy.year")}</dt>
              <dd className="mt-1 font-semibold">{project.year}</dd>
            </div>
            {hasLiveLink(project) && (
              <div>
                <dt className="text-label text-banana-ink">{t("caseStudy.liveSite")}</dt>
                <dd className="mt-1 font-semibold">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="link-draw">
                    {project.links.live.replace(/^https?:\/\/(www\.)?/, "")}
                    <span className="sr-only"> {t("common.opensInNewTab")}</span>
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-label text-banana-ink">{t("caseStudy.stack")}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full bg-paper px-3 py-1 text-sm font-semibold ring-1 ring-paper-line" translate="no">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* ---------- Challenge / solution ---------- */}
      <section aria-label={`${t("caseStudy.challenge")} / ${t("caseStudy.solution")}`} className="cv-auto px-2 sm:px-4">
        <div className="on-dark rounded-[2.5rem] py-20 md:py-28">
          <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <SectionLabel as="h2" tone="dark">
                {t("caseStudy.challenge")}
              </SectionLabel>
              <p className="text-lead mt-5 text-mist">{copy.challenge}</p>
            </Reveal>
            <Reveal i={1}>
              <SectionLabel as="h2" tone="dark">
                {t("caseStudy.solution")}
              </SectionLabel>
              <p className="text-lead mt-5">{copy.solution}</p>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section aria-labelledby="features-title" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionLabel as="h2" id="features-title">
              {t("caseStudy.features")}
            </SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.features.map((f, i) => (
              <Reveal as="li" key={f} i={i % 3} className="flex gap-4 rounded-[1.5rem] bg-paper-deep p-6 ring-1 ring-paper-line">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-banana">
                  <Check size={17} aria-hidden="true" />
                </span>
                <span className="font-semibold">{f}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Screens ---------- */}
      {project.images.desktopFull && (
        <section aria-labelledby="screens-title" className="cv-auto pb-20 md:pb-28">
          <Container>
            <Reveal>
              <SectionLabel as="h2" id="screens-title">
                {t("caseStudy.screens")}
              </SectionLabel>
            </Reveal>
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
              <figure className="lg:col-span-9">
                <div className="overflow-hidden rounded-[1.25rem] bg-charcoal p-2 pt-0 shadow-[0_30px_60px_-30px_rgba(26,27,32,0.5)]">
                  <div className="flex gap-1.5 px-3 py-3" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-banana" />
                    <span className="size-2.5 rounded-full bg-paper" />
                    <span className="size-2.5 rounded-full bg-paper" />
                  </div>
                  <div
                    tabIndex={0}
                    role="region"
                    aria-label={`${copy.title}: ${t("caseStudy.desktop")}`}
                    className="max-h-[70vh] overflow-y-auto rounded-[0.75rem] bg-paper"
                  >
                    <Image
                      src={project.images.desktopFull}
                      alt={`${copy.title} full homepage on desktop`}
                      width={960}
                      height={3600}
                      sizes="(min-width: 1024px) 60rem, 95vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
                <figcaption className="text-label mt-3 text-stone">{t("caseStudy.desktop")}</figcaption>
              </figure>
              {project.images.mobile && (
                <figure className="mx-auto w-[60%] max-w-[17rem] lg:col-span-3 lg:w-full">
                  <PhoneFrame>
                    <Image src={project.images.mobile} alt={`${copy.title} on mobile`} fill sizes="17rem" className="object-cover object-top" />
                  </PhoneFrame>
                  <figcaption className="text-label mt-3 text-center text-stone">{t("caseStudy.mobile")}</figcaption>
                </figure>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- Results and client words (client projects) ---------- */}
      {isClient && (project.result || project.testimonial) && (
        <section aria-labelledby="results-title" className="pb-20 md:pb-28">
          <Container className="grid gap-5 md:grid-cols-2">
            {project.result && (
              <Reveal className="rounded-[2rem] bg-paper-deep p-8 ring-1 ring-paper-line">
                <SectionLabel as="h2" id="results-title">
                  {t("caseStudy.results")}
                </SectionLabel>
                <p className="text-h3 mt-5">{localize(project.result)}</p>
              </Reveal>
            )}
            {project.testimonial && (
              <Reveal i={1} className="relative rounded-[2rem] bg-banana p-8">
                <Quote size={36} aria-hidden="true" />
                <h2 className="sr-only">{t("caseStudy.testimonial")}</h2>
                <blockquote className="text-h3 mt-4">{localize(project.testimonial)}</blockquote>
                <p className="text-label mt-5">{copy.title}</p>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      <Container>
        <SectionCta service={service} className="!mt-0" />
      </Container>

      {/* ---------- Next project ---------- */}
      {next && (
        <section aria-label={t("caseStudy.next")} className="py-20 md:py-28">
          <Container>
            <Link
              href={`/work/${next.slug}`}
              className="group lift-card flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-charcoal p-8 text-paper md:flex-row md:items-center md:p-10"
            >
              <div>
                <p className="text-label text-banana">{t("caseStudy.next")}</p>
                <p className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-extrabold tracking-[-0.03em]" translate="no">
                  {projectCopy(next).title}
                </p>
                <p className="mt-3 text-mist">{projectCopy(next).tagline}</p>
              </div>
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-banana text-charcoal transition-transform duration-500 group-hover:translate-x-2">
                <ArrowRight size={28} aria-hidden="true" />
              </span>
            </Link>
          </Container>
        </section>
      )}

      <CtaBand service={service} />
    </>
  );
}
