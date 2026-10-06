import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/contact/SectionCta";
import { CtaBand } from "@/components/home/CtaBand";
import { OfferingIcon } from "@/components/home/OfferingIcon";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { LaptopFrame, PhoneFrame, ScreenImage } from "@/components/mockups/Devices";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { StickyContactBar } from "@/components/services/StickyContactBar";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Badge, Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { ProjectCard, stageBackground } from "@/components/work/ProjectCard";
import { getService, services } from "@/config/services";
import { whatsappHref } from "@/lib/contact";
import { localize } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getProjectsForService, projectCopy } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[service]">): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const copy = localize(service.copy);
  return buildMetadata({ title: copy.name, description: copy.heroSubtitle, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[service]">) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations();
  const copy = localize(service.copy);
  const examples = getProjectsForService(service);
  const showcase = examples.find((p) => p.images.desktop);
  const startingPrice = copy.tiers[0]?.price;
  const wa = whatsappHref(copy.whatsappMessage);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("servicesPage.label"), path: "/services" },
          { name: copy.name, path: `/services/${service.slug}` },
        ])}
      />

      {/* ---------- Hero: the offer ---------- */}
      <section data-ape-host className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-label mb-5 text-stone">
              <Link href="/services" className="link-draw">
                {t("servicesPage.label")}
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-banana-ink">{copy.name}</span>
            </nav>
            <h1 className="text-display !text-[clamp(2.5rem,7.5vw,5.5rem)]">{copy.heroTitle}</h1>
            <p className="text-lead mt-6 max-w-xl text-stone">{copy.heroSubtitle}</p>
            <ul className="mt-7 space-y-2.5">
              {copy.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 font-semibold">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-banana">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink contact={service.slug} icon="arrow" exciteApe>
                {t("common.letsTalk")}
              </ButtonLink>
              <ButtonLink
                href={wa}
                variant="ghost"
                icon="whatsapp"
                track="Contact"
                channel="whatsapp"
                newTabLabel={t("common.opensInNewTab")}
              >
                {t("common.chatOnWhatsApp")}
              </ButtonLink>
            </div>
            {startingPrice && (
              <p className="mt-6 text-stone">
                {t("servicePage.from")} <strong className="font-display text-2xl text-charcoal">৳{startingPrice}</strong>
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            {showcase ? (
              <div className="relative overflow-hidden rounded-[2rem] px-[7%] pt-[9%] pb-[13%]" style={{ background: stageBackground(showcase.accent) }}>
                <LaptopFrame>
                  <ScreenImage
                    src={showcase.images.desktop!}
                    alt={`${projectCopy(showcase).title}, built by Big Ape Web`}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    preload
                  />
                </LaptopFrame>
                {showcase.images.mobile && (
                  <div className="absolute right-[6%] bottom-[5%] w-[23%]">
                    <PhoneFrame>
                      <Image src={showcase.images.mobile} alt="" fill sizes="(min-width: 1024px) 9vw, 22vw" className="object-cover object-top" />
                    </PhoneFrame>
                  </div>
                )}
                <Badge tone="live" className="absolute top-4 left-4">
                  {projectCopy(showcase).title}
                </Badge>
              </div>
            ) : (
              <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center rounded-[2.5rem] bg-banana">
                <OfferingIcon name={service.icon} className="!size-40" />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section aria-labelledby="who-title" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionLabel as="h2" id="who-title" index="01">
              {t("servicePage.whoFor")}
            </SectionLabel>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {copy.audience.map((a, i) => (
              <Reveal as="li" key={a.title} i={i} className="rounded-[1.75rem] bg-paper-deep p-7 ring-1 ring-paper-line">
                <h3 className="text-h3">{a.title}</h3>
                <p className="mt-3 text-stone">{a.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- What you get ---------- */}
      <section aria-labelledby="get-title" className="cv-auto px-2 sm:px-4">
        <div className="on-dark rounded-[2.5rem] py-20 md:py-28">
          <Container>
            <Reveal>
              <SectionLabel index="02" tone="dark">
                {t("servicePage.whatYouGet")}
              </SectionLabel>
            </Reveal>
            <Reveal as="h2" id="get-title" className="text-h2 mt-4 max-w-3xl" i={1}>
              {copy.name}
            </Reveal>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.includes.map((item, i) => (
                <Reveal as="li" key={item.title} i={i % 3}>
                  <span className="font-mono text-sm font-bold text-banana">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-h3 mt-3">{item.title}</h3>
                  <p className="mt-2 text-mist">{item.body}</p>
                </Reveal>
              ))}
            </ul>
            <SectionCta tone="dark" service={service.slug} whatsappMessage={copy.whatsappMessage} />
          </Container>
        </div>
      </section>

      {/* ---------- Examples ---------- */}
      {examples.length > 0 && (
        <section aria-labelledby="examples-title" className="cv-auto py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Reveal>
                  <SectionLabel index="03">{t("servicePage.examples")}</SectionLabel>
                </Reveal>
                <Reveal as="h2" id="examples-title" className="text-h2 mt-4" i={1}>
                  {t("featured.title")}
                </Reveal>
              </div>
              <ButtonLink href={`/work?category=${service.exampleCategories[0]}`} variant="ghost" icon="arrow">
                {t("common.seeAllWork")}
              </ButtonLink>
            </div>
            <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {examples.slice(0, 3).map((p, i) => (
                <Reveal as="li" key={p.slug} i={i}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ---------- Pricing ---------- */}
      <section aria-labelledby="pricing-title" className="cv-auto bg-paper-deep py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel index="04">{t("servicePage.pricing")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="pricing-title" className="text-h2 mt-4" i={1}>
              {t("servicePage.pricingTitle")}
            </Reveal>
            <Reveal as="p" className="mt-4 text-stone" i={2}>
              {t("servicePage.pricingNote")}
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {copy.tiers.map((tier, i) => (
              <Reveal as="li" key={tier.name} i={i} variant="scale" className="h-full">
                <article
                  className={`lift-card relative flex h-full flex-col rounded-[2rem] p-7 md:p-8 ${
                    tier.highlighted ? "on-dark" : "bg-paper ring-1 ring-paper-line"
                  }`}
                >
                  {tier.highlighted && (
                    <Badge tone="concept" className="absolute -top-3 left-7">
                      {t("servicePage.popular")}
                    </Badge>
                  )}
                  <h3 className="text-h3">{tier.name}</h3>
                  <p className={`mt-2 ${tier.highlighted ? "text-mist" : "text-stone"}`}>{tier.blurb}</p>
                  <p className="mt-6">
                    <span className={`text-sm ${tier.highlighted ? "text-mist" : "text-stone"}`}>{t("servicePage.from")} </span>
                    <span className="font-display text-4xl font-extrabold tracking-[-0.03em]">৳{tier.price}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check size={18} className={`mt-0.5 shrink-0 ${tier.highlighted ? "text-banana" : "text-banana-ink"}`} aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink contact={service.slug} variant={tier.highlighted ? "primary" : "dark"} icon="arrow" className="w-full">
                      {t("servicePage.choose", { tier: tier.name })}
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessTimeline index="05" service={service.slug} whatsappMessage={copy.whatsappMessage} />

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="faq-title" className="pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="06">{t("servicePage.faq")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="faq-title" className="text-h2 mt-4" i={1}>
              {t("servicePage.faqTitle")}
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-paper-line border-y border-paper-line">
              {copy.faqs.map((faq) => (
                <details key={faq.q} className="faq-item group">
                  <summary className="flex items-center justify-between gap-6 py-5 text-lg font-bold">
                    {faq.q}
                    <span className="faq-icon inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-paper-deep group-open:bg-banana">
                      <Plus size={18} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="pb-6 text-stone">{faq.a}</p>
                </details>
              ))}
            </div>
            <SectionCta service={service.slug} whatsappMessage={copy.whatsappMessage} className="!mt-10" />
          </div>
        </Container>
      </section>

      {/* ---------- Other services ---------- */}
      <section aria-labelledby="others-title" className="cv-auto pb-24">
        <Container>
          <h2 id="others-title" className="text-label text-banana-ink">
            {"// "}
            {t("servicePage.otherServices")}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-semibold ring-1 ring-paper-line ring-inset transition-colors hover:bg-charcoal hover:text-paper"
                >
                  {localize(s.copy).name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={copy.ctaTitle} whatsappMessage={copy.whatsappMessage} service={service.slug} />
      <StickyContactBar service={service.slug} whatsappMessage={copy.whatsappMessage} />
    </>
  );
}
