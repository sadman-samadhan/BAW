import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "About Big Ape Web";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "About us",
    title: "We're Big Ape Web.",
    subtitle: "A web design and development agency in Bangladesh.",
  });
}
