import type { NextRequest } from "next/server";
import { getClientIp } from "@/lib/api/rate-limit";
import { handleApiError, ok } from "@/lib/api/response";
import { submitInquiry } from "@/lib/services/inquiry-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const body = await request.json().catch(() => null);

    const result = await submitInquiry(body, {
      ip: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent"),
      requestId,
    });

    return ok(result, 201);
  } catch (error) {
    return handleApiError(error, requestId);
  }
}
