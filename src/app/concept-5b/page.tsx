import type { Metadata } from "next";
import { ConceptFullHome } from "@/components/concepts/concept-full-home";

export const metadata: Metadata = {
  title: "Concept 05b — Capability Reel",
  robots: { index: false, follow: false },
};

/** Full-site preview of the reel mobile map. The live homepage is unchanged. */
export default function Concept5bPage() {
  return <ConceptFullHome mobileVariant="reel" />;
}
