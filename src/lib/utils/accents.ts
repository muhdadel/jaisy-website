import type { BrandAccent } from "@/lib/content/types";

/** Tailwind class fragments per brand accent, kept in one place. */
export const accentClasses: Record<
  BrandAccent,
  {
    text: string;
    bg: string;
    softBg: string;
    border: string;
    ring: string;
    glow: string;
    gradient: string;
  }
> = {
  blue: {
    text: "text-brand-blue",
    bg: "bg-brand-blue",
    softBg: "bg-brand-blue/10",
    border: "border-brand-blue/40",
    ring: "group-hover:ring-brand-blue/40",
    glow: "group-hover:shadow-[0_0_45px_-12px_var(--color-brand-blue)]",
    gradient: "from-brand-blue/25",
  },
  pink: {
    text: "text-brand-pink",
    bg: "bg-brand-pink",
    softBg: "bg-brand-pink/10",
    border: "border-brand-pink/40",
    ring: "group-hover:ring-brand-pink/40",
    glow: "group-hover:shadow-[0_0_45px_-12px_var(--color-brand-pink)]",
    gradient: "from-brand-pink/25",
  },
  yellow: {
    text: "text-brand-yellow",
    bg: "bg-brand-yellow",
    softBg: "bg-brand-yellow/10",
    border: "border-brand-yellow/40",
    ring: "group-hover:ring-brand-yellow/40",
    glow: "group-hover:shadow-[0_0_45px_-12px_var(--color-brand-yellow)]",
    gradient: "from-brand-yellow/25",
  },
};

export const accentHex: Record<BrandAccent, string> = {
  blue: "#1ab3ff",
  pink: "#fe2f94",
  yellow: "#ffdd07",
};

export const brandAccents: BrandAccent[] = ["blue", "pink", "yellow"];

/** Deterministic accent pick so server and client render identically. */
export function accentFor(seed: string): BrandAccent {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return brandAccents[hash % brandAccents.length];
}
