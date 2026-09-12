import { Concept02VisualWall } from "@/components/concepts/concept-02-visual-wall";
import { loadConceptPageData } from "@/lib/concepts/load";

export default async function Concept2Page() {
  const data = await loadConceptPageData();
  return <Concept02VisualWall data={data} />;
}
