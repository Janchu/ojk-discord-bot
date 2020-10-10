import commands from '.';

describe('Commands / Common', () => {
  test('No duplicate command names', () => {
    const commandNames = Object.values(commands).map((command) => command.name);
    expect(new Set(commandNames).size === commandNames.length).toBe(true);
  });
  test('No duplicate command name aliases', () => {
    const commandAliases = Object.values(commands)
      .map((command) => command.aliases)
      .flat();
    expect(new Set(commandAliases).size === commandAliases.length).toBe(true);
  });
});
