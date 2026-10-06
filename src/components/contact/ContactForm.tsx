"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { newEventId, track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/contact";
import type { ContactFormOption, ContactFormStrings } from "./strings";

type Props = {
  strings: ContactFormStrings;
  options: ContactFormOption[];
  defaultService?: string;
  /** Unique per instance so ids don't clash when the page form and the dialog form coexist. */
  idPrefix: string;
  /** Visual tone of the surface the form sits on. */
  tone?: "light" | "dark";
};

const initialState: ContactState = { status: "idle" };

function Field({
  id,
  label,
  optionalLabel,
  error,
  muted,
  children,
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  muted: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optionalLabel && <span className={`font-normal ${muted}`}> ({optionalLabel})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-semibold text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Contact form with two ways to send: email (Server Action + Resend) or WhatsApp (prefilled message).
 * Works before hydration as a normal form post. Native validation in the browser, zod on the server.
 */
export function ContactForm({ strings: s, options, defaultService, idPrefix, tone = "light" }: Props) {
  const [state, action, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const eventIdRef = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useState("");
  const submitted = useRef<{ service: string; eventId: string }>({ service: "", eventId: "" });

  // Timing field for the bot check and an event id for Pixel deduplication.
  // Re-seeded after every result because the form remounts (see key below).
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (eventIdRef.current) eventIdRef.current.value = newEventId();
  }, [state.at]);

  useEffect(() => {
    if (state.status === "success") {
      track("Lead", { service: submitted.current.service }, submitted.current.eventId || undefined);
    }
    if (state.status === "error" && state.fieldErrors) {
      const first = Object.keys(state.fieldErrors)[0];
      if (first) document.getElementById(`${idPrefix}-${first}`)?.focus();
    }
  }, [state, idPrefix]);

  const buildWhatsAppMessage = () => {
    const data = new FormData(formRef.current ?? undefined);
    const service = options.find((o) => o.value === data.get("service"))?.label;
    const lines = [
      s.whatsappIntro,
      data.get("name") && `${s.name}: ${data.get("name")}`,
      service && `${s.service} ${service}`,
      data.get("budget") && `${s.budget}: ${data.get("budget")}`,
      data.get("message") && `\n${data.get("message")}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const sendOnWhatsApp = () => {
    const text = buildWhatsAppMessage();
    setSummary(text);
    track("Contact", { channel: "whatsapp", source: window.location.pathname });
    window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
  };

  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const errorText = (f: ContactField) => {
    const code = errors[f];
    if (!code) return undefined;
    if (code === "required") return s.errorRequired;
    return f === "phone" ? s.errorPhone : f === "email" ? s.errorEmail : f === "message" ? s.errorMessage : s.errorRequired;
  };

  const muted = tone === "dark" ? "text-mist" : "text-stone";
  const inputClass = `w-full rounded-2xl border-0 px-4 py-3.5 text-base ring-1 ring-inset transition-shadow placeholder:text-stone/70 focus:ring-2 ${
    tone === "dark"
      ? "bg-charcoal-soft text-paper ring-charcoal-line focus:ring-banana"
      : "bg-white text-charcoal ring-paper-line focus:ring-charcoal"
  }`;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 py-4" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-banana text-charcoal">
          <Check size={28} aria-hidden="true" />
        </span>
        <div>
          <p className="text-h3">{s.successTitle}</p>
          <p className={`mt-2 ${muted}`}>{s.successBody}</p>
        </div>
        <a
          href={whatsappHref(summary || s.whatsappIntro)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          data-track="Contact"
          data-track-channel="whatsapp"
        >
          <BrandIcon name="whatsapp" />
          <span>{s.continueWhatsApp}</span>
        </a>
      </div>
    );
  }

  const a11y = (f: ContactField) =>
    errors[f] ? { "aria-invalid": true as const, "aria-describedby": `${idPrefix}-${f}-error` } : {};

  return (
    <form
      ref={formRef}
      action={action}
      // React resets uncontrolled forms after an action; remounting with the echoed values refills it.
      key={state.at ?? 0}
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        submitted.current = { service: String(data.get("service") ?? ""), eventId: String(data.get("eventId") ?? "") };
        setSummary(buildWhatsAppMessage());
      }}
      className="relative grid gap-5"
    >
      {/* Spam traps: a hidden field bots fill in, and the time the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-company_website`}>Company website</label>
        <input id={`${idPrefix}-company_website`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="started" defaultValue="" />
      <input ref={eventIdRef} type="hidden" name="eventId" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${idPrefix}-name`} label={s.name} error={errorText("name")} muted={muted}>
          <input id={`${idPrefix}-name`} name="name" type="text" required maxLength={100} autoComplete="name" defaultValue={v.name} className={inputClass} {...a11y("name")} />
        </Field>
        <Field id={`${idPrefix}-phone`} label={s.phone} error={errorText("phone")} muted={muted}>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            pattern="\+?[0-9\s\-]{6,20}"
            defaultValue={v.phone}
            autoComplete="tel"
            className={inputClass}
            {...a11y("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${idPrefix}-email`} label={s.email} optionalLabel={s.optional} error={errorText("email")} muted={muted}>
          <input id={`${idPrefix}-email`} name="email" type="email" maxLength={200} autoComplete="email" defaultValue={v.email} className={inputClass} {...a11y("email")} />
        </Field>
        <Field id={`${idPrefix}-service`} label={s.service} muted={muted}>
          <select id={`${idPrefix}-service`} name="service" defaultValue={v.service ?? defaultService ?? ""} className={inputClass}>
            <option value="">{s.serviceOther}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={`${idPrefix}-budget`} label={s.budget} optionalLabel={s.optional} muted={muted}>
        <input id={`${idPrefix}-budget`} name="budget" type="text" maxLength={100} placeholder="৳" defaultValue={v.budget} className={inputClass} />
      </Field>

      <Field id={`${idPrefix}-message`} label={s.message} error={errorText("message")} muted={muted}>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          placeholder={s.messagePlaceholder}
          defaultValue={v.message}
          className={`${inputClass} resize-y`}
          {...a11y("message")}
        />
      </Field>

      {state.error === "server" && (
        <p role="alert" className="rounded-2xl bg-[#FEF3F2] px-4 py-3 text-sm font-semibold text-[#B42318]">
          {s.errorServer}
        </p>
      )}

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary" disabled={pending} aria-disabled={pending}>
          <span>{pending ? s.sending : s.submit}</span>
          <ArrowRight size={20} className="btn-arrow" aria-hidden="true" />
        </button>
        <span className={`text-center text-sm ${muted}`}>{s.or}</span>
        <button type="button" onClick={sendOnWhatsApp} className="btn btn-ghost">
          <BrandIcon name="whatsapp" />
          <span>{s.sendWhatsApp}</span>
        </button>
      </div>
    </form>
  );
}
