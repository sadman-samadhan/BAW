import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { APE, BRAND, BROWSER } from "@/components/brand/ape-geometry";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "BricolageGrotesque-96pt-ExtraBold.ttf")),
  readFile(join(fontDir, "JetBrainsMono-Bold.ttf")),
]);

/** Reads an image from /public as a data URL, or returns undefined if it doesn't exist yet. */
export async function publicImageDataUrl(publicPath: string | undefined): Promise<string | undefined> {
  if (!publicPath) return undefined;
  try {
    const file = await readFile(join(process.cwd(), "public", publicPath));
    const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${type};base64,${file.toString("base64")}`;
  } catch {
    return undefined;
  }
}

function ApeInBrowser({ width }: { width: number }) {
  const height = (width * 180) / 200;
  return (
    <svg width={width} height={height} viewBox={BROWSER.viewBox}>
      <rect {...BROWSER.frame} fill={BRAND.charcoal} />
      <circle {...BROWSER.dots[0]} r={6} fill={BRAND.banana} />
      <circle {...BROWSER.dots[1]} r={6} fill={BRAND.paper} />
      <circle {...BROWSER.dots[2]} r={6} fill={BRAND.paper} />
      <rect {...BROWSER.screen} fill={BRAND.banana} />
      <defs>
        <clipPath id="og-screen">
          <rect {...BROWSER.screen} />
        </clipPath>
      </defs>
      <g clipPath="url(#og-screen)">
        <g transform={BROWSER.headTransform}>
          <path fill={BRAND.charcoal} d={APE.head} />
          <path fill={BRAND.paper} d={APE.face} />
          <path fill={BRAND.charcoal} d={APE.brow} />
          <circle cx={80} cy={113} r={8} fill={BRAND.charcoal} />
          <circle cx={120} cy={113} r={8} fill={BRAND.charcoal} />
          <ellipse cx={91} cy={138} rx={6} ry={4.5} fill={BRAND.charcoal} />
          <ellipse cx={109} cy={138} rx={6} ry={4.5} fill={BRAND.charcoal} />
        </g>
      </g>
    </svg>
  );
}

function SmallMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox={APE.viewBox}>
      <path fill={BRAND.charcoal} d={APE.head} />
      <path fill={BRAND.banana} d={APE.face} />
      <path fill={BRAND.charcoal} d={APE.brow} />
      <circle cx={80} cy={113} r={9} fill={BRAND.charcoal} />
      <circle cx={120} cy={113} r={9} fill={BRAND.charcoal} />
    </svg>
  );
}

type OgOptions = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Data URL of a screenshot to show in a browser frame on the right. */
  screenshot?: string;
};

/** Shared Open Graph template: paper background, big Bricolage title, banana bar, ape. */
export async function renderOg({ eyebrow, title, subtitle, screenshot }: OgOptions) {
  const [bricolage, mono] = await fonts;
  const titleSize = title.length > 42 ? 64 : title.length > 26 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.paper,
          color: BRAND.charcoal,
          fontFamily: "Bricolage",
          padding: "64px 64px 56px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: BRAND.bananaInk,
            }}
          >
            {`// ${eyebrow}`}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: titleSize,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", width: 220, height: 14, borderRadius: 7, background: BRAND.banana, marginTop: 32 }} />
          {subtitle && (
            <div style={{ display: "flex", marginTop: 28, fontSize: 30, lineHeight: 1.3, color: "#5C5A55", maxWidth: 560 }}>
              {subtitle}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: 16 }}>
            <SmallMark size={56} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 34, letterSpacing: "-0.045em", lineHeight: 0.9 }}>Big Ape</div>
              <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 14, letterSpacing: "0.42em", marginTop: 4 }}>
                WEB
              </div>
            </div>
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 20, marginLeft: 20, color: "#5C5A55" }}>
              bigapeweb.com
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 440 }}>
          {screenshot ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 440,
                borderRadius: 24,
                background: BRAND.charcoal,
                padding: "18px 14px 14px",
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 12, paddingLeft: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, background: BRAND.banana }} />
                <div style={{ width: 12, height: 12, borderRadius: 6, background: BRAND.paper }} />
                <div style={{ width: 12, height: 12, borderRadius: 6, background: BRAND.paper }} />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot} width={412} height={258} style={{ borderRadius: 12, objectFit: "cover" }} alt="" />
            </div>
          ) : (
            <ApeInBrowser width={420} />
          )}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 800, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 700, style: "normal" },
      ],
    },
  );
}
