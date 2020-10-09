import Discord from 'discord.js';
import { parseCommand } from './utils';
import commands from './commands';

require('dotenv').config();

const moduleNames = ['general', 'lol'];

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

commands.forEach(cmd => {
  bot.commands.set(cmd.name, cmd);
});

bot.login(process.env.LOGIN_TOKEN);

bot.on('ready', () => {
  console.log(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

/* Listen to messages */
bot.on('message', msg => {
  // Ignore bot messages and messages not starting with prefix
  if (msg.author.bot) return;
  if (!msg.content.startsWith('!')) return;

  // Parse the command and execute it.
  try {
    const parsedCommand = parseCommand(msg, moduleNames);
    const { commandName } = parsedCommand;
    const command =
      bot.commands.get(commandName) ||
      bot.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName),
      );
    if (!command) return;
    command.execute(parsedCommand);
  } catch (e) {
    msg.channel.send(`Invalid command.`);
  }
});
