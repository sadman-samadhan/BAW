import { getTranslations } from "next-intl/server";
import { services } from "@/config/services";
import { localize } from "@/lib/i18n";

/** Strings and options the client-side contact form needs, resolved on the server. */
export async function getContactFormProps() {
  const t = await getTranslations("contactForm");
  const keys = [
    "name",
    "phone",
    "email",
    "optional",
    "service",
    "serviceOther",
    "budget",
    "message",
    "messagePlaceholder",
    "submit",
    "sending",
    "or",
    "sendWhatsApp",
    "successTitle",
    "successBody",
    "continueWhatsApp",
    "errorRequired",
    "errorPhone",
    "errorEmail",
    "errorMessage",
    "errorServer",
    "whatsappIntro",
    "dialogTitle",
    "dialogSubtitle",
    "close",
  ] as const;
  const strings = Object.fromEntries(keys.map((k) => [k, t(k)])) as Record<(typeof keys)[number], string>;
  const options = services.map((s) => ({ value: s.slug, label: localize(s.copy).name }));
  return { strings, options };
}

export type ContactFormStrings = Awaited<ReturnType<typeof getContactFormProps>>["strings"];
export type ContactFormOption = { value: string; label: string };
