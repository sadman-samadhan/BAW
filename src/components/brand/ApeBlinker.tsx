"use client";

import { useEffect } from "react";

/**
 * Makes every visible ape blink at random intervals.
 * A CSS infinite animation on SVG runs on the main thread every frame (style + layout),
 * which showed up in mobile performance traces. This does nothing between blinks:
 * one timer, a class toggle on the eyes of apes currently on screen, then nothing again.
 */
export function ApeBlinker() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;

    const visibleEyes = () =>
      Array.from(document.querySelectorAll<SVGElement>(".ape-blink")).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
      });

    const blink = (els: SVGElement[], then?: () => void) => {
      els.forEach((el) => el.classList.add("is-blinking"));
      window.setTimeout(() => {
        els.forEach((el) => el.classList.remove("is-blinking"));
        then?.();
      }, 150);
    };

    const schedule = () => {
      const delay = reduced ? 9000 + Math.random() * 3000 : 2500 + Math.random() * 3500;
      timer = window.setTimeout(() => {
        if (!document.hidden) {
          const eyes = visibleEyes();
          // Now and then, a double blink.
          if (!reduced && Math.random() < 0.2) blink(eyes, () => window.setTimeout(() => blink(eyes), 140));
          else blink(eyes);
        }
        schedule();
      }, delay);
    };

    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
