import { SlashCommandBuilder } from "discord.js";
import { getChampions } from "../../utils/lol";

export default {
  data: new SlashCommandBuilder()
    .setName("lol-random-champion")
    .setDescription("Random champion"),
  execute: async (interaction) => {
    const champions = await getChampions();
    const randomChampion = champions[(champions.length * Math.random()) << 0];
    await interaction.reply(`you should play ${randomChampion.name}`);
  },
};
