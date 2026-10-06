import { ImageResponse } from "next/og";
import { APE, BRAND } from "@/components/brand/ape-geometry";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: paper ape with banana face on charcoal (from the brand "in use" sheet). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.charcoal,
        }}
      >
        <svg width={140} height={140} viewBox={APE.viewBox}>
          <path fill={BRAND.paper} d={APE.head} />
          <path fill={BRAND.banana} d={APE.face} />
          <path fill={BRAND.charcoal} d={APE.brow} />
          <circle cx={80} cy={113} r={8} fill={BRAND.charcoal} />
          <circle cx={120} cy={113} r={8} fill={BRAND.charcoal} />
          <ellipse cx={91} cy={138} rx={6} ry={4.5} fill={BRAND.charcoal} />
          <ellipse cx={109} cy={138} rx={6} ry={4.5} fill={BRAND.charcoal} />
          <path d={APE.mouth} fill="none" stroke={BRAND.charcoal} strokeWidth={5} strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
