import { SlashCommandBuilder } from "discord.js";
import { getApiVersion } from "../../utils/lol";

export default {
  data: new SlashCommandBuilder()
    .setName("lol-api-version")
    .setDescription("Current LoL api version"),
  execute: async (interaction) => {
    const apiVersion = await getApiVersion();
    await interaction.reply(`I'm currently using api version ${apiVersion}`);
  },
};
