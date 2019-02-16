import axios from "axios";
import config from "../config";
import championReply from "./championReply";
import help from "../help";

async function lol(msg) {
  function championsTotal(keys) {
    /** **?lol champions total** - Returns total number of champions */
    return keys.length;
  }

  function getChampion(champions, keys, championName) {
    /** **?lol champion <champion name>** - Returns information of said champion */
    // This currently only accepts exactly correct name.
    // TODO: Maybe implement fuzzy search for name and the ability to search with other params in the future?
    return champions[
      keys.find(
        key => champions[key].name.toUpperCase() === championName.toUpperCase()
      )
    ];
  }

  function getRandomChampion(champions, keys) {
    /** **?lol random** - Returns random champion */
    return champions[keys[(keys.length * Math.random()) << 0]]; // eslint-disable-line no-bitwise
  }

  function getRandomTeamComp(champions, keys) {
    /** **?lol random team** - Returns random champion */
    // This works but it's a bit ugly
    // TODO: Refactor and make prettier
    const availableChampions = { ...champions };
    const teamSize = [{}, {}, {}, {}, {}];
    const teamComp = teamSize.map(() => {
      const randomChampion = getRandomChampion(availableChampions, keys);
      // TODO: Is there a better solution than deleting the key?
      delete availableChampions[randomChampion.id];
      return randomChampion;
    });
    return teamComp;
  }

  function getApiVersion(version) {
    /** **?lol api-version** - Returns api-version */
    return version;
  }

  try {
    const cmd = msg.content.replace("?lol ", "");
    const versionRes = await axios.get(`${config.lolApiUrl}/api/versions.json`);
    const version = versionRes.data[0];
    const championsRes = await axios.get(
      `${config.lolApiUrl}/cdn/${version}/data/en_US/champion.json`
    );
    const champions = championsRes.data.data;
    // champions is an object with champion id as key so to make life easier we get a list of the keys
    const keys = Object.keys(champions);

    // if-else structure to get the exact command.
    // TODO: find a cleaner way to do this because there will be more commands in the future
    // TODO: improve error handling
    if (cmd === "help") {
      const functions = [
        championsTotal,
        getChampion,
        getRandomChampion,
        getRandomTeamComp,
        getApiVersion
      ];
      msg.channel.send(help(functions));
    } else if (cmd === "champions total") {
      msg.channel.send(
        `Current total amount of champions: **${championsTotal(keys)}**`
      );
    } else if (cmd === "random" || cmd === "random champion") {
      const randomChampion = getRandomChampion(champions, keys);
      msg.reply(`you should play ${randomChampion.name}`);
    } else if (cmd === "random team" || cmd === "random teamcomp") {
      const teamComp = getRandomTeamComp(champions, keys);
      msg.channel.send(
        `Your teamcomp: ${teamComp.map(champ => champ.name).join(", ")}`
      );
    } else if (cmd.includes("champion")) {
      const trimmedCmd = cmd.replace("champion ", "");
      const champion = getChampion(champions, keys, trimmedCmd);
      msg.channel.send(
        `${config.lolApiUrl}/cdn/${version}/img/champion/${champion.image.full}`
      );
      msg.channel.send(championReply(champion));
    } else if (cmd === "api-version") {
      msg.reply(`I'm currently using api version ${getApiVersion(version)}`);
    }
  } catch (e) {
    msg.reply(`An error occured. ${e}`);
  }
}

export default lol;
