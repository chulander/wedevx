import "dotenv-safe/config";
import type { Config } from "drizzle-kit";
import { DB_CONNECTION_URL, DB_AUTH_TOKEN } from "@/utils/constant";

console.log("what is db connection url", DB_CONNECTION_URL);
export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: DB_CONNECTION_URL,
    authToken: DB_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;
