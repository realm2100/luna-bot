import {
  anonymousMessagesSchema,
  botConfigSchema,
} from "@/db/schema";
import {
  type Message,
  type User,
} from "discord.js";
import db from "@/db/db";
import { eq } from "drizzle-orm";

function getLogChannelId() {
  return db
    .select()
    .from(botConfigSchema)
    .where(eq(botConfigSchema.id, 1))
    .get()?.logChannelId;
}

function setLogChannelId(logChannelId: string) {
  try {
    db.insert(botConfigSchema).values({
      id: 1,
      logChannelId,
    }).onConflictDoUpdate({
      set: {
        logChannelId,
      },
      target: botConfigSchema.id,
    }).run();
    return true;
  } catch {
    return false;
  }
}

function createAnonymousMessage(message: Message, author: User) {
  try {
    db.insert(anonymousMessagesSchema).values({
      authorId: author.id,
      createdAt: message.createdTimestamp,
      messageId: message.id,
    }).run();
    return true;
  } catch {
    return false;
  }
}

function getAnonymousMessageAuthorId(messageId: string) {
  return db
    .select()
    .from(anonymousMessagesSchema)
    .where(eq(anonymousMessagesSchema.messageId, messageId))
    .get()?.authorId;
}

export { createAnonymousMessage, getLogChannelId, setLogChannelId, getAnonymousMessageAuthorId };
