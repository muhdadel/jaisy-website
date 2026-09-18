import type { Metadata } from "next";
import { ConceptFullHome } from "@/components/concepts/concept-full-home";

export const metadata: Metadata = {
  title: "Concept 05d — Capability Cards",
  robots: { index: false, follow: false },
};

export default function Concept5dPage() {
  return <ConceptFullHome mobileVariant="cards" />;
}
