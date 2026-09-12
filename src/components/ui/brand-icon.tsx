import {
  Factory,
  Gift,
  Hammer,
  Palette,
  PartyPopper,
  Signpost,
  SlidersHorizontal,
  Tent,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/content/types";

const icons: Record<IconKey, LucideIcon> = {
  booth: Tent,
  event: PartyPopper,
  signage: Signpost,
  gift: Gift,
  branding: Palette,
  production: Factory,
  "end-to-end": Workflow,
  "in-house": Hammer,
  custom: SlidersHorizontal,
  team: Users,
};

export function BrandIcon({
  iconKey,
  className,
  strokeWidth = 1.5,
}: {
  iconKey: IconKey;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = icons[iconKey];
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden />;
}
