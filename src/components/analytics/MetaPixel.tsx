"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { installPixelStub, PIXEL_ID, track, type PixelEvent, type PixelParams } from "@/lib/analytics";

const SERVICE_PAGES = /^\/services\/([a-z-]+)\/?$/;

// Module-level state survives React Strict Mode's double effects in development.
let initialized = false;
let lastPath: string | null = null;
let scriptRequested = false;

function loadPixelScript() {
  if (scriptRequested) return;
  scriptRequested = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
}

function trackPage(pathname: string) {
  track("PageView");
  const service = pathname.match(SERVICE_PAGES)?.[1];
  if (service) track("ViewContent", { content_name: service });
}

/**
 * Meta Pixel, rendered only when NEXT_PUBLIC_META_PIXEL_ID is set.
 * - A queue stub is installed right away, so events are never lost.
 * - fbevents.js itself loads on the first interaction or ~3s after load, to protect
 *   mobile performance. Very fast bounces may not be counted.
 * - The Pixel's own history-based PageViews are disabled; we fire one per pathname change.
 * - Clicks on [data-track] elements send their event (e.g. Contact with a channel).
 */
export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || initialized) return;
    initialized = true;

    const fbq = installPixelStub();
    fbq.disablePushState = true;
    fbq.allowDuplicatePageViews = true;
    fbq("set", "autoConfig", false, PIXEL_ID);
    fbq("init", PIXEL_ID);

    const interactions = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const onFirstInteraction = () => {
      interactions.forEach((e) => window.removeEventListener(e, onFirstInteraction));
      loadPixelScript();
    };
    interactions.forEach((e) => window.addEventListener(e, onFirstInteraction, { once: true, passive: true }));

    const afterLoad = () => {
      window.setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(loadPixelScript, { timeout: 2000 });
        else loadPixelScript();
      }, 3000);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el?.dataset.track) return;
      const params: PixelParams = { source: window.location.pathname };
      const channel = el.dataset.trackChannel as PixelParams["channel"];
      if (channel) params.channel = channel;
      track(el.dataset.track as PixelEvent, params);
    };
    document.addEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!PIXEL_ID || pathname === lastPath) return;
    lastPath = pathname;
    trackPage(pathname);
  }, [pathname]);

  return null;
}
