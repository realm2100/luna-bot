import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";
import type Command from "@/types/Command";
import { createAnonymousMessage } from "@/db/helpers";

const sayCommand: Command = {
  data: {
    contexts: [InteractionContextType.Guild],
    description: "현재 채널에 익명의 메시지를 보냅니다. ///으로 줄바꿈하세요.",
    name: "say",
    options: [
      {
        description: "보낼 내용",
        maxLength: 1000,
        name: "내용",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
    type: ApplicationCommandType.ChatInput,
  },
  options: {
    botPermissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.Connect,
    ],
    userPermissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.Connect,
    ],
  },

  async chatInput(interaction) {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });
    if (!interaction.channel || !interaction.channel.isTextBased()) {
      throw new Error("텍스트 채널에서만 사용할 수 있는 명령어입니다.");
    }
    if (interaction.channel.isDMBased()) {
      throw new Error("DM에서 사용할 수 없는 명령어입니다.");
    }
    const message = await interaction.channel.send({
      content: `${interaction.options.getString("내용", true).replaceAll("///", "\n")}`,
    });
    const anonymousMessageCreated = createAnonymousMessage(message, interaction.user);
    if (!anonymousMessageCreated) {
      await message.delete();
      throw new Error("익명 메세지 생성에 실패했습니다. 다시 시도해주세요.");
    }
    await interaction.deleteReply();
  },
};

export default sayCommand;
