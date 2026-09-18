import { LatestWorkFloating } from "@/components/latest-work/latest-work-floating";
import { LatestWorkPreviewHome } from "@/components/latest-work/preview-home";
import { loadLatestWork } from "@/lib/latest-work";

export default async function LatestWork1Page() {
  const projects = await loadLatestWork();
  return (
    <>
      <LatestWorkPreviewHome />
      <LatestWorkFloating projects={projects} />
    </>
  );
}
