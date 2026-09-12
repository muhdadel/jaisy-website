import type { Client, Industry, PlatformLink } from "./types";

/** CONTENT.md §A.6 — the authoritative 10-item list, in order. */
const industryNames = [
  "Retail",
  "Food & Beverage",
  "Real Estate",
  "Automotive",
  "Banking",
  "Healthcare",
  "Education",
  "Corporate",
  "Hospitality",
  "Events & Exhibitions",
];

export const industries: Industry[] = industryNames.map((name, index) => ({
  id: `ind-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name,
  order: index + 1,
}));

/**
 * CONTENT.md §B.10, reconciled against the "OUR CLIENTS" slide of the Jaisy
 * portfolio deck. Every entry is `[name, logo slug]`, listed in the same
 * reading order as the slide.
 *
 * Artwork lives in `public/clients/<slug>.png` — each mark was lifted from the
 * deck and recoloured to `--color-brand-pink` on a transparent background, so
 * the marquee needs no CSS filtering.
 *
 * Three names are spelled as they appear in the official artwork, which
 * corrects typos in CONTENT.md: "HCS Harroos" -> Harrods Language Schools,
 * "Palm Reachware Resort" -> Palm Beach Resort, "Miraat" -> Merath. PSA and BDP
 * ship as a single combined lockup, exactly as the deck presents them.
 */
const clientEntries: ReadonlyArray<readonly [name: string, slug: string]> = [
  ["Al Fakher", "al-fakher"],
  ["El Ezaby Pharmacy", "el-ezaby-pharmacy"],
  ["alx", "alx"],
  ["Flash Group", "flash-group"],
  ["GTS", "gts"],
  ["Insutech", "insutech"],
  ["The Memorial Souad Kafafi University Hospital", "souad-kafafi-university-hospital"],
  ["Harrods Language Schools", "harrods-language-schools"],
  ["Sorouh Developments", "sorouh-developments"],
  ["Ezz Elarab Automotive Group", "ezz-elarab"],
  ["Dream Town Real Estate Development", "dream-town"],
  ["CNSL Saudi Arabia", "cnsl-saudi-arabia"],
  ["Palm Beach Resort", "palm-beach-resort"],
  ["Reachware", "reachware"],
  ["Merath Developments", "merath-developments"],
  ["Dr. Israa El Saed", "dr-israa-el-saed"],
  ["Jotun", "jotun"],
  ["Modern University for Technology and Information", "mti"],
  ["WAW", "waw"],
  ["Saudi National Football Team", "saudi-national-team"],
  ["Global Brands Group", "global-brands-group"],
  ["PSA · BDP", "psa-bdp"],
  ["WE", "we"],
  ["Zanussi", "zanussi"],
  ["Roma Pizza", "roma-pizza"],
  ["Flash Investment", "flash-investment"],
  ["Buffalo Burger", "buffalo-burger"],
  ["T. Modad Properties", "t-modad-properties"],
  ["Vodafone", "vodafone"],
  ["Schneider Electric", "schneider-electric"],
  ["FIFA", "fifa"],
  ["Nescafé", "nescafe"],
  ["National Bank of Egypt", "national-bank-of-egypt"],
  ["Capixy", "capixy"],
  ["Naguib Selim", "naguib-selim"],
  ["Huawei", "huawei"],
  ["Nestlé", "nestle"],
  ["Egy Property", "egy-property"],
  ["R. Egypt", "r-egypt"],
  ["Ai", "ai-monogram"],
  ["Wealth Holding", "wealth-holding"],
  ["Oppo", "oppo"],
];

export const clients: Client[] = clientEntries.map(([name, slug], index) => ({
  id: `cl-${index + 1}`,
  name,
  logoUrl: `/clients/${slug}.png`,
  order: index + 1,
}));

/**
 * CONTENT.md §B.12 — placeholder platform set.
 * Only entries with `visible: true` AND a non-empty `url` are rendered, so an
 * unconfigured platform simply doesn't appear on the live site.
 */
export const platformLinks: PlatformLink[] = [
  {
    id: "pl-website",
    platform: "website",
    label: "Website",
    url: "",
    visible: true,
    order: 1,
  },
  {
    id: "pl-facebook",
    platform: "facebook",
    label: "Facebook",
    url: "",
    visible: true,
    order: 2,
  },
  {
    id: "pl-instagram",
    platform: "instagram",
    label: "Instagram",
    url: "",
    visible: true,
    order: 3,
  },
  {
    id: "pl-linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    url: "",
    visible: true,
    order: 4,
  },
  {
    id: "pl-tiktok",
    platform: "tiktok",
    label: "TikTok",
    url: "",
    visible: true,
    order: 5,
  },
  {
    id: "pl-whatsapp",
    platform: "whatsapp",
    label: "WhatsApp",
    // Derived from the first phone number in CONTENT.md §B.12 (Egypt +20).
    url: "https://wa.me/201121167181",
    visible: true,
    order: 6,
  },
  {
    id: "pl-behance",
    platform: "behance",
    label: "Behance",
    url: "",
    visible: true,
    order: 7,
  },
];
