import {
  ApplicationCommandOptionType,
  MessageFlags,
} from "discord.js";

import Colors from "@/constants/colors";
import type Command from "@/types/Command";

import { inspect } from "bun";

const MAX_PREVIEW_LENGTH = 1000;

function toDisplayText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return inspect(value, {
    depth: 2,
  });
}

function formatCodeBlock(value: string): string {
  return `\`\`\`ts\n${value.replaceAll("```", "`\\``").slice(0, MAX_PREVIEW_LENGTH)}\`\`\``;
}

const evalCommand: Command = {
  data: {
    description: "Evaluates TypeScript code",
    name: "eval",
    options: [
      {
        description: "The code to evaluate",
        name: "code",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },

  chatInput: async (interaction) => {
    const code = interaction.options.getString("code")!;

    await interaction.deferReply({
      flags: [MessageFlags.Ephemeral],
    });

    try {
      const result: unknown = await Promise.resolve(eval(code));

      await interaction.editReply({
        embeds: [{
          color: Colors.accent,
          fields: [{
            inline: false,
            name: "Input",
            value: formatCodeBlock(code),
          },
          {
            inline: false,
            name: "Output",
            value: formatCodeBlock(toDisplayText(result)),
          }],
          title: "Evaluation Result",
        }],
      });
    } catch (error) {
      const errorText = toDisplayText(error);

      await interaction.editReply({
        embeds: [{
          color: Colors.Red,
          fields: [{
            inline: false,
            name: "Input",
            value: formatCodeBlock(code),
          },
          {
            inline: false,
            name: "Error",
            value: formatCodeBlock(errorText),
          }],
          title: "Evaluation Failed",
        }],
      });
    }
  },
};

export default evalCommand;
