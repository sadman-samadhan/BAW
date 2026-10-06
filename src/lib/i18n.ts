/**
 * Content stored in config files (projects, services) is localized inline:
 *   copy: { en: {...}, bn: {...} }
 * Bangla is optional; anything missing falls back to English.
 */
export const locales = ["en"] as const; // add "bn" when the Bangla version is ready
export type Locale = "en" | "bn";
export const defaultLocale: Locale = "en";

export type Localized<T> = { en: T; bn?: T };

export function localize<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale] ?? value.en;
}
