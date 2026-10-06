import { BRAND } from "@/components/brand/ape-geometry";
import type { ServiceIcon } from "@/config/services";

/** Hand-drawn icons for each service. Their parts animate when the card is hovered (globals.css). */
export function OfferingIcon({ name, className = "" }: { name: ServiceIcon; className?: string }) {
  const stroke = {
    fill: "none",
    stroke: BRAND.charcoal,
    strokeWidth: 3.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const body = { fill: BRAND.paper, stroke: BRAND.charcoal, strokeWidth: 3.5, strokeLinejoin: "round" as const };

  return (
    <svg viewBox="0 0 64 64" className={`size-16 overflow-visible ${className}`} aria-hidden="true" focusable="false">
      {name === "bag" && (
        <g className="icon-part icon-bag">
          <path className="icon-part icon-bag-handle" d="M23 22v-4a9 9 0 0 1 18 0v4" {...stroke} />
          <path d="M13 22h38l-3 32H16Z" {...body} />
          <path d="M24 34c2 4 14 4 16 0" {...stroke} />
        </g>
      )}

      {name === "app" && (
        <g>
          <rect x="8" y="12" width="48" height="40" rx="7" {...body} />
          <path d="M8 22h48" {...stroke} />
          <circle cx="15" cy="17" r="1.8" fill={BRAND.banana} />
          <g className="icon-part icon-code">
            <path d="M26 31l-6 6 6 6M38 31l6 6-6 6" {...stroke} />
          </g>
          <path className="icon-part icon-slash" d="M34 29l-4 16" stroke={BRAND.banana} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      )}

      {name === "building" && (
        <g>
          <path d="M14 56V18l18-8v46" {...body} />
          <path d="M32 56V24l18 6v26" {...body} />
          <path d="M8 56h48" {...stroke} />
          <g className="icon-part icon-windows">
            <rect x="20" y="22" width="6" height="6" rx="1.5" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2} />
            <rect x="20" y="34" width="6" height="6" rx="1.5" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2} />
            <rect x="38" y="36" width="6" height="6" rx="1.5" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2} />
          </g>
        </g>
      )}

      {name === "cap" && (
        <g>
          <g className="icon-part icon-cap">
            <path d="M32 14L4 26l28 12 28-12Z" {...body} />
            <path d="M16 31v11c0 4 7 8 16 8s16-4 16-8V31" {...stroke} />
          </g>
          <g className="icon-part icon-tassel">
            <path d="M56 28v14" {...stroke} />
            <circle cx="56" cy="44" r="3.5" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2.5} />
          </g>
        </g>
      )}

      {name === "camera" && (
        <g>
          <path className="icon-part icon-flash" d="M50 8l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2} />
          <path d="M8 22h12l4-6h16l4 6h12v30H8Z" {...body} />
          <g className="icon-part icon-lens">
            <circle cx="32" cy="37" r="10" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={3.5} />
            <path d="M32 27v6M42 37h-6M32 47v-6M22 37h6" stroke={BRAND.charcoal} strokeWidth={2} />
          </g>
        </g>
      )}

      {name === "rings" && (
        <g>
          <path className="icon-part icon-sparkle" d="M32 4l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2} />
          <circle className="icon-part icon-ring-left" cx="24" cy="38" r="14" fill="none" stroke={BRAND.charcoal} strokeWidth={4} />
          <g className="icon-part icon-ring-right">
            <circle cx="40" cy="38" r="14" fill="none" stroke={BRAND.charcoal} strokeWidth={4} />
            <path d="M36 22l4-6 4 6-4 3Z" fill={BRAND.banana} stroke={BRAND.charcoal} strokeWidth={2.5} strokeLinejoin="round" />
          </g>
        </g>
      )}
    </svg>
  );
}
