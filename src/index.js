import Discord from "discord.js";
import { parseCommand } from "./utils";
import commands, { availableCommandNamesAndAliases } from "./commands";
import logger from "./utils/logger";

require("dotenv").config();

const moduleNames = ["general", "lol", "lor"];

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

commands.forEach((cmd) => {
  bot.commands.set(cmd.name, cmd);
});

bot.login(process.env.LOGIN_TOKEN);

bot.on("ready", () => {
  logger.info(`Logged in with ${bot.user.tag} as ${bot.user.username}!`); // eslint-disable-line no-console
});

/* Listen to messages */
bot.on("message", (msg) => {
  // Ignore bot messages and messages not starting with prefix
  if (msg.author.bot) return;
  if (!msg.content.startsWith("!")) return;

  // Ignore commands in general channel when NODE_ENV is not prod
  if (process.env.NODE_ENV !== "prod" && msg.channel.name === "general") return;

  // Parse the command and execute it.
  try {
    const parsedCommand = parseCommand(
      msg,
      moduleNames,
      availableCommandNamesAndAliases
    );
    const { commandName } = parsedCommand;
    const command = bot.commands.get(commandName);
    if (!command) return;
    command.execute(parsedCommand);
  } catch (e) {
    logger.error(e);
    msg.channel.send(`Invalid command.`);
  }
});
