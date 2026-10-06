import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { BrandIcon } from "./BrandIcon";
import { isExternal, type ContactChannel } from "@/lib/contact";

type Variant = "primary" | "dark" | "ghost";
type IconName = "whatsapp" | "messenger" | "email" | "arrow" | "external";

type Props = {
  /** Ignored when `contact` is set. */
  href?: string;
  /**
   * Opens the site-wide "Let's talk" form dialog (pass a service slug to preselect it).
   * Without JavaScript the link goes to the contact page form.
   */
  contact?: boolean | string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: IconName;
  /** Meta Pixel event sent on click, e.g. "Contact". Picked up by the delegated tracker. */
  track?: "Contact" | "Lead";
  channel?: ContactChannel;
  /** Makes the hero mascot raise its brows while this button is hovered or focused. */
  exciteApe?: boolean;
  className?: string;
  newTabLabel?: string;
};

function renderIcon(icon: IconName) {
  switch (icon) {
    case "whatsapp":
      return <BrandIcon name="whatsapp" size={20} />;
    case "messenger":
      return <BrandIcon name="messenger" size={20} />;
    case "email":
      return <Mail size={20} aria-hidden="true" />;
    case "external":
      return <ArrowUpRight size={20} className="btn-arrow" aria-hidden="true" />;
    default:
      return <ArrowRight size={20} className="btn-arrow" aria-hidden="true" />;
  }
}

/**
 * Pill button rendered as a link. Server component: hover effects are pure CSS.
 * External links (WhatsApp, Messenger) open in a new tab so click tracking isn't lost.
 */
export function ButtonLink({
  href = "/contact",
  contact,
  children,
  variant = "primary",
  size = "md",
  icon,
  track,
  channel,
  exciteApe,
  className = "",
  newTabLabel,
}: Props) {
  const classes = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const leading = icon === "whatsapp" || icon === "messenger" || icon === "email";
  const content = (
    <>
      {icon && leading && renderIcon(icon)}
      <span>{children}</span>
      {icon && !leading && renderIcon(icon)}
    </>
  );
  const data = {
    "data-track": track,
    "data-track-channel": channel,
    "data-ape-excite": exciteApe ? "" : undefined,
  };

  if (contact) {
    return (
      <a
        href="/contact#form"
        className={classes}
        data-contact-open=""
        data-contact-service={typeof contact === "string" ? contact : undefined}
        data-ape-excite={exciteApe ? "" : undefined}
      >
        {content}
      </a>
    );
  }

  if (isExternal(href)) {
    const newTab = !href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...data}
      >
        {content}
        {newTab && newTabLabel && <span className="sr-only"> {newTabLabel}</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...data}>
      {content}
    </Link>
  );
}
