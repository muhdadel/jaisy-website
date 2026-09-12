import { Concept01Capabilities } from "@/components/concepts/concept-01-capabilities";
import { loadConceptPageData } from "@/lib/concepts/load";

export default async function Concept1Page() {
  const data = await loadConceptPageData();
  return <Concept01Capabilities data={data} />;
}
