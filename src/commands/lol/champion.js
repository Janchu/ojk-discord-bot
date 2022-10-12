import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Fuse from "fuse.js";
import * as Vibrant from "node-vibrant";
import { getApiVersion, getChampions } from "../../utils/lol";

const championReply = async (version, champion) => {
  const imagePalette = await Vibrant.from(
    `${process.env.LOL_DDRAGON_URL}/cdn/${version}/img/champion/${champion.image.full}`
  )
    .getPalette()
    .then((palette) => palette);
  const lolWikiId = champion.name.replace(" ", "_");
  const leagueofgraphsId = champion.id.toLowerCase();
  const probuildsId = champion.key;
  const championggId = champion.name.replace(" ", "");
  const embeddedMessage = new EmbedBuilder()
    .setColor(imagePalette.Vibrant.getHex())
    .setTitle(champion.name)
    .setDescription(champion.title)
    .setThumbnail(
      `${process.env.LOL_DDRAGON_URL}/cdn/${version}/img/champion/${champion.image.full}`
    )
    .addFields(
      {
        name: "Wiki",
        value: `https://leagueoflegends.fandom.com/wiki/${lolWikiId}`,
      },
      {
        name: "League of Graphs",
        value: `https://www.leagueofgraphs.com/champions/builds/${leagueofgraphsId}`,
      },
      {
        name: "ProBuilds",
        value: `https://probuilds.net/champions/details/${probuildsId}`,
      },
      {
        name: "Champion.gg",
        value: `https://champion.gg/champion/${championggId}`,
      }
    )
    .setTimestamp();
  return embeddedMessage;
};

export default {
  data: new SlashCommandBuilder()
    .setName("lol-champion")
    .setDescription("Information of a specific champion")
    .addStringOption((option) =>
      option.setName("input").setDescription("Champion name").setRequired(true)
    ),
  execute: async (interaction) => {
    try {
      const championName = interaction.options.getString("input");
      const champions = await getChampions();
      const version = await getApiVersion();
      const fuse = new Fuse(champions, { keys: ["name"] });
      const searchResults = fuse.search(championName);
      console.log(searchResults);
      if (searchResults.length) {
        // First index of result array is the most accurate result, so let's return that.
        const { item: champion } = searchResults[0];
        console.log(champion);
        if (champion.name.toUpperCase() !== championName.toUpperCase()) {
          interaction.reply(`did you mean "${champion.name}"!`);
        }
        const championEmbed = await championReply(version, champion);
        await interaction.reply({ embeds: [championEmbed] });
      } else {
        await interaction.reply(`Champion ${championName} not found.`);
      }
    } catch (e) {
      await interaction.reply("An error occured");
    }
  },
};
