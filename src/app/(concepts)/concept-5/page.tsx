import { Concept05CapabilityMap } from "@/components/concepts/concept-05-capability-map";
import { loadConceptPageData } from "@/lib/concepts/load";

export default async function Concept5Page() {
  const data = await loadConceptPageData();
  return <Concept05CapabilityMap data={data} />;
}
