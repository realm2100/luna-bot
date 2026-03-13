import { type Client } from "discord.js";
import { uploadCommands } from "@/commands/commands";

async function clientReady(readyClient: Client<true>) {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  try {
    await uploadCommands(readyClient);
    console.log("Commands uploaded successfully!");
  } catch (error) {
    console.error("Failed to upload commands!\n", error);
  }
}

export default clientReady;
