import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/contact/SectionCta";
import { CtaBand } from "@/components/home/CtaBand";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Reveal } from "@/components/ui/primitives";
import { services } from "@/config/services";
import { whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");
  return buildMetadata({ title: t("metaTitle"), description: t("metaDescription"), path: "/services" });
}

export default async function ServicesPage() {
  const t = await getTranslations();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("servicesPage.label"), path: "/services" },
        ])}
      />
      <PageHero label={t("servicesPage.label")} title={t("servicesPage.title")} subtitle={t("servicesPage.subtitle")}>
        <ButtonLink contact icon="arrow">
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink
          href={whatsappHref(t("hero.whatsappMessage"))}
          variant="ghost"
          icon="whatsapp"
          track="Contact"
          channel="whatsapp"
          newTabLabel={t("common.opensInNewTab")}
        >
          {t("common.chatOnWhatsApp")}
        </ButtonLink>
      </PageHero>

      <section aria-label={t("servicesPage.label")} className="pb-24 md:pb-32">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} i={i % 3} variant="scale" className="h-full">
                <ServiceCard service={service} index={i} headingLevel="h2" detailed />
              </Reveal>
            ))}
          </ul>
          <SectionCta />
        </Container>
      </section>

      <ProcessTimeline index="01" />
      <CtaBand />
    </>
  );
}
