// General
import changelog from "./general/changelog";
import version from "./general/version";
import help from "./general/help";

// LoL
import apiVersion from "./lol/api-version";
import champion from "./lol/champion";
import championsTotal from "./lol/champions-total";
import randomChampion from "./lol/random-champion";
import randomTeam from "./lol/random-team";

// LoR
import card from "./lor/card";

// Helpers
import { helpTextFormatter } from "../utils";

const helpWithExecute = {
  ...help,
  execute: ({ msg }) =>
    helpTextFormatter(msg, [
      { name: "General", commands: [changelog, version, help] },
      {
        name: "LoL",
        commands: [
          apiVersion,
          champion,
          championsTotal,
          randomChampion,
          randomTeam,
        ],
      },
      { name: "LoR", commands: [card] },
    ]),
};

// Export all commands as an array
export default [
  // General
  changelog,
  version,
  helpWithExecute,
  // LoL
  apiVersion,
  champion,
  championsTotal,
  randomChampion,
  randomTeam,
  // LoR
  card,
];
