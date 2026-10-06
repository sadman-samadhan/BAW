"use client";

import { useEffect, useId, useRef, useState } from "react";
import { APE, BROWSER, BRAND } from "./ape-geometry";

type Props = {
  /** Accessible label for the "say hi" button wrapping the mascot. */
  label: string;
  className?: string;
};

/**
 * The hero mascot: the ape peeking up inside a browser window (logo concept B).
 *
 * Everything that matters works without JavaScript, from CSS in globals.css:
 *   .ape-enter  rises from below the window on load (spring easing)
 *   .ape-duck   ducks when the page scrolls down, returns on scroll up
 *   .ape-brow   lifts when a [data-ape-excite] button in the [data-ape-host] is hovered
 *   .ape-blink  idle blinking
 * JavaScript adds the grin on click/tap, and on desktop pointers lazily loads
 * spring-based cursor tracking (./ape-tracking).
 *
 * Group nesting matters: CSS animations and JS transforms each own a separate <g>,
 * and nothing animates the group that carries the logo's translate(30 58) scale(0.7).
 */
export function BrowserPeek({ label, className = "" }: Props) {
  const clipId = `peek-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const lookRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const [grinning, setGrinning] = useState(false);
  const grinTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      import("./ape-tracking").then(({ startApeTracking }) => {
        if (cancelled || !svgRef.current || !lookRef.current || !eyesRef.current) return;
        cleanup = startApeTracking(svgRef.current, lookRef.current, eyesRef.current);
      });
    };
    // Wait until the page is idle so tracking never competes with first paint.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, []);

  useEffect(() => () => window.clearTimeout(grinTimer.current), []);

  const grin = () => {
    setGrinning(true);
    window.clearTimeout(grinTimer.current);
    grinTimer.current = window.setTimeout(() => setGrinning(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={grin}
      aria-label={label}
      className={`group block w-full cursor-pointer rounded-[2rem] ${grinning ? "is-grinning" : ""} ${className}`}
    >
      <svg
        ref={svgRef}
        viewBox={BROWSER.viewBox}
        className="block h-auto w-full overflow-visible drop-shadow-[0_24px_40px_rgba(26,27,32,0.18)]"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <rect {...BROWSER.screen} />
          </clipPath>
        </defs>

        <rect {...BROWSER.frame} fill={BRAND.charcoal} />
        <circle {...BROWSER.dots[0]} r={6} fill={BRAND.banana} />
        <circle {...BROWSER.dots[1]} r={6} fill={BRAND.paper} />
        <circle {...BROWSER.dots[2]} r={6} fill={BRAND.paper} />
        <rect {...BROWSER.screen} fill={BRAND.banana} />

        <g clipPath={`url(#${clipId})`}>
          <g transform={BROWSER.headTransform}>
            <g className="ape-enter">
              <g className="ape-duck">
                <g className="ape-pop">
                  <g ref={lookRef} className="ape-part">
                    <path fill={BRAND.charcoal} d={APE.head} />
                    <path fill={BRAND.paper} d={APE.face} />
                    <path className="ape-part ape-brow" fill={BRAND.charcoal} d={APE.brow} />
                    <g ref={eyesRef}>
                      <g className="ape-part ape-blink">
                        {APE.eyes.map((e) => (
                          <circle key={e.cx} cx={e.cx} cy={e.cy} r={8} fill={BRAND.charcoal} />
                        ))}
                      </g>
                    </g>
                    {APE.nostrils.map((n) => (
                      <ellipse key={n.cx} {...n} fill={BRAND.charcoal} />
                    ))}
                    <path
                      className="ape-mouth"
                      d={APE.mouth}
                      fill="none"
                      stroke={BRAND.charcoal}
                      strokeWidth={5}
                      strokeLinecap="round"
                    />
                    <path
                      className="ape-grin"
                      d={APE.grin}
                      fill="none"
                      stroke={BRAND.charcoal}
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
