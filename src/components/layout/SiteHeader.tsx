import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { ApeMark } from "@/components/brand/ApeMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { messengerHref, whatsappHref } from "@/lib/contact";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const th = await getTranslations("hero");

  const items: NavItem[] = [
    { href: "/services", label: t("services") },
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[var(--header-h)] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="rounded-lg">
          <Logo size="sm" />
          <span className="sr-only"> {t("home")}</span>
        </Link>

        <nav aria-label={t("label")} className="hidden lg:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink contact size="sm" variant="dark" className="hidden sm:inline-flex">
            {t("letsTalk")}
          </ButtonLink>

          <MobileMenu openLabel={t("openMenu")} closeLabel={t("closeMenu")}>
            <nav aria-label={t("label")} className="flex flex-1 flex-col px-4 pt-4 sm:px-6">
              <ul className="flex flex-col gap-1">
                {[{ href: "/", label: t("home") }, ...items].map((item, i) => (
                  <li key={item.href} className="menu-item" style={{ ["--i" as string]: i }}>
                    <Link
                      href={item.href}
                      className="link-draw inline-block py-1.5 font-display text-[clamp(2rem,9vw,3rem)] font-extrabold tracking-[-0.03em]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="menu-item mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 6 }}>
                <ButtonLink contact icon="arrow">
                  {tc("startProject")}
                </ButtonLink>
                <ButtonLink
                  href={whatsappHref(th("whatsappMessage"))}
                  variant="ghost"
                  icon="whatsapp"
                  track="Contact"
                  channel="whatsapp"
                  newTabLabel={tc("opensInNewTab")}
                >
                  {tc("chatOnWhatsApp")}
                </ButtonLink>
                <ButtonLink
                  href={messengerHref()}
                  variant="ghost"
                  icon="messenger"
                  track="Contact"
                  channel="messenger"
                  newTabLabel={tc("opensInNewTab")}
                >
                  {tc("messageOnMessenger")}
                </ButtonLink>
              </div>
            </nav>
            {/* The ape peeks up from the bottom of the menu. */}
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-6">
              <div className="menu-item" style={{ ["--i" as string]: 8 }}>
                <ApeMark size={120} variant="dark" blink />
              </div>
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
