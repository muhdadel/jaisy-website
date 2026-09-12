import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * Real Jaisy artwork, supplied as transparent PNGs and auto-cropped to their
 * tight bounding box (see `public/brand/`). The site sits on a near-black
 * canvas, so the white cuts are the defaults; the black cuts are kept in the
 * same folder for any future light surface.
 *
 * Every consumer goes through <Logo /> / <JaisyMark />, so swapping artwork
 * happens in one place.
 */

/** Full lockup — "Jaisy" wordmark with the pink / blue / yellow accents. */
const LOCKUP = { src: "/brand/logo-white.png", width: 3882, height: 1544 };
/** Standalone "J" monogram. */
const MARK = { src: "/brand/mark-white.png", width: 2220, height: 3130 };

export function JaisyMark({
  className,
  title = "Jaisy",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <Image
      src={MARK.src}
      width={MARK.width}
      height={MARK.height}
      alt={title}
      priority
      className={cn("h-9 w-auto select-none", className)}
    />
  );
}

interface LogoProps {
  className?: string;
  /** Show the "360° Brand Execution" sub-tag (hidden on the compact navbar). */
  withTagline?: boolean;
  href?: string | null;
  /** Height utility for the lockup, e.g. "h-8". */
  markClassName?: string;
}

export function Logo({
  className,
  withTagline = false,
  href = "#top",
  markClassName,
}: LogoProps) {
  const inner = (
    <span className={cn("flex flex-col items-start leading-none", className)}>
      <Image
        src={LOCKUP.src}
        width={LOCKUP.width}
        height={LOCKUP.height}
        alt="Jaisy"
        priority
        className={cn("h-8 w-auto select-none", markClassName)}
      />
      {withTagline && (
        <span className="mt-2 text-[0.6rem] font-medium italic tracking-[0.16em] text-fg-subtle">
          360° Brand Execution
        </span>
      )}
    </span>
  );

  if (!href) return inner;

  const isAnchor = href.startsWith("#");
  const classes =
    "inline-flex rounded-lg transition-opacity duration-300 hover:opacity-85";

  return isAnchor ? (
    <a href={href} aria-label="Jaisy — back to top" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-label="Jaisy — home" className={classes}>
      {inner}
    </Link>
  );
}
