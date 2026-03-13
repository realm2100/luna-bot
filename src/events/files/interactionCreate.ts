import commands from "@/commands/commands";
import { type Interaction } from "discord.js";
import logger from "@/utils/logger";

function commandExists(commandName: string): commandName is keyof typeof commands {
  return Object.hasOwn(commands, commandName);
}

async function interactionCreate(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    if (!commandExists(interaction.commandName)) {
      return;
    }
    try {
      await commands[interaction.commandName].chatInput?.(interaction);
    } catch (error) {
      await logger(interaction.client, {
        data: error instanceof Error ? error : new Error(String(error)),
        type: "error",
      });
    }
    return;
  }
  if (interaction.isMessageContextMenuCommand()) {
    if (!commandExists(interaction.commandName)) {
      return;
    }
    try {
      await commands[interaction.commandName].messageContextMenu?.(interaction);
    } catch (error) {
      await logger(interaction.client, {
        data: error instanceof Error ? error : new Error(String(error)),
        type: "error",
      });
    }
    return;
  }
  if (interaction.isMessageComponent()) {
    console.log(interaction.type);
    return;
  }
  if (interaction.isAutocomplete()) {
    if (!commandExists(interaction.commandName)) {
      return;
    }
    void commands[interaction.commandName].autocomplete?.(interaction);
    return;
  }
  if (interaction.isModalSubmit()) {
    console.log(interaction.customId);
  }
}

export default interactionCreate;
