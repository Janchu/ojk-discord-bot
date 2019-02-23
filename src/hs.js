import axios from "axios";
import config from "./config";

export default async function hs(msg) {
  try {
    const searchQuery = msg.content.replace("?hs ", "");

    const response = await axios.get(`${config.hsApiUrl}${searchQuery}`, {
      headers: { "X-Mashape-Key": config.mashapeKey }
    });

    response.data.forEach(card => {
      if (
        card.type !== "Enchantment" &&
        !(card.type === "Hero" && !card.cost)
      ) {
        msg.channel.send(card.img);
        let reply;
        if (card.type === "Minion") {
          reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${
            card.health
          } ${card.race ? card.race : ""} ${card.text ? `- ${card.text}` : ""}`;
        } else if (card.type === "Spell") {
          reply = `**${card.name}** - ${card.cost} mana spell - ${card.text}`;
        } else if (card.type === "Hero") {
          reply = `**${card.name}** - ${card.cost} mana - ${
            card.armor
          } armor - ${card.text}`;
        } else if (card.type === "Weapon") {
          reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${
            card.durability
          } ${card.type} ${card.text ? `- ${card.text}` : ""}`;
        } else if (card.type === "Hero Power") {
          reply = `**${card.name}** - ${card.cost} mana - ${card.text}`;
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
  } catch (e) {
    msg.channel.send(`An error occured. ${e}`);
  }
}
