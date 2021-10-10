import { readFileSync } from "fs";

export default {
  name: "changelog",
  aliases: ["changes"],
  usage: "!changelog",
  description: "OJK Bot changelog",
  execute: ({ msg }) => {
    try {
      const changelog = readFileSync(process.env.CHANGELOG_PATH, "utf8");
      msg.channel.send(`>>> ${changelog}`);
    } catch (e) {
      msg.channel.send("Sorry, I couldn't read the changelog right now.");
    }
  },
};
