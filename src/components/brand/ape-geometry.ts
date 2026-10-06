/**
 * Ape head mark geometry, copied exactly from the brand mockup (logo/Main.dc.html).
 * viewBox 0 0 200 200. Shared by the static mark, the animated mascot and OG images.
 */
export const APE = {
  viewBox: "0 0 200 200",
  head: "M100 16C142 16 168 44 171 84C186 89 193 104 187 118C183 128 173 132 166 130C160 167 134 188 100 188C66 188 40 167 34 130C27 132 17 128 13 118C7 104 14 89 29 84C32 44 58 16 100 16Z",
  face: "M100 70C121 60 151 62 153 85C155 101 145 109 141 119C139 151 125 170 100 170C75 170 61 151 59 119C55 109 45 101 47 85C49 62 79 60 100 70Z",
  brow: "M45 88C58 70 84 72 100 81C116 72 142 70 155 88L152 99C137 89 116 91 100 98C84 91 63 89 48 99Z",
  eyes: [
    { cx: 80, cy: 113 },
    { cx: 120, cy: 113 },
  ],
  nostrils: [
    { cx: 91, cy: 138, rx: 6, ry: 4.5 },
    { cx: 109, cy: 138, rx: 6, ry: 4.5 },
  ],
  mouth: "M82 156Q100 164 118 156",
  /** A wider, happier mouth for the grin reaction. */
  grin: "M78 152Q100 172 122 152",
} as const;

/**
 * Browser-peek frame geometry from logo/BrowserPeek.dc.html (viewBox 0 0 200 180).
 * The head is placed inside the screen with translate(30 58) scale(0.7).
 */
export const BROWSER = {
  viewBox: "0 0 200 180",
  frame: { x: 8, y: 8, width: 184, height: 164, rx: 26 },
  dots: [
    { cx: 34, cy: 31 },
    { cx: 52, cy: 31 },
    { cx: 70, cy: 31 },
  ],
  screen: { x: 22, y: 52, width: 156, height: 106, rx: 14 },
  headTransform: "translate(30 58) scale(0.7)",
} as const;

export const BRAND = {
  charcoal: "#1A1B20",
  paper: "#F5F2EA",
  banana: "#FFC83D",
  bananaInk: "#7A5D00",
  white: "#FFFFFF",
} as const;
