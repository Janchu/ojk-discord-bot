export default function help(msg, helpModules) {
  try {
    let helpText = [];
    if (helpModules.constructor === Array) {
      helpModules.forEach(module => {
        const moduleHeader = '';
        const moduleText = Object.values(module);
        helpText = [...helpText, moduleHeader, ...moduleText];
      });
    } else {
      const moduleText = Object.values(helpModules);
      helpText = [...helpText, ...moduleText];
    }
    msg.channel.send(helpText);
  } catch (e) {
    msg.channel.send("Help can't be displayed right now.");
  }
}
