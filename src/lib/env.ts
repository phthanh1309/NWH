import "server-only";

/**
 * Server-side environment validation (E01-05).
 *
 * This module must never be imported from a Client Component: it reads
 * server-only database credentials. It is intentionally lazy so `next build`
 * does not need production secrets, while the first database use still fails
 * fast when the configuration is invalid.
 *
 * Error messages name variables and generic reasons only. They never include
 * environment values.
 */

const POSTGRES_PROTOCOLS = new Set(["postgres:", "postgresql:"]);

export type ServerEnv = Readonly<{
  /** Pooled connection string used by the application runtime. Required. */
  databaseUrl: string;
  /** Direct connection string used by the Prisma CLI. Optional at runtime. */
  databaseUrlUnpooled: string | undefined;
  /** Optional dedicated shadow database for `prisma migrate dev`. */
  shadowDatabaseUrl: string | undefined;
}>;

export class EnvValidationError extends Error {
  readonly variables: readonly string[];

  constructor(issues: readonly string[], variables: readonly string[]) {
    super(`Invalid server environment configuration: ${issues.join("; ")}`);
    this.name = "EnvValidationError";
    this.variables = variables;
  }
}

function validatePostgresUrl(name: string, value: string): string | null {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    return `${name} must be a valid URL`;
  }

  if (!POSTGRES_PROTOCOLS.has(parsed.protocol)) {
    return `${name} must use the postgresql:// or postgres:// protocol`;
  }

  if (!parsed.hostname) {
    return `${name} must include a host`;
  }

  if (!parsed.pathname || parsed.pathname === "/") {
    return `${name} must include a database name`;
  }

  return null;
}

function readOptional(
  source: Record<string, string | undefined>,
  name: string,
): string | undefined {
  const value = source[name]?.trim();
  return value ? value : undefined;
}

/**
 * Pure parser usable from tests without touching `process.env`.
 * Throws `EnvValidationError` with variable names only.
 */
export function parseServerEnv(
  source: Record<string, string | undefined> = process.env,
): ServerEnv {
  const issues: string[] = [];
  const invalidVariables = new Set<string>();

  const required = readOptional(source, "DATABASE_URL");
  if (!required) {
    issues.push("DATABASE_URL is missing");
    invalidVariables.add("DATABASE_URL");
  } else {
    const issue = validatePostgresUrl("DATABASE_URL", required);
    if (issue) {
      issues.push(issue);
      invalidVariables.add("DATABASE_URL");
    }
  }

  const optionalVariables = [
    ["DATABASE_URL_UNPOOLED", readOptional(source, "DATABASE_URL_UNPOOLED")],
    ["SHADOW_DATABASE_URL", readOptional(source, "SHADOW_DATABASE_URL")],
  ] as const;

  for (const [name, value] of optionalVariables) {
    if (!value) continue;

    const issue = validatePostgresUrl(name, value);
    if (issue) {
      issues.push(issue);
      invalidVariables.add(name);
    }
  }

  if (issues.length > 0) {
    throw new EnvValidationError(issues, [...invalidVariables]);
  }

  return Object.freeze({
    databaseUrl: required as string,
    databaseUrlUnpooled: optionalVariables[0][1],
    shadowDatabaseUrl: optionalVariables[1][1],
  });
}

let cachedServerEnv: ServerEnv | undefined;

/**
 * Returns the validated server environment. Validation runs once per process
 * on first use and throws `EnvValidationError` when configuration is invalid.
 */
export function getServerEnv(): ServerEnv {
  cachedServerEnv ??= parseServerEnv(process.env);
  return cachedServerEnv;
}
