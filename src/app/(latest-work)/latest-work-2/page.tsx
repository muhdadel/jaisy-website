import { LatestWorkOrb } from "@/components/latest-work/latest-work-orb";
import { LatestWorkPreviewHome } from "@/components/latest-work/preview-home";
import { loadLatestWork } from "@/lib/latest-work";

export default async function LatestWork2Page() {
  const projects = await loadLatestWork();
  return (
    <>
      <LatestWorkPreviewHome />
      <LatestWorkOrb projects={projects} />
    </>
  );
}
