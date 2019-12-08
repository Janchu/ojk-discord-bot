export default function help(msg, modules) {
  try {
    const helpTextBlocks = modules.map(module => {
      const { commands, helpTextHeader } = module;
      const helpTextRows = Object.values(commands).map(
        command => `${command.usage} - ${command.description}`,
      );
      const helpTextBlock = `> __**${helpTextHeader}**__\n> ${helpTextRows.join(
        '\n> ',
      )}`;
      return helpTextBlock;
    });

    msg.channel.send(helpTextBlocks.join('\n\n'));
  } catch (e) {
    msg.channel.send("Help can't be displayed right now.");
  }
}
