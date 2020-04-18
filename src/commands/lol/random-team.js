import { getChampions } from '../../utils/lol';

export default {
  name: 'random-team',
  aliases: ['team'],
  usage: '**!lol random-team**',
  description: 'Returns a team of random champions',
  execute: async ({ msg }) => {
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
    msg.channel.send(`Your teamcomp: ${teamComp.map(c => c.name).join(', ')}`);
  },
};
