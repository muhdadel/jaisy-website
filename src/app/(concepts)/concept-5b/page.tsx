import { Concept05MobileReelPage } from "@/components/concepts/concept-05-mobile-reel";
import { loadConceptPageData } from "@/lib/concepts/load";

/** Isolated test of a second mobile reading for the Capability Map. */
export default async function Concept5bPage() {
  const data = await loadConceptPageData();
  return <Concept05MobileReelPage data={data} />;
}
