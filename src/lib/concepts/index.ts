/**
 * Joins services, work and industries for the Capability Map.
 * Existing `portfolioItems` are not mutated — the only additive
 * information is the project → industry association below, which
 * `PortfolioItem` does not carry yet.
 */
import type {
  Industry,
  PortfolioItem,
  Service,
  ServiceSlug,
} from "@/lib/content/types";

/**
 * Which sector each project was delivered for, keyed by `PortfolioItem.id`
 * and derived from the client named in `CONTENT.md` §B.9 (e.g. Ajour is a
 * bakery, Amgen is pharmaceutical, Egy Property is a developer).
 *
 * Values are `Industry.name` from `CONTENT.md` §A.6 so the copy stays
 * authoritative. Phase 2 should move this onto the `PortfolioItem` model.
 */
const PROJECT_INDUSTRY: Record<string, string> = {
  "pf-robot-egypt-booth": "Retail",
  "pf-ajour-bakery-signage": "Food & Beverage",
  "pf-dermactive-outdoor-stage": "Healthcare",
  "pf-alx-pathway-booth": "Education",
  "pf-gts-corporate-giftset": "Corporate",
  "pf-hemohero-hospital-mural": "Healthcare",
  "pf-wealth-holding-billboard": "Real Estate",
  "pf-naguib-selim-fabric-box": "Retail",
  "pf-tbl-entrance-branding": "Real Estate",
  "pf-egy-property-booth": "Real Estate",
  "pf-alkabeer-vehicle-wrap": "Automotive",
  "pf-dairy-directional-sign": "Retail",
  "pf-bosta-giftbox": "Corporate",
  "pf-radix-stage-branding": "Corporate",
  "pf-freska-beach-kiosk": "Hospitality",
  "pf-meat-show-signage": "Food & Beverage",
  "pf-why-clothing-packaging": "Retail",
  "pf-flash-investment-gold-wall": "Banking",
  "pf-epfa-atum-stepandrepeat": "Events & Exhibitions",
  "pf-wtf-neon-sign": "Food & Beverage",
  "pf-capstone-ballroom-branding": "Real Estate",
  "pf-glory-pack-giftset": "Corporate",
  "pf-manara-developments-booth": "Real Estate",
  "pf-dream-town-building-sign": "Real Estate",
  "pf-metaverse-office-branding": "Corporate",
  "pf-amgen-nplate-medical-display": "Healthcare",
  "pf-flash-investment-office-branding": "Banking",
  "pf-edition-ramadan-packaging": "Retail",
  "pf-sound-vr-light-signage": "Events & Exhibitions",
  "pf-mens-club-event-branding": "Retail",
  "pf-erg-corporate-giveaways": "Corporate",
};

/** A project with its service and sector resolved, ready for presentation. */
export interface ConceptProject {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  /** Descriptive alt text — the caption already reads as one. */
  alt: string;
  serviceSlug: ServiceSlug;
  serviceTitle: string;
  serviceAccent: Service["accent"];
  industryId: string;
  industryName: string;
  order: number;
}

export interface ConceptData {
  services: Service[];
  industries: Industry[];
  projects: ConceptProject[];
  /** Projects grouped by service slug, in service order. */
  byService: Map<ServiceSlug, ConceptProject[]>;
  /** Projects grouped by industry id. */
  byIndustry: Map<string, ConceptProject[]>;
  /** Sectors each service has actually delivered for, in industry order. */
  industriesForService: Map<ServiceSlug, Industry[]>;
  /** Services each sector has actually commissioned, in service order. */
  servicesForIndustry: Map<string, Service[]>;
}

/**
 * Joins the three published content sets into one navigable model. Every
 * project keeps its own service and sector, so no project is duplicated and no
 * category is invented.
 */
export function buildConceptData(
  services: Service[],
  industries: Industry[],
  items: PortfolioItem[],
): ConceptData {
  const industryByName = new Map(
    industries.map((industry) => [industry.name, industry]),
  );
  const serviceBySlug = new Map(
    services.map((service) => [service.slug, service]),
  );

  const projects: ConceptProject[] = items.flatMap((item) => {
    const service = serviceBySlug.get(item.category);
    const industry = industryByName.get(PROJECT_INDUSTRY[item.id] ?? "");
    if (!service || !industry || !item.imageUrl) return [];

    return [
      {
        id: item.id,
        title: item.title,
        caption: item.caption,
        imageUrl: item.imageUrl,
        alt: item.caption,
        serviceSlug: service.slug,
        serviceTitle: service.title,
        serviceAccent: service.accent,
        industryId: industry.id,
        industryName: industry.name,
        order: item.order,
      },
    ];
  });

  const byService = new Map<ServiceSlug, ConceptProject[]>(
    services.map((service) => [
      service.slug,
      projects.filter((project) => project.serviceSlug === service.slug),
    ]),
  );

  const byIndustry = new Map<string, ConceptProject[]>(
    industries.map((industry) => [
      industry.id,
      projects.filter((project) => project.industryId === industry.id),
    ]),
  );

  const industriesForService = new Map<ServiceSlug, Industry[]>(
    services.map((service) => {
      const ids = new Set(
        (byService.get(service.slug) ?? []).map(
          (project) => project.industryId,
        ),
      );
      return [
        service.slug,
        industries.filter((industry) => ids.has(industry.id)),
      ];
    }),
  );

  const servicesForIndustry = new Map<string, Service[]>(
    industries.map((industry) => {
      const slugs = new Set(
        (byIndustry.get(industry.id) ?? []).map(
          (project) => project.serviceSlug,
        ),
      );
      return [
        industry.id,
        services.filter((service) => slugs.has(service.slug)),
      ];
    }),
  );

  return {
    services,
    industries,
    projects,
    byService,
    byIndustry,
    industriesForService,
    servicesForIndustry,
  };
}

/**
 * Serialisable slice handed to the client concepts — `Map` cannot cross the
 * server/client boundary, so the joins are flattened into plain arrays.
 */
export interface ConceptPayload {
  services: {
    slug: ServiceSlug;
    title: string;
    summary: string;
    accent: Service["accent"];
    iconKey: Service["iconKey"];
    projectCount: number;
    industryNames: string[];
  }[];
  industries: {
    id: string;
    name: string;
    projectCount: number;
    serviceTitles: string[];
  }[];
  projects: ConceptProject[];
}

export function toConceptPayload(data: ConceptData): ConceptPayload {
  return {
    services: data.services.map((service) => ({
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      accent: service.accent,
      iconKey: service.iconKey,
      projectCount: data.byService.get(service.slug)?.length ?? 0,
      industryNames: (data.industriesForService.get(service.slug) ?? []).map(
        (industry) => industry.name,
      ),
    })),
    industries: data.industries.map((industry) => ({
      id: industry.id,
      name: industry.name,
      projectCount: data.byIndustry.get(industry.id)?.length ?? 0,
      serviceTitles: (data.servicesForIndustry.get(industry.id) ?? []).map(
        (service) => service.title,
      ),
    })),
    projects: data.projects,
  };
}
