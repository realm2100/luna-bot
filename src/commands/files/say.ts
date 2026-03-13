import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionContextType,
  MessageFlags,
} from "discord.js";
import type Command from "@/types/Command";

const sayCommand: Command = {
  data: {
    contexts: [InteractionContextType.Guild],
    description: "Sends an anonymous message to the current channel.",
    descriptionLocalizations: {
      ko: "현재 채널에 익명의 메시지를 보냅니다.",
    },
    name: "say",
    options: [
      {
        description: "The message to send.",
        descriptionLocalizations: {
          ko: "보낼 메시지",
        },
        maxLength: 1000,
        name: "message",
        nameLocalizations: {
          ko: "메시지",
        },
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
    type: ApplicationCommandType.ChatInput,
  },

  async chatInput(interaction) {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral,
    });
    if (!interaction.channel || !interaction.channel.isTextBased()) {
      await interaction.editReply({
        content: "This command can only be used in a text channel.",
      });
      return;
    }
    if (interaction.channel.isDMBased()) {
      await interaction.editReply({
        content: "This command cannot be used in DMs.",
      });
      return;
    }
    await interaction.channel.send({
      content: `익명: ${interaction.options.getString("message", true)}`,
    });
    await interaction.deleteReply();
  },
};

export default sayCommand;
