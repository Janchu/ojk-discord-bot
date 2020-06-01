import { getChampions } from '../../utils/lol';

export default {
  name: 'champions-total',
  aliases: ['total'],
  usage: '**!lol champions-total**',
  description: 'Returns total number of champions',
  execute: async ({ msg }) => {
    const champions = await getChampions();
    msg.channel.send(
      `Current total amount of champions: **${champions.length}**`,
    );
  },
};
