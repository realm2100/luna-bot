import {
  type AnySelectMenuInteraction,
  type ApplicationCommandData,
  type AutocompleteInteraction,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type ContextMenuCommandInteraction,
  type ModalSubmitInteraction,
  type PermissionResolvable,
} from "discord.js";

interface Command<T = unknown> {
  data: ApplicationCommandData;
  options?: {
    cooldown?: number;
    guilds?: string[];
    permissions?: PermissionResolvable[];
    whitelist?: string[];
  };
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<T>;
  button?: (interaction: ButtonInteraction) => Promise<T>;
  chatInput?: (interaction: ChatInputCommandInteraction) => Promise<T>;
  contextMenu?: (interaction: ContextMenuCommandInteraction) => Promise<T>;
  modalSubmit?: (interaction: ModalSubmitInteraction) => Promise<T>;
  selectMenu?: (interaction: AnySelectMenuInteraction) => Promise<T>;
};

export default Command;
