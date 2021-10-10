import Fuse from "fuse.js";
import getCards from "../../utils/lor";
import logger from "../../utils/logger";

export default {
  name: "card",
  aliases: ["c"],
  usage: "!lor card <card name>",
  description: "Display card",
  execute: async ({ msg, parameters }) => {
    const cardName = parameters.join(" ");
    const cards = await getCards();
    try {
      const fuse = new Fuse(cards, { keys: ["name"] });
      const results = fuse.search(cardName);
      if (results?.length) {
        const { item: card = {} } = results[0];
        const { cardCode } = card;
        if (card.name && card.name.toUpperCase() !== cardName.toUpperCase()) {
          msg.reply(`did you mean "${card.name}"!`);
        }
        msg.channel.send(`${process.env.LOR_MOBALYTICS_URL}/cards/${cardCode}`);
      } else {
        msg.channel.send("Card not found.");
      }
    } catch (e) {
      logger.error(e);
      msg.channel.send(`An error occured.`);
    }
  },
};
