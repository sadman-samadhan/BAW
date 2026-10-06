import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Big Ape Web services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Services",
    title: "Everything you need to grow online.",
    subtitle: "Ecommerce, web apps, business sites, WordPress & LMS, portfolios and weddings.",
  });
}
