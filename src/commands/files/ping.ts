import {
  ApplicationCommandType,
  InteractionContextType,
} from "discord.js";
import Colors from "@/constants/colors";
import type Command from "@/types/Command";

const pingCommand: Command = {
  data: {
    contexts: [InteractionContextType.Guild],
    description: "Replies with the bot's latency.",
    descriptionLocalizations: {
      ko: "봇의 지연 시간을 응답합니다.",
    },
    name: "ping",
    type: ApplicationCommandType.ChatInput,
  },

  async chatInput(interaction) {
    await interaction.reply({
      embeds: [{
        color: Colors.accent,
        description: `Latency: ${Date.now() - interaction.createdTimestamp}ms\nAPI Latency: ${interaction.client.ws.ping}ms`,
        title: "Pong!",
      }],
    });
  },
};

export default pingCommand;
