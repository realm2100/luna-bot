import {
  Client,
  Events,
  GatewayIntentBits,
} from "discord.js";
import db from "@/db/db";
import events from "@/events/events";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { uploadCommands } from "@/commands/commands";

migrate(db, {
  migrationsFolder: "drizzle",
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  events.clientReady(readyClient);
  void uploadCommands(client);
});

client.on(Events.InteractionCreate, (interaction) => {
  events.interactionCreate(interaction);
});

try {
  await client.login(process.env.BOT_TOKEN);
} catch (error) {
  console.error("Client login failed!\n", error);
}
