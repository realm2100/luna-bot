import {
  check,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const botConfigSchema = sqliteTable("bot_config", {
  id: integer("id").primaryKey().default(1),
  logChannelId: text("log_channel_id").notNull(),
}, (table) => [
  check("bot_config", sql`${table.id} = 1`),
]);

const anonymousMessagesSchema = sqliteTable("anonymous_messages", {
  authorId: text("author_id").notNull(),
  createdAt: integer("created_at").notNull().default(sql`(unixepoch() * 1000)`),
  messageId: text("message_id").primaryKey(),
});

export { anonymousMessagesSchema, botConfigSchema };
