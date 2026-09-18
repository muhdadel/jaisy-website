import { buildConceptData, type ConceptProject } from "@/lib/concepts";
import {
  getIndustries,
  getPortfolioItems,
  getServices,
} from "@/lib/data";

/**
 * Three published projects, picked for distinct services, sectors, and
 * photography. Order is the featured sequence — not a new dataset.
 */
export const LATEST_WORK_IDS = [
  "pf-robot-egypt-booth",
  "pf-dermactive-outdoor-stage",
  "pf-wtf-neon-sign",
] as const;

export type LatestWorkProject = ConceptProject;

export function pickLatestWork(
  projects: ConceptProject[],
): LatestWorkProject[] {
  return LATEST_WORK_IDS.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project ? [project] : [];
  });
}

export async function loadLatestWork(): Promise<LatestWorkProject[]> {
  const [services, industries, items] = await Promise.all([
    getServices(),
    getIndustries(),
    getPortfolioItems(),
  ]);
  return pickLatestWork(
    buildConceptData(services, industries, items).projects,
  );
}
