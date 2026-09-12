import { Concept04Archive } from "@/components/concepts/concept-04-archive";
import { loadConceptPageData } from "@/lib/concepts/load";

export default async function Concept4Page() {
  const data = await loadConceptPageData();
  return <Concept04Archive data={data} />;
}
