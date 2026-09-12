import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { VisionMissionContent } from "@/lib/content/types";

export function VisionMissionSection({
  content,
  id = "vision",
  headingId = "vision-heading",
}: {
  content: VisionMissionContent;
  id?: string;
  headingId?: string;
}) {
  const columns = [
    { ...content.vision, bar: "from-brand-blue" },
    { ...content.mission, bar: "from-brand-pink" },
  ];

  return (
    <Section id={id} labelledBy={headingId}>
      <div className="container-page relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          heading={content.heading}
          headingId={headingId}
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {columns.map(({ title, body, bar }) => (
            <Reveal key={title}>
              <article>
                <h3 className="text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-tight">
                  {title}
                </h3>
                <p className="relative mt-6 pl-6 text-base leading-relaxed text-fg-muted sm:pl-8 sm:text-lg">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-[3px] rounded-full bg-gradient-to-b to-transparent ${bar}`}
                  />
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-3xl">
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-fg-subtle">
              {content.whatWeDo.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              {content.whatWeDo.body}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
