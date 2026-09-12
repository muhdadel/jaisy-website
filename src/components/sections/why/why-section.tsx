import { BrandIcon } from "@/components/ui/brand-icon";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { CountUp } from "@/components/ui/count-up";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { SectionIntro, WhyPoint } from "@/lib/content/types";
import { accentClasses } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";

interface WhySectionProps {
  copy: SectionIntro;
  points: WhyPoint[];
  /** Real counts derived from the content lists — no invented figures. */
  stats: { label: string; value: number; suffix?: string }[];
}

export function WhySection({ copy, points, stats }: WhySectionProps) {
  return (
    <Section id="why" surface labelledBy="why-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="why-heading"
        />

        <RevealGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {points.map((point, index) => {
            const accent = accentClasses[point.accent];
            return (
              <RevealItem key={point.id} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-card border border-white/[0.07] bg-ink-850/60 p-7 transition-all duration-500",
                    "hover:-translate-y-1.5 hover:border-white/15",
                    accent.glow,
                  )}
                >
                  <CornerBrackets hover size={20} />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                      accent.bg,
                    )}
                  />

                  <span
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition-transform duration-500 group-hover:-rotate-6",
                      accent.softBg,
                      accent.text,
                    )}
                  >
                    <BrandIcon iconKey={point.iconKey} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-6 text-lg font-bold leading-snug tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {point.description}
                  </p>

                  <span className="mt-auto pt-6 font-[family-name:var(--font-display)] text-xs font-bold tabular-nums text-white/12 transition-colors duration-500 group-hover:text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <RevealGroup
          className="mt-5 grid gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3"
          stagger={0.1}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="flex h-full flex-col gap-1 bg-ink-850/90 px-7 py-8">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
                  {stat.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
