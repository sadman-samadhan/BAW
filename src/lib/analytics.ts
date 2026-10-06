/**
 * Typed Meta Pixel helper. Safe to call anywhere: it does nothing when the Pixel
 * isn't configured (NEXT_PUBLIC_META_PIXEL_ID unset) or hasn't been set up yet.
 */
export type PixelEvent = "PageView" | "Contact" | "Lead" | "ViewContent";

export type PixelParams = {
  channel?: "whatsapp" | "messenger" | "email";
  source?: string;
  service?: string;
  content_name?: string;
};

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
  disablePushState?: boolean;
  allowDuplicatePageViews?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** Queue-only stub (same shape as Meta's snippet). Calls queue until fbevents.js loads. */
export function installPixelStub(): Fbq {
  if (window.fbq) return window.fbq;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  return fbq;
}

export function track(event: PixelEvent, params?: PixelParams, eventID?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventID) window.fbq("track", event, params ?? {}, { eventID });
  else window.fbq("track", event, params ?? {});
}

export function newEventId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
