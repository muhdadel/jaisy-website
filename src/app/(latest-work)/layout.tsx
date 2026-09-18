import type { Metadata } from "next";
import { LatestWorkNav } from "@/components/latest-work/preview-nav";

export const metadata: Metadata = {
  title: "Latest Work concepts",
  robots: { index: false, follow: false },
};

export default function LatestWorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LatestWorkNav />
      {children}
    </>
  );
}
