import { Concept05MobileAtlasPage } from "@/components/concepts/concept-05-mobile-atlas";
import { loadConceptPageData } from "@/lib/concepts/load";

/** Isolated test of a third mobile reading for the Capability Map. */
export default async function Concept5cPage() {
  const data = await loadConceptPageData();
  return <Concept05MobileAtlasPage data={data} />;
}
