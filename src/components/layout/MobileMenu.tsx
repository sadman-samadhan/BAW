"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  openLabel: string;
  closeLabel: string;
  /** Server-rendered menu content (links, buttons, mascot). */
  children: ReactNode;
};

/**
 * Full-screen mobile menu on a native <dialog>: the browser handles focus containment,
 * Escape to close and making the page behind inert. Entrance animation is CSS (@starting-style).
 */
export function MobileMenu({ openLabel, closeLabel, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close after navigating to a new page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-full lg:hidden"
        aria-haspopup="dialog"
      >
        <Menu size={26} aria-hidden="true" />
        <span className="sr-only">{openLabel}</span>
      </button>

      <dialog
        ref={dialogRef}
        className="menu-dialog lg:hidden"
        aria-label={openLabel}
        onClick={(e) => {
          // Clicking a link inside closes the menu even when the route doesn't change.
          if ((e.target as HTMLElement).closest("a")) close();
        }}
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="flex h-[var(--header-h)] items-center justify-end px-4 sm:px-6">
            <button
              type="button"
              onClick={close}
              className="inline-flex size-12 items-center justify-center rounded-full"
              autoFocus
            >
              <X size={28} aria-hidden="true" />
              <span className="sr-only">{closeLabel}</span>
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
