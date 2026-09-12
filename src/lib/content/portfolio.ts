import type { PortfolioItem, ServiceSlug } from "./types";

interface PortfolioSeed {
  title: string;
  caption: string;
  category: ServiceSlug;
  suggestedAsset: string;
}

/**
 * CONTENT.md §B.9 — the full project inventory.
 * Curated into a mixed order so the unfiltered grid reads as a showreel
 * rather than six blocks of the same category.
 *
 * Photography is extracted from the official "Jaisy Portfolio" deck and lives
 * in `public/work/`, keyed by `suggestedAsset`. Phase 2 can override these from
 * the admin panel; anything missing falls back to a branded generative tile.
 */
const seeds: PortfolioSeed[] = [
  {
    title: "Robot Egypt",
    caption:
      "Large custom exhibition booth for Robot Egypt / Made in Egypt, built and installed end-to-end.",
    category: "exhibition-booths",
    suggestedAsset: "robot-egypt-booth.jpg",
  },
  {
    title: "Ajour Bakery & Bliss",
    caption:
      "Backlit acrylic logo sign for Ajour bakery & bliss, set against a warm interior fit-out.",
    category: "signage-solutions",
    suggestedAsset: "ajour-bakery-signage.jpg",
  },
  {
    title: "Dermactive Global",
    caption:
      "Outdoor sunset event stage and long banquet dining setup produced for Dermactive Global.",
    category: "events-activations",
    suggestedAsset: "dermactive-outdoor-stage.jpg",
  },
  {
    title: "ALX Pathway",
    caption:
      "ALX Pathway outdoor activation booth staged at night in front of the Grand Egyptian Museum.",
    category: "exhibition-booths",
    suggestedAsset: "alx-pathway-booth.jpg",
  },
  {
    title: "GTS Corporate Gift Set",
    caption:
      "Branded corporate tech gift set for GTS — power bank, cable and notebook in matching livery.",
    category: "promotional-items-giveaways",
    suggestedAsset: "gts-corporate-giftset.jpg",
  },
  {
    title: "HemoHero Hospital Mural",
    caption:
      "Children's hospital wall mural and wayfinding characters in an Arabic superhero theme.",
    category: "branding-visual-applications",
    suggestedAsset: "hemohero-hospital-mural.jpg",
  },
  {
    title: "Wealth Holding Billboard",
    caption:
      "Large outdoor billboard with a red panel and building render for Wealth Holding real estate.",
    category: "signage-solutions",
    suggestedAsset: "wealth-holding-billboard.jpg",
  },
  {
    title: "Naguib Selim Fabric Case",
    caption:
      "Branded matte black hard case produced for Naguib Selim Fabrics & More.",
    category: "production-fabrication",
    suggestedAsset: "naguib-selim-fabric-box.jpg",
  },
  {
    title: "The Brokers League",
    caption:
      "Illuminated entrance portal branding for THE BROKERS LEAGUE / TBL.",
    category: "events-activations",
    suggestedAsset: "tbl-entrance-branding.jpg",
  },
  {
    title: "Egy Property",
    caption:
      "Blue and white real estate consultancy exhibition booth for Egy Property.",
    category: "exhibition-booths",
    suggestedAsset: "egy-property-booth.jpg",
  },
  {
    title: "Al Kabeer Vehicle Wrap",
    caption:
      "Full delivery van wrap and fleet branding for Al Kabeer / Al Fakher.",
    category: "branding-visual-applications",
    suggestedAsset: "alkabeer-vehicle-wrap.jpg",
  },
  {
    title: "Dairy Directional Sign",
    caption:
      "Red acrylic DAIRY directional and retail hanging sign for a supermarket aisle.",
    category: "signage-solutions",
    suggestedAsset: "dairy-directional-sign.jpg",
  },
  {
    title: "Bosta Welcome Kit",
    caption:
      "Branded employee welcome kit for Bosta — bottle, wallet and power bank.",
    category: "promotional-items-giveaways",
    suggestedAsset: "bosta-giftbox.jpg",
  },
  {
    title: "Radix Stage Branding",
    caption:
      "Corporate stage and LED backdrop branding produced for a Radix conference.",
    category: "events-activations",
    suggestedAsset: "radix-stage-branding.jpg",
  },
  {
    title: "Freska! Beach Kiosk",
    caption:
      "Colourful branded beach kiosk and booth for Freska!, with sponsor flag installation.",
    category: "exhibition-booths",
    suggestedAsset: "freska-beach-kiosk.jpg",
  },
  {
    title: "Meat Show",
    caption:
      "Backlit circular MEAT SHOW logo sign mounted on a dark wood butcher-shop wall.",
    category: "signage-solutions",
    suggestedAsset: "meat-show-signage.jpg",
  },
  {
    title: "WHY — Rebel in Style",
    caption:
      "Branded slide-out box packaging produced for the WHY clothing label.",
    category: "production-fabrication",
    suggestedAsset: "why-clothing-packaging.jpg",
  },
  {
    title: "Flash Investment Gold Wall",
    caption:
      "Gold ornamental wall branding installed in the Flash Investment head office.",
    category: "branding-visual-applications",
    suggestedAsset: "flash-investment-gold-wall.jpg",
  },
  {
    title: "EPFA × Atum #InGame",
    caption:
      "Red carpet and branded step-and-repeat backdrop for the EPFA / Atum #INGAME event.",
    category: "exhibition-booths",
    suggestedAsset: "epfa-atum-stepandrepeat.jpg",
  },
  {
    title: "WTF Neon Sign",
    caption:
      "Yellow neon WTF (where's the food) restaurant sign fabricated and installed in-house.",
    category: "signage-solutions",
    suggestedAsset: "wtf-neon-sign.jpg",
  },
  {
    title: "Câpstone Ballroom Launch",
    caption:
      "Ballroom LED screen branding for a Câpstone real estate project launch.",
    category: "events-activations",
    suggestedAsset: "capstone-ballroom-branding.jpg",
  },
  {
    title: "Glory Pack Gift Set",
    caption:
      "Branded notebook, pen and USB gift set produced for Glory Pack.",
    category: "promotional-items-giveaways",
    suggestedAsset: "glory-pack-giftset.jpg",
  },
  {
    title: "Manara Developments",
    caption:
      "Large real estate exhibition stand for Manara Developments, including a seating lounge.",
    category: "exhibition-booths",
    suggestedAsset: "manara-developments-booth.jpg",
  },
  {
    title: "Dream Town",
    caption:
      "Dream Town building facade illuminated signage, fabricated and installed on site.",
    category: "signage-solutions",
    suggestedAsset: "dream-town-building-sign.jpg",
  },
  {
    title: "WRLD of Metaverse",
    caption:
      "Glass wall vinyl branding — 'Empower Your Future' — for WRLD OF METAVERSE offices.",
    category: "branding-visual-applications",
    suggestedAsset: "metaverse-office-branding.jpg",
  },
  {
    title: "Amgen Nplate Display",
    caption:
      "Circular medical dosage calculator point-of-sale display produced for Amgen Nplate.",
    category: "production-fabrication",
    suggestedAsset: "amgen-nplate-medical-display.jpg",
  },
  {
    title: "Flash Investment Office",
    caption:
      "Frosted glass office partition branding for Flash Investment workspaces.",
    category: "branding-visual-applications",
    suggestedAsset: "flash-investment-office-branding.jpg",
  },
  {
    title: "Edition Ramadan Box",
    caption:
      "Ramadan-themed gift box for Edition — Fabrics & More by Naguib Selim.",
    category: "production-fabrication",
    suggestedAsset: "edition-ramadan-packaging.jpg",
  },
  {
    title: "Sound & VR Light",
    caption:
      "SOUND & VR LIGHT dimensional letters mounted on a stone facade.",
    category: "signage-solutions",
    suggestedAsset: "sound-vr-light-signage.jpg",
  },
  {
    title: "Mens Club",
    caption:
      "Event branding and on-site activation setup produced for Mens Club.",
    category: "events-activations",
    suggestedAsset: "mens-club-event-branding.jpg",
  },
  {
    title: "ERG",
    caption:
      "Branded corporate giveaway set produced for ERG.",
    category: "promotional-items-giveaways",
    suggestedAsset: "erg-corporate-giveaways.jpg",
  },
];

export const portfolioItems: PortfolioItem[] = seeds.map((seed, index) => ({
  id: `pf-${seed.suggestedAsset.replace(/\.[a-z]+$/i, "")}`,
  title: seed.title,
  caption: seed.caption,
  category: seed.category,
  imageUrl: `/work/${seed.suggestedAsset}`,
  suggestedAsset: seed.suggestedAsset,
  order: index + 1,
  published: true,
}));
