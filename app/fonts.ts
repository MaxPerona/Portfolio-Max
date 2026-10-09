import localFont from "next/font/local";

// Self-hosted (SIL OFL) so builds don't depend on Google Fonts being reachable.
export const urbanist = localFont({
  src: [{ path: "./fonts/Urbanist-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-urbanist",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [{ path: "./fonts/JetBrainsMono-latin.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-jetbrains",
  display: "swap",
});
