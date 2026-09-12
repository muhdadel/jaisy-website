import { IndustriesSection } from "@/components/sections/industries/industries-section";
import { PortfolioSection } from "@/components/sections/portfolio/portfolio-section";
import { WorkFilterProvider } from "@/components/sections/portfolio/work-filter-context";
import { ServicesSection } from "@/components/sections/services/services-section";
import {
  getIndustries,
  getPortfolioItems,
  getSectionCopy,
  getServices,
} from "@/lib/data";

/**
 * Frozen copy of the original homepage Services + Work + Industries
 * sections, kept so the pre-Capability-Map design is still reviewable.
 */
export default async function Concept6Page() {
  const [services, items, industries, copy] = await Promise.all([
    getServices(),
    getPortfolioItems(),
    getIndustries(),
    getSectionCopy(),
  ]);

  return (
    <WorkFilterProvider>
      <ServicesSection copy={copy.services} services={services} />
      <PortfolioSection
        copy={copy.portfolio}
        items={items}
        services={services}
      />
      <IndustriesSection copy={copy.industries} industries={industries} />
    </WorkFilterProvider>
  );
}
