import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { AboutContent } from "@/lib/content/types";

export function AboutSection({ content }: { content: AboutContent }) {
  const [pullQuote, ...rest] = content.paragraphs;

  return (
    <Section id="about" labelledBy="about-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[30vmax] w-[30vmax] rounded-full bg-brand-blue/10 blur-[130px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          heading={content.heading}
          headingId="about-heading"
        />

        <Reveal delay={0.1}>
          <blockquote className="relative mt-10 max-w-3xl pl-6 sm:pl-8">
            <span
              aria-hidden
              className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-[3px] rounded-full bg-gradient-to-b from-brand-pink to-transparent"
            />
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.6vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em] text-fg">
              {pullQuote}
            </p>
          </blockquote>
        </Reveal>

        <RevealGroup className="mt-8 flex flex-col gap-5" stagger={0.1}>
          {rest.map((paragraph) => (
            <RevealItem key={paragraph}>
              <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
