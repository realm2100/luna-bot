import { type Client } from "discord.js";

function clientReady(readyClient: Client<true>) {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
}

export default clientReady;
