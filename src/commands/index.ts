import { Command } from "../types/Command";

// // General
import { Changelog } from "./general/Changelog";
import { Version } from "./general/Version";

// // LoL
// import apiVersion from "./lol/api-version";
// import champion from "./lol/champion";
// import championsTotal from "./lol/champions-total";
// import randomChampion from "./lol/random-champion";
// import randomTeam from "./lol/random-team";

// LoR
import { Card } from "./lor/Card";

const general = [Changelog, Version];
// const lol = [apiVersion, champion, championsTotal, randomChampion, randomTeam];
const lor = [Card];

// Default export all commands
export const allCommands = [...general, ...lor];
export default [...general, ...lor];
