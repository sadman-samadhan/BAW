import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "@/lib/i18n";

// Single locale for now: no routing, no proxy, every page stays static.
// When Bangla is added, switch to next-intl's i18n routing and read the locale here.
export default getRequestConfig(async () => {
  const locale = defaultLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
