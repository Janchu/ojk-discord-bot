import axios from 'axios';
import help from '../general/help';

const module = {
  name: 'hs',
  helpTextHeader: 'Hearthstone commands',
};

async function getCard(searchQuery) {
  const response = await axios.get(`${process.env.HS_API_URL}${searchQuery}`, {
    headers: { 'X-Mashape-Key': process.env.MASHAPE_API_KEY },
  });
  return response.data;
}

const commands = {
  card: {
    usage: '**!hs card <card name>**',
    description: 'Searches for a card and returns info about the it',
    run: async ({ msg, parameters }) => {
      // const cardName = cmd.replace('card ', '');
      const cardName = parameters.join(' ');
      const cards = await getCard(cardName);
      cards.forEach(card => {
        if (
          card.type !== 'Enchantment' &&
          !(card.type === 'Hero' && !card.cost)
        ) {
          msg.channel.send(card.img);
          let reply;
          if (card.type === 'Minion') {
            reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${
              card.health
            } ${card.race ? card.race : ''} ${
              card.text ? `- ${card.text}` : ''
            }`;
          } else if (card.type === 'Spell') {
            reply = `**${card.name}** - ${card.cost} mana spell - ${card.text}`;
          } else if (card.type === 'Hero') {
            reply = `**${card.name}** - ${card.cost} mana - ${card.armor} armor - ${card.text}`;
          } else if (card.type === 'Weapon') {
            reply = `**${card.name}** - ${card.cost} mana ${card.attack}/${
              card.durability
            } ${card.type} ${card.text ? `- ${card.text}` : ''}`;
          } else if (card.type === 'Hero Power') {
            reply = `**${card.name}** - ${card.cost} mana - ${card.text}`;
          }
          msg.channel.send(
            reply
              .replace(/<b>/gi, '**')
              .replace(/<\/b>/gi, '**')
              .replace(/<i>/gi, '*')
              .replace(/<\/i>/gi, '*')
              .replace(/_/gi, ' ')
              .replace(/\\n/gi, ' ')
              .replace(/\$/gi, '')
              .replace(/\[x]/gi, ''),
          );
        }
      });
    },
  },
  help: {
    usage: '**!hs help**',
    description: 'Help',
    run: ({ msg }) => help(msg, [{ ...module, commands }]),
  },
};

export default { ...module, commands };
