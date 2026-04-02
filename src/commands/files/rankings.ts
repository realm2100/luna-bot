import {
  ApplicationCommandType,
  InteractionContextType,
  PermissionFlagsBits,
} from "discord.js";
import Colors from "@/constants/colors";
import type Command from "@/types/Command";

import { anonymousMessagesSchema } from "@/db/schema";
import db from "@/db/db";
import { sql } from "drizzle-orm";

function getNoisyCount(realCount: number) {
  const noise = Math.floor(Math.random() * 11) - 5;
  return Math.max(0, realCount + noise);
}

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
    const anonymousMessages = db.select({
      authorId: anonymousMessagesSchema.authorId,
      count: sql<number>`count(*)`,
    })
      .from(anonymousMessagesSchema)
      .groupBy(anonymousMessagesSchema.authorId)
      .all();
    const noisedMessages = anonymousMessages.map((entry) => ({
      authorId: entry.authorId,
      count: getNoisyCount(entry.count),
    }));
    const sortedMessages = noisedMessages.toSorted((a, b) => b.count - a.count);
    const top10 = sortedMessages.slice(0, 10);
    const description = top10.map((entry, index) => `${index + 1}. <@${entry.authorId}> - ${entry.count}개`).join("\n") || "랭킹이 없습니다.";
    await interaction.editReply({
      embeds: [{
        color: Colors.accent,
        description,
        footer: {
          text: "익명 메세지 작성자를 알아내는 것을 방지하기 위해 실제 개수에 노이즈를 추가해서 표시합니다.",
        },
        title: "익명 메세지 랭킹",
      }],
    });
  },
};

export default rankingsCommand;
