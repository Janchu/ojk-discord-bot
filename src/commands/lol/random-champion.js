import { getChampions } from '../../utils/lol';

export default {
  name: 'random-champion',
  aliases: ['random'],
  usage: '**!lol random**',
  description: 'Returns random champion',
  execute: async ({ msg }) => {
    const champions = await getChampions();
    const randomChampion = champions[(champions.length * Math.random()) << 0]; // eslint-disable-line no-bitwise
    msg.reply(`you should play ${randomChampion.name}`);
  },
};
