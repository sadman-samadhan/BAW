import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacyPage");
  // No dedicated OG image for this page: point at the site default explicitly.
  return buildMetadata({ title: t("metaTitle"), description: t("metaDescription"), path: "/privacy", image: "/opengraph-image" });
}

/**
 * Plain-language privacy policy describing what this site actually does.
 * Draft for review: have it checked before relying on it legally.
 * English only for now; move to messages when the Bangla version is added.
 */
export default async function PrivacyPage() {
  const t = await getTranslations("privacyPage");
  const email = site.contact.email;

  return (
    <>
      <PageHero label="Privacy" title={t("metaTitle")} subtitle="Last updated: 6 October 2026" ape={false} />
      <section className="pb-24">
        <Container>
          <div className="max-w-3xl space-y-10 text-lg leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em] [&_p]:mt-3 [&_p]:text-stone [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-stone">
            <div>
              <h2>Who we are</h2>
              <p>
                {site.name} is a web design and development agency based in {site.city}, {site.country}. This policy
                explains what information we collect through {site.url.replace(/^https?:\/\//, "")} and how we use it.
                Questions? Email us at{" "}
                <a className="link-draw font-semibold text-charcoal" href={`mailto:${email}`}>
                  {email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2>What you send us</h2>
              <p>When you use our contact form, we receive the details you enter:</p>
              <ul>
                <li>your name and phone or WhatsApp number</li>
                <li>your email address, if you give it</li>
                <li>the service you&apos;re interested in, your budget if you share it, and your message</li>
              </ul>
              <p>
                We use these details only to reply to you and to discuss your project. Form messages are delivered to
                our inbox through an email delivery service.
              </p>
            </div>

            <div>
              <h2>WhatsApp and Messenger</h2>
              <p>
                If you choose to contact us on WhatsApp or Facebook Messenger, your conversation happens on those
                services and is covered by their own privacy policies.
              </p>
            </div>

            <div>
              <h2>Analytics and advertising</h2>
              <p>
                We may use the Meta Pixel to understand how people find our site and to measure our Facebook and
                Instagram ads. It uses cookies to record events such as page views and contact button clicks. You can
                control this through your browser&apos;s cookie settings and your Facebook ad preferences.
              </p>
            </div>

            <div>
              <h2>Hosting</h2>
              <p>
                Like any website, our hosting provider processes technical information such as your IP address and
                browser type to deliver pages and keep the site secure.
              </p>
            </div>

            <div>
              <h2>What we don&apos;t do</h2>
              <p>We don&apos;t sell your personal information, and we don&apos;t share it with anyone except as described here.</p>
            </div>

            <div>
              <h2>Your choices</h2>
              <p>
                You can ask us what information we hold about you, or ask us to delete it, by emailing{" "}
                <a className="link-draw font-semibold text-charcoal" href={`mailto:${email}`}>
                  {email}
                </a>
                . We keep enquiries only as long as we need them to respond and for our business records.
              </p>
            </div>

            <div>
              <h2>Changes</h2>
              <p>If we change this policy, we&apos;ll update it on this page and change the date at the top.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
