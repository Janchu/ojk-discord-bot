import { REST, Routes, SlashCommandBuilder } from "discord.js";
import commands, { allCommands } from "./commands";

const rest = new REST({ version: "10" }).setToken("TOKEN_HERE");

rest
  .put(Routes.applicationGuildCommands("CLIENT_ID_HERE", "GUILD_ID_HERE"), {
    body: allCommands.map((cmd) => cmd.data),
  })
  .then((data: Partial<SlashCommandBuilder>[]) => {
    console.log(data);
    console.log(`Successfully registered ${data.length} application commands.`);
  })

  .catch(console.error);
