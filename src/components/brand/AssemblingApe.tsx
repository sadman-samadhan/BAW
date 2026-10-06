import type { CSSProperties } from "react";
import { APE, BRAND } from "./ape-geometry";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * The logo mark built from its parts as it scrolls into view (CSS scroll-driven, see .assemble).
 * Fully assembled and static without support or with reduced motion.
 */
export function AssemblingApe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={APE.viewBox} className={`assemble overflow-visible ${className}`} aria-hidden="true" focusable="false">
      <path d={APE.head} fill={BRAND.charcoal} style={v({ "--d": 0, "--s": 0.6, "--y": "30px", "--o": 1 })} />
      <path d={APE.face} fill={BRAND.banana} style={v({ "--d": 1, "--y": "70px" })} />
      <path d={APE.brow} fill={BRAND.charcoal} style={v({ "--d": 2, "--y": "-60px", "--r": "-12deg" })} />
      <g style={v({ "--d": 3, "--s": 0, "--y": "0px" })}>
        {APE.eyes.map((e) => (
          <circle key={e.cx} cx={e.cx} cy={e.cy} r={7} fill={BRAND.charcoal} />
        ))}
      </g>
      <g style={v({ "--d": 3.5, "--s": 0, "--y": "0px" })}>
        {APE.nostrils.map((n) => (
          <ellipse key={n.cx} {...n} fill={BRAND.charcoal} />
        ))}
      </g>
      <path
        d={APE.mouth}
        fill="none"
        stroke={BRAND.charcoal}
        strokeWidth={5}
        strokeLinecap="round"
        style={v({ "--d": 4, "--y": "24px", "--s": 0.4 })}
      />
    </svg>
  );
}
