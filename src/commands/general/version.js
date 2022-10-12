import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Current version of OJK Discord Bot"),
  execute: async (interaction) => {
    await interaction.reply(
      `I'm the OJK Bot version **${process.env.npm_package_version}**`
    );
  },
};
