import type { Metadata } from "next";
import { ConceptFullHome } from "@/components/concepts/concept-full-home";

export const metadata: Metadata = {
  title: "Concept 05f — Capability Dock",
  robots: { index: false, follow: false },
};

export default function Concept5fPage() {
  return <ConceptFullHome mobileVariant="dock" />;
}
