import {
  type Interaction,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import Colors from "@/constants/colors";
import commands from "@/commands/commands";
import { permissionFlags } from "@/constants/localization";

function commandExists(commandName: string): commandName is keyof typeof commands {
  return Object.hasOwn(commands, commandName);
}

async function withCommand(context: {
  commandName: string;
  interaction: Interaction;
}, run: (command: (typeof commands)[keyof typeof commands]) => Promise<void>) {
  try {
    if (!commandExists(context.commandName)) {
      throw new Error("존재하지 않는 명령어입니다.");
    }
    const command = commands[context.commandName];
    const requiredUserPermissions = command.options?.userPermissions ?? [];
    const missingUserPermissions = context.interaction.memberPermissions
      ? context.interaction.memberPermissions.missing(requiredUserPermissions)
      : new PermissionsBitField(requiredUserPermissions).toArray();
    const requiredBotPermissions = command.options?.botPermissions ?? [];
    const missingBotPermissions = context.interaction.appPermissions.missing(requiredBotPermissions);
    if ((missingUserPermissions.length > 0 || missingBotPermissions.length > 0) && context.interaction.isRepliable()) {
      await context.interaction.reply({
        embeds: [{
          color: Colors.Red,
          description: "명령어를 실행하기 위한 권한이 부족합니다.",
          fields: [
            missingUserPermissions.length > 0
              ? {
                  name: "부족한 사용자 권한",
                  value: `\`\`\`${missingUserPermissions.map((p) => permissionFlags[p]).join("\n")}\`\`\``,
                }
              : undefined,
            missingBotPermissions.length > 0
              ? {
                  name: "부족한 봇 권한",
                  value: `\`\`\`${missingBotPermissions.map((p) => permissionFlags[p]).join("\n")}\`\`\``,
                }
              : undefined,
          ].filter((f) => !!f),
          title: "오류",
        }],
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await run(command);
    }
  } catch (error) {
    const errorFormatted = `\`\`\`ts\n${error instanceof Error ? error : new Error(String(error))}\`\`\``;
    console.error(`Error while executing command ${context.commandName}:`, errorFormatted);
    if (context.interaction.isRepliable()) {
      try {
        if (context.interaction.deferred || context.interaction.replied) {
          await context.interaction.followUp({
            embeds: [{
              color: Colors.Red,
              description: errorFormatted,
              footer: {
                text: "오류가 지속되면 개발자에게 문의해주세요.",
              },
              title: "오류",
            }],
            flags: MessageFlags.Ephemeral,
          });
        } else {
          await context.interaction.reply({
            embeds: [{
              color: Colors.Red,
              description: errorFormatted,
              footer: {
                text: "오류가 지속되면 개발자에게 문의해주세요.",
              },
              title: "오류",
            }],
            flags: MessageFlags.Ephemeral,
          });
        }
      } catch (replyError) {
        console.error("Failed to send command error response:", replyError);
      }
    }
  }
}

async function interactionCreate(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    await withCommand({
      commandName: interaction.commandName,
      interaction,
    }, async (command) => {
      await command.chatInput?.(interaction);
    });
    return;
  }
  if (interaction.isMessageContextMenuCommand()) {
    await withCommand({
      commandName: interaction.commandName,
      interaction,
    }, async (command) => {
      await command.messageContextMenu?.(interaction);
    });
    return;
  }
  if (interaction.isMessageComponent()) {
    console.log(interaction.type);
    return;
  }
  if (interaction.isAutocomplete()) {
    void withCommand({
      commandName: interaction.commandName,
      interaction,
    }, async (command) => {
      await command.autocomplete?.(interaction);
    });
    return;
  }
  if (interaction.isModalSubmit()) {
    console.log(interaction.customId);
  }
}

export default interactionCreate;
