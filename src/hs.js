import axios from 'axios';
import config from './config';


const hs = (msg) => {
  const searchQuery = msg.content.replace('?hs ', '');

  axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${searchQuery}`, { headers: { 'X-Mashape-Key': config.mashapeKey } })
    .then(res =>
      res.data.forEach((card) => {
        if (card.type !== 'Enchantment' && !(card.type === 'Hero' && !card.cost)) {
          msg.reply(card.img);
          let reply;
          if (card.type === 'Minion') {
            reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${card.health} ${card.race ? card.race : ''} ${card.text ? `- ${card.text}` : ''}`;
          } else if (card.type === 'Spell') {
            reply = `**${card.name}** - ${card.cost} mana spell - ${card.text}`;
          } else if (card.type === 'Hero') {
            reply = `**${card.name}** - ${card.cost} mana - ${card.armor} armor - ${card.text}`;
          } else if (card.type === 'Weapon') {
            reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${card.durability} ${card.type} ${card.text ? `- ${card.text}` : ''}`;
          } else if (card.type === 'Hero Power') {
            reply = `**${card.name}** - ${card.cost} mana - ${card.text}`;
          }
          msg.reply(reply
            .replace(/<b>/gi, '**')
            .replace(/<\/b>/gi, '**')
            .replace(/<i>/gi, '*')
            .replace(/<\/i>/gi, '*')
            .replace(/_/gi, ' ')
            .replace(/\\n/gi, ' ')
            .replace(/\$/gi, '')
            .replace(/\[x]/gi, ''));
        }
      }))
    .catch(() => msg.reply('Card not found.'));
};

export default hs;
