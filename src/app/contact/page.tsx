import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactFormProps } from "@/components/contact/strings";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/primitives";
import { isPlaceholder, site } from "@/config/site";
import { emailHref, messengerHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");
  return buildMetadata({ title: t("metaTitle"), description: t("metaDescription"), path: "/contact" });
}

export default async function ContactPage() {
  const t = await getTranslations();
  const { strings, options } = await getContactFormProps();
  const next = t.raw("contactPage.next") as string[];

  const channels = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      desc: t("contactPage.whatsappDesc"),
      value: isPlaceholder(site.contact.whatsappNumber) ? site.contact.whatsappNumber : `+${site.contact.whatsappNumber}`,
      href: whatsappHref(t("hero.whatsappMessage")),
      icon: <BrandIcon name="whatsapp" size={26} />,
      external: true,
    },
    {
      key: "messenger",
      label: "Messenger",
      desc: t("contactPage.messengerDesc"),
      value: site.contact.messengerUsername,
      href: messengerHref(),
      icon: <BrandIcon name="messenger" size={26} />,
      external: true,
    },
    {
      key: "email",
      label: "Email",
      desc: t("contactPage.emailDesc"),
      value: site.contact.email,
      href: emailHref(),
      icon: <Mail size={26} aria-hidden="true" />,
      external: false,
    },
  ] as const;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("common.home"), path: "/" },
          { name: t("contactPage.label"), path: "/contact" },
        ])}
      />
      <PageHero label={t("contactPage.label")} title={t("contactPage.title")} subtitle={t("contactPage.subtitle")} />

      <section className="pb-24 md:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div id="form" className="scroll-mt-28 rounded-[2rem] bg-paper-deep p-6 ring-1 ring-paper-line sm:p-8 lg:col-span-7">
            <h2 className="text-h3">{t("contactPage.formTitle")}</h2>
            <div className="mt-6">
              <ContactForm strings={strings} options={options} idPrefix="page-contact" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-label text-banana-ink">
              {"// "}
              {t("contactPage.channelsTitle")}
            </h2>
            <ul className="mt-5 grid gap-4">
              {channels.map((c) => {
                const opensTab = c.external && c.href.startsWith("http");
                return (
                  <li key={c.key}>
                    <a
                      href={c.href}
                      data-track="Contact"
                      data-track-channel={c.key}
                      {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="lift-card flex items-center gap-5 rounded-[1.5rem] bg-charcoal p-5 text-paper"
                    >
                      <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-banana text-charcoal">{c.icon}</span>
                      <span className="min-w-0">
                        <span className="block font-display text-xl font-extrabold">{c.label}</span>
                        <span className="block text-sm text-mist">{c.desc}</span>
                        <span className="mt-1 block truncate font-mono text-sm text-banana" translate="no">
                          {c.value}
                        </span>
                      </span>
                      {opensTab && <span className="sr-only">{t("common.opensInNewTab")}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>

            <h2 className="text-label mt-12 text-banana-ink">
              {"// "}
              {t("contactPage.nextTitle")}
            </h2>
            <ol className="mt-5 space-y-4">
              {next.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-banana font-mono text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
