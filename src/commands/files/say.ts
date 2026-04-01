import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";
import type Command from "@/types/Command";
import { createAnonymousMessage } from "@/db/helpers";

const aprilFoolsUserList = process.env.APRIL_FOOLS_USER_LIST?.split(",").map((id) => id.trim()) ?? [];

function randomInArray<T>(arr: T[]): T {
  const value = arr[Math.floor(Math.random() * arr.length)];
  if (value === undefined) {
    throw new Error("randomInArray failed to select an element");
  }

  return value;
}

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
    let message;
    if (interaction.guildId === process.env.APRIL_FOOLS_GUILD_ID) {
      message = await interaction.channel.send({
        content: `${aprilFoolsUserList.length > 0 ? `@${randomInArray(aprilFoolsUserList)}: ` : ""}${interaction.options.getString("내용", true).replaceAll("///", "\n")}`,
      });
    } else {
      message = await interaction.channel.send({
        content: `${interaction.options.getString("내용", true).replaceAll("///", "\n")}`,
      });
    }
    const anonymousMessageCreated = createAnonymousMessage(message, interaction.user);
    if (!anonymousMessageCreated) {
      await message.delete();
      throw new Error("익명 메세지 생성에 실패했습니다. 다시 시도해주세요.");
    }
    await interaction.deleteReply();
  },
};

export default sayCommand;
