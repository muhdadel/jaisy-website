import { ok } from "@/lib/api/response";

export const dynamic = "force-dynamic";

/**
 * Uptime probe. Phase 2 should extend this with a DB connectivity check.
 */
export async function GET() {
  return ok({
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
