import axios from 'axios';
import Fuse from 'fuse.js';
import config from '../config';
import help from '../general/help';

const module = {
  name: 'lol',
  helpTextHeader: 'LoL commands',
};

const championReply = champion => `
**${champion.name}**, *${champion.title}*
roles: ${champion.tags.join(', ')}

attack: ${[...Array(champion.info.attack)].map(() => '‖').join('')}
defense: ${[...Array(champion.info.defense)].map(() => '‖').join('')}
magic: ${[...Array(champion.info.magic)].map(() => '‖').join('')}
difficulty: ${[...Array(champion.info.difficulty)].map(() => '‖').join('')}
`;

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
    `${config.lolApiUrl}/cdn/${version}/data/en_US/champion.json`,
  );
  const championsObject = championsRes.data.data;
  return Object.values(championsObject);
}

export const commands = {
  'api-version': {
    usage: '**!lol api-version**',
    description: 'Returns the api version',
    run: async ({ msg }) => {
      const apiVersion = await getApiVersion();
      msg.channel.send(`I'm currently using api version ${apiVersion}`);
    },
  },
  'champions-total': {
    usage: '**!lol champions-total**',
    description: 'Returns total number of champions',
    run: async ({ msg }) => {
      const champions = await getChampions();
      msg.channel.send(
        `Current total amount of champions: **${champions.length}**`,
      );
    },
  },
  champion: {
    usage: '**!lol champion <champion name>**',
    description: 'Searches for a champion and displays info about it',
    run: async ({ msg, parameters }) => {
      // const championName = cmd.replace('champion ', '');
      const championName = parameters.join(' ');
      try {
        const champions = await getChampions();
        const version = await getApiVersion();
        const fuse = new Fuse(champions, { keys: ['name'] });
        const searchResults = fuse.search(championName);
        // First index of result array is the most accurate result, so let's return that.
        const champion = searchResults[0];
        if (champion.name.toUpperCase() !== championName.toUpperCase()) {
          msg.reply(`did you mean "${champion.name}"!`);
        }
        msg.channel.send(
          `${config.lolApiUrl}/cdn/${version}/img/champion/${champion.image.full}`,
        );
        msg.channel.send(championReply(champion));
      } catch (e) {
        msg.channel.send(`Champion ${championName} doesn't exist.`);
      }
    },
  },
  random: {
    usage: '**!lol random**',
    description: 'Returns random champion',
    run: async ({ msg }) => {
      const champions = await getChampions();
      const randomChampion = champions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
      msg.reply(`you should play ${randomChampion.name}`);
    },
  },
  'random-team': {
    usage: '**!lol random-team**',
    description: 'Returns a team of random champions',
    run: async ({ msg }) => {
      const champions = await getChampions();
      const availableChampions = [...champions];
      const teamComp = [...Array(5)].map(() => {
        const randomChampion =
          availableChampions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
        const index = availableChampions.findIndex(
          x => x.id === randomChampion.id,
        );
        availableChampions.splice(index, 1);
        return randomChampion;
      });
      msg.channel.send(
        `Your teamcomp: ${teamComp.map(c => c.name).join(', ')}`,
      );
    },
  },
  help: {
    usage: '**!lol help**',
    description: 'Help',
    run: ({ msg }) => help(msg, [{ ...module, commands }]),
  },
};

export default { ...module, commands };
