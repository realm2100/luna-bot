import { type Client } from "discord.js";
import pingCommand from "@/commands/files/ping";

const commands = {
  ping: pingCommand,
};

async function uploadCommands(client: Client) {
  await client.application?.commands.set(
    Object.values(commands).map((cmd) => cmd.data),
  );
}

export default commands;
export { uploadCommands };
