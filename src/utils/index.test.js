import { availableCommandNamesAndAliases } from "../commands";
import { parseCommand } from ".";

const modules = Object.keys(availableCommandNamesAndAliases);

const commands = [
  {
    msg: { content: "!" },
    expectedResult: {
      prefix: "!",
      module: "general",
      commandName: "help",
      parameters: [],
      msg: { content: "!" },
    },
  },
  {
    msg: { content: "!help" },
    expectedResult: {
      prefix: "!",
      module: "general",
      commandName: "help",
      parameters: [],
      msg: { content: "!help" },
    },
  },
  {
    msg: { content: "!h" },
    expectedResult: {
      prefix: "!",
      module: "general",
      commandName: "help",
      parameters: [],
      msg: { content: "!h" },
    },
  },
  {
    msg: { content: "!version" },
    expectedResult: {
      prefix: "!",
      module: "general",
      commandName: "version",
      parameters: [],
      msg: { content: "!version" },
    },
  },
  {
    msg: { content: "!v" },
    expectedResult: {
      prefix: "!",
      module: "general",
      commandName: "version",
      parameters: [],
      msg: { content: "!v" },
    },
  },
  {
    msg: { content: "!lol champion miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lol",
      commandName: "champion",
      parameters: ["miss", "fortune"],
      msg: { content: "!lol champion miss fortune" },
    },
  },
  {
    msg: { content: "!lol c miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lol",
      commandName: "champion",
      parameters: ["miss", "fortune"],
      msg: { content: "!lol c miss fortune" },
    },
  },
  {
    msg: { content: "!lol miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lol",
      commandName: "champion",
      parameters: ["miss", "fortune"],
      msg: { content: "!lol miss fortune" },
    },
  },
  {
    msg: { content: "!lor card miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lor",
      commandName: "card",
      parameters: ["miss", "fortune"],
      msg: { content: "!lor card miss fortune" },
    },
  },
  {
    msg: { content: "!lor c miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lor",
      commandName: "card",
      parameters: ["miss", "fortune"],
      msg: { content: "!lor c miss fortune" },
    },
  },
  {
    msg: { content: "!lor miss fortune" },
    expectedResult: {
      prefix: "!",
      module: "lor",
      commandName: "card",
      parameters: ["miss", "fortune"],
      msg: { content: "!lor miss fortune" },
    },
  },
];

describe("Utils / parseCommand", () => {
  test("Expected parsing result", () => {
    commands.forEach(({ msg, expectedResult }) => {
      expect(
        JSON.stringify(
          parseCommand(msg, modules, availableCommandNamesAndAliases)
        )
      ).toEqual(JSON.stringify(expectedResult));
    });
  });
});
