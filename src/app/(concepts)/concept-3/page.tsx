import { Concept03ExploreBy } from "@/components/concepts/concept-03-explore-by";
import { loadConceptPageData } from "@/lib/concepts/load";

export default async function Concept3Page() {
  const data = await loadConceptPageData();
  return <Concept03ExploreBy data={data} />;
}
