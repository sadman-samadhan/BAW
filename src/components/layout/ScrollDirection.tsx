"use client";

import { useEffect } from "react";

/**
 * Writes scroll state to <html> so CSS can react without per-component JavaScript:
 *   data-scroll-dir="up|down"  (header hides on down, mascot ducks)
 *   data-scrolled              (present once past the top of the page)
 * Attributes only change when the state actually changes.
 */
export function ScrollDirection() {
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;
    let dir: "up" | "down" = "up";
    let scrolled = lastY > 80;

    root.dataset.scrollDir = dir;
    if (scrolled) root.dataset.scrolled = "";

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        const next = delta > 0 ? "down" : "up";
        if (next !== dir) {
          dir = next;
          root.dataset.scrollDir = dir;
        }
        lastY = y;
      }
      const isScrolled = y > 80;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        if (scrolled) root.dataset.scrolled = "";
        else delete root.dataset.scrolled;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
