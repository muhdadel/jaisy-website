import type { Metadata } from "next";
import { ConceptNav } from "@/components/concepts/concept-nav";

/**
 * TEMPORARY review shell for the five combined Services / Work / Industries
 * concepts. Delete this route group once a direction is chosen.
 */
export const metadata: Metadata = {
  title: "Concept review",
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="pt-24 lg:pt-28">
      <ConceptNav />
      {children}
    </div>
  );
}
