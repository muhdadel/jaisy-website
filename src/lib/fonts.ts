import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

/**
 * Typography per CONTENT.md §A.10.
 *
 * - Display: "Stavok Grotesque" is not freely licensable for web embedding, so
 *   we use **Space Grotesk** — one of the substitutes the content brief
 *   explicitly sanctions — at heavy weights.
 * - Body: "Open Sauce One" ships from Fontshare rather than Google Fonts. Drop
 *   the woff2 files into `src/fonts/` and swap `bodyFont` for a
 *   `next/font/local` declaration to switch over; nothing else in the codebase
 *   references the family name directly (everything reads `--font-body`).
 */
export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
