import * as schema from "@/db/schema";
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("db.sqlite");

const db = drizzle(sqlite, {
  schema,
});

export default db;
