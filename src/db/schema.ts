import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const userConfigsSchema = sqliteTable("user_configs", {
  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  }).notNull().default(sql`(unixepoch() * 1000)`),
  locale: text("locale", {
    enum: ["ko-KR", "en-US"],
  }).notNull().default("en-US"),
  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  }).notNull().default(sql`(unixepoch() * 1000)`),
  userId: text("user_id").primaryKey(),
});

const guildConfigsSchema = sqliteTable("guild_configs", {
  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  }).notNull().default(sql`(unixepoch() * 1000)`),
  guildId: text("guild_id").primaryKey(),
  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  }).notNull().default(sql`(unixepoch() * 1000)`),
});

export { userConfigsSchema, guildConfigsSchema };
