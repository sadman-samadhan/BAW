import { isPlaceholder, site } from "@/config/site";

export type ContactChannel = "whatsapp" | "messenger" | "email";

/**
 * WhatsApp click-to-chat link with an optional prefilled message.
 * While the number is still a placeholder, links point to the contact page instead of a broken URL.
 */
export function whatsappHref(message?: string): string {
  const number = site.contact.whatsappNumber;
  if (isPlaceholder(number)) return "/contact";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number.replace(/\D/g, "")}${text}`;
}

export function messengerHref(): string {
  const username = site.contact.messengerUsername;
  if (isPlaceholder(username)) return "/contact";
  return `https://m.me/${username}`;
}

export function emailHref(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.contact.email}${query}`;
}

export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}
