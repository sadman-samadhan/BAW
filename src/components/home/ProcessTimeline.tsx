import { getTranslations } from "next-intl/server";
import { ApeMark } from "@/components/brand/ApeMark";
import { SectionCta } from "@/components/contact/SectionCta";
import { Container, Reveal, SectionLabel } from "@/components/ui/primitives";

type Step = { title: string; body: string };

/**
 * Four-step process. As the list scrolls through the viewport a banana line fills and a small
 * ape swings down it (CSS scroll-driven, see .process-list in globals.css). Static without support.
 */
export async function ProcessTimeline({
  index = "03",
  service,
  whatsappMessage,
}: {
  index?: string;
  /** Preselects this service in the "Let's talk" form below the steps. */
  service?: string;
  whatsappMessage?: string;
} = {}) {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section aria-labelledby="process-title" className="py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Reveal>
              <SectionLabel index={index}>{t("label")}</SectionLabel>
            </Reveal>
            <Reveal as="h2" id="process-title" className="text-h2 mt-4" i={1}>
              {t("title")}
            </Reveal>
          </div>
        </div>

        <ol className="process-list relative lg:col-span-7">
          {/* The vine: a track, a banana fill and the climbing ape. */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.15rem] w-1 rounded-full bg-paper-line">
            <div className="process-fill h-full w-full rounded-full bg-banana" />
          </div>
          <div aria-hidden="true" className="climber-track left-[-0.15rem] top-2 bottom-2 w-12">
            <div className="climber h-full">
              <div className="climber-swing -mt-5">
                <ApeMark size={48} />
              </div>
            </div>
          </div>

          {steps.map((step, i) => (
            <li key={step.title} className="relative pb-14 pl-20 last:pb-0">
              <Reveal variant="left">
                <p className="text-label text-banana-ink">{`Step 0${i + 1}`}</p>
                <h3 className="text-h3 mt-2 !text-[clamp(1.6rem,3.4vw,2.4rem)]">{step.title}</h3>
                <p className="text-lead mt-3 max-w-lg text-stone">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
      <Container>
        <SectionCta service={service} whatsappMessage={whatsappMessage} />
      </Container>
    </section>
  );
}
