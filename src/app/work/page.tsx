import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/contact/SectionCta";
import { CtaBand } from "@/components/home/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/primitives";
import { ClientsStrip } from "@/components/work/ClientsStrip";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkFilter } from "@/components/work/WorkFilter";
import { buildMetadata } from "@/lib/metadata";
import { getActiveCategories, getVisibleProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("workPage");
  return buildMetadata({ title: t("metaTitle"), description: t("metaDescription"), path: "/work" });
}

export default async function WorkPage() {
  const t = await getTranslations();
  const projects = getVisibleProjects();
  const categories = getActiveCategories();

  const options = [
    { value: "all", label: t("categories.all") },
    ...categories.map((c) => ({ value: c, label: t(`categories.${c}`) })),
  ];
  const counts = Object.fromEntries(
    options.map((o) => [
      o.value,
      t("workPage.showing", {
        count: o.value === "all" ? projects.length : projects.filter((p) => p.categories.includes(o.value as never)).length,
      }),
    ]),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("workPage.label"), path: "/work" },
        ])}
      />
      <PageHero label={t("workPage.label")} title={t("workPage.title")} subtitle={t("workPage.subtitle")} />

      <section aria-label={t("workPage.label")} className="pb-20 md:pb-28">
        <Container>
          <WorkFilter options={options} counts={counts} groupLabel={t("workPage.filterLabel")}>
            <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <li
                  key={project.slug}
                  data-cats={project.categories.join(" ")}
                  // Cards below the first row skip layout until they near the viewport.
                  className={i > 2 ? "cv-auto" : undefined}
                  style={{ viewTransitionName: `card-${project.slug}`, ["--cis" as string]: "520px" }}
                >
                  <ProjectCard project={project} headingLevel="h2" preload={i === 0} />
                </li>
              ))}
            </ul>
          </WorkFilter>
          <SectionCta />
        </Container>
      </section>

      <div className="cv-auto bg-paper-deep">
        <ClientsStrip />
      </div>
      <CtaBand />
    </>
  );
}
