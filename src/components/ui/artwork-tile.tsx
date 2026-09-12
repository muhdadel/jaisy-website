import type { CSSProperties } from "react";
import { accentHex } from "@/lib/utils/accents";
import type { BrandAccent } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

/**
 * Deterministic, on-brand generative artwork used wherever real project
 * photography has not been supplied yet. Swap happens automatically the moment
 * `PortfolioItem.imageUrl` is populated (asset drop-in or Phase 2 upload).
 */
function hash(seed: string) {
  let value = 0;
  for (let i = 0; i < seed.length; i += 1) {
    value = (value * 33 + seed.charCodeAt(i)) >>> 0;
  }
  return value;
}

function initials(title: string) {
  return title
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

const patterns = [
  (color: string): CSSProperties => ({
    backgroundImage: `repeating-linear-gradient(135deg, ${color}1f 0px, ${color}1f 2px, transparent 2px, transparent 14px)`,
  }),
  (color: string): CSSProperties => ({
    backgroundImage: `radial-gradient(${color}33 1.4px, transparent 1.5px)`,
    backgroundSize: "18px 18px",
  }),
  (color: string): CSSProperties => ({
    backgroundImage: `repeating-radial-gradient(circle at 78% 22%, ${color}26 0px, ${color}26 1.5px, transparent 2px, transparent 22px)`,
  }),
];

export function ArtworkTile({
  title,
  seed,
  className,
  accent,
}: {
  title: string;
  seed: string;
  className?: string;
  accent: BrandAccent;
}) {
  const value = hash(seed);
  const pattern = patterns[value % patterns.length]!;
  const color = accentHex[accent];
  const angle = 20 + (value % 5) * 14;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-ink-850",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, #101014 0%, #17171b 55%, #0d0d10 100%)`,
        }}
      />
      <div className="absolute inset-0 opacity-90" style={pattern(color)} />
      <div
        className="absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
        style={{ backgroundColor: `${color}59`, opacity: 0.75 }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 h-2/3 w-2/3 rounded-full blur-[70px]"
        style={{ backgroundColor: `${color}33` }}
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px opacity-60"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
        }}
      />

      <span
        className="absolute -bottom-2 left-4 font-[family-name:var(--font-display)] font-bold leading-none tracking-tighter text-white/[0.09] transition-all duration-700 group-hover:text-white/[0.16]"
        style={{ fontSize: "clamp(4.5rem, 17vw, 8rem)" }}
      >
        {initials(title)}
      </span>
    </div>
  );
}
