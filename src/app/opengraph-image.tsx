import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Big Ape Web: web design and development agency";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Web design & development agency",
    title: "Websites that make your business look big.",
    subtitle: "Online stores, business websites, web apps and more.",
  });
}
