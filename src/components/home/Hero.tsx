import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BrowserPeek } from "@/components/brand/BrowserPeek";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, SectionLabel, UnderlineBar } from "@/components/ui/primitives";
import { whatsappHref } from "@/lib/contact";

const chips = [
  { text: "Ecommerce ✓", className: "left-[-10%] top-[38%]", rot: "-6deg", delay: "0s" },
  { text: "</>", className: "right-[-4%] top-[4%]", rot: "8deg", delay: "-2s" },
  { text: "Payments", className: "right-[-2%] bottom-[10%]", rot: "-4deg", delay: "-4s" },
  { text: "Web apps", className: "left-[2%] bottom-[2%]", rot: "5deg", delay: "-1s" },
];

/**
 * Home hero. The headline is static text so it paints immediately (it is the LCP element).
 * The mascot animates in with CSS and reacts when either CTA is hovered (data-ape-host/excite).
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  return (
    <section data-ape-host className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pt-[calc(var(--header-h)+4rem)] md:pb-28">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <SectionLabel>{t("label")}</SectionLabel>

          <h1 className="text-display mt-5">
            {t("titleLine1")} {t("titleLine2")}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {t("titleAccent")}
              <UnderlineBar className="absolute -bottom-[0.08em] left-0 h-[0.09em] w-full" />
            </span>
          </h1>

          <p className="text-lead mt-7 max-w-xl text-stone">{t("subtitle")}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink contact icon="arrow" exciteApe>
              {tc("startProject")}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref(t("whatsappMessage"))}
              variant="ghost"
              icon="whatsapp"
              track="Contact"
              channel="whatsapp"
              exciteApe
              newTabLabel={tc("opensInNewTab")}
            >
              {tc("chatOnWhatsApp")}
            </ButtonLink>
          </div>
          <p className="mt-6">
            <Link href="/work" className="link-draw inline-flex items-center gap-2 font-bold" data-ape-excite="">
              {tc("seeOurWork")} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>

        <div className="relative mx-auto w-[78%] max-w-[30rem] md:col-span-5 md:w-full">
          <BrowserPeek label={t("mascotLabel")} />
          {chips.map((chip, i) => (
            <span
              key={chip.text}
              aria-hidden="true"
              translate="no"
              className={`float-chip pointer-events-none absolute rounded-full bg-paper px-3 py-1.5 font-mono text-xs font-bold shadow-[0_8px_24px_-10px_rgba(26,27,32,0.5)] ring-1 ring-paper-line md:text-sm ${chip.className} ${i > 1 ? "hidden sm:inline-block" : "inline-block"}`}
              style={{ ["--rot" as string]: chip.rot, ["--delay" as string]: chip.delay }}
            >
              {chip.text}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
