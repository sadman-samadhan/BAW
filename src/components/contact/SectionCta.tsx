import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/primitives";
import { whatsappHref } from "@/lib/contact";

type Props = {
  tone?: "light" | "dark";
  /** Preselects this service in the form. */
  service?: string;
  whatsappMessage?: string;
  title?: string;
  body?: string;
  className?: string;
};

/** The "Have a project in mind?" row placed under sections: the form and WhatsApp, side by side. */
export async function SectionCta({ tone = "light", service, whatsappMessage, title, body, className = "" }: Props) {
  const t = await getTranslations();
  const dark = tone === "dark";

  return (
    <Reveal
      className={`mt-16 flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-7 md:flex-row md:items-center md:justify-between md:gap-8 ${
        dark ? "bg-charcoal-soft ring-1 ring-charcoal-line" : "bg-paper-deep ring-1 ring-paper-line"
      } ${className}`}
    >
      <div>
        <p className="font-display text-[1.4rem] leading-tight font-extrabold tracking-[-0.02em]">
          {title ?? t("sectionCta.title")}
        </p>
        <p className={`mt-1.5 ${dark ? "text-mist" : "text-stone"}`}>{body ?? t("sectionCta.body")}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <ButtonLink contact={service ?? true} icon="arrow">
          {t("common.letsTalk")}
        </ButtonLink>
        <ButtonLink
          href={whatsappHref(whatsappMessage ?? t("hero.whatsappMessage"))}
          variant="ghost"
          icon="whatsapp"
          track="Contact"
          channel="whatsapp"
          newTabLabel={t("common.opensInNewTab")}
        >
          {t("common.whatsapp")}
        </ButtonLink>
      </div>
    </Reveal>
  );
}
