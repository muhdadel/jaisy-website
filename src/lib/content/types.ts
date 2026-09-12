/**
 * Domain types for every piece of editable site content.
 *
 * These shapes are deliberately DB-friendly (id / order / published flags) so
 * that Phase 2 can back them with Prisma models without touching a single
 * section component. Section components consume these types via props only.
 */

export type BrandAccent = "blue" | "pink" | "yellow";

export type ServiceSlug =
  | "exhibition-booths"
  | "events-activations"
  | "signage-solutions"
  | "promotional-items-giveaways"
  | "branding-visual-applications"
  | "production-fabrication";

export type IconKey =
  | "booth"
  | "event"
  | "signage"
  | "gift"
  | "branding"
  | "production"
  | "end-to-end"
  | "in-house"
  | "custom"
  | "team";

export interface Service {
  id: string;
  slug: ServiceSlug;
  /** Official §A.4 title — authoritative. */
  title: string;
  /** Official §A.4 one-liner, rendered by default on the card. */
  summary: string;
  /** Longer §B.6 intro, revealed when the card expands. */
  intro: string;
  /** Longer §B.6 bullet list, revealed when the card expands. */
  bullets: string[];
  iconKey: IconKey;
  accent: BrandAccent;
  order: number;
}

export interface WhyPoint {
  id: string;
  title: string;
  description: string;
  iconKey: IconKey;
  accent: BrandAccent;
  order: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  /** Long-form alt/caption text derived from CONTENT.md §B.9. */
  caption: string;
  category: ServiceSlug;
  /**
   * Real photography is not shipped with the content brief. Until an admin
   * uploads the artwork (Phase 2) this stays null and the grid renders a
   * branded generative tile instead of a broken image.
   */
  imageUrl: string | null;
  /** Filename suggested by CONTENT.md §B.9 — drop the asset in to go live. */
  suggestedAsset: string;
  order: number;
  published: boolean;
}

export interface Industry {
  id: string;
  name: string;
  order: number;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  order: number;
}

export type PlatformKey =
  | "website"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "tiktok"
  | "whatsapp"
  | "behance"
  | "other";

export interface PlatformLink {
  id: string;
  platform: PlatformKey;
  label: string;
  url: string;
  visible: boolean;
  order: number;
}

export interface NavItem {
  label: string;
  href: string;
  /** DOM id of the section this anchor targets (for scroll-spy). */
  sectionId: string;
}

export interface AboutBadge {
  label: string;
  description: string;
  accent: BrandAccent;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  /** First paragraph is rendered as a pull quote. */
  paragraphs: string[];
  badges: AboutBadge[];
}

export interface VisionMissionContent {
  eyebrow: string;
  heading: string;
  vision: { title: string; body: string };
  mission: { title: string; body: string };
  whatWeDo: { title: string; body: string };
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface CtaBandContent {
  eyebrow: string;
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface SectionIntro {
  eyebrow: string;
  heading: string;
  intro?: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  footerTagline: string;
  description: string;
  url: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  phones: string[];
  addressLines: string[];
  mapQuery: string;
  closingLine: string;
  seo: {
    title: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
  };
}
