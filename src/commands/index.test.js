import { availableCommandNamesAndAliases } from ".";

describe("Commands / Common", () => {
  test("No duplicate module names", () => {
    const moduleNames = Object.keys(availableCommandNamesAndAliases).map(
      (key) => key
    );
    expect(new Set(moduleNames).size === moduleNames.length).toBe(true);
  });
  test("No duplicate command names", () => {
    const commandNames = Object.keys(availableCommandNamesAndAliases)
      .map((key) => {
        const { commands } = availableCommandNamesAndAliases[key];
        return commands.map(({ name }) => name);
      })
      .flat();
    expect(new Set(commandNames).size === commandNames.length).toBe(true);
  });
  test("No duplicate command names or aliases within each module", () => {
    Object.keys(availableCommandNamesAndAliases).forEach((key) => {
      const { commands } = availableCommandNamesAndAliases[key];
      const moduleNamesAndAlieses = [
        ...commands.map(({ name }) => name),
        ...commands.map(({ aliases }) => aliases),
      ].flat();
      expect(
        new Set(moduleNamesAndAlieses).size === moduleNamesAndAlieses.length
      ).toBe(true);
    });
  });
  test("Each module has a default command", () => {
    Object.keys(availableCommandNamesAndAliases).forEach((key) => {
      const { defaultCommand } = availableCommandNamesAndAliases[key];
      expect(!!defaultCommand).toBe(true);
    });
  });
});
