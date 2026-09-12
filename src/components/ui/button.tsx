import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "solid";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight " +
  "transition-[transform,box-shadow,border-color,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "will-change-transform disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-ink-950 shadow-[0_10px_40px_-18px_rgba(254,47,148,0.9)] hover:shadow-[0_18px_60px_-16px_rgba(254,47,148,0.85)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-fg backdrop-blur-md hover:border-brand-pink/60 hover:bg-white/[0.07] hover:shadow-[0_0_45px_-16px_var(--color-brand-pink)]",
  solid:
    "bg-fg text-ink-950 hover:bg-white hover:shadow-[0_18px_50px_-20px_rgba(255,255,255,0.6)]",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-[0.9375rem]",
};

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Renders the hover sheen sweep (default on for filled variants). */
  sheen?: boolean;
}

function Content({
  children,
  sheen,
}: {
  children: ReactNode;
  sheen: boolean;
}) {
  return (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)] transition-transform duration-700 ease-out motion-safe:group-hover/btn:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  sheen,
  type = "button",
  ...props
}: ButtonOwnProps & ComponentPropsWithoutRef<"button">) {
  const withSheen = sheen ?? (variant === "primary" || variant === "solid");
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Content sheen={withSheen}>{children}</Content>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  sheen,
  href,
  ...props
}: ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
    href: string;
  }) {
  const withSheen = sheen ?? (variant === "primary" || variant === "solid");
  const Comp: ElementType = href.startsWith("#") ? "a" : Link;

  return (
    <Comp
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <Content sheen={withSheen}>{children}</Content>
    </Comp>
  );
}
