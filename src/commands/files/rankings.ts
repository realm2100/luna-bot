import {
  ApplicationCommandType,
  InteractionContextType,
  PermissionFlagsBits,
} from "discord.js";
import Colors from "@/constants/colors";
import type Command from "@/types/Command";

import { anonymousMessagesSchema } from "@/db/schema";
import { count } from "drizzle-orm";
import db from "@/db/db";

const rankingsCommand: Command = {
  data: {
    contexts: [InteractionContextType.Guild],
    description: "보낸 익명 메세지의 개수를 랭킹으로 보여줍니다.",
    name: "rankings",
    type: ApplicationCommandType.ChatInput,
  },
  options: {
    botPermissions: [
      PermissionFlagsBits.ViewChannel,
    ],
    userPermissions: [
      PermissionFlagsBits.ViewChannel,
    ],
  },

  async chatInput(interaction) {
    await interaction.deferReply();
    if (!interaction.channel || !interaction.channel.isTextBased()) {
      throw new Error("텍스트 채널에서만 사용할 수 있는 명령어입니다.");
    }
    if (interaction.channel.isDMBased()) {
      throw new Error("DM에서 사용할 수 없는 명령어입니다.");
    }
    const anonymousMessagesRows = db.select({
      count: count(),
    })
      .from(anonymousMessagesSchema)
      .all();
    const anonymousMessages = db.select({
      authorId: anonymousMessagesSchema.authorId,
      count: count(),
    })
      .from(anonymousMessagesSchema)
      .groupBy(anonymousMessagesSchema.authorId)
      .all();
    const description = anonymousMessages.toSorted((a, b) => b.count - a.count).slice(0, 10).map((entry, index) => `${index + 1}. <@${entry.authorId}>`).join("\n") || "랭킹이 없습니다.";
    await interaction.editReply({
      embeds: [{
        color: Colors.accent,
        description,
        title: `익명 메세지 랭킹 [${anonymousMessagesRows[0]?.count ?? "?"}개]`,
      }],
    });
  },
};

export default rankingsCommand;
