import { LatestWorkDrawer } from "@/components/latest-work/latest-work-drawer";
import { LatestWorkPreviewHome } from "@/components/latest-work/preview-home";
import { loadLatestWork } from "@/lib/latest-work";

export default async function LatestWork3Page() {
  const projects = await loadLatestWork();
  return (
    <>
      <LatestWorkPreviewHome />
      <LatestWorkDrawer projects={projects} />
    </>
  );
}
