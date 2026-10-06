import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * CSS-only device frames. No images for the hardware, so they stay sharp and cost nothing to load.
 */
export function LaptopFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-[clamp(0.6rem,1.6vw,1.1rem)] bg-charcoal p-[2.2%] pb-[3%] shadow-[0_30px_60px_-30px_rgba(26,27,32,0.55)]">
        <div className="screen relative aspect-[16/10] overflow-hidden rounded-[clamp(0.25rem,0.7vw,0.5rem)] bg-paper-deep">
          {children}
        </div>
      </div>
      {/* Base of the laptop */}
      <div className="relative mx-auto -mt-px h-[clamp(0.5rem,1.4vw,0.9rem)] w-[112%] -translate-x-[5.4%] rounded-b-[1rem] bg-gradient-to-b from-[#3a3b42] to-charcoal">
        <div className="mx-auto h-[45%] w-[16%] rounded-b-md bg-[#2a2b31]" />
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[clamp(1rem,3vw,1.9rem)] bg-charcoal p-[4.5%] shadow-[0_24px_50px_-20px_rgba(26,27,32,0.6)] ${className}`}
      style={style}
    >
      <div className="screen relative aspect-[390/844] overflow-hidden rounded-[clamp(0.75rem,2.4vw,1.5rem)] bg-paper-deep">
        {children}
        <div className="absolute top-[2%] left-1/2 h-[2.6%] w-[28%] -translate-x-1/2 rounded-full bg-charcoal" />
      </div>
    </div>
  );
}

type ScreenProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Full-page screenshot that scrolls on hover. Only downloaded by desktop browsers. */
  fullSrc?: string;
  preload?: boolean;
};

export function ScreenImage({ src, alt, sizes, fullSrc, preload }: ScreenProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
        {...(preload ? { preload: true } : { loading: "lazy" as const })}
      />
      {fullSrc && (
        // The image URL is only used by a desktop hover rule (see .scroll-shot), so phones never
        // download it, and desktops only when a card is first hovered or focused.
        <span
          aria-hidden="true"
          className="scroll-shot pointer-events-none absolute inset-0"
          style={{ ["--full" as string]: `url("${fullSrc}")` }}
        />
      )}
    </>
  );
}

/** A stand-in screen for projects without screenshots yet (e.g. MakeMyWeddingLive). */
export function PlaceholderScreen({
  title,
  label,
  accent = "#1A1B20",
  variant = "wedding",
}: {
  title: string;
  label: string;
  accent?: string;
  variant?: "wedding" | "generic";
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-[4cqh] p-[6%] text-center text-paper"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, ${accent} 70%, white) 0%, ${accent} 60%)` }}
      aria-hidden="true"
    >
      {variant === "wedding" && (
        <svg viewBox="0 0 100 100" className="h-[24cqh] w-auto opacity-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#D4A574" strokeWidth="2" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#D4A574" strokeWidth="0.8" strokeDasharray="2 3" />
          <text x="50" y="60" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fill="#F5F2EA">
            M &amp; W
          </text>
        </svg>
      )}
      <p className="font-serif text-[clamp(0.8rem,7cqw,2.4rem)] leading-none italic">{title}</p>
      <p className="font-mono text-[clamp(0.45rem,2.6cqw,0.8rem)] tracking-[0.3em] uppercase opacity-80">{label}</p>
    </div>
  );
}
