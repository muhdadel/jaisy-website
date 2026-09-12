import { HeroStage } from "@/components/sections/hero/hero-stage";
import type { HeroContent, Service } from "@/lib/content/types";

interface HeroSectionProps {
  content: HeroContent;
  services: Service[];
}

export function HeroSection({ content, services }: HeroSectionProps) {
  return (
    <HeroStage
      content={content}
      capabilities={services.map((service) => service.title)}
    />
  );
}
