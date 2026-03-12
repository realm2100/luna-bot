import commands from "@/commands/commands";
import { type Interaction } from "discord.js";

function commandExists(commandName: string): commandName is keyof typeof commands {
  return Object.hasOwn(commands, commandName);
}

function interactionCreate(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    if (!commandExists(interaction.commandName)) {
      return;
    }
    void commands[interaction.commandName].chatInput?.(interaction);
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
