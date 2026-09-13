import type { Metadata } from "next";
import { ConceptFullHome } from "@/components/concepts/concept-full-home";

export const metadata: Metadata = {
  title: "Concept 05c — Pocket Atlas",
  robots: { index: false, follow: false },
};

/** Full-site preview of the atlas mobile map. The live homepage is unchanged. */
export default function Concept5cPage() {
  return <ConceptFullHome mobileVariant="atlas" />;
}
