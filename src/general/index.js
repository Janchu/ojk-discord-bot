// import changelog from "../../CHANGELOG.md";
import { readFileSync } from "fs";
import config from "../config";
import help from "./help";
import { lolHelpTexts } from "../lol";

export const generalHelpTexts = {
  header: "__**General commands**__",
  displayVersion: "**?v** or **?version** - Shows the current version of OJK Bot",
  displayChangelog: "**?changelog** - Shows changelog",
}; // prettier-ignore

function displayVersion(msg) {
  msg.channel.send(
    `I'm the OJK Bot version **${process.env.npm_package_version}**`
  );
}

function displayChangelog(msg) {
  try {
    const changelog = readFileSync(config.changelogPath, "utf8");
    msg.channel.send(changelog);
  } catch (e) {
    msg.channel.send("Sorry, I couldn't read the changelog right now.");
  }
}

export default async function general(msg) {
  const cmd = msg.content.replace("?", "");

  if (cmd === "help") {
    help(msg, [generalHelpTexts, lolHelpTexts]);
  } else if (cmd === "version" || cmd === "v") {
    displayVersion(msg);
  } else if (cmd === "changelog") {
    displayChangelog(msg);
  }
}
