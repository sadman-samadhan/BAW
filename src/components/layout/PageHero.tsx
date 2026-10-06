import type { ReactNode } from "react";
import { ApeMark } from "@/components/brand/ApeMark";
import { Container, SectionLabel } from "@/components/ui/primitives";

type Props = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons or extra content under the subtitle. */
  children?: ReactNode;
  /** Content above the label, e.g. breadcrumbs. */
  above?: ReactNode;
  /** Show a peeking ape on the right edge (large screens). */
  ape?: boolean;
};

/** Hero for inner pages. The h1 is static text so it paints immediately. */
export function PageHero({ label, title, subtitle, children, above, ape = true }: Props) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-14 md:pt-[calc(var(--header-h)+4.5rem)] md:pb-20">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0" />
      <Container className="relative">
        {above}
        <SectionLabel>{label}</SectionLabel>
        <h1 className="text-display mt-5 max-w-5xl !text-[clamp(2.5rem,8vw,5.75rem)]">{title}</h1>
        {subtitle && <div className="text-lead mt-6 max-w-2xl text-stone">{subtitle}</div>}
        {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
      </Container>
      {ape && (
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 bottom-0 hidden translate-y-[38%] -rotate-12 lg:block">
          <ApeMark size={260} blink />
        </div>
      )}
    </section>
  );
}
