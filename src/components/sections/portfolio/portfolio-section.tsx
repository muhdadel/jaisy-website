import { PortfolioGallery } from "@/components/sections/portfolio/portfolio-gallery";
import { Section, SectionHeading } from "@/components/ui/section";
import type { PortfolioItem, SectionIntro, Service } from "@/lib/content/types";

interface PortfolioSectionProps {
  copy: SectionIntro;
  items: PortfolioItem[];
  services: Service[];
}

export function PortfolioSection({
  copy,
  items,
  services,
}: PortfolioSectionProps) {
  return (
    <Section id="work" labelledBy="work-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[30vmax] w-[30vmax] rounded-full bg-brand-yellow/8 blur-[150px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="work-heading"
        />

        <PortfolioGallery
          items={items}
          categories={services.map((service) => ({
            slug: service.slug,
            title: service.title,
          }))}
        />
      </div>
    </Section>
  );
}
