import { SlashCommandBuilder } from "discord.js";
import { getChampions } from "../../utils/lol";

export default {
  data: new SlashCommandBuilder()
    .setName("lol-champions-total")
    .setDescription("Total number of champions"),
  execute: async (interaction) => {
    const champions = await getChampions();
    await interaction.reply(
      `Current total amount of champions: **${champions.length}**`
    );
  },
};
