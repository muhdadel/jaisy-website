import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Industry, SectionIntro } from "@/lib/content/types";
import { accentClasses, accentFor } from "@/lib/utils/accents";
import { cn } from "@/lib/utils/cn";

interface IndustriesSectionProps {
  copy: SectionIntro;
  industries: Industry[];
}

export function IndustriesSection({
  copy,
  industries,
}: IndustriesSectionProps) {
  return (
    <Section id="industries" surface labelledBy="industries-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-texture opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          headingId="industries-heading"
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="max-w-md text-base leading-relaxed text-fg-muted">
            Ten sectors, one execution standard — from retail rollouts and F&amp;B
            fit-outs to banking, healthcare and large-format exhibitions.
          </p>
        </SectionHeading>

        {industries.length === 0 ? (
          <p className="rounded-card surface-card p-8 text-sm text-fg-subtle">
            Industry list coming soon.
          </p>
        ) : (
          <RevealGroup
            className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2"
            stagger={0.05}
            as="ul"
          >
            {industries.map((industry, index) => {
              const accent = accentClasses[accentFor(industry.id)];
              return (
                <RevealItem key={industry.id} as="li">
                  <div className="group relative flex h-full items-center gap-4 overflow-hidden bg-ink-850/90 px-6 py-6 transition-colors duration-500 hover:bg-ink-800">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100",
                        accent.bg,
                      )}
                    />
                    <span className="font-[family-name:var(--font-display)] text-xs font-bold tabular-nums text-white/20 transition-colors duration-500 group-hover:text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-1 sm:text-xl">
                      {industry.name}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </div>
    </Section>
  );
}
