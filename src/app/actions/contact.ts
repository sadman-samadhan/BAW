"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/config/site";

export type ContactField = "name" | "phone" | "email" | "message";
export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<ContactField, "required" | "invalid">>;
  error?: "server";
  /** Submitted values, returned on error so the form can be refilled after React resets it. */
  values?: Record<string, string>;
  /** Changes on every result so the client can react to repeated submissions. */
  at?: number;
};

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9()\-\s]{6,20}$/),
  email: z.union([z.literal(""), z.email().max(200)]),
  service: z.string().trim().max(60),
  budget: z.string().trim().max(100),
  message: z.string().trim().min(10).max(4000),
});

const field = (formData: FormData, key: string) => String(formData.get(key) ?? "");

/**
 * Contact form handler. Validates on the server (the client only uses native validation, so zod never
 * ships to the browser), filters obvious bots, and emails the enquiry through Resend.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Bots fill hidden fields and submit instantly. Pretend success so they don't retry.
  if (field(formData, "company_website")) return { status: "success", at: Date.now() };
  const started = Number(field(formData, "started"));
  if (started && Date.now() - started < 2500) return { status: "success", at: Date.now() };

  const raw = {
    name: field(formData, "name"),
    phone: field(formData, "phone"),
    email: field(formData, "email").trim(),
    service: field(formData, "service"),
    budget: field(formData, "budget"),
    message: field(formData, "message"),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (!["name", "phone", "email", "message"].includes(key) || fieldErrors[key]) continue;
      fieldErrors[key] = raw[key].trim() === "" ? "required" : "invalid";
    }
    return { status: "error", fieldErrors, values: raw, at: Date.now() };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contact] RESEND_API_KEY is not set; enquiry not emailed.");
    return { status: "error", error: "server", values: raw, at: Date.now() };
  }

  const { name, phone, email, service, budget, message } = parsed.data;
  const text = [
    `Name: ${name}`,
    `Phone / WhatsApp: ${phone}`,
    `Email: ${email || "-"}`,
    `Service: ${service || "-"}`,
    `Budget: ${budget || "-"}`,
    "",
    message,
  ].join("\n");

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
      to: process.env.CONTACT_TO_EMAIL || site.contact.email,
      replyTo: email || undefined,
      subject: `New enquiry${service ? ` (${service})` : ""} from ${name}`,
      text,
    });
    if (error) throw new Error(error.message);
    return { status: "success", at: Date.now() };
  } catch (e) {
    console.error("[contact] sending failed:", e);
    return { status: "error", error: "server", values: raw, at: Date.now() };
  }
}
