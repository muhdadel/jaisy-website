/**
 * Data-access indirection layer (PROMPT.md §8.1).
 *
 * Phase 1: these functions read from the typed static content modules.
 * Phase 2: the *same* signatures will read from Prisma repositories instead —
 * swapping the source is a change inside this file only. Pages and section
 * components must never import from `@/lib/content` directly.
 */
import * as content from "@/lib/content";
import type {
  AboutContent,
  Client,
  CtaBandContent,
  HeroContent,
  Industry,
  NavItem,
  PlatformLink,
  PortfolioItem,
  SectionIntro,
  Service,
  ServiceSlug,
  SiteSettings,
  VisionMissionContent,
  WhyPoint,
} from "@/lib/content/types";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getSiteSettings(): Promise<SiteSettings> {
  return content.siteSettings;
}

export async function getNavItems(): Promise<NavItem[]> {
  return content.navItems;
}

export async function getHeroContent(): Promise<HeroContent> {
  return content.heroContent;
}

export async function getAboutContent(): Promise<AboutContent> {
  return content.aboutContent;
}

export async function getVisionMissionContent(): Promise<VisionMissionContent> {
  return content.visionMissionContent;
}

export async function getServices(): Promise<Service[]> {
  return [...content.services].sort(byOrder);
}

export async function getWhyPoints(): Promise<WhyPoint[]> {
  return [...content.whyPoints].sort(byOrder);
}

export async function getPortfolioItems(
  category?: ServiceSlug,
): Promise<PortfolioItem[]> {
  return content.portfolioItems
    .filter((item) => item.published)
    .filter((item) => !category || item.category === category)
    .sort(byOrder);
}

export async function getIndustries(): Promise<Industry[]> {
  return [...content.industries].sort(byOrder);
}

export async function getClients(): Promise<Client[]> {
  return [...content.clients].sort(byOrder);
}

/** Only links an admin has actually filled in are ever exposed. */
export async function getPlatformLinks(): Promise<PlatformLink[]> {
  return content.platformLinks
    .filter((link) => link.visible && link.url.trim().length > 0)
    .sort(byOrder);
}

export async function getSectionCopy(): Promise<{
  services: SectionIntro;
  why: SectionIntro;
  portfolio: SectionIntro;
  industries: SectionIntro;
  clients: SectionIntro;
  contact: SectionIntro;
  ctaBand: CtaBandContent;
}> {
  return {
    services: content.servicesIntro,
    why: content.whyIntro,
    portfolio: content.portfolioIntro,
    industries: content.industriesIntro,
    clients: content.clientsIntro,
    contact: content.contactIntro,
    ctaBand: content.ctaBandContent,
  };
}
