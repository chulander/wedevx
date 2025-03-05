import "dotenv-safe/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DB_CONNECTION_URL, DB_AUTH_TOKEN } from "@/utils/constants";
import * as schema from "./schema";

const client = createClient({
  url: DB_CONNECTION_URL,
  authToken: DB_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
