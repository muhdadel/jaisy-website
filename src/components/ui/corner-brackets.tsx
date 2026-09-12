import { cn } from "@/lib/utils/cn";

/**
 * The thin pink open corner-bracket motif used on every slide of the Jaisy
 * portfolio deck (CONTENT.md §B.1), recreated as a reusable decorative frame.
 * Set `hover` to animate the brackets in on parent `.group` hover.
 */
export function CornerBrackets({
  className,
  size = 28,
  hover = false,
  color = "border-brand-pink/70",
}: {
  className?: string;
  size?: number;
  hover?: boolean;
  color?: string;
}) {
  const common = "pointer-events-none absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const hidden = hover ? "opacity-0 group-hover:opacity-100" : "opacity-100";
  const shift = hover ? "group-hover:translate-x-0 group-hover:translate-y-0" : "";

  return (
    <span aria-hidden className={cn("absolute inset-0", className)}>
      <span
        className={cn(
          common,
          hidden,
          shift,
          hover && "-translate-x-1 -translate-y-1",
          "left-3 top-3 border-l border-t",
          color,
        )}
        style={{ width: size, height: size }}
      />
      <span
        className={cn(
          common,
          hidden,
          shift,
          hover && "translate-x-1 translate-y-1",
          "bottom-3 right-3 border-b border-r",
          color,
        )}
        style={{ width: size, height: size }}
      />
    </span>
  );
}
