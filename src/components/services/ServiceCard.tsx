import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { OfferingIcon } from "@/components/home/OfferingIcon";
import type { Service } from "@/config/services";
import { localize } from "@/lib/i18n";
import { getProjectsForService } from "@/lib/projects";

type Props = {
  service: Service;
  index: number;
  headingLevel?: "h2" | "h3";
  /** Show example count and key benefits (services index page). */
  detailed?: boolean;
};

/** Service card: icon that acts on hover, name, blurb and a link to the service page. */
export async function ServiceCard({ service, index, headingLevel = "h3", detailed = false }: Props) {
  const t = await getTranslations();
  const copy = localize(service.copy);
  const Heading = headingLevel;
  const primary = service.primary;
  const examples = getProjectsForService(service).length;

  return (
    <article
      className={`offer-card lift-card group relative flex h-full flex-col rounded-[2rem] p-7 md:p-8 ${
        primary ? "bg-banana" : "bg-paper-deep ring-1 ring-paper-line"
      }`}
    >
      <div className="flex items-start justify-between">
        <OfferingIcon name={service.icon} />
        <span className="text-label opacity-70">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <Heading className="text-h3 mt-8">{copy.name}</Heading>
      <p className={`mt-3 ${detailed ? "" : "flex-1"} ${primary ? "text-charcoal" : "text-stone"}`}>{copy.cardBlurb}</p>
      {detailed && (
        <>
          <ul className="mt-5 flex-1 space-y-2 text-[0.95rem]">
            {copy.benefits.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden="true" className={`mt-2 size-1.5 shrink-0 rounded-full ${primary ? "bg-charcoal" : "bg-banana-ink"}`} />
                {b}
              </li>
            ))}
          </ul>
          <p className={`text-label mt-6 ${primary ? "" : "text-banana-ink"}`}>
            {t("servicesPage.examples", { count: examples })}
          </p>
        </>
      )}
      <Link href={`/services/${service.slug}`} className="stretched-link mt-7 inline-flex items-center gap-2 font-bold">
        <span className="link-draw">{t("common.learnMore")}</span>
        <span className="sr-only">: {copy.name}</span>
        <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
