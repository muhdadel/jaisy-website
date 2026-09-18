import { Concept05CapabilityMap } from "@/components/concepts/concept-05-capability-map";
import type { ConceptPageData } from "@/lib/concepts/load";

/**
 * Production Capability Map. `#work` is the section; `#services` and
 * `#industries` stay as aliases for older links.
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
