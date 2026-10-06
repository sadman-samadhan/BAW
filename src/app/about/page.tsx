import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AssemblingApe } from "@/components/brand/AssemblingApe";
import { SectionCta } from "@/components/contact/SectionCta";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { ClientsStrip } from "@/components/work/ClientsStrip";
import { buildMetadata } from "@/lib/metadata";

/** Technology used across our projects (verified in their code), plus WordPress. */
const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "WordPress",
  "Supabase",
  "Firebase",
  "Sanity",
  "bKash",
  "Pathao",
  "Steadfast",
  "Resend",
  "Framer Motion",
  "Leaflet maps",
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");
  return buildMetadata({ title: t("metaTitle"), description: t("metaDescription"), path: "/about" });
}

export default async function AboutPage() {
  const t = await getTranslations();
  const story = t.raw("aboutPage.story") as string[];
  const values = t.raw("aboutPage.values") as { title: string; body: string }[];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("aboutPage.label"), path: "/about" },
        ])}
      />
      <PageHero label={t("aboutPage.label")} title={t("aboutPage.title")} subtitle={t("aboutPage.subtitle")} ape={false}>
        <ButtonLink contact icon="arrow">
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost" icon="arrow">
          {t("common.seeOurWork")}
        </ButtonLink>
      </PageHero>

      {/* ---------- Story ---------- */}
      <section aria-labelledby="story-title" className="pb-20 md:pb-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative mx-auto flex aspect-square w-[70%] max-w-md items-center justify-center rounded-full bg-banana lg:col-span-5 lg:w-full">
            <AssemblingApe className="w-[72%]" />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>{t("aboutPage.storyLabel")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="story-title" className="text-h2 mt-4" i={1}>
              {t("aboutPage.storyTitle")}
            </Reveal>
            {story.map((p, i) => (
              <Reveal as="p" key={i} className="text-lead mt-5 text-stone" i={i + 1}>
                {p}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Values ---------- */}
      <section aria-labelledby="values-title" className="cv-auto px-2 sm:px-4">
        <div className="on-dark rounded-[2.5rem] py-20 md:py-28">
          <Container>
            <Reveal>
              <SectionLabel tone="dark">{t("aboutPage.valuesLabel")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="values-title" className="text-h2 mt-4" i={1}>
              {t("aboutPage.valuesTitle")}
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <Reveal as="li" key={value.title} i={i} className="rounded-[1.75rem] bg-charcoal-soft p-7 ring-1 ring-charcoal-line">
                  <span className="font-mono text-sm font-bold text-banana">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-h3 mt-4">{value.title}</h3>
                  <p className="mt-3 text-mist">{value.body}</p>
                </Reveal>
              ))}
            </ul>
            <SectionCta tone="dark" />
          </Container>
        </div>
      </section>

      {/* ---------- Tools ---------- */}
      <section aria-labelledby="tools-title" className="py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{t("aboutPage.toolsLabel")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="tools-title" className="text-h2 mt-4" i={1}>
              {t("aboutPage.toolsTitle")}
            </Reveal>
            <Reveal as="p" className="text-lead mt-5 text-stone" i={2}>
              {t("aboutPage.toolsBody")}
            </Reveal>
          </div>
          <ul className="flex flex-wrap content-start gap-3 lg:col-span-7">
            {tools.map((tool, i) => (
              <Reveal
                as="li"
                key={tool}
                variant="scale"
                i={i % 4}
                className="rounded-full bg-paper-deep px-5 py-3 font-semibold ring-1 ring-paper-line"
                translate="no"
              >
                {tool}
              </Reveal>
            ))}
          </ul>
        </Container>
        <Container>
          <SectionCta whatsappMessage={t("hero.whatsappMessage")} />
        </Container>
      </section>

      <div className="cv-auto bg-paper-deep">
        <ClientsStrip />
      </div>

      <CtaBand />
    </>
  );
}
