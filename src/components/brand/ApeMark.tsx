import { APE, BRAND } from "./ape-geometry";

export type ApeMarkVariant = "light" | "dark" | "banana" | "mono";

const palettes: Record<ApeMarkVariant, { head: string; face: string; ink: string }> = {
  /** On paper: charcoal head, banana face */
  light: { head: BRAND.charcoal, face: BRAND.banana, ink: BRAND.charcoal },
  /** On charcoal: paper head, banana face */
  dark: { head: BRAND.paper, face: BRAND.banana, ink: BRAND.charcoal },
  /** On banana: charcoal head, paper face */
  banana: { head: BRAND.charcoal, face: BRAND.paper, ink: BRAND.charcoal },
  /** Single colour on white */
  mono: { head: BRAND.charcoal, face: BRAND.white, ink: BRAND.charcoal },
};

type Props = {
  size?: number;
  variant?: ApeMarkVariant;
  className?: string;
  /** When set, the mark is announced to screen readers with this label. */
  title?: string;
  /** Adds the idle blink animation. */
  blink?: boolean;
};

/** The static ape head mark. Eyes grow slightly at small sizes, as in the brand mockup. */
export function ApeMark({ size = 48, variant = "light", className, title, blink = false }: Props) {
  const c = palettes[variant];
  const eyeR = size <= 20 ? 10 : size <= 36 ? 9 : size <= 64 ? 8 : 7;
  const showDetails = size > 20;

  return (
    <svg
      viewBox={APE.viewBox}
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill={c.head} d={APE.head} />
      <path fill={c.face} d={APE.face} />
      <path fill={c.ink} d={APE.brow} />
      <g className={blink ? "ape-part ape-blink" : undefined}>
        {APE.eyes.map((e) => (
          <circle key={e.cx} cx={e.cx} cy={e.cy} r={eyeR} fill={c.ink} />
        ))}
      </g>
      {showDetails && (
        <>
          {APE.nostrils.map((n) => (
            <ellipse key={n.cx} cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry} fill={c.ink} />
          ))}
          <path d={APE.mouth} fill="none" stroke={c.ink} strokeWidth={5} strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
