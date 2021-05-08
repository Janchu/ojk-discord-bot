// General
import changelog from './general/changelog';
import version from './general/version';
import help from './general/help';

// LoL
import apiVersion from './lol/api-version';
import champion from './lol/champion';
import championsTotal from './lol/champions-total';
import randomChampion from './lol/random-champion';
import randomTeam from './lol/random-team';

// LoR
import card from './lor/card';

// Helpers
import { helpTextFormatter } from '../utils';

const helpWithExecute = {
  ...help,
  execute: ({ msg }) =>
    helpTextFormatter(msg, [
      { name: 'General', commands: [changelog, version, help] },
      {
        name: 'LoL',
        commands: [
          apiVersion,
          champion,
          championsTotal,
          randomChampion,
          randomTeam,
        ],
      },
      { name: 'LoR', commands: [card] },
    ]),
};

const general = [changelog, version, helpWithExecute];
const lol = [apiVersion, champion, championsTotal, randomChampion, randomTeam];
const lor = [card];

export const availableCommandNamesAndAliases = {
  general: {
    commands: [
      ...general.map(({ name, aliases }) => ({ name, aliases })),
    ].flat(),
    defaultCommand: 'help',
  },
  lol: {
    commands: [...lol.map(({ name, aliases }) => ({ name, aliases }))].flat(),
    defaultCommand: 'champion',
  },
  lor: {
    commands: [...lor.map(({ name, aliases }) => ({ name, aliases }))].flat(),
    defaultCommand: 'card',
  },
};

// Default export all commands
export default [...general, ...lol, ...lor];
