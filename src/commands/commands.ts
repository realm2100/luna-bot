import authorCommand from "@/commands/files/author";
import { type Client } from "discord.js";
import evalCommand from "@/commands/files/eval";
import pingCommand from "@/commands/files/ping";
import rankingsCommand from "@/commands/files/rankings";
import sayCommand from "@/commands/files/say";

const commands = {
  author: authorCommand,
  eval: evalCommand,
  ping: pingCommand,
  rankings: rankingsCommand,
  say: sayCommand,
};

async function uploadCommands(client: Client) {
  await client.application?.commands.set(
    Object.values(commands).map((cmd) => cmd.data),
  );
}

export default commands;
export { uploadCommands };
