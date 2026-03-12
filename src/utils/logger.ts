import { type Client } from "discord.js";
import Colors from "@/constants/colors";
import { MAX_EMBED_DESCRIPTION_LENGTH } from "@/constants/embed";

async function logger(client: Client, options: {
  data: Error;
  type: "log" | "warn" | "error";
}): Promise<void> {
  console[options.type](options.data);
  const logChannel = await client.channels.fetch("1481565831472353310");
  if (!logChannel || !logChannel.isSendable()) {
    console.warn("Log channel unavailable, only logging to console.");
    return;
  }
  try {
    await logChannel.send({
      embeds: [
        {
          color: {
            error: Colors.Red,
            log: Colors.Grey,
            warn: Colors.Yellow,
          }[options.type],
          description: `\`\`\`ts\n${`${options.data.message}\n${options.data.stack}`.slice(0, MAX_EMBED_DESCRIPTION_LENGTH)}\`\`\``,
          timestamp: new Date().toISOString(),
          title: `${options.type.toUpperCase()}`,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send log message to Discord:", error);
  }
}

export default logger;
