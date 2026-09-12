import type { Service, WhyPoint } from "./types";

/**
 * CONTENT.md §A.4 (authoritative title, order and one-line summary)
 * merged with §B.6 (longer intro + bullet lists shown when a card expands).
 */
export const services: Service[] = [
  {
    id: "svc-exhibition-booths",
    slug: "exhibition-booths",
    title: "Exhibition Booths",
    summary:
      "Custom exhibition booths designed to showcase brands professionally and create memorable visitor experiences.",
    intro:
      "Exhibitions offer valuable opportunities for businesses to showcase their products, services, and capabilities. We design, produce, and execute custom exhibition booths that help brands stand out, attract visitors, and communicate their message effectively.",
    bullets: [
      "Custom Booth Design",
      "Modular & Bespoke Builds",
      "Product Display Systems",
      "Visitor Engagement Zones",
      "On-Site Build & Dismantle",
      "Exhibition Project Management",
    ],
    iconKey: "booth",
    accent: "blue",
    order: 1,
  },
  {
    id: "svc-events-activations",
    slug: "events-activations",
    title: "Events & Activations",
    summary:
      "End-to-end event branding and activation solutions that help brands engage with their audience in meaningful ways.",
    intro:
      "Successful events require more than logistics. They require experiences that create meaningful interactions between brands and audiences. Jaisy supports corporate events, product launches, activations, conferences, and promotional campaigns through complete branding and production solutions.",
    bullets: [
      "Event Branding",
      "Stage Branding",
      "Registration Areas",
      "Promotional Installations",
      "Interactive Activations",
      "Corporate Events",
      "Product Launches",
      "Exhibition Experiences",
    ],
    iconKey: "event",
    accent: "pink",
    order: 2,
  },
  {
    id: "svc-signage-solutions",
    slug: "signage-solutions",
    title: "Signage Solutions",
    summary:
      "Indoor and outdoor signage designed to improve visibility, strengthen brand identity, and enhance customer experience.",
    intro:
      "Signage is often the first interaction customers have with a brand. We provide indoor and outdoor signage solutions designed to improve visibility, strengthen brand identity, and create memorable first impressions.",
    bullets: [
      "Illuminated Signs",
      "Outdoor Signage",
      "Indoor Signage",
      "Acrylic Signage",
      "Directional Signage",
      "Retail Signage",
      "Custom Fabrication",
      "Installation Services",
    ],
    iconKey: "signage",
    accent: "yellow",
    order: 3,
  },
  {
    id: "svc-promotional-items",
    slug: "promotional-items-giveaways",
    title: "Promotional Items & Giveaways",
    summary:
      "Custom-branded promotional products that keep brands visible beyond campaigns and events.",
    intro:
      "Promotional products remain one of the most effective ways to extend brand visibility beyond campaigns and events. We provide a wide range of customized promotional solutions designed to keep brands present in everyday interactions.",
    bullets: [
      "Corporate Gifts",
      "Giveaway Kits",
      "Employee Welcome Kits",
      "Event Merchandise",
      "Promotional Products",
      "Seasonal Campaign Materials",
      "Branded Packaging",
    ],
    iconKey: "gift",
    accent: "blue",
    order: 4,
  },
  {
    id: "svc-branding-applications",
    slug: "branding-visual-applications",
    title: "Branding & Visual Applications",
    summary:
      "Wall graphics, branded environments, vehicle branding, retail applications, and custom visual solutions.",
    intro:
      "Strong brands are built through consistency. Our branding solutions help businesses maintain a cohesive visual identity across physical environments and customer touchpoints.",
    bullets: [
      "Wall Graphics",
      "Environmental Branding",
      "Retail Branding",
      "Office Branding",
      "Window Graphics",
      "Vehicle Branding",
      "Custom Visual Installations",
    ],
    iconKey: "branding",
    accent: "pink",
    order: 5,
  },
  {
    id: "svc-production-fabrication",
    slug: "production-fabrication",
    title: "Production & Fabrication",
    summary:
      "In-house production capabilities that ensure quality control, flexibility, and efficient project delivery.",
    intro:
      "Our in-house production capabilities allow us to maintain greater control over quality, timelines, and project outcomes. By managing production internally, we ensure flexibility, consistency, and efficient delivery across projects of different scales.",
    bullets: [
      "Large Format Printing",
      "Digital Printing",
      "Fabrication",
      "Acrylic Production",
      "Custom Manufacturing",
      "Finishing & Assembly",
      "Installation Preparation",
    ],
    iconKey: "production",
    accent: "yellow",
    order: 6,
  },
];

/**
 * CONTENT.md §A.5 — exactly 4 cards.
 * The portfolio deck's 5th point ("Reliable Delivery") is intentionally omitted.
 */
export const whyPoints: WhyPoint[] = [
  {
    id: "why-end-to-end",
    title: "End-to-End Execution",
    description:
      "One partner managing planning, production, fabrication, and installation.",
    iconKey: "end-to-end",
    accent: "blue",
    order: 1,
  },
  {
    id: "why-in-house",
    title: "In-House Production",
    description:
      "Greater quality control, faster turnaround times, and consistent results.",
    iconKey: "in-house",
    accent: "pink",
    order: 2,
  },
  {
    id: "why-custom",
    title: "Custom Solutions",
    description:
      "Every project is developed according to the brand's objectives and requirements.",
    iconKey: "custom",
    accent: "yellow",
    order: 3,
  },
  {
    id: "why-team",
    title: "Experienced Team",
    description:
      "A team dedicated to delivering projects efficiently and professionally.",
    iconKey: "team",
    accent: "blue",
    order: 4,
  },
];
