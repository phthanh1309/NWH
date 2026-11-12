import { checkDatabaseHealth } from "@/lib/db";

/**
 * Public liveness/readiness endpoint (E01-05).
 *
 * The response is intentionally minimal. It never includes connection strings,
 * credentials, hostnames, database names, environment values, stack traces or
 * raw Prisma error messages. It does not accept parameters and cannot be used
 * to run arbitrary queries.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
} as const;

export async function GET() {
  let healthy = false;

  try {
    healthy = await checkDatabaseHealth();
  } catch {
    // Defensive: checkDatabaseHealth already handles failures. Never surface
    // the thrown value to the client.
    healthy = false;
  }

  return Response.json(
    healthy
      ? { status: "ok", database: "connected" }
      : { status: "error", database: "unavailable" },
    {
      status: healthy ? 200 : 503,
      headers: NO_STORE_HEADERS,
    },
  );
}
