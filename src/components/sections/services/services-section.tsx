import { ServiceCard } from "@/components/sections/services/service-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { SectionIntro, Service } from "@/lib/content/types";

interface ServicesSectionProps {
  copy: SectionIntro;
  services: Service[];
}

export function ServicesSection({ copy, services }: ServicesSectionProps) {
  return (
    <Section id="services" labelledBy="services-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[32vmax] w-[32vmax] rounded-full bg-brand-pink/10 blur-[140px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="services-heading"
        />

        {services.length === 0 ? (
          <p className="mt-12 rounded-card surface-card p-8 text-sm text-fg-subtle">
            Our service list is being updated. Please check back shortly.
          </p>
        ) : (
          <RevealGroup
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {services.map((service, index) => (
              <RevealItem key={service.id} className="h-full">
                <ServiceCard service={service} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </Section>
  );
}
