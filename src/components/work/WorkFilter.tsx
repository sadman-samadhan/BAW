"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  /** "Showing N projects" per option value, resolved on the server. */
  counts: Record<string, string>;
  groupLabel: string;
  children: ReactNode;
};

/**
 * Filter chips for the work grid. The grid itself is server-rendered (all projects visible without
 * JavaScript); this sets data-filter on its wrapper and CSS hides non-matching cards. The reflow is
 * animated with the browser's View Transitions API where available, so no animation library ships.
 */
export function WorkFilter({ options, counts, groupLabel, children }: Props) {
  const [filter, setFilter] = useState("all");
  const chipsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  // Deep links like /work?category=ecommerce (from ads or service pages).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && options.some((o) => o.value === param)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL once after hydration
      setFilter(param);
    }
  }, [options]);

  // Position the sliding pill under the active chip.
  useLayoutEffect(() => {
    const measure = () => {
      const el = chipsRef.current?.querySelector<HTMLButtonElement>(`[data-value="${filter}"]`);
      if (el) setPill({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);

  const choose = (value: string) => {
    if (value === filter) return;
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(window.history.state, "", url);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => flushSync(() => setFilter(value)));
    } else {
      setFilter(value);
    }
  };

  return (
    <div>
      <div ref={chipsRef} role="group" aria-label={groupLabel} className="relative flex flex-wrap gap-2">
        {pill && (
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 rounded-full bg-charcoal transition-[transform,width,height] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none"
            style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }}
          />
        )}
        {options.map((o) => {
          const active = o.value === filter;
          return (
            <button
              key={o.value}
              type="button"
              data-value={o.value}
              aria-pressed={active}
              onClick={() => choose(o.value)}
              className={`relative min-h-11 rounded-full px-5 py-2.5 font-semibold transition-colors duration-300 ${
                active ? "text-paper" : "text-charcoal ring-1 ring-paper-line ring-inset hover:ring-charcoal"
              } ${pill ? "" : active ? "bg-charcoal" : ""}`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="text-label mt-5 text-banana-ink">
        {counts[filter]}
      </p>
      <div data-filter={filter} className="mt-10">
        {children}
      </div>
    </div>
  );
}
