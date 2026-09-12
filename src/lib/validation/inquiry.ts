import { z } from "zod";
import { services } from "@/lib/content/services";

/** Dropdown options = the 6 official service names (§A.4) + "Other". */
const options: string[] = services.map((service) => service.title);
options.push("Other");

export const serviceOptions = options as [string, ...string[]];

export const contactMethods = ["Phone", "Email", "WhatsApp"] as const;
export type ContactMethod = (typeof contactMethods)[number];

/**
 * Loose international phone check: 8–20 digits, optional leading +,
 * spaces/dashes/parentheses allowed. Egypt-friendly without hard-restricting
 * to Egyptian numbers.
 */
const phonePattern = /^\+?[\d\s().-]{8,20}$/;

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is a little too long."),
  companyName: z
    .string()
    .trim()
    .max(160, "That company name is a little too long.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(200),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .regex(phonePattern, "Please enter a valid phone number.")
    .refine(
      (value) => (value.match(/\d/g) ?? []).length >= 8,
      "Please enter a valid phone number.",
    ),
  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: "Please choose a service." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about the project (10+ characters).")
    .max(4000, "Please keep the message under 4000 characters."),
  preferredContact: z.enum(contactMethods).optional(),
  /** Invisible honeypot — real users never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const inquiryDefaults: InquiryInput = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: serviceOptions[0],
  message: "",
  preferredContact: "Email",
  website: "",
};
