import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/** Page-width wrapper with a 16px mobile gutter. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</Tag>;
}

/** Mono section label in the style "// 01 · WHAT I BUILD". */
export function SectionLabel({
  index,
  children,
  className = "",
  tone = "light",
  as: Tag = "p",
  id,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  /** Render as a heading when the label is the section's only title. */
  as?: "p" | "h2";
  id?: string;
}) {
  return (
    <Tag id={id} className={`text-label flex items-center gap-2 ${tone === "dark" ? "text-banana" : "text-banana-ink"} ${className}`}>
      <span aria-hidden="true">{"//"}</span>
      {index && (
        <>
          <span>{index}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}

/** The yellow bar from the logo, drawn in on load. */
export function UnderlineBar({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`underline-bar ${className}`} />;
}

type BadgeTone = "live" | "concept" | "coming-soon" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  live: "bg-charcoal text-paper",
  concept: "bg-banana text-charcoal",
  "coming-soon": "bg-paper text-charcoal ring-2 ring-inset ring-charcoal",
  neutral: "bg-paper-deep text-charcoal",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`badge badge-${tone} text-label inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 !tracking-[0.12em] ${badgeTones[tone]} ${className}`}
    >
      {tone === "live" && <span aria-hidden="true" className="size-1.5 rounded-full bg-banana" />}
      {children}
    </span>
  );
}

/** Wraps content in a scroll-driven reveal. `i` staggers siblings. */
export function Reveal({
  children,
  as: Tag = "div",
  variant,
  i,
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "fade" | "scale" | "left";
  i?: number;
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
  return (
    <Tag
      data-reveal={variant && variant !== "up" ? variant : ""}
      className={className}
      style={i !== undefined ? { ...style, ["--i" as string]: i } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
