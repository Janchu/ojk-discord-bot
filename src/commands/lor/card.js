import Fuse from 'fuse.js';

/* eslint-disable import/no-unresolved */
import set1 from '../../../static/set1-en_us.json';
import set2 from '../../../static/set2-en_us.json';
import set3 from '../../../static/set3-en_us.json';
import set4 from '../../../static/set4-en_us.json';
/* eslint-enable import/no-unresolved */

const allCards = [...set1, ...set2, ...set3, ...set4];

export default {
  name: 'card',
  aliases: ['c'],
  usage: '!lor card <card name>',
  description: 'Display card',
  execute: async ({ msg, parameters }) => {
    const cardName = parameters.join(' ');
    try {
      const fuse = new Fuse(allCards, { keys: ['name'] });
      const results = fuse.search(cardName);
      if (results && results.length) {
        const { item: card = {} } = results[0];
        const { assets } = card;
        const { gameAbsolutePath } = assets && assets.length ? assets[0] : {};
        if (card.name && card.name.toUpperCase() !== cardName.toUpperCase()) {
          msg.reply(`did you mean "${card.name}"!`);
        }
        msg.channel.send(`${gameAbsolutePath}`);
      } else {
        msg.channel.send('Card not found.');
      }
    } catch (e) {
      msg.channel.send(`An error occured.`);
    }
  },
};