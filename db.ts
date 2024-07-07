import  { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema"
import postgres from "postgres";

export const client = postgres(
  "postgresql://apple:apple@localhost:5432/url_shortener_db"
);
export const db = drizzle(client, { schema });

