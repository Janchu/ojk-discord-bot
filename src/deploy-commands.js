import { REST, Routes } from "discord.js";
import commands from "./commands";

const rest = new REST({ version: "10" }).setToken("TOKEN_HERE");

rest
  .put(Routes.applicationGuildCommands("CLIENT_ID_HERE", "GUILD_ID_HERE"), {
    body: commands.map((cmd) => cmd.data),
  })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
