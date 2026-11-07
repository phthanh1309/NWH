// Prisma CLI configuration (Prisma ORM 7).
// Migrations and introspection must use Neon's direct (unpooled) connection.
// Application runtime uses the pooled DATABASE_URL through the Neon adapter
// in the application's database client (E01-05), not through this file.
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// The project stores local secrets in .env.local. dotenv only loads .env by
// default, so load .env.local first and then fall back to .env. Variables
// already present in the process environment (CI, hosting) are not replaced.
loadEnv({ path: ".env.local" });
loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Direct connection: hostname without the Neon "-pooler" suffix.
    // process.env keeps `prisma generate`/`validate` usable without a database.
    url: process.env.DATABASE_URL_UNPOOLED ?? "",
    // Optional dedicated shadow database for `prisma migrate dev`.
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
