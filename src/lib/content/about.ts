import type { AboutContent, VisionMissionContent } from "./types";

/** CONTENT.md §A.3 — verbatim copy. */
export const aboutContent: AboutContent = {
  eyebrow: "About Jaisy",
  heading: "Who We Are",
  paragraphs: [
    "Jaisy is an integrated advertising solutions company specializing in production, branding, signage, exhibitions, events, and promotional solutions.",
    "With in-house production capabilities and years of experience across multiple industries, we help brands transform ideas into impactful physical experiences.",
    "From a single branded element to a complete event or activation, our team manages every stage of the process with a focus on quality, consistency, and execution.",
  ],
  badges: [
    {
      label: "In-House Production",
      description: "Fabrication, print and finishing under one roof.",
      accent: "blue",
    },
    {
      label: "End-to-End Execution",
      description: "Planning through installation, one accountable team.",
      accent: "pink",
    },
    {
      label: "Multi-Industry Experience",
      description: "Retail, F&B, real estate, banking, healthcare and more.",
      accent: "yellow",
    },
  ],
};

/** CONTENT.md §B.3, §B.4, §B.5 — supporting About depth. */
export const visionMissionContent: VisionMissionContent = {
  eyebrow: "Direction",
  heading: "Vision & Mission",
  vision: {
    title: "Our Vision",
    body: "To become a leading partner for brands seeking innovative advertising, branding, and production solutions that create meaningful visibility and lasting impact.",
  },
  mission: {
    title: "Our Mission",
    body: "To help brands communicate more effectively through high-quality advertising solutions, reliable execution, and customized experiences that connect businesses with their audiences.",
  },
  whatWeDo: {
    title: "What We Do",
    body: "At Jaisy, we provide a comprehensive range of advertising and branding solutions designed to support businesses at every stage of their customer journey. Whether the objective is increasing visibility, enhancing brand recognition, launching a campaign, participating in an exhibition, or creating an engaging customer experience, our team delivers solutions tailored to each client's needs.",
  },
};
