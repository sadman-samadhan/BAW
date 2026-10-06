import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Contact Big Ape Web";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Contact",
    title: "Let's talk about your project.",
    subtitle: "WhatsApp, Messenger or our form. Whichever is easier.",
  });
}
