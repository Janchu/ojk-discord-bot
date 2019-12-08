// import changelog from "../../CHANGELOG.md";
import { readFileSync } from 'fs';
import config from '../config';
import help from './help';
import lol from '../modules/lol';
import hs from '../modules/hs';

const module = {
  name: 'general',
  helpTextHeader: 'General commands',
};

const commands = {
  changelog: {
    usage: '**!changelog**',
    description: 'Shows changelog',
    run: ({ msg }) => {
      try {
        const changelog = readFileSync(config.changelogPath, 'utf8');
        msg.channel.send(`>>> ${changelog}`);
      } catch (e) {
        msg.channel.send("Sorry, I couldn't read the changelog right now.");
      }
    },
  },
  version: {
    usage: '**!version**',
    description: 'Shows the current version of OJK Bot',
    run: ({ msg }) => {
      msg.channel.send(
        `I'm the OJK Bot version **${process.env.npm_package_version}**`,
      );
    },
  },
  help: {
    usage: '**!help**',
    description: 'Help',
    run: ({ msg }) => help(msg, [{ ...module, commands }, lol, hs]),
  },
};

export default { ...module, commands };
