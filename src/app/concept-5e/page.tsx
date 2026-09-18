import type { Metadata } from "next";
import { ConceptFullHome } from "@/components/concepts/concept-full-home";

export const metadata: Metadata = {
  title: "Concept 05e — Capability List",
  robots: { index: false, follow: false },
};

export default function Concept5ePage() {
  return <ConceptFullHome mobileVariant="list" />;
}
