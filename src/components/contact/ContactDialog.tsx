"use client";

import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ApeMark } from "@/components/brand/ApeMark";
import type { ContactFormOption, ContactFormStrings } from "./strings";

// The form's code is only downloaded the first time someone opens the dialog.
const ContactForm = dynamic(() => import("./ContactForm").then((m) => m.ContactForm));

type Props = {
  strings: ContactFormStrings;
  options: ContactFormOption[];
};

/**
 * One "Let's talk" dialog for the whole site. Any link with [data-contact-open] opens it
 * (optionally preselecting [data-contact-service]). Those links point to /contact#form,
 * so without JavaScript they still work.
 */
export function ContactDialog({ strings, options }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [request, setRequest] = useState<{ service?: string; n: number } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-contact-open]");
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // On the contact page itself, just scroll to the form.
      if (window.location.pathname === "/contact") return;
      e.preventDefault();
      setRequest((r) => ({ service: link.dataset.contactService || undefined, n: (r?.n ?? 0) + 1 }));
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!request) return;
    // Open after any other modal (e.g. the mobile menu) has closed.
    const id = requestAnimationFrame(() => {
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
    });
    return () => cancelAnimationFrame(id);
  }, [request]);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Nothing to render (or hydrate) until someone asks to talk.
  if (!request) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      className="contact-dialog"
      onClick={(e) => {
        // Click on the backdrop closes the dialog.
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper-deep"
        >
          <X size={22} aria-hidden="true" />
          <span className="sr-only">{strings.close}</span>
        </button>
        <div className="flex items-center gap-3 pr-12">
          <ApeMark size={44} blink />
          <h2 id="contact-dialog-title" className="text-h3">
            {strings.dialogTitle}
          </h2>
        </div>
        <p className="mt-3 text-stone">{strings.dialogSubtitle}</p>
        <div className="mt-6">
          <ContactForm
            key={request.n}
            strings={strings}
            options={options}
            defaultService={request.service}
            idPrefix="dialog-contact"
          />
        </div>
      </div>
    </dialog>
  );
}
