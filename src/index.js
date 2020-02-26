import Discord from 'discord.js';
import hs from './modules/hs';
import lol from './modules/lol';
import general from './general';

require('dotenv').config()

const modules = [hs, lol];

const bot = new Discord.Client();

bot.login(process.env.LOGIN_TOKEN);

bot.on('ready', () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

function parseCommand(msg) {
  const prefix = msg[0];
  const splitMessage = msg.content.slice(1).split(' ');

  const module = modules.find(m => m.name === splitMessage[0]) || general;
  const command = module.name === 'general' ? splitMessage[0] : splitMessage[1];
  const parameters =
    module.name === 'general' ? splitMessage.slice(1) : splitMessage.slice(2);

  return { prefix, module, command, parameters, msg };
}

/* Listen to messages */
bot.on('message', msg => {
  // Ignore bot messages and messages not starting with prefix
  if (msg.author.bot) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;

  // Parse the command and run it.
  try {
    const cmdObject = parseCommand(msg);
    const { module, command } = cmdObject;
    module.commands[command].run(cmdObject);
  } catch (e) {
    msg.channel.send(`Invalid command.`);
  }
});
