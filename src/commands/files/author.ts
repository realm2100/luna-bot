import {
  ApplicationCommandType,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";
import Colors from "@/constants/colors";
import type Command from "@/types/Command";
import { getAnonymousMessageAuthorId } from "@/db/helpers";

const authorCommand: Command = {
  data: {
    contexts: [InteractionContextType.Guild],
    name: "author",
    type: ApplicationCommandType.Message,
  },
  options: {
    botPermissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.Connect,
    ],
    userPermissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.Connect,
    ],
  },

  async messageContextMenu(interaction) {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });
    if (!interaction.channel || !interaction.channel.isTextBased()) {
      await interaction.editReply({
        content: "텍스트 채널에서만 사용할 수 있는 명령어입니다.",
      });
      return;
    }
    if (interaction.channel.isDMBased()) {
      await interaction.editReply({
        content: "DM에서 사용할 수 없는 명령어입니다.",
      });
      return;
    }
    const targetMessageId = interaction.targetId;
    const messageAuthorId = getAnonymousMessageAuthorId(targetMessageId);
    if (messageAuthorId === undefined) {
      await interaction.editReply({
        content: "익명 메세지 작성자를 찾을 수 없습니다.",
      });
      return;
    }
    await interaction.editReply({
      content: `작성자: <@${messageAuthorId}>`,
    });
    await interaction.channel.send({
      embeds: [{
        color: Colors.accent,
        fields: [
          {
            inline: true,
            name: "조회자",
            value: `<@${interaction.user.id}>`,
          },
          {
            inline: true,
            name: "조회 메세지 ID",
            value: targetMessageId,
          },
        ],
        title: "익명 메세지 작성자 조회",
      },
      ],
      reply: {
        messageReference: targetMessageId,
      },
    });
  },
};

export default authorCommand;
