import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { PrismaClient } from "@/generated/prisma/client";
import { getServerEnv } from "@/lib/env";

/**
 * Shared Prisma Client for the Node.js runtime (E01-05).
 *
 * - Imported only from server code; `server-only` turns a client import into a
 *   build error so database credentials can never reach the browser bundle.
 * - The instance is cached on `globalThis` so Next.js hot reload and separate
 *   server bundles reuse one connection pool instead of creating a client per
 *   request.
 * - The Prisma CLI/migrations use `DATABASE_URL_UNPOOLED` through
 *   `prisma7.config.ts`; this client uses the pooled `DATABASE_URL`.
 */

// The Neon serverless driver uses a WebSocket connection. Node.js 22+ provides
// a global WebSocket; `ws` keeps Node.js 20 (the project's minimum) working.
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as typeof globalThis & {
  nwhPrisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const { databaseUrl } = getServerEnv();
  const adapter = new PrismaNeon({ connectionString: databaseUrl });

  return new PrismaClient({ adapter });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.nwhPrisma) {
    globalForPrisma.nwhPrisma = createPrismaClient();
  }

  return globalForPrisma.nwhPrisma;
}

/**
 * Lightweight liveness probe. Returns a boolean so callers (the public health
 * endpoint) never receive a Prisma error object, connection string, hostname
 * or database name.
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return true;
  } catch {
    // Intentionally silent: Prisma errors can echo host/user/database details.
    // Structured, secret-safe logging is tracked by E01-08.
    return false;
  }
}
