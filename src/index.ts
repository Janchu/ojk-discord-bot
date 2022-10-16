import { Client, Collection, GatewayIntentBits } from "discord.js";
import allCommands from "./commands";
import { Command, DiscordClient } from "./types";

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = new Collection<string, Command>();

for (const command of allCommands) {
  if (command.data) {
    commands.set(command.data.name, command);
  }
}

client.login(process.env.LOGIN_TOKEN);

client.on("ready", () => {
  console.log(`Logged in with ${client.user.tag} as ${client.user.username}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
