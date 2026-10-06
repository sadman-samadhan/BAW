"use client";

import { useEffect } from "react";

/**
 * One delegated listener for desktop-only pointer effects, so cards and buttons stay server components.
 *   [data-tilt]  tilts up to ~4deg toward the cursor and exposes --mx/--my for the cursor pill.
 * Does nothing on touch devices or with reduced motion.
 */
export function PointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const reset = (el: HTMLElement) => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    const apply = () => {
      frame = 0;
      if (!last) return;
      // Cards use a stretched link that covers everything, so the pointer is usually over the link:
      // resolve the card root first, then its tilt stage.
      const el = last.target as HTMLElement | null;
      const root = el?.closest<HTMLElement>("[data-tilt-root]");
      const target = root
        ? root.querySelector<HTMLElement>("[data-tilt]")
        : (el?.closest<HTMLElement>("[data-tilt]") ?? null);
      if (active && active !== target) reset(active);
      active = target;
      if (!target) return;
      const r = target.getBoundingClientRect();
      const x = last.clientX - r.left;
      const y = last.clientY - r.top;
      const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
      const px = clamp(x / r.width - 0.5);
      const py = clamp(y / r.height - 0.5);
      target.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
      target.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
      target.style.setProperty("--mx", `${x.toFixed(0)}px`);
      target.style.setProperty("--my", `${y.toFixed(0)}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeaveWindow = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
