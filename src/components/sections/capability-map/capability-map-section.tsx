import { Concept05CapabilityMap } from "@/components/concepts/concept-05-capability-map";
import type { ConceptPageData } from "@/lib/concepts/load";

/**
 * Production Capability Map — Concept 05 desktop orbit, Concept 5b reel on
 * mobile. The section itself is `#work` so the nav and hero CTA land on the
 * map; `#services` and `#industries` stay as aliases.
 */
export function CapabilityMapSection({
  data,
  mobileVariant = "stage",
}: {
  data: ConceptPageData;
  /** Live homepage uses `reel` (Concept 5b). Preview routes may pass another idea. */
  mobileVariant?: "stage" | "reel" | "atlas" | "cards" | "list" | "dock";
}) {
  return (
    <Concept05CapabilityMap
      data={data}
      headingAs="h2"
      headingId="work-heading"
      sectionId="work"
      mobileVariant={mobileVariant}
    />
  );
}
