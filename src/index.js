import { Client, Collection, GatewayIntentBits } from "discord.js";
import commands from "./commands";

require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const command of commands) {
  if (command.data) {
    client.commands.set(command.data.name, command);
  }
}

client.login(process.env.LOGIN_TOKEN);

client.on("ready", () => {
  console.log(`Logged in with ${client.user.tag} as ${client.user.username}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

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
