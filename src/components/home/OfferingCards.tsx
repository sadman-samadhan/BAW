import { getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/contact/SectionCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { services } from "@/config/services";

/** Home "What we do" section: every service, with the main offer highlighted. */
export async function OfferingCards() {
  const t = await getTranslations();

  return (
    <section id="services" aria-labelledby="offerings-title" className="cv-auto py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel index="01">{t("offerings.label")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="offerings-title" className="text-h2 mt-4" i={1}>
              {t("offerings.title")}
            </Reveal>
            <Reveal as="p" className="text-lead mt-5 text-stone" i={2}>
              {t("offerings.subtitle")}
            </Reveal>
          </div>
          <Reveal i={2}>
            <ButtonLink href="/services" variant="ghost" icon="arrow">
              {t("common.allServices")}
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} i={i % 3} variant="scale" className="h-full">
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </ul>

        <SectionCta />
      </Container>
    </section>
  );
}
