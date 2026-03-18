import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const anonymousMessagesSchema = sqliteTable("anonymous_messages", {
  authorId: text("author_id").notNull(),
  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  }).notNull().default(sql`(unixepoch() * 1000)`),
  messageId: text("message_id").primaryKey(),
});

export { anonymousMessagesSchema };
