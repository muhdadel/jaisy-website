import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      <span
        aria-hidden
        className="h-px w-10 bg-gradient-to-r from-brand-pink from-33% via-brand-yellow via-50% to-brand-blue to-67%"
      />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
  headingClassName?: string;
  /** Render as h1 in the hero only; every other section uses h2. */
  as?: "h1" | "h2";
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  className,
  headingId,
  headingClassName,
  as: Tag = "h2",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <Tag
          id={headingId}
          className={cn(
            "text-[clamp(2.1rem,6vw,4.25rem)] font-bold leading-[0.95]",
            align === "center" && "mx-auto max-w-4xl",
            headingClassName,
          )}
        >
          {heading}
        </Tag>
      </Reveal>

      {intro && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Adds the lifted charcoal surface behind the section. */
  surface?: boolean;
  labelledBy?: string;
}

export function Section({
  id,
  children,
  className,
  surface = false,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-24 overflow-x-clip py-20 sm:py-28 lg:py-36",
        surface && "bg-ink-900",
        className,
      )}
    >
      {children}
    </section>
  );
}
