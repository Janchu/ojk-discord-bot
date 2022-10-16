import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
  InteractionType,
  ChatInputCommandInteraction,
} from "discord.js";
import Fuse from "fuse.js";
import getCards from "../../utils/lor";
import { Command } from "../../types";

export const Card: Command = {
  data: new SlashCommandBuilder()
    .setName("lor-card")
    .setDescription("Display card")
    .addStringOption((option) =>
      option.setName("input").setDescription("Card name").setRequired(true)
    ),
  execute: async (interaction, wat) => {
    console.log(wat);
    try {
      const { options } = interaction;
      const cardName = interaction.options.getString("input");
      const cards = await getCards();
      const fuse = new Fuse(cards, { keys: ["name"] });
      const results = fuse.search(cardName);
      if (results?.length) {
        const { item: card = {} } = results[0];
        const { cardCode } = card;
        if (card.name && card.name.toUpperCase() !== cardName.toUpperCase()) {
          interaction.reply(`did you mean "${card.name}"!`);
        }
        interaction.reply(
          `${process.env.LOR_MOBALYTICS_URL}/cards/${cardCode}`
        );
      } else {
        interaction.reply("Card not found.");
      }
    } catch (e) {
      interaction.reply(`An error occured.`);
    }
  },
};
