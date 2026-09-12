import { cn } from "@/lib/utils/cn";

/**
 * A slim bar pinned to the bottom of the viewport for the whole scroll. It
 * carries the positioning line that used to sit above the hero headline, so
 * the intro can stay purely typographic while the claim is always on screen.
 */
export function TaglineBar({
  tagline,
  className,
}: {
  tagline: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-[85] print:hidden",
        className,
      )}
    >
      <div className="border-t border-white/10 bg-ink-950/75 backdrop-blur-xl">
        <div className="flex h-9 items-center justify-center gap-3 px-4">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-brand-pink shadow-[0_0_12px_rgba(254,47,148,0.9)]"
          />
          <p className="truncate text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-fg-muted">
            {tagline}
          </p>
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-brand-pink shadow-[0_0_12px_rgba(254,47,148,0.9)]"
          />
        </div>
      </div>
    </div>
  );
}
