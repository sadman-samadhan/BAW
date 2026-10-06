import { getTranslations } from "next-intl/server";
import { ApeMark } from "@/components/brand/ApeMark";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, Reveal } from "@/components/ui/primitives";
import { messengerHref, whatsappHref } from "@/lib/contact";

type Props = {
  title?: string;
  subtitle?: string;
  whatsappMessage?: string;
  /** Preselects this service in the form. */
  service?: string;
};

/** Banana call-to-action band with the ape peeking up from its bottom edge. */
export async function CtaBand({ title, subtitle, whatsappMessage, service }: Props) {
  const t = await getTranslations("cta");
  const tc = await getTranslations("common");
  const th = await getTranslations("hero");

  return (
    <section aria-labelledby="cta-title" className="cv-auto relative overflow-hidden rounded-t-[2.5rem] bg-banana pt-20 pb-40 md:pt-28 md:pb-48">
      <Container className="relative z-[1] text-center">
        <Reveal as="h2" id="cta-title" className="text-display mx-auto max-w-4xl !text-[clamp(2.6rem,9vw,6.5rem)]">
          {title ?? t("title")}
        </Reveal>
        <Reveal as="p" className="text-lead mx-auto mt-6 max-w-xl" i={1}>
          {subtitle ?? t("subtitle")}
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3" i={2}>
          <ButtonLink contact={service ?? true} variant="dark" icon="arrow">
            {tc("startProject")}
          </ButtonLink>
          <ButtonLink
            href={whatsappHref(whatsappMessage ?? th("whatsappMessage"))}
            variant="ghost"
            icon="whatsapp"
            track="Contact"
            channel="whatsapp"
            newTabLabel={tc("opensInNewTab")}
          >
            {tc("chatOnWhatsApp")}
          </ButtonLink>
        </Reveal>
        <p className="mt-6">
          <a
            href={messengerHref()}
            className="link-draw inline-flex items-center gap-2 font-semibold"
            data-track="Contact"
            data-track-channel="messenger"
            target={messengerHref().startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <BrandIcon name="messenger" size={18} /> {tc("messageOnMessenger")}
          </a>
        </p>
      </Container>

      {/* The ape rises from the bottom edge as the band scrolls into view. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <div className="ape-peek-edge">
          <ApeMark size={220} variant="banana" blink />
        </div>
      </div>
    </section>
  );
}
