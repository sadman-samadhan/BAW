import { getTranslations } from "next-intl/server";
import { ApeMark } from "@/components/brand/ApeMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/primitives";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tc = await getTranslations("common");

  return (
    <section className="pt-[calc(var(--header-h)+4rem)] pb-24">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
        {/* A slightly tilted, puzzled ape. */}
        <div className="-rotate-12">
          <ApeMark size={180} blink />
        </div>
        <div className="max-w-2xl">
          <p className="text-label text-banana-ink">{"// 404"}</p>
          <h1 className="text-h2 mt-4">{t("title")}</h1>
          <p className="text-lead mt-5 text-stone">{t("body")}</p>
          <div className="mt-8">
            <ButtonLink href="/" icon="arrow">
              {tc("backHome")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
