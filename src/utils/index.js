export function parseCommand(msg, modules) {
  const prefix = msg[0];
  const splitMessage = msg.content.slice(1).split(" ");

  const module = modules.find((m) => m === splitMessage[0]) || "general";
  const commandName = module === "general" ? splitMessage[0] : splitMessage[1];
  const parameters =
    module === "general" ? splitMessage.slice(1) : splitMessage.slice(2);

  return { prefix, module, commandName, parameters, msg };
}

export function helpTextFormatter(msg, modules) {
  try {
    const embeddedMessage = {
      title: "OJK Bot commands",
      fields: modules.map(({ commands, name }) => ({
        name: `**${name}**`,
        value: commands.map(
          (command) => `\`${command.usage}\` - ${command.description}`
        ),
      })),
    };

    msg.channel.send({ embed: embeddedMessage });
  } catch (e) {
    msg.channel.send("Help can't be displayed right now.");
  }
}
