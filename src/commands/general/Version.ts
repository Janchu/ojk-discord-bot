import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

export const Version: Command = {
  data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Current version of OJK Discord Bot"),
  execute: async (interaction) => {
    await interaction.reply(
      `I'm the OJK Bot version **${process.env.npm_package_version}**`
    );
  },
};
