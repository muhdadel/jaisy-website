import { Globe, Link2 } from "lucide-react";
import type { ComponentType } from "react";
import type { PlatformKey } from "@/lib/content/types";

type IconProps = { className?: string };

/**
 * Brand glyphs are hand-drawn here because icon libraries drop/rename brand
 * marks between releases. Everything is a single 24×24 filled path.
 */
function Facebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5.4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  );
}

function LinkedIn({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.1 9.2h3.77V21H3.1V9.2Zm6.3 0h3.61v1.61h.05c.5-.95 1.74-1.95 3.58-1.95 3.83 0 4.54 2.52 4.54 5.8V21h-3.77v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V21H9.4V9.2Z" />
    </svg>
  );
}

function TikTok({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.02 2h-3.2v13.15a2.63 2.63 0 1 1-1.9-2.53V9.34a5.86 5.86 0 1 0 5.1 5.81V8.9a7.2 7.2 0 0 0 4.2 1.35V7.06a4.06 4.06 0 0 1-2.9-1.28A4.15 4.15 0 0 1 16.02 2Z" />
    </svg>
  );
}

function WhatsApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.19c5.43 0 9.85-4.4 9.85-9.84S17.47 2 12.04 2Zm5.76 14.06c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.22-3.3-.7-2.78-1.1-4.55-3.94-4.69-4.12-.14-.18-1.12-1.5-1.12-2.86 0-1.36.71-2.03.96-2.31.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.31.02.49-.1.18-.14.29-.28.45-.14.16-.29.35-.42.47-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.25.09 1.6.76 1.88.9.27.14.45.21.52.32.07.12.07.66-.16 1.34Z" />
    </svg>
  );
}

const registry: Record<PlatformKey, ComponentType<IconProps>> = {
  website: Globe,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: LinkedIn,
  tiktok: TikTok,
  whatsapp: WhatsApp,
  behance: Link2,
  other: Link2,
};

export function PlatformIcon({
  platform,
  className,
}: {
  platform: PlatformKey;
  className?: string;
}) {
  const Icon = registry[platform] ?? Link2;
  return <Icon className={className} />;
}
