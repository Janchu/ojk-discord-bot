import Fuse from 'fuse.js';

import set1 from '../../../static/set1-en_us.json';
import set2 from '../../../static/set2-en_us.json';
import set3 from '../../../static/set3-en_us.json';
import set4 from '../../../static/set4-en_us.json';

const allCards = [...set1, ...set2, ...set3, ...set4];

export default {
  name: 'card',
  aliases: [],
  usage: '!lor card <card name>',
  description: 'Display card',
  execute: async ({ msg, parameters }) => {
    const cardName = parameters.join(' ');
    try {
      const fuse = new Fuse(allCards, { keys: ['name'] });
      const results = fuse.search(cardName);
      if (results && results.length) {
        const { item: card = {} } = results[0];
        const { assets, associatedCardRefs } = card;
        const associatedCardPaths = associatedCardRefs.map(
          (ref) =>
            allCards.find(({ cardCode }) => cardCode === ref)?.assets[0]
              ?.gameAbsolutePath,
        );
        const { gameAbsolutePath: cardPath } =
          assets && assets.length ? assets[0] : {};
        if (card.name && card.name.toUpperCase() !== cardName.toUpperCase()) {
          msg.reply(`did you mean "${card.name}"!`);
        }
        msg.channel.send(
          `${cardPath}${
            associatedCardPaths && associatedCardPaths.length ? '\n' : ''
          }${associatedCardPaths.join('\n')}`,
        );
      } else {
        msg.channel.send('Card not found.');
      }
    } catch (e) {
      msg.channel.send(`An error occured.`);
    }
  },
};
