import { getTranslations } from "next-intl/server";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { whatsappHref } from "@/lib/contact";

/** Phones only: WhatsApp and "Let's talk" always within thumb's reach on ad landing pages. */
export async function StickyContactBar({ service, whatsappMessage }: { service: string; whatsappMessage: string }) {
  const t = await getTranslations("common");
  const wa = whatsappHref(whatsappMessage);

  return (
    <div className="sticky-contact-bar on-dark fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-line px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={wa}
          className="btn btn-primary !min-h-12 !px-3"
          data-track="Contact"
          data-track-channel="whatsapp"
          {...(wa.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <BrandIcon name="whatsapp" />
          <span>{t("whatsapp")}</span>
        </a>
        <a
          href="/contact#form"
          data-contact-open=""
          data-contact-service={service}
          className="btn btn-ghost !min-h-12 !px-3"
        >
          <span>{t("letsTalk")}</span>
        </a>
      </div>
    </div>
  );
}
