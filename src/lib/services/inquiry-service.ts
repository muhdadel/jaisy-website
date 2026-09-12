import { ApiError } from "@/lib/api/response";
import { rateLimit } from "@/lib/api/rate-limit";
import {
  createInquiry,
  type InquiryRecord,
} from "@/lib/repositories/inquiry-repository";
import { inquirySchema } from "@/lib/validation/inquiry";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/** Strips control characters and angle brackets before anything is persisted. */
function sanitize(value: string): string {
  return value
    .replace(/[\p{Cc}\p{Cf}]/gu, " ")
    .replace(/[<>]/g, "")
    .replace(/\s{3,}/g, "  ")
    .trim();
}

export interface SubmitInquiryContext {
  ip: string;
  userAgent: string | null;
  requestId: string;
}

export async function submitInquiry(
  rawInput: unknown,
  context: SubmitInquiryContext,
): Promise<{ id: string; createdAt: string }> {
  const limit = rateLimit(
    `inquiry:${context.ip}`,
    RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MS,
  );

  if (!limit.allowed) {
    throw new ApiError(
      "RATE_LIMITED",
      "You've sent several messages already. Please try again shortly or call us directly.",
      429,
    );
  }

  // Same schema the client used — never trust client-side validation alone.
  const parsed = inquirySchema.safeParse(rawInput);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
    }
    throw new ApiError(
      "VALIDATION_ERROR",
      "Please check the highlighted fields and try again.",
      422,
      fields,
    );
  }

  const { website, ...payload } = parsed.data;

  // Honeypot tripped: respond as if everything succeeded, persist nothing.
  if (website && website.length > 0) {
    console.warn(
      JSON.stringify({
        level: "warn",
        requestId: context.requestId,
        event: "inquiry.honeypot_triggered",
        ip: context.ip,
      }),
    );
    return { id: "discarded", createdAt: new Date().toISOString() };
  }

  const record: InquiryRecord = await createInquiry({
    ...payload,
    fullName: sanitize(payload.fullName),
    companyName: payload.companyName ? sanitize(payload.companyName) : "",
    email: payload.email.toLowerCase(),
    phone: sanitize(payload.phone),
    message: sanitize(payload.message),
    sourceIp: context.ip,
    userAgent: context.userAgent,
  });

  console.info(
    JSON.stringify({
      level: "info",
      requestId: context.requestId,
      event: "inquiry.created",
      inquiryId: record.id,
      service: record.service,
    }),
  );

  return { id: record.id, createdAt: record.createdAt };
}
