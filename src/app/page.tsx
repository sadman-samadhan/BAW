import { getTranslations } from "next-intl/server";
import { CtaBand } from "@/components/home/CtaBand";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { OfferingCards } from "@/components/home/OfferingCards";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import { ClientsStrip } from "@/components/work/ClientsStrip";

export default async function Home() {
  const t = await getTranslations();

  return (
    <>
      <JsonLd data={organizationJsonLd(t("meta.homeDescription"))} />
      <Hero />
      <Marquee
        items={t.raw("marquee.items") as string[]}
        pauseLabel={t("common.pauseAnimation")}
        playLabel={t("common.playAnimation")}
      />
      <ClientsStrip />
      <OfferingCards />
      <div className="cv-auto px-2 sm:px-4" style={{ ["--cis" as string]: "2400px" }}>
        <FeaturedWork />
      </div>
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
