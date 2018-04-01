import Discord from 'discord.js';
import axios from 'axios';
import config from './config';


const bot = new Discord.Client();

bot.login(config.token);

bot.on('ready', () => {
  console.log(bot.user);
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`);
});


/* Hearthstone card search */
bot.on('message', msg => {
  // Check if user says something that includes ?hs
  if (msg.content.includes('?hs ')) {
    const searchQuery = msg.content.replace('?hs ', ''); // Modify string to be able to use it as a search word

    // Make http get request to hearthstoneapi
    axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${searchQuery}`, { headers: { 'X-Mashape-Key': config.mashapeKey }})
    .then((res) => res.data.forEach(card => msg.reply(card.img))) // <- loop through the list and make bot reply the image
    .catch(err => console.log(err)); // console log if something goes wrong
  }
});
