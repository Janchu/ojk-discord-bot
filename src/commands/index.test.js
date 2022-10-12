import commands from ".";

describe("Commands / Common", () => {
  test("No duplicate command names", () => {
    const commandNames = commands.map((command) => command.data.name);
    expect(new Set(commandNames).size === commandNames.length).toBe(true);
  });
});
