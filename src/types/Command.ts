import {
  type AnySelectMenuInteraction,
  type ApplicationCommandData,
  type AutocompleteInteraction,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type GuildResolvable,
  type MessageContextMenuCommandInteraction,
  type ModalSubmitInteraction,
  type PermissionResolvable,
  type UserResolvable,
} from "discord.js";

interface Command<T = unknown> {
  data: ApplicationCommandData;
  options?: {
    botPermissions?: PermissionResolvable[];
    cooldown?: number;
    guilds?: GuildResolvable[];
    userPermissions?: PermissionResolvable[];
    whitelist?: UserResolvable[];
  };
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<T>;
  button?: (interaction: ButtonInteraction) => Promise<T>;
  chatInput?: (interaction: ChatInputCommandInteraction) => Promise<T>;
  messageContextMenu?: (interaction: MessageContextMenuCommandInteraction) => Promise<T>;
  modalSubmit?: (interaction: ModalSubmitInteraction) => Promise<T>;
  selectMenu?: (interaction: AnySelectMenuInteraction) => Promise<T>;
};

export default Command;
