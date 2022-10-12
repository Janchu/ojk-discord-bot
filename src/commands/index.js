// General
import changelog from "./general/changelog";
import version from "./general/version";

// LoL
import apiVersion from "./lol/api-version";
import champion from "./lol/champion";
import championsTotal from "./lol/champions-total";
import randomChampion from "./lol/random-champion";
import randomTeam from "./lol/random-team";

// LoR
import card from "./lor/card";

const general = [changelog, version];
const lol = [apiVersion, champion, championsTotal, randomChampion, randomTeam];
const lor = [card];

// Default export all commands
export default [...general, ...lol, ...lor];
