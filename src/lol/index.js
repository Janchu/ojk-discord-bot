import axios from "axios";
import Fuse from "fuse.js";
import config from "../config";
import championReply from "./championReply";
import help from "../general/help";

export const lolHelpTexts = {
  header: "__**LoL commands**__",
  displayChampionsTotal: "**?lol champions total** - Returns total number of champions",
  displayChampion: "**?lol champion <champion name>** - Searches for a champion and returns info about it",
  displayRandomChampion: "**?lol random** - Returns random champion",
  displayRandomTeamComp: "**?lol random team** - Returns a team of random champions",
  displayApiVersion: "**?lol api-version** - Returns the api version"
}; // prettier-ignore

async function getApiVersion() {
  // Get the newest api version. First index of the returned array is the newest version.
  const versionRes = await axios.get(`${config.lolApiUrl}/api/versions.json`);
  return versionRes.data[0];
}

async function getChampions() {
  // Get champions from the api. The api returns champions as an object.
  // To make life easier, we create an array of the object values (champions) and return it.
  const version = await getApiVersion();
  const championsRes = await axios.get(
    `${config.lolApiUrl}/cdn/${version}/data/en_US/champion.json`
  );
  const championsObject = championsRes.data.data;
  return Object.values(championsObject);
}

async function displayChampionsTotal(msg) {
  try {
    const champions = await getChampions();
    msg.channel.send(
      `Current total amount of champions: **${champions.length}**`
    );
  } catch (e) {
    msg.channel.send(`Can't display champion total right now. ${e}`);
  }
}

async function displayChampion(msg, cmd) {
  const championName = cmd.replace("champion ", "");
  try {
    const champions = await getChampions();
    const version = await getApiVersion();
    const fuse = new Fuse(champions, { keys: ["name"] });
    const searchResults = fuse.search(championName);
    // First index of result array is the most accurate result, so let's return that.
    const champion = searchResults[0];
    if (champion.name.toUpperCase() !== championName.toUpperCase()) {
      msg.reply(`did you mean "${champion.name}"?`);
    }
    msg.channel.send(
      `${config.lolApiUrl}/cdn/${version}/img/champion/${champion.image.full}`
    );
    msg.channel.send(championReply(champion));
  } catch (e) {
    msg.channel.send(`Champion ${championName} doesn't exist.`);
  }
}

async function displayRandomChampion(msg) {
  const champions = await getChampions();
  const randomChampion = champions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
  msg.reply(`you should play ${randomChampion.name}`);
}

async function displayRandomTeamComp(msg) {
  const champions = await getChampions();
  const availableChampions = [...champions];
  const teamComp = [...Array(5)].map(() => {
    const randomChampion =
      availableChampions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
    const index = availableChampions.findIndex(x => x.id === randomChampion.id);
    availableChampions.splice(index, 1);
    return randomChampion;
  });
  msg.channel.send(`Your teamcomp: ${teamComp.map(c => c.name).join(", ")}`);
}

async function displayApiVersion(msg) {
  const version = await getApiVersion();
  msg.channel.send(`I'm currently using api version ${version}`);
}

export default function lol(msg) {
  try {
    // Parse the command after "?lol"-prefix
    const cmd = msg.content.replace("?lol ", "");

    if (cmd === "help") {
      help(msg, lolHelpTexts);
    } else if (cmd === "champions total") {
      displayChampionsTotal(msg);
    } else if (cmd === "random" || cmd === "random champion") {
      displayRandomChampion(msg);
    } else if (cmd === "random team" || cmd === "random teamcomp") {
      displayRandomTeamComp(msg);
    } else if (cmd.startsWith("champion")) {
      displayChampion(msg, cmd);
    } else if (cmd === "api-version") {
      displayApiVersion(msg);
    }
  } catch (e) {
    msg.channel.send(`An error occured. ${e}`);
  }
}
