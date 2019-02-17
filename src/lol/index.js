import axios from "axios";
import Fuse from "fuse.js";
import config from "../config";
import championReply from "./championReply";
import help from "../help";

function championsTotal(champions) {
  /** **?lol champions total** - Returns total number of champions */
  return champions.length;
}

function getChampion(champions, championName) {
  /** **?lol champion <champion name>** - Searches for a champion and returns info about the said champion */
  const fuse = new Fuse(champions, { keys: ["name"] });
  const searchResults = fuse.search(championName);
  // First index of result array is the most accurate result, so let's return that.
  return searchResults[0];
}

function getRandomChampion(champions) {
  /** **?lol random** - Returns random champion */
  return champions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
}

function getRandomTeamComp(champions) {
  /** **?lol random team** - Returns random champion */
  const availableChampions = [...champions];
  const teamComp = [...Array(5)].map(() => {
    const randomChampion = getRandomChampion(availableChampions);
    const index = availableChampions.findIndex(x => x.id === randomChampion.id);
    availableChampions.splice(index, 1);
    return randomChampion;
  });
  return teamComp;
}

function getApiVersion(version) {
  /** **?lol api-version** - Returns the api version */
  return version;
}

export default async function lol(msg) {
  try {
    // Parse the command after "?lol"-prefix
    const cmd = msg.content.replace("?lol ", "");

    // Get the newest api version. First index of the returned array is the newest version.
    const versionRes = await axios.get(`${config.lolApiUrl}/api/versions.json`);
    const version = versionRes.data[0];

    // Get champions from the api. The api returns champions as an object.
    // To make life easier, we create an array of the object values (champions)
    const championsRes = await axios.get(
      `${config.lolApiUrl}/cdn/${version}/data/en_US/champion.json`
    );
    const championsObject = championsRes.data.data;
    const champions = Object.values(championsObject);

    // if-else structure to get the exact command.

    // Help command
    if (cmd === "help") {
      const functions = [
        championsTotal,
        getChampion,
        getRandomChampion,
        getRandomTeamComp,
        getApiVersion
      ];
      msg.channel.send(help(functions));

      // Champions total command
    } else if (cmd === "champions total") {
      msg.channel.send(
        `Current total amount of champions: **${championsTotal(champions)}**`
      );

      // Random champion command
    } else if (cmd === "random" || cmd === "random champion") {
      const randomChampion = getRandomChampion(champions);
      msg.reply(`you should play ${randomChampion.name}`);

      // Random teamcomp command
    } else if (cmd === "random team" || cmd === "random teamcomp") {
      const teamComp = getRandomTeamComp(champions);
      msg.channel.send(
        `Your teamcomp: ${teamComp.map(champ => champ.name).join(", ")}`
      );

      // Champion search command
    } else if (cmd.includes("champion")) {
      const trimmedChampionName = cmd.replace("champion ", "");
      try {
        const champion = getChampion(champions, trimmedChampionName);
        if (champion.name.toUpperCase() !== trimmedChampionName.toUpperCase()) {
          msg.reply(`did you mean "${champion.name}"?`);
        }
        msg.channel.send(
          `${config.lolApiUrl}/cdn/${version}/img/champion/${
            champion.image.full
          }`
        );
        msg.channel.send(championReply(champion));
      } catch (e) {
        msg.channel.send(`Champion ${trimmedChampionName} doesn't exist.`);
      }

      // Api-version command
    } else if (cmd === "api-version") {
      msg.channel.send(
        `I'm currently using api version ${getApiVersion(version)}`
      );
    }
  } catch (e) {
    msg.channel.send(`An error occured. ${e}`);
  }
}
