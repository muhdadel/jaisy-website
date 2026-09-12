import { Concept05CapabilityMap } from "@/components/concepts/concept-05-capability-map";
import type { ConceptPageData } from "@/lib/concepts/load";

/**
 * Production Capability Map — the chosen Concept 05 design, with homepage
 * heading level. The section itself is `#work` so the nav and hero CTA
 * land on the map; `#services` and `#industries` stay as aliases.
 */
export function CapabilityMapSection({ data }: { data: ConceptPageData }) {
  return (
    <Concept05CapabilityMap
      data={data}
      headingAs="h2"
      headingId="work-heading"
      sectionId="work"
    />
  );
}
