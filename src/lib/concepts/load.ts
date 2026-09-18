import { buildConceptData, toConceptPayload, type ConceptPayload } from ".";
import type {
  Industry,
  PortfolioItem,
  SectionIntro,
  Service,
} from "@/lib/content/types";

export interface ConceptPageData extends ConceptPayload {
  copy: {
    services: { eyebrow: string; heading: string; intro?: string };
    portfolio: { eyebrow: string; heading: string; intro?: string };
    industries: { eyebrow: string; heading: string; intro?: string };
  };
}

/** Join already-fetched content so the homepage does not load the data twice. */
export function conceptPageDataFrom(
  services: Service[],
  industries: Industry[],
  items: PortfolioItem[],
  copy: {
    services: SectionIntro;
    portfolio: SectionIntro;
    industries: SectionIntro;
  },
): ConceptPageData {
  return {
    ...toConceptPayload(buildConceptData(services, industries, items)),
    copy: {
      services: copy.services,
      portfolio: copy.portfolio,
      industries: copy.industries,
    },
  };
}
