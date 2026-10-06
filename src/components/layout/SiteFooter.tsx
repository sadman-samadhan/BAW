import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ApeMark } from "@/components/brand/ApeMark";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/primitives";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { emailHref, messengerHref, whatsappHref } from "@/lib/contact";
import { localize } from "@/lib/i18n";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  const linkClass = "link-draw text-mist hover:text-paper transition-colors";

  return (
    <footer className="on-dark cv-auto relative overflow-hidden pt-20 pb-10">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-display !text-[clamp(3.5rem,13vw,8rem)]" translate="no">
              Big Ape
              <span className="mt-2 flex items-center gap-4">
                <span className="font-mono text-[0.22em] font-bold tracking-[0.42em] text-banana">WEB</span>
                <span aria-hidden="true" className="h-[0.08em] flex-1 rounded-full bg-banana" />
              </span>
            </p>
            <p className="mt-6 max-w-sm text-mist">{t("tagline")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="text-label text-banana">{t("explore")}</h2>
              <ul className="mt-4 space-y-3">
                <li><Link className={linkClass} href="/services">{tn("services")}</Link></li>
                <li><Link className={linkClass} href="/work">{tn("work")}</Link></li>
                <li><Link className={linkClass} href="/about">{tn("about")}</Link></li>
                <li><Link className={linkClass} href="/contact">{tn("contact")}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-label text-banana">{t("servicesTitle")}</h2>
              <ul className="mt-4 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className={linkClass} href={`/services/${s.slug}`}>
                      {localize(s.copy).name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-label text-banana">{t("getInTouch")}</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    className={`${linkClass} inline-flex items-center gap-2`}
                    href={whatsappHref()}
                    data-track="Contact"
                    data-track-channel="whatsapp"
                    target={whatsappHref().startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <BrandIcon name="whatsapp" size={16} /> WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    className={`${linkClass} inline-flex items-center gap-2`}
                    href={messengerHref()}
                    data-track="Contact"
                    data-track-channel="messenger"
                    target={messengerHref().startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <BrandIcon name="messenger" size={16} /> Messenger
                  </a>
                </li>
                <li>
                  <a className={linkClass} href={emailHref()} data-track="Contact" data-track-channel="email">
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-charcoal-line pt-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:pr-52">
          <p>
            © {year} <span translate="no">{site.name}</span>. {t("rights")}
          </p>
          <p className="flex items-center gap-4">
            <span>{t("madeIn")}</span>
            <Link className={linkClass} href="/privacy">{t("privacy")}</Link>
          </p>
        </div>
      </Container>

      {/* The ape keeps an eye on things from the corner. */}
      <div aria-hidden="true" className="pointer-events-none absolute right-10 -bottom-12 hidden opacity-90 sm:block">
        <ApeMark size={150} variant="dark" blink />
      </div>
    </footer>
  );
}
