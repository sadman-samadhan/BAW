import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container, Reveal, SectionLabel } from "@/components/ui/primitives";
import { getClientProjects, hasLiveLink, projectCopy } from "@/lib/projects";

/** Live client projects with their logos and links to the live sites. */
export async function ClientsStrip({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  const clients = getClientProjects();
  if (clients.length === 0) return null;

  return (
    <section aria-labelledby="clients-title" className={`py-16 md:py-20 ${className}`}>
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel>{t("clients.label")}</SectionLabel>
          </Reveal>
          <Reveal as="h2" id="clients-title" className="text-h2 mt-3 !text-[clamp(1.9rem,4vw,2.75rem)]" i={1}>
            {t("clients.title")}
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {clients.map((client, i) => {
            const copy = projectCopy(client);
            return (
              <Reveal as="li" key={client.slug} i={i}>
                <article className="lift-card relative flex items-center gap-5 rounded-[1.75rem] bg-paper-deep p-4 pr-6 ring-1 ring-paper-line">
                  {client.logo && (
                    <Image
                      src={client.logo}
                      alt={`${copy.title} logo`}
                      width={88}
                      height={88}
                      className="size-[5.5rem] shrink-0 rounded-2xl object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-extrabold tracking-[-0.02em]" translate="no">
                      <Link href={`/work/${client.slug}`} className="stretched-link link-draw">
                        {copy.title}
                      </Link>
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-stone">{copy.tagline}</p>
                    {hasLiveLink(client) && (
                      <a
                        href={client.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-[2] mt-2 inline-flex items-center gap-1 text-sm font-bold"
                      >
                        <span className="link-draw">{client.links.live.replace(/^https?:\/\/(www\.)?/, "")}</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                        <span className="sr-only">{t("common.opensInNewTab")}</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
