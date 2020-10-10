import Discord from 'discord.js';
import Fuse from 'fuse.js';
import * as Vibrant from 'node-vibrant';
import { getApiVersion, getChampions } from '../../utils/lol';

const championReply = async (version, champion) => {
  const imagePalette = await Vibrant.from(
    `${process.env.LOL_DDRAGON_URL}/cdn/${version}/img/champion/${champion.image.full}`,
  )
    .getPalette()
    .then((palette) => palette);
  const lolWikiId = champion.name.replace(' ', '_');
  const leagueofgraphsId = champion.id.toLowerCase();
  const probuildsId = champion.key;
  const championggId = champion.name.replace(' ', '');
  const embeddedMessage = new Discord.MessageEmbed()
    .setColor(imagePalette.Vibrant.getHex())
    .setTitle(champion.name)
    .setDescription(champion.title)
    .setThumbnail(
      `${process.env.LOL_DDRAGON_URL}/cdn/${version}/img/champion/${champion.image.full}`,
    )
    .addField('Wiki', `https://leagueoflegends.fandom.com/wiki/${lolWikiId}`)
    .addField(
      'League of Graphs',
      `https://www.leagueofgraphs.com/champions/builds/${leagueofgraphsId}`,
    )
    .addField(
      'ProBuilds',
      `https://probuilds.net/champions/details/${probuildsId}`,
    )
    .addField('Champion.gg', `https://champion.gg/champion/${championggId}`)
    .setTimestamp();
  return embeddedMessage;
};

export default {
  name: 'champion',
  aliases: ['c'],
  usage: '**!lol champion <champion name>**',
  description: 'Searches for a champion and displays info about it',
  execute: async ({ msg, parameters }) => {
    const championName = parameters.join(' ');
    try {
      const champions = await getChampions();
      const version = await getApiVersion();
      const fuse = new Fuse(champions, { keys: ['name'] });
      const searchResults = fuse.search(championName);
      // First index of result array is the most accurate result, so let's return that.
      const { item: champion } = searchResults[0];
      if (champion.name.toUpperCase() !== championName.toUpperCase()) {
        msg.reply(`did you mean "${champion.name}"!`);
      }
      msg.channel.send(await championReply(version, champion));
    } catch (e) {
      msg.channel.send(`Champion ${championName} doesn't exist.`);
    }
  },
};
