import { SlashCommandBuilder } from "discord.js";
import { getChampions } from "../../utils/lol";

export default {
  data: new SlashCommandBuilder()
    .setName("lol-random-team")
    .setDescription("5 random champions"),
  execute: async (interaction) => {
    const champions = await getChampions();
    const availableChampions = [...champions];
    const teamComp = [...Array(5)].map(() => {
      const randomChampion =
        availableChampions[(champions.length * Math.random()) << 0];
      const index = availableChampions.findIndex(
        (x) => x.id === randomChampion.id
      );
      availableChampions.splice(index, 1);
      return randomChampion;
    });
    await interaction.reply(
      `Your teamcomp: ${teamComp.map((c) => c.name).join(", ")}`
    );
  },
};
