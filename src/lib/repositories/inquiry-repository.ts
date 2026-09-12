import type { InquiryInput } from "@/lib/validation/inquiry";

/**
 * The ONLY place inquiry persistence happens.
 *
 * Phase 1 ships an in-process store (submissions are logged and kept for the
 * lifetime of the server process). Phase 2 replaces the body of these
 * functions with Prisma calls against `InquirySubmission` — the signatures,
 * and therefore every caller, stay identical.
 */
export type InquiryStatus = "New" | "In Progress" | "Closed";

export interface InquiryRecord extends Omit<InquiryInput, "website"> {
  id: string;
  status: InquiryStatus;
  createdAt: string;
  notes: string;
  sourceIp: string | null;
  userAgent: string | null;
}

const store: InquiryRecord[] = [];

export interface CreateInquiryData extends Omit<InquiryInput, "website"> {
  sourceIp: string | null;
  userAgent: string | null;
}

export async function createInquiry(
  data: CreateInquiryData,
): Promise<InquiryRecord> {
  const record: InquiryRecord = {
    ...data,
    id: crypto.randomUUID(),
    status: "New",
    createdAt: new Date().toISOString(),
    notes: "",
  };

  store.unshift(record);
  return record;
}

export async function listInquiries(): Promise<InquiryRecord[]> {
  return [...store];
}

export async function countInquiries(): Promise<number> {
  return store.length;
}
