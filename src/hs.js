import axios from "axios";
import config from "./config";
import help from "./general/help";

export const hsHelpTexts = {
  header: "__**HS commands**__",
  displayCard: "**?hs card <card name>** - Searches for a card and returns info about the it",
}; // prettier-ignore

async function getCard(searchQuery) {
  const response = await axios.get(`${config.hsApiUrl}${searchQuery}`, {
    headers: { "X-Mashape-Key": config.mashapeKey }
  });
  return response.data;
}

async function displayCard(msg, cmd) {
  const cardName = cmd.replace("card ", "");
  const cards = await getCard(cardName);
  cards.forEach(card => {
    if (card.type !== "Enchantment" && !(card.type === "Hero" && !card.cost)) {
      msg.channel.send(card.img);
      let reply;
      if (card.type === "Minion") {
        reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${card.health} ${card.race ? card.race : ""} ${card.text ? `- ${card.text}` : ""}`; // prettier-ignore
      } else if (card.type === "Spell") {
        reply = `**${card.name}** - ${card.cost} mana spell - ${card.text}`; // prettier-ignore
      } else if (card.type === "Hero") {
        reply = `**${card.name}** - ${card.cost} mana - ${card.armor} armor - ${card.text}`; // prettier-ignore
      } else if (card.type === "Weapon") {
        reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${card.durability} ${card.type} ${card.text ? `- ${card.text}` : ""}`; // prettier-ignore
      } else if (card.type === "Hero Power") {
        reply = `**${card.name}** - ${card.cost} mana - ${card.text}`; // prettier-ignore
      }
      msg.channel.send(
        reply
          .replace(/<b>/gi, "**")
          .replace(/<\/b>/gi, "**")
          .replace(/<i>/gi, "*")
          .replace(/<\/i>/gi, "*")
          .replace(/_/gi, " ")
          .replace(/\\n/gi, " ")
          .replace(/\$/gi, "")
          .replace(/\[x]/gi, "")
      );
    }
  });
}

export default function hs(msg) {
  try {
    const cmd = msg.content.replace("?hs ", "");
    if (cmd.startsWith("help")) {
      help(msg, hsHelpTexts);
    } else if (cmd.startsWith("card")) {
      displayCard(msg, cmd);
    }
  } catch (e) {
    msg.channel.send(`An error occured. ${e}`);
  }
}
