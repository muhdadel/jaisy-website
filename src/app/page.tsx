import { AboutSection } from "@/components/sections/about/about-section";
import { CapabilityMapSection } from "@/components/sections/capability-map/capability-map-section";
import { ClientsSection } from "@/components/sections/clients/clients-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { VisionMissionSection } from "@/components/sections/vision/vision-mission-section";
import { WhySection } from "@/components/sections/why/why-section";
import { conceptPageDataFrom } from "@/lib/concepts/load";
import { PRIMARY_CTA_LABEL } from "@/lib/content/site";
import {
  getAboutContent,
  getClients,
  getHeroContent,
  getIndustries,
  getPlatformLinks,
  getPortfolioItems,
  getSectionCopy,
  getServices,
  getSiteSettings,
  getVisionMissionContent,
  getWhyPoints,
} from "@/lib/data";

/**
 * The only place the data layer is called. Every section below is a purely
 * presentational component that receives typed props — which is what keeps the
 * Phase 2 static-to-database swap contained to `@/lib/data`.
 */
export default async function HomePage() {
  const [
    settings,
    hero,
    about,
    visionMission,
    services,
    whyPoints,
    portfolioItems,
    industries,
    clients,
    platformLinks,
    copy,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroContent(),
    getAboutContent(),
    getVisionMissionContent(),
    getServices(),
    getWhyPoints(),
    getPortfolioItems(),
    getIndustries(),
    getClients(),
    getPlatformLinks(),
    getSectionCopy(),
  ]);

  const stats = [
    { label: "Core service lines", value: services.length },
    { label: "Industries served", value: industries.length },
    { label: "Brands delivered for", value: clients.length, suffix: "+" },
  ];

  const capabilityMap = conceptPageDataFrom(
    services,
    industries,
    portfolioItems,
    copy,
  );

  return (
    <>
      <HeroSection content={hero} services={services} />
      <AboutSection content={about} />
      <VisionMissionSection content={visionMission} />
      <CapabilityMapSection data={capabilityMap} mobileVariant="reel" />
      <WhySection copy={copy.why} points={whyPoints} stats={stats} />
      <ClientsSection copy={copy.clients} clients={clients} />
      <CtaSection content={copy.ctaBand} />
      <ContactSection
        copy={copy.contact}
        settings={settings}
        platformLinks={platformLinks}
        submitLabel={PRIMARY_CTA_LABEL}
      />
    </>
  );
}
