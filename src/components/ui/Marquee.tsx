"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

type Props = {
  items: string[];
  pauseLabel: string;
  playLabel: string;
};

/**
 * Scrolling text strip. Pure CSS animation; this component only adds the pause button
 * (WCAG 2.2.2: moving content needs a way to stop it, not just hover).
 */
export function Marquee({ items, pauseLabel, playLabel }: Props) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-6 font-mono text-sm font-bold tracking-[0.2em] uppercase md:text-base">{item}</span>
          <span aria-hidden="true" className="text-banana">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative -my-3 -rotate-[1.5deg] bg-charcoal py-4 text-paper" data-paused={paused}>
      <div className="overflow-hidden pr-14">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute top-1/2 right-3 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal-soft text-banana"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        <span className="sr-only">{paused ? playLabel : pauseLabel}</span>
      </button>
    </div>
  );
}
