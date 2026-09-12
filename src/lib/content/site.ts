import type {
  CtaBandContent,
  HeroContent,
  NavItem,
  SectionIntro,
  SiteSettings,
} from "./types";

/** CONTENT.md §B.1 / §B.12 / §A.9 */
export const siteSettings: SiteSettings = {
  name: "Jaisy",
  tagline: "360° Brand Execution",
  footerTagline:
    "Advertising Solutions. Production Excellence. Reliable Execution.",
  description:
    "Jaisy is an integrated advertising solutions company specializing in production, branding, signage, exhibitions, events, and promotional solutions.",
  url: "https://jaisy.com",
  logoUrl: null,
  faviconUrl: null,
  phones: ["01121167181", "01121178417"],
  addressLines: [
    "Mokattam – Central Plateau – 4th District",
    "Building 6493, Cairo, Egypt",
  ],
  mapQuery: "Mokattam Central Plateau 4th District Building 6493 Cairo Egypt",
  closingLine: "Thank you.",
  seo: {
    title: "Jaisy — Bringing Brands to Life",
    titleTemplate: "%s | Jaisy",
    description:
      "Integrated advertising solutions in Cairo, Egypt: exhibition booths, events & activations, signage, promotional items, branding applications, and in-house production & fabrication.",
    keywords: [
      "advertising agency Egypt",
      "exhibition booths Cairo",
      "signage solutions Egypt",
      "event branding Cairo",
      "promotional items Egypt",
      "production and fabrication",
      "brand activation Egypt",
      "Jaisy",
    ],
  },
};

/** PROMPT.md §3.1 — anchor navigation for the one-page scroll site. */
export const navItems: NavItem[] = [
  { label: "Who We Are", href: "#about", sectionId: "about" },
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Clients", href: "#clients", sectionId: "clients" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

/** Official button label — CONTENT.md §A.8. Reused site-wide. */
export const PRIMARY_CTA_LABEL = "Start Your Project";

/** CONTENT.md §A.2 — headline shortened at the client's request. */
export const heroContent: HeroContent = {
  eyebrow: "360° Brand Execution",
  headline: "Bringing Brands to Life",
  subheadline: "",
  primaryCta: { label: "View Our Projects", href: "#work" },
  secondaryCta: { label: "Contact Us", href: "#contact" },
};

/** CONTENT.md §A.8 — verbatim. */
export const ctaBandContent: CtaBandContent = {
  eyebrow: "Ready when you are",
  heading: "Let's Build Something Together",
  body: "Whether you're planning an event, launching a campaign, upgrading your signage, or creating a branded experience, our team is ready to help.",
  buttonLabel: PRIMARY_CTA_LABEL,
  buttonHref: "#contact",
};

/** CONTENT.md §A.4 heading + intro — verbatim. */
export const servicesIntro: SectionIntro = {
  eyebrow: "What we do",
  heading: "Our Services",
  intro:
    "We provide a wide range of advertising and branding solutions designed to help businesses strengthen their presence and connect with their audience.",
};

/** CONTENT.md §A.5 heading — verbatim. */
export const whyIntro: SectionIntro = {
  eyebrow: "The difference",
  heading: "Why Brands Choose Jaisy",
  intro:
    "One coordinated team, in-house capabilities, and a track record of getting complex physical builds delivered on time.",
};

/** Portfolio section framing (gallery sourced from CONTENT.md §B.9). */
export const portfolioIntro: SectionIntro = {
  eyebrow: "Selected work",
  heading: "Our Work",
  intro:
    "A cross-section of booths, activations, signage, branded environments and production runs delivered for brands across Egypt and the region.",
};

/** CONTENT.md §A.6 heading — verbatim. */
export const industriesIntro: SectionIntro = {
  eyebrow: "Sectors",
  heading: "Serving Brands Across Industries",
};

/** CONTENT.md §A.7 heading + copy — verbatim. */
export const clientsIntro: SectionIntro = {
  eyebrow: "Partnerships",
  heading: "Trusted By Leading Brands",
  intro:
    "We are proud to work with brands across various industries, delivering solutions that support visibility, engagement, and growth.",
};

/** Contact section framing (details from CONTENT.md §B.12). */
export const contactIntro: SectionIntro = {
  eyebrow: "Get in touch",
  heading: "Contact Us",
  intro:
    "Tell us what you're planning and we'll come back with an approach, a timeline, and a quote.",
};
