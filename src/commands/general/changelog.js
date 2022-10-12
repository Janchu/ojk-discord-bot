import { SlashCommandBuilder } from "discord.js";
import { readFileSync } from "fs";

export default {
  data: new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("OJK Discord Bot changelog"),
  execute: async (interaction) => {
    try {
      const changelog = readFileSync(process.env.CHANGELOG_PATH, "utf8");
      await interaction.reply(`>>> ${changelog}`);
    } catch (e) {
      await interaction.reply(
        "Sorry, I couldn't read the changelog right now."
      );
    }
  },
};
