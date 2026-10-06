/**
 * Site-wide settings. Values in [BRACKETS] are placeholders that Sakib fills in later.
 * Contact links built from placeholders are detected by `isPlaceholder()` and rendered safely.
 */
export const site = {
  name: "Big Ape Web",
  shortName: "BigApeWeb",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigapeweb.com",
  locale: "en",
  founder: "Sakib",
  city: "Dhaka",
  country: "Bangladesh",

  contact: {
    /** International format without + or spaces, e.g. 8801XXXXXXXXX */
    whatsappNumber: "[WHATSAPP_NUMBER]",
    /** Facebook page username used for m.me links */
    messengerUsername: "[MESSENGER_USERNAME]",
    email: "hello@bigapeweb.com",
  },

  socials: {
    facebook: "[FACEBOOK_PAGE_URL]",
    github: "https://github.com/sadman-samadhan",
  },

  /**
   * Concept demos still need client approval.
   * Set to false to hide every project with status "concept" at once.
   */
  showConcepts: true,
} as const;

export function isPlaceholder(value: string | undefined): boolean {
  return !value || /^\[.*\]$/.test(value);
}
